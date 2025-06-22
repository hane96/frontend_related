import useProducts from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../context/CartProvider";
import { TbShoppingBagPlus } from "react-icons/tb";
import { TbShoppingBagMinus } from "react-icons/tb";
import { motion } from "framer-motion";

function ProductDetail() {
    const {products, loading, error} = useProducts();
    const {id} = useParams();
    const id_num = Number(id);
    const navigate = useNavigate();

    const {cart, addCart, removeCart} = useCart();

    if(loading) {
        return (
          <div className="flex flex-col items-center bg-[#FFF7F0] h-screen">
            <p className="text-[#7F5A4F] pt-10 pb-2 text-xl">Loading...</p>
            <p className="text-[#7F5A4F]">載入商品中...</p>
            
          </div>
        )
    }
    if(error) {
        return <p className="text-[#E66F55] bg-[#FFF7F0] h-screen">Error: {error}</p>
    }

    const product= products?.find((product)=> product.id===id_num)

    const addToCart = () => {
      addCart(id_num);
    }

    const removeFromCart = () => {
      removeCart(id_num);
    }

    const moveToCart = () =>{
      navigate("/cart")
    }

    const backToProduct = () => {
        navigate("/product");
    }

    if(product){
      return (
        <div 
          className="bg-white text-[#5A3E36] min-h-screen flex gap-8 md:gap-12 flex-col md:flex-row p-8" 
        >
          <div className="md:w-[50vw] flex items-center justify-center">
            <img src={product.image} alt={product.title} className="block max-h-[300px] md:max-h-[600px] w-auto object-contain hover:scale-105" />
          </div>
 
          <div className="flex flex-col text-left md:text-center gap-4 mt-8 md:w-[50vw]">
            <h1 className="text-xl font-bold text-[#FF8360]" >{product.title}</h1>
            <p className="text-2xl text-[#FF8360]">price: {product.price}</p>
            <p className="leading-relaxed text-[#7F5A4F]">{product.description}</p>

            {
              localStorage.getItem("login")=="true" ?
              <>
                <div className="border-[#FFCCBC] flex items-center gap-4 border rounded px-4 py-2 self-center" >
                  <FaCartShopping /> 購物車
            
                  <button 
                    onClick={removeFromCart} 
                    className="border border-[#FFCCBC] p-2 md:p-1 rounded hover:bg-[#FFF1EB] cursor-pointer"
                  >
                    <TbShoppingBagMinus />
                  </button>
                  <motion.span
                    key={cart.find((item) => item.productId==id_num)?.num||0}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1}}
                    transition={{duration: 0.5}}
                  >
                    目前數量: {cart.find((item) => item.productId==id_num)?.num||0}
                  </motion.span>
                  <button 
                    onClick={addToCart} 
                    className="border border-[#FFCCBC] p-2 md:p-1 rounded hover:bg-[#FFF1EB] cursor-pointer"
                  >
                    <TbShoppingBagPlus /> 
                  </button>
                </div>
                
                <div className="p-1 flex justify-center">
                  <button 
                    onClick={moveToCart} 
                    className="rounded p-1 mx-2 border-[#FFCCBC] hover:bg-[#E66F55] text-[#7F5A4F] hover:text-white bg-[#FFCCBC] transition duration-200 cursor-pointer"
                  >
                    查看購物車
                  </button>
                  <button 
                    onClick={backToProduct} 
                    className="rounded p-1 mx-2 border-[#FFCCBC] hover:bg-[#E66F55] text-[#7F5A4F] hover:text-white bg-[#FFCCBC] transition duration-200 cursor-pointer"
                  >
                    返回商品頁
                  </button>
                </div>
              </>
              :
              <div className="flex flex-col items-center gap-2 mt-4">
                <p className="text-[#7F5A4F]">登入後才可加入購物車</p>
                <div className="flex">
                  <button
                    onClick={()=>{navigate("/login")}}
                    className="bg-[#FF8360] hover:bg-[#E66F55] text-white px-5 md:px-3 py-2 md:py-1 rounded shadow transition duration-200 cursor-pointer"
                  >
                    登入
                  </button>
                  <button 
                    onClick={backToProduct} 
                    className="rounded p-1 mx-2 border-[#FFCCBC] hover:bg-[#E66F55] text-[#7F5A4F] hover:text-white bg-[#FFCCBC] transition duration-200 cursor-pointer"
                  >
                    返回商品頁
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      )
    }
    
    return(
      <div className="flex flex-col justify-center text-center h-screen" style={{backgroundColor:"#FFF7F0", color: "#5A3E36"}}>
        <h1 className="text-[#FF8360] font-bold text-2xl">商品不存在</h1>
        <h2 className="text-[#7F5A4F]">不存在對應的id</h2>
        <button 
          onClick={backToProduct}
          className="border border-[#FFCCBC] bg-[#FFCCBC] hover:bg-[#E66F55] text-[#7F5A4F] hover:text-white mx-auto mt-4 p-2 rounded shadow transition duration-200 cursor-pointer"
        >
          返回商品頁
        </button>
      </div>
    )
}

export default ProductDetail;
