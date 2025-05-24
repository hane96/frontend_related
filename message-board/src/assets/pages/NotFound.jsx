

import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center px-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">404 Not Found</h1>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
      >
        回首頁
      </button>
    </div>
  );
}

export default NotFound;
