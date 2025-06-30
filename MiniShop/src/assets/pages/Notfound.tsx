import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col justify-center text-center gap-4 h-screen bg-[#FFF7F0] text-[#5A3E36]"
    >
      <h1
        className="font-bold text-2xl text-[#FF8360]"
      >
        404 Not Found
      </h1>
      <h2 className="text-[#7F5A4F]">請檢查route是否正確</h2>
      <button
        onClick={() => handleClick()}
        className="border border-[#FFCCBC] mx-auto mt-4 p-2 rounded shadow transition duration-200 bg-[#FFCCBC] text-[#7F5A4F] hover:bg-[#E66F55] hover:text-white"
      >
        返回首頁
      </button>
    </div>
  );
}

export default Notfound;

