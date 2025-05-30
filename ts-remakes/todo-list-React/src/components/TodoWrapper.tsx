import { useState } from "react"
import CreateForm from "./CreateForm";
import Todo from "./Todo";
import type { Todos } from "../types/todo";

function TodoWrapper() {

    const [todos, setTodos] = useState<Todos[]>([
        {content: "task 1", id: Math.random(), isCompleted: false, isEditing: false},
        {content: "task 2", id: Math.random(), isCompleted: false, isEditing: false}
    ]);

    function addTodo(content: string)  {
        setTodos([...todos, {content: content, id: Math.random(), isCompleted: false, isEditing: false}])
    };

    function deleteTodo(id: number) {
        setTodos(todos.filter( (todo: Todos) => {
            return todo.id != id
        }
        ))
    }

    function toggleCompleted(id: number) {
        setTodos(todos.map((todo: Todos) => {
            return (
                todo.id == id
                ? {...todo, isCompleted: !todo.isCompleted}
                : todo
            )
        }))
    }

    function toggleIsEditing(id: number) {
        setTodos(todos.map((todo: Todos) => {
            return todo.id == id
            ? {...todo, isEditing: !todo.isEditing}
            : todo
        }))
    }

    function editTodo(id: number, newContent: string) {
        setTodos(todos.map((todo: Todos) => {
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