
import { useNavigate } from "react-router-dom";

function Success() {
    const navigate = useNavigate();

    return (
        <div 
          className="h-screen p-10 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: "#FFF7F0", color: "#5A3E36" }}
        >
            <p className="text-2xl font-bold mt-10 mb-5" style={{ color: "#FF8360" }}>
              感謝購買
            </p>
            <button 
              onClick={() => navigate("/product")} 
              className="border px-4 py-2 rounded transition-colors"
              style={{ 
                borderColor: "#FFCCBC", 
                backgroundColor: "#FF8360", 
                color: "white"
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#E66F55"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#FF8360"}
              type="button"
            >
                繼續購物
            </button>
        </div>
    )
}

export default Success;
