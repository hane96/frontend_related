import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("login") === "true");
  const username = localStorage.getItem("username") || "";
  

  const toProducts = () => {
    navigate("/product");
  };

  const logout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("username");
    setIsLogin(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center font-sans"
      style={{ backgroundColor: "#FFF7F0", color: "#5A3E36"}}
    >
      <h1 className="text-3xl font-bold mt-10 mb-2" style={{ color: "#FF8360" }}>
        歡迎來到 MiniShop！
      </h1>
      <p className="text-base mb-8" style={{ color: "#7F5A4F" }}>
        {isLogin ? `Hello，${username}！歡迎回來` : "請登入以開始購物！"}
      </p>

      <div className="flex flex-row gap-4">
        <button
          onClick={toProducts}
          className="px-5 py-2 font-medium text-base text-white rounded-lg shadow transition duration-200"
          style={{ backgroundColor: "#FF8360" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#E66F55")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FF8360")}
        >
          前往商品頁
        </button>
        {isLogin ? (
          <button
            onClick={logout}
            className="px-5 py-2 rounded-lg shadow transition duration-200"
            style={{ backgroundColor: "#FFCCBC", color: "#7F5A4F" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#E66F55", e.currentTarget.style.color = "white")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FFCCBC", e.currentTarget.style.color = "#7F5A4F")}
          >
            登出
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 text-white rounded-lg shadow transition duration-200"
            style={{ backgroundColor: "#FF8360" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#E66F55")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FF8360")}
          >
            登入
          </button>
        )}
      </div>
      
    </div>
  );
}

export default Home;
