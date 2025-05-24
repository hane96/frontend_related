
import { useNavigate } from "react-router-dom";

function UserHome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <p className="text-gray-700 mb-6">Login succeed</p>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          返回留言板
        </button>
      </div>
    </div>
  );
}

export default UserHome;
