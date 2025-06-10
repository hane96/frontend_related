
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validUser = ()=>{

        if(account=="user" && password=="user123") return true;
        return false;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        //驗證帳密
        if(validUser()){
            localStorage.setItem("login", "true")
            localStorage.setItem("username", "user")
            setError("")
            navigate("/loginsuccess", {replace:true});
        }
        else {
            setError("帳號或密碼錯誤")
        }
    }

    

    return (
        <div className="flex flex-col items-center bg-gray-100 h-screen">
          <div className="flex flex-col items-center py-6 gap-4 justify-center rounded">
            <h2 className="text-2xl font-bold text-center ">登入會員</h2>
            <form onSubmit={(e)=>{handleSubmit(e)}} >
              <input 
                type="text"
                placeholder="account"
                value={account}
                onChange={(e)=>{setAccount(e.target.value)}}
                className="border border-gray-300 p-2 rounded"
              />
              <input 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className="border border-gray-300 p-2 rounded"
              />
              <button 
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 mx-auto"
              >登入</button>

            </form>

            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

          </div>
          <div className="flex flex-row gap-2">
            <button onClick={()=>{navigate("/")}} className="border border-gray-300 bg-blue-300 mx-auto mt-4 p-2 rounded hover:bg-blue-400"
                >返回首頁</button>
            <button onClick={()=>{navigate("/product")}} className="border border-gray-300 bg-blue-300 mx-auto mt-4 p-2 rounded hover:bg-blue-400"
                >返回商品頁</button>
          </div>

          <p className="text-gray-500 mt-2">測試用帳號: user</p>
          <p className="text-gray-500">測試用密碼: user123</p>

        </div>
    )
}


export default Login;


