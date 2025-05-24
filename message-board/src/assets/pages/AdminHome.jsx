
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchMessages from "../utils/fakeAPI";
import { useState, useEffect } from "react";

function AdminHome() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessages = messages.filter((msg) => msg.id != deleteId);
    if (messages.length === newMessages.length) {
      setError("沒有對應id的訊息");
      setDeletedId("");
    }
    else {
      setError("");
      setMessages(newMessages);
      setDeleteId("");
    }
  };

  useEffect(() => {
    fetchMessages().then((data) => {
      setMessages(data);
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Admin</h2>
        <p className="text-gray-600 mb-4">登入的 token：{token}</p>
        <button
          onClick={handleClick}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-6"
        >
          登出
        </button>

        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            placeholder="要刪除的留言 ID"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="border px-4 py-2 rounded w-full mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            刪除留言
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <h3 className="text-xl font-semibold mb-2">所有留言</h3>
        {messages.length === 0 ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="border p-3 rounded bg-blue-100 text-sm"
              >
                <p>
                  <strong>Sender:</strong> {msg.name}
                </p>
                <p>
                  <strong>ID:</strong> {msg.id}
                </p>
                <p>
                  <strong>Message:</strong> {msg.message}
                </p>
                <p>
                  <strong>Time:</strong> {msg.created_at}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHome;
