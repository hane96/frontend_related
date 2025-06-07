
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import { TbShoppingBagPlus } from "react-icons/tb";
import { TbShoppingBagMinus } from "react-icons/tb";
import useProducts from "../hooks/useProducts";
import { useState } from "react";


function Cart() {

    const navigate = useNavigate();
    const {cart, addCart, removeCart, resetCart} = useCart();
    const {products} = useProducts();
    const [error, setError] = useState("");

    const backToProduct = () => {
        navigate("/product");
    }

    const removeFromCart = (id: number) => {
        removeCart(id)
    }

    const addToCart = (id: number) => {
        addCart(id);
    }

    let total = 0;
    for (const item of cart){
      const product = products?.find((product)=>{
        return product.id==item.productId
      })
      if(product) {
        total = total + product.price * item.num;
      }
    }

    const checkout = ()=>{
      if(total==0){
        setError("請至少購買一項商品");
      }
      else{
        navigate("/checkout");
      }
    }

    return (
        <div className=" mx-auto p-4 bg-gray-100 h-screen">
          <h1 className="text-2xl font-bold mb-4 text-orange-500 my-4">購物車</h1>
           {
            cart.length == 0 
            ? (<p>購物車是空的</p>)
            : (
              
              cart.map((item)=>{
                const product = products?.find((p)=>{return p.id==item.productId})
                
              return (
              <div key={item.productId} className="flex flex-col bg-white md:flex-row gap-2 md:gap-0 border border-gray-300 py-4 my-4 justify-around items-center shadow rounded-lg">
                  <img src={product?.image} className="w-30 h-30 object-contain"/>
                  <p>商品id: {item.productId}</p>
                  <p className="md:w-1/3">商品名稱: {product?.title||"loading..."}</p>

                <div className="flex gap-1 border p-1 items-center">
                  <button onClick={() => removeFromCart(item.productId)} className="border border-gray-300 p-2 md:p-1 rounded hover:bg-gray-100">
                    <TbShoppingBagMinus />
                  </button>
                  <span className="">目前數量: {item.num}</span>
                  <button onClick={() => addToCart(item.productId)} className="border border-gray-300 p-3 md:p-1 rounded hover:bg-gray-100">
                    <TbShoppingBagPlus/> 
                  </button>
                </div>
                  <p className="text-orange-500 md:w-1/7 text-center">價錢: {product?.price}</p>

              </div>
              )
            }))
            
           }

          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <button onClick={resetCart} className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-200"
            >重製購物車</button>
            <button onClick={backToProduct} className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-200"
            >繼續購物</button>
            <button onClick={checkout} className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-200" 
            >前往結帳</button>
          </div>
           {error && <p className="text-red-500">{error}</p>}
           <p className="text-xl font-bold mb-4 text-orange-500 text-center mt-4">總價: {Math.round(total)}</p>

        </div>
    )
}

export default Cart;