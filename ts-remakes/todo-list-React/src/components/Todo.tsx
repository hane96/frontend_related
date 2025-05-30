import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditForm from "./Editform";
import type { Todos } from "../types/todo";


type Props = {
    todo: Todos;
    deleteTodo: (id: number) => void ;
    toggleCompleted: (id: number) => void ;
    toggleIsEditing: (id: number) => void ;
    editTodo: (id: number, newContent: string) => void;
}

function Todo ({todo, deleteTodo, toggleCompleted, toggleIsEditing, editTodo }: Props) {
    return (
        todo.isEditing ? (<EditForm todo={todo} editTodo={editTodo}/> 

        ): (
        <div className={`todo ${todo.isCompleted ? "completed" : ""}`}>
        <p onClick={() => toggleCompleted(todo.id) }>{todo.content}</p>
        <div>
            <MdEdit className="icon" onClick={() => {toggleIsEditing(todo.id)}}/>
            <MdDelete className="icon" onClick={() => {deleteTodo(todo.id)} } />
        </div>
    </div> )
    );
}
export default Todo