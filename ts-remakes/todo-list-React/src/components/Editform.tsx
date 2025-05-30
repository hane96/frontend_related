import {useState} from "react";
import type { Todos } from "../types/todo";

type Props = {
    todo: Todos;
    editTodo: (id: number, newContent: string) => void;
}

function EditForm({todo, editTodo}: Props){

    console.log("editform");
    const [content, setContent] = useState(todo.content);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const trimmedContent = content.trim();
        if(trimmedContent!=""){
            editTodo(todo.id, trimmedContent);
        }
        else alert("輸入不能為空白")
    }

    return (
    <form className="create-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="輸入任務" value={content} 
        onChange = { (e: React.ChangeEvent<HTMLInputElement>) => {
            setContent(e.target.value);
        } }
        />
        <button type="submit">完成</button>
    </form>
    );
}
export default EditForm;