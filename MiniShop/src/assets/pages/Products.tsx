
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Products(){

    const {products, loading, error} = useProducts();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("login"));

    if(loading) {
        return <p>Loading...</p>
    }
    if(error) {
        return <p>Error: {error}</p>
    }


    const logout = ()=>{
      localStorage.setItem("login","");
      localStorage.setItem("username","");
      setIsLogin("");
    }

    return(
      <div className="bg-gray-100 flex flex-col">
        {
          isLogin ?
          <div className="flex justify-end gap-2 p-2 items-center">
            <span className="text-gray-700">歡迎: {localStorage.getItem("username")}</span>
            <button onClick={logout} className="bg-red-500 text-white px-5 md:px-3 py-2 md:py-1 rounded hover:bg-red-600"
              >登出</button>
          </div>
          : 
          <div className="flex flex-row justify-end">
            <button onClick={()=>{navigate("/login")}} className="bg-blue-500 text-white px-5 md:px-3 py-2 md:py-1 rounded hover:bg-blue-600"
                >登入</button>
          </div>
        }
        
        
        <h1 className="font-bold text-center text-3xl py-4">商品列表</h1>
        <div className="grid md:grid-cols-2 items-center text-center gap-4 mx-4">
            {
                products?.map((product) => (
                    <div key={product.id} className="">
                      <ProductCard key={product.id} product={product}/>
                    </div>
                ))
            }
        </div>
      </div>
    )
}
export default Products;