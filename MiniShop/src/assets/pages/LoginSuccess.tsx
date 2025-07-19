import { useNavigate } from "react-router-dom";

function LoginSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-[#FFF7F0]">
      <div className="p-8 rounded shadow text-center bg-white text-[#5A3E36]">
        <p className="text-2xl font-bold mb-4 text-[#FF8360]">登入成功</p>
        <p className="mb-6">歡迎: {localStorage.getItem("username")}</p>
        <button
          onClick={() => {
            navigate("/product");
          }}
          className="px-3 py-1 rounded shadow transition duration-200 bg-[#FF8360] text-white hover:bg-[#E66F55]"
        >
          返回商品頁
        </button>
      </div>
    </div>
  );
}

export default LoginSuccess;
