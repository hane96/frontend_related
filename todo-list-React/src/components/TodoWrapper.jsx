import { useState } from "react"
import CreateForm from "./CreateForm"
import Todo from "./Todo"

function TodoWrapper() {

    const [todos, setTodos] = useState([
        {content: "task 1", id: Math.random(), isCompleted: false, isEditing: false},
        {content: "task 2", id: Math.random(), isCompleted: false, isEditing: false}
    ]);

    function addTodo(content)  {
        setTodos([...todos, {content: content, id: Math.random(), isCompleted: false, isEditing: false}])
    };

    function deleteTodo(id) {
        setTodos(todos.filter( (todo) => {
            return todo.id != id
        }
        ))
    }

    function toggleCompleted(id) {
        setTodos(todos.map((todo) => {
            return (
                todo.id == id
                ? {...todo, isCompleted: !todo.isCompleted}
                : todo
            )
        }))
    }

    function toggleIsEditing(id) {
        setTodos(todos.map((todo) => {
            return todo.id == id
            ? {...todo, isEditing: !todo.isEditing}
            : todo
        }))
    }

    function editTodo(id, newContent) {
        setTodos(todos.map((todo) => {
            return todo.id == id
            ? {...todo, content:newContent, isEditing: false}
            : todo
        }))
    }


    return (
      <div className="wrapper">
        <h1>Todo-list</h1>
        <CreateForm addTodo={addTodo}/>
        {
            todos.map((todo) => {
                return <Todo toggleCompleted = {toggleCompleted}
                toggleIsEditing={toggleIsEditing} 
                editTodo={editTodo}
                todo={todo} key={todo.id} deleteTodo={deleteTodo}/>
            })
        }
      </div>
    )
}

export default TodoWrapper