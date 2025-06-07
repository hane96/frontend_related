
import { useCart } from "../context/CartProvider";
import useProducts from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useState} from "react";

function Checkout() {

    const {cart ,resetCart} = useCart();
    const {products} = useProducts();
    const navigate = useNavigate();

    let total = 0;
    for (const item of cart){
      const product = products?.find((product)=>{
        return product.id==item.productId
      })
      if(product) {
        total = total + product.price * item.num;
      }
    }

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [error, setError] = useState<null|boolean>();

    const validForm = () => {
      let hasError = false;

        if (username==""){
          setNameError("姓名不可為空白")
          hasError = true;
        }
        else setNameError("")
        
        const isValidPhone = /^\d{10}$/.test(phone);

        if (!isValidPhone){
          setPhoneError("電話須為10碼數字")
          hasError = true;
        }
        else setPhoneError("")
        
        if (address==""){
          setAddressError("地址不可為空白")
          hasError = true;
        }
        else setAddressError("")

        setError(hasError);
        return hasError;
    }

    const pay = () => {
      const formError = validForm();
      if(!formError)
      {
        resetCart();
        navigate("/success");
      }
    }

    

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formError = validForm();
    }

    return(
        <div className="bg-gray-100 pt-10 h-screen">
          <div className="flex flex-col bg-white mt-10 p-1 border mx-6 md:mx-30 rounded shadow">
            
            <h1 className="mt-2 mb-4 font-bold pl-2 md:text-xl">帳單資訊</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <input 
                  type="text" 
                  placeholder="姓名" 
                  value={username}
                  onChange={(e)=>{ setUsername(e.target.value)}}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                {nameError && <p className="text-red-500 text-sm mt-1"
                  >{nameError}</p>}
                <input 
                  type="text" 
                  placeholder="電話" 
                  value={phone}
                  onChange={(e)=>{ setPhone(e.target.value)}}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1"
                  >{phoneError}</p>}
                <input 
                  type="text" 
                  placeholder="地址" 
                  value={address}
                  onChange={(e)=>{ setAddress(e.target.value)}}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                {addressError && <p className="text-red-500 text-sm mt-1"
                  >{addressError}</p>}
                <button 
                  type="submit"
                  className="border border-gray-300 px-4 py-3 md:px-2 rounded hover:bg-gray-100 mx-auto"
                >
                    提交
                </button>
            </form>

            <p className="text-xl font-bold mb-4 text-orange-500">付款金額: {Math.round(total)}</p>
            
            <div className="flex flex-row justify-center gap-x-4 ">
              <button onClick={()=>{navigate("/cart")}} className="border border-gray-300 p-2 rounded hover:bg-gray-100"
              >返回購物車</button>
              <button onClick={()=>{pay()}} className="border border-gray-300 p-2 rounded hover:bg-gray-100"
              >確認購買</button>
            </div>
            {error && <p className="text-red-600 mt-4 text-center">請先完成表單資訊</p>}
          </div>
        </div>
    )
}

export default Checkout;
