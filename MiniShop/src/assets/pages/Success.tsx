
import { useNavigate } from "react-router-dom";

function Success() {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 h-screen p-10 items-center justify-center text-center">
            <p className="text-2xl font-bold mt-10 mb-5">感謝購買</p>
            <button onClick={()=>{navigate("/product")}} className="border border-gray-300 px-2 py-1 bg-blue-500 hover:bg-blue-600"
                >繼續購物</button>
        </div>
    )
}

export default Success;