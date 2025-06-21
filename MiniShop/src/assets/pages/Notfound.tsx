import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div
      className="flex flex-col justify-center text-center gap-4 h-screen"
      style={{ backgroundColor: "#FFF7F0", color: "#5A3E36" }}
    >
      <h1
        className="font-bold text-2xl"
        style={{ color: "#FF8360" }}
      >
        404 Not Found
      </h1>
      <h2 style={{ color: "#7F5A4F" }}>請檢查route是否正確</h2>
      <button
        onClick={() => handleClick()}
        className="border mx-auto mt-4 p-2 rounded shadow transition duration-200"
        style={{
          borderColor: "#FFCCBC",
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
    </div>
  );
}

export default Notfound;
