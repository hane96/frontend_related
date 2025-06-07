
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
        return <p>Loading...</p>
    }
    if(error) {
        return <p>Error: {error}</p>
    }

    const product= products?.find((product)=>{
        return (product.id===id_num)
    })

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
        <div className="bg-white min-h-screen flex gap-8 flex-col md:flex-row p-8" >
          <img src={product.image} className="align-self-center w-2/3 mx-auto md:w-1/2 h-auto"/>
          <div className="flex flex-col text-center gap-4 mt-8">
            <h1 className="text-xl font-bold">{product.title}</h1>
            <p className="text-orange-500 text-2xl ">price: {product.price}</p>
            <p className="text-gray-500 leading-relaxed">{product.description}</p>

            {
              localStorage.getItem("login")=="true" ?
              <>
                <div className="flex items-center gap-4 border rounded px-4 py-2 self-center ">
                  <FaCartShopping /> 購物車
            
                  <button onClick={removeFromCart} className="border border-gray-300 p-1 rounded hover:bg-gray-100">
                    <TbShoppingBagMinus />
                  </button>
                  <span>目前數量: {cart.find((item) => {return item.productId==id_num})?.num||0}</span>
                  <button onClick={addToCart} className="border border-gray-300 p-1 rounded hover:bg-gray-100">
                    <TbShoppingBagPlus className=""/> 
                  </button>
                </div>

                <button onClick={moveToCart} className="border border-gray-300 rounded p-1 hover:bg-gray-100 mx-auto"
                >查看購物車</button>
              </>
              :
              <div className="flex flex-col item-center gap-2 mt-4">
                <p className="text-gray-600">登入後才可加入購物車</p>
                <button onClick={()=>{navigate("/login")}} className="bg-blue-500 text-white px-5 md:px-3 py-2 md:py-1 rounded hover:bg-blue-600 mx-auto"
                  >登入</button>
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
      <div className="flex flex-col justify-center text-center bg-gray-100 h-screen">
        <h1 className="font-bold text-blue-600 text-2xl ">商品不存在</h1>
        <h2 className="text-gray-500">不存在對應的id</h2>
        <button onClick={() => backToProduct()}
            className="border border-gray-300 bg-blue-300 mx-auto mt-4 p-2 rounded hover:bg-blue-400"
            
        >返回商品頁</button>
      </div>
    )
    

}

export default ProductDetail;
