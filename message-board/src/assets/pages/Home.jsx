
import fetchMessages from "../utils/fakeAPI";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [messages, setMessages] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    
    fetchMessages().then((data) => {
      setMessages(data);
      localStorage.setItem("messages", JSON.stringify(data));
    }); 
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className=" mx-auto p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">留言板</h1>
      <h3 className="text-lg text-gray-700 mb-2">messages:</h3>

      {messages.length === 0 ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white border border-blue-100 shadow-sm p-4 rounded"
            >
              <p className="text-gray-800">
                <span className="font-semibold">sender:</span> {msg.name} |
                <span className="font-semibold"> id:</span> {msg.id} |
                <span className="font-semibold"> message:</span> {msg.message} |
                <span className="font-semibold"> time:</span> {msg.created_at}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        {token === "userToken" && <MessageForm setMessages={setMessages} />}

        {(token == null || token == "adminToken") && (
          <div className="mt-4 text-center">
            <p className="text-gray-600 mb-2">登入後才可留言</p>
            <button
              onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              登入
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MessageForm({ setMessages }) {
  const [newMessage, setNewMessage] = useState("");
  const { token, logout } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newMessage.length==0) setError("留言不可為空白")

    if(!error && newMessage.length!=0)
    {
    const newMsg = {
      id: Date.now(),
      name: "user",
      message: newMessage,
      created_at: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");
    }

  };

  useEffect(()=>{
    if(newMessage.length>0 && newMessage.length<5) setError("留言至少需要5個字元");
    else if(newMessage.length>50) setError("留言不可超過50字")
    else setError("")
  }
  ,[newMessage])

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="留言"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          送出留言
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="mt-2">
        <button
          onClick={handleClick}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          登出
        </button>
      </div>
    </>
  );
}
