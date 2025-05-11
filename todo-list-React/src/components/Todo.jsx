import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditForm from "./Editform";

function Todo ({todo, deleteTodo, toggleCompleted, toggleIsEditing, editTodo }) {
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