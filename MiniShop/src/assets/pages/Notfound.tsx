
import { useNavigate } from "react-router-dom";

function Notfound() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
    }

    return (
        <div className="flex flex-col justify-center text-center gap-4 bg-gray-100 h-screen">
            <h1 className="font-bold text-blue-600 text-2xl">404 Not Found</h1>
            <h2 className="text-gray-500">請檢查route是否正確</h2>
            <button onClick={ () => handleClick() }
                className="border border-gray-300 bg-blue-300 mx-auto mt-4 p-2 rounded hover:bg-blue-400"
                
            >返回首頁</button>
        </div>
    )

}

export default Notfound;