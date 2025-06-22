import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validUser = () => {
    if (account == "user" && password == "user123") return true;
    return false;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //驗證帳密
    if (validUser()) {
      localStorage.setItem("login", "true");
      localStorage.setItem("username", "user");
      setError("");
      navigate("/loginsuccess", { replace: true });
    } else {
      setError("帳號或密碼錯誤");
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{ backgroundColor: "#FFF7F0", color: "#5A3E36" }}
    >
      <div className="flex flex-col items-center py-6 gap-4 justify-center rounded">
        <h2 className="text-2xl font-bold text-center" style={{ color: "#FF8360" }}>
          登入會員
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="p-2 rounded mb-2"
            style={{
              border: "1px solid #FFCCBC",
              backgroundColor: "#FFF7F0",
              color: "#5A3E36",
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded mb-4"
            style={{
              border: "1px solid #FFCCBC",
              backgroundColor: "#FFF7F0",
              color: "#5A3E36",
            }}
          />
          <button
            type="submit"
            className="px-3 py-2 rounded mx-auto shadow transition duration-200 cursor-pointer"
            style={{ backgroundColor: "#FF8360", color: "white" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E66F55")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF8360")}
          >
            登入
          </button>
        </form>

        {error && (
          <p className="text-sm mt-4 text-center" style={{ color: "#E66F55" }}>
            {error}
          </p>
        )}
      </div>

      <div className="flex flex-row gap-2 mt-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded shadow transition duration-200 cursor-pointer"
          style={{
            border: "1px solid #FFCCBC",
            backgroundColor: "#FFCCBC",
            color: "#7F5A4F",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E66F55";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FFCCBC";
            e.currentTarget.style.color = "#7F5A4F";
          }}
        >
          返回首頁
        </button>
        <button
          onClick={() => navigate("/product")}
          className="p-2 rounded shadow transition duration-200 cursor-pointer"
          style={{
            border: "1px solid #FFCCBC",
            backgroundColor: "#FFCCBC",
            color: "#7F5A4F",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E66F55";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FFCCBC";
            e.currentTarget.style.color = "#7F5A4F";
          }}
        >
          返回商品頁
        </button>
      </div>

      <p className="mt-2" style={{ color: "#7F5A4F" }}>
        測試用帳號: user
      </p>
      <p style={{ color: "#7F5A4F" }}>測試用密碼: user123</p>
    </div>
  );
}

export default Login;
