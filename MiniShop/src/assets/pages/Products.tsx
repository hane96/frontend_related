import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdLogout, MdLogin } from "react-icons/md";

function Products() {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(localStorage.getItem("login"));
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col items-center bg-[#FFF7F0] h-screen">
        <p className="text-[#7F5A4F] pt-10 pb-2 text-xl">Loading...</p>
        <p className="text-[#7F5A4F]">載入商品中...</p>
      </div>
    );
  }
  if (error) {
    return <p className="bg-[#FFF7F0] text-[#E66F55]">Error: {error}</p>;
  }

  const logout = () => {
    localStorage.setItem("login", "");
    localStorage.setItem("username", "");
    setShowModal(false);
    setIsLogin("");
  };

  return (
    <div className="bg-[#FFF7F0] text-[#5A3E36] flex flex-col">
      {isLogin ? (
        <div className="bg-[#FFEDE5] flex justify-between items-center pl-5 shadow text-sm">
          <span
            className="text-[#FF8360] font-semibold text-lg cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            MiniShop
          </span>
          <div className="flex px-4 py-2 space-x-2 items-center">
            <span className="text-[#7F5A4F]">
              歡迎: {localStorage.getItem("username")}
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#FF8360] hover:bg-[#E66F55] flex flex-row items-center text-white px-5 md:px-4 py-2 rounded shadow transition duration-200 cursor-pointer"
            >
              <MdLogout />
              登出
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFEDE5] flex justify-between px-5 py-2 space-x-2 items-center text-sm">
          <span className="text-[#FF8360] font-semibold text-lg">MiniShop</span>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-[#FF8360] hover:bg-[#E66F55] flex flex-row items-center text-white px-5 md:px-4 py-2 rounded shadow transition duration-200 cursor-pointer"
          >
            <MdLogin />
            登入
          </button>
        </div>
      )}

      <h1 className="text-[#FF8360] font-bold text-center text-3xl pt-4 pb-8 ">
        商品列表
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center text-center px-4 md:px-12 gap-6 mx-4">
        {products?.map((product) => (
          <div key={product.id} className="">
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
        {products?.length == 0 && (
          <p className="text-[#7F5A4F] text-center py-10">目前沒有可用商品</p>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-[#FFF7F0]/70 flex justify-center items-center z-50">
          <div className="bg-[#FFF7F0] border border-[#FFCCBC] p-7 rounded-lg shadow-md text-center">
            <p className="text-xl font-semibold mb-4">確認登出</p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-[#FF8360] text-white rounded hover:bg-[#E66F55] cursor-pointer"
                onClick={logout}
              >
                確定
              </button>
              <button
                className="px-4 py-2 bg-[#FFCCBC] text-gray-700 rounded hover:bg-[#FFB6A2] hover:text-white cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Products;
