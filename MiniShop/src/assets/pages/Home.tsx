import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("login") === "true");
  const username = localStorage.getItem("username") || "";
  const [showModal, setShowModal] = useState(false);

  const toProducts = () => {
    navigate("/product");
  };

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("username");
    setIsLogin(false);
    setShowModal(false);
  };

  return (
    <div
      className="bg-[#FFF7F0] text-[#5A3E36] flex flex-col items-center justify-center min-h-screen px-4 text-center font-sans"
      
    >
      <h1 className="text-[#FF8360] text-3xl font-bold mt-10 mb-2" >
        歡迎來到 MiniShop！
      </h1>
      <p className="text-[#7F5A4F] text-base mb-8">
        {isLogin ? `Hello，${username}！歡迎回來` : "請登入以開始購物！"}
      </p>

      <div className="flex flex-row gap-4">
        <button
          onClick={toProducts}
          className="bg-[#FF8360] hover:bg-[#E66F55] px-5 py-2 font-medium text-base text-white rounded-lg shadow transition duration-200 cursor-pointer"
        >
          前往商品頁
        </button>
        {isLogin ? (
          <button
            onClick={ () => setShowModal(true)}
            className="bg-[#FFCCBC] hover:bg-[#FFB6A2] text-[#7F5A4F] hover:text-white px-5 py-2 rounded-lg shadow transition duration-200 cursor-pointer"
          >
            登出
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-white rounded-lg shadow transition duration-200 cursor-pointer"
            style={{ backgroundColor: "#FF8360" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#E66F55")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FF8360")}
          >
            登入
          </button>
          
        )}
      </div>
      
      { showModal && (
        <div className="fixed inset-0 bg-[#FFF7F0]/70 flex justify-center items-center z-50">
          <div className="bg-[#FFF7F0] border border-[#FFCCBC] p-7 rounded-lg shadow-md text-center">
            <p className="text-xl font-semibold mb-4">確認登出</p>
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 bg-[#FF8360] text-white rounded hover:bg-[#E66F55] cursor-pointer"
                onClick = {logout}
              >確定</button>
              <button className="px-4 py-2 bg-[#FFCCBC] text-gray-700 rounded hover:bg-[#FFB6A2] hover:text-white cursor-pointer"
                onClick = {() => setShowModal(false)} 
              >取消</button>
            </div>
          </div>
        </div>
        )
      }
    </div>
    
  );
}

export default Home;

