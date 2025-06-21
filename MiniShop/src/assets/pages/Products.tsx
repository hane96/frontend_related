
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Products(){
    const {products, loading, error} = useProducts();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(localStorage.getItem("login"));

    if(loading) {
        return <p style={{color: "#7F5A4F", backgroundColor:"#FFF7F0"}}>Loading...</p>
    }
    if(error) {
        return <p style={{color: "#E66F55", backgroundColor:"#FFF7F0"}}>Error: {error}</p>
    }

    const logout = ()=>{
      localStorage.setItem("login","");
      localStorage.setItem("username","");
      setIsLogin("");
    }

    return(
      <div className="flex flex-col font-sans" style={{backgroundColor: "#FFF7F0", color: "#5A3E36"}}>
        {
          isLogin ?
          <div className="flex justify-end gap-2 p-2 items-center" >
            <span>歡迎: {localStorage.getItem("username")}</span>
            <button
              onClick={logout}
              className="px-5 md:px-3 py-2 md:py-1 rounded shadow transition duration-200"
              style={{backgroundColor: "#FF8360", color: "white"}}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#E66F55"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#FF8360"}
            >
              登出
            </button>
          </div>
          : 
          <div className="flex flex-row justify-end">
            <button
              onClick={()=>{navigate("/login")}}
              className="px-5 md:px-3 py-2 md:py-1 rounded shadow transition duration-200"
              style={{backgroundColor: "#FF8360", color: "white"}}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#E66F55"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#FF8360"}
            >
              登入
            </button>
          </div>
        }
        
        <h1 className="font-bold text-center text-3xl py-4" style={{color: "#FF8360"}}>商品列表</h1>
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
