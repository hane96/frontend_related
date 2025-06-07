import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("login")=="true");

    const toProducts = () => {
        navigate("/product");
    }



    const logout = ()=>{
        localStorage.removeItem("login");
        localStorage.removeItem("username");
        setIsLogin(false);
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 h-screen">
          <h1 className="text-3xl font-bold m-6">Mini shop</h1>
          <div className="flex flex-row gap-2">
            <button onClick={()=>{toProducts()}} className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600" 
            >商品頁</button>
            {
            isLogin?
            <button onClick={logout} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >Logout</button>
            :
            <button onClick={()=>{navigate("/login")}} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >Login</button>
            }
          </div>
          
          
        </div>
    )
}

export default Home;