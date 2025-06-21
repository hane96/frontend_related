
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import { TbShoppingBagPlus, TbShoppingBagMinus } from "react-icons/tb";
import useProducts from "../hooks/useProducts";
import { useState } from "react";

function Cart() {
    const navigate = useNavigate();
    const { cart, addCart, removeCart, resetCart } = useCart();
    const { products } = useProducts();
    const [error, setError] = useState<string>("");

    const backToProduct = (): void => {
        navigate("/product");
    }

    const removeFromCart = (id: number): void => {
        removeCart(id);
    }

    const addToCart = (id: number): void => {
        addCart(id);
    }

    let total: number = 0;
    for (const item of cart){
      const product = products?.find((product) => product.id === item.productId);
      if(product) {
        total += product.price * item.num;
      }
    }

    const checkout = (): void => {
      if(total === 0){
        setError("請至少購買一項商品");
      }
      else{
        navigate("/checkout");
      }
    }

    return (
        <div className="mx-auto p-4 h-screen" style={{backgroundColor: "#FFF7F0", color: "#5A3E36"}}>
          <h1 className="text-2xl font-bold mb-4 my-4" style={{color: "#FF8360"}}>購物車</h1>
           {
            cart.length === 0 
            ? (<p>購物車是空的</p>)
            : (
              cart.map((item) => {
                const product = products?.find((p) => p.id === item.productId);
                return (
                <div 
                  key={item.productId} 
                  className="flex flex-col bg-white md:flex-row gap-2 md:gap-0 border py-4 my-4 justify-around items-center shadow rounded-lg"
                  style={{borderColor: "#FFCCBC"}}
                >
                  <img src={product?.image} alt={product?.title} className="w-30 h-30 object-contain" />
                  <p>商品id: {item.productId}</p>
                  <p className="md:w-1/3">商品名稱: {product?.title || "loading..."}</p>

                  <div 
                    className="flex gap-1 border p-1 items-center" 
                    style={{borderColor: "#FFCCBC"}}
                  >
                    <button 
                      onClick={() => removeFromCart(item.productId)} 
                      className="border p-2 md:p-1 rounded transition-colors"
                      style={{borderColor: "#FFCCBC"}}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FFF1EB"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                      type="button"
                    >
                      <TbShoppingBagMinus />
                    </button>
                    <span>目前數量: {item.num}</span>
                    <button 
                      onClick={() => addToCart(item.productId)} 
                      className="border p-3 md:p-1 rounded transition-colors"
                      style={{borderColor: "#FFCCBC"}}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FFF1EB"}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                      type="button"
                    >
                      <TbShoppingBagPlus /> 
                    </button>
                  </div>
                  <p className="text-orange-500 md:w-1/7 text-center" style={{color: "#FF8360"}}>價錢: {product?.price}</p>
                </div>
                )
              })
            )
           }

          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <button 
              onClick={resetCart} 
              className="border px-4 py-2 rounded transition-colors"
              style={{borderColor: "#FFCCBC"}}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FFF1EB"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              type="button"
            >
              重製購物車
            </button>
            <button 
              onClick={backToProduct} 
              className="border px-4 py-2 rounded transition-colors"
              style={{borderColor: "#FFCCBC"}}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FFF1EB"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              type="button"
            >
              繼續購物
            </button>
            <button 
              onClick={checkout} 
              className="border px-4 py-2 rounded transition-colors"
              style={{borderColor: "#FFCCBC", color: "#5A3E36"}}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#E66F55";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#5A3E36";
              }}
              type="button"
            >
              前往結帳
            </button>
          </div>
           {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
           <p className="text-xl font-bold mb-4 text-center mt-4" style={{color: "#FF8360"}}>總價: {Math.round(total)}</p>
        </div>
    )
}

export default Cart;

