import {useState} from "react";


function CreateForm ({addTodo}) {

    const [content, setContent] = useState("");

    function handleSubmit(e){
        e.preventDefault()
        const trimmedContent = content.trim();
        if(trimmedContent != ""){
            addTodo(content)
            setContent("")
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
        <button type="submit">新增</button>
    </form>
    );
}
export default CreateForm