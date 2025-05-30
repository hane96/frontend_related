import {useState} from "react";

type Props = {
    addTodo: (content: string) => void ;
}

function CreateForm ({addTodo}: Props) {

    const [content, setContent] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
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
        onChange = { (e: React.ChangeEvent<HTMLInputElement>) => {
            setContent(e.target.value)
            } }
        />
        <button type="submit">新增</button>
    </form>
    );
}
export default CreateForm