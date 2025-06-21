import useProducts from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../context/CartProvider";
import { TbShoppingBagPlus } from "react-icons/tb";
import { TbShoppingBagMinus } from "react-icons/tb";

function ProductDetail() {
    const {products, loading, error} = useProducts();
    const {id} = useParams();
    const id_num = Number(id);
    const navigate = useNavigate();

    const {cart, addCart, removeCart} = useCart();

    if(loading) {
        return <p style={{color: "#7F5A4F", backgroundColor:"#FFF7F0"}}>Loading...</p>
    }
    if(error) {
        return <p style={{color: "#E66F55", backgroundColor:"#FFF7F0"}}>Error: {error}</p>
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

    if(product){
      return (
        <div 
          className="min-h-screen flex gap-8 flex-col md:flex-row p-8" 
          style={{backgroundColor: "white", color: "#5A3E36"}}
        >
          <img src={product.image} alt={product.title} className="align-self-center w-2/3 mx-auto md:w-1/2 h-auto"/>
          <div className="flex flex-col text-center gap-4 mt-8">
            <h1 className="text-xl font-bold" style={{color: "#FF8360"}}>{product.title}</h1>
            <p className="text-2xl" style={{color: "#FF8360"}}>price: {product.price}</p>
            <p className="text-gray-500 leading-relaxed" style={{color: "#7F5A4F"}}>{product.description}</p>

            {
              localStorage.getItem("login")=="true" ?
              <>
                <div className="flex items-center gap-4 border rounded px-4 py-2 self-center" 
                  style={{borderColor: "#FFCCBC"}}
                >
                  <FaCartShopping /> 購物車
            
                  <button 
                    onClick={removeFromCart} 
                    className="border p-1 rounded hover:bg-[#FFF1EB]"
                    style={{borderColor: "#FFCCBC"}}
                  >
                    <TbShoppingBagMinus />
                  </button>
                  <span>目前數量: {cart.find((item) => item.productId==id_num)?.num||0}</span>
                  <button 
                    onClick={addToCart} 
                    className="border p-1 rounded hover:bg-[#FFF1EB]"
                    style={{borderColor: "#FFCCBC"}}
                  >
                    <TbShoppingBagPlus /> 
                  </button>
                </div>

                <button 
                  onClick={moveToCart} 
                  className="rounded p-1 mx-auto"
                  style={{
                    border: "1px solid #FFCCBC",
                    backgroundColor: "#FFCCBC",
                    color: "#7F5A4F",
                    transition: "background-color 0.3s"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = "#E66F55";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = "#FFCCBC";
                    e.currentTarget.style.color = "#7F5A4F";
                  }}
                >
                  查看購物車
                </button>
              </>
              :
              <div className="flex flex-col items-center gap-2 mt-4">
                <p style={{color:"#7F5A4F"}}>登入後才可加入購物車</p>
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
          </div>
        </div>
      )
    }

    const backToProduct = () => {
        navigate("/product");
    }
    
    return(
      <div className="flex flex-col justify-center text-center h-screen" style={{backgroundColor:"#FFF7F0", color: "#5A3E36"}}>
        <h1 className="font-bold text-2xl" style={{color: "#FF8360"}}>商品不存在</h1>
        <h2 style={{color: "#7F5A4F"}}>不存在對應的id</h2>
        <button 
          onClick={backToProduct}
          className="border mx-auto mt-4 p-2 rounded shadow transition duration-200"
          style={{
            borderColor: "#FFCCBC",
            backgroundColor: "#FFCCBC",
            color: "#7F5A4F",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = "#E66F55";
            e.currentTarget.style.color = "white";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = "#FFCCBC";
            e.currentTarget.style.color = "#7F5A4F";
          }}
        >
          返回商品頁
        </button>
      </div>
    )
}

export default ProductDetail;
