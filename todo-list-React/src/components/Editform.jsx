import {useState} from "react";

function EditForm({todo, editTodo}){

    console.log("editform");
    const [content, setContent] = useState(todo.content);

    function handleSubmit(e){
        e.preventDefault()
        const trimmedContent = content.trim();
        if(trimmedContent!=""){
            editTodo(todo.id, content)
        }
        else alert("輸入不能為空白")
    }

    return (
    <form className="create-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="輸入任務" value={content} 
        onChange = { (e) => {
            setContent(e.target.value)
        } }
        />
        <button type="submit">完成</button>
    </form>
    );
}
export default EditForm;