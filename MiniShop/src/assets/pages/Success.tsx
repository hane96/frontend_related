import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="h-screen p-10 flex flex-col items-center justify-center text-center bg-[#FFF7F0] text-[#5A3E36]">
      <p className="text-2xl font-bold mt-10 mb-5 text-[#FF8360]">感謝購買</p>
      <button
        onClick={() => navigate("/product")}
        className="border border-[#FFCCBC] px-4 py-2 rounded transition-colors bg-[#FF8360] text-white hover:bg-[#E66F55]"
        type="button"
      >
        繼續購物
      </button>
    </div>
  );
}

export default Success;
