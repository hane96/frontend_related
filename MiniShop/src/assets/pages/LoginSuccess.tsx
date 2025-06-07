
import { useNavigate } from "react-router-dom";

function LoginSuccess() {

    const navigate = useNavigate();

    return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow text-center">
        <p className="text-2xl font-bold mb-4">登入成功</p>
        <p className="mb-6">歡迎: {localStorage.getItem("username")}</p>
        <button onClick={()=>{navigate("/product") }} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >返回商品頁</button>
      </div>
    </div>
    )
    
}

export default LoginSuccess;