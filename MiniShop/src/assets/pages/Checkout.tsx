
import { useCart } from "../context/CartProvider";
import useProducts from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
    const { cart, resetCart } = useCart();
    const { products } = useProducts();
    const navigate = useNavigate();

    let total: number = 0;
    for (const item of cart) {
      const product = products?.find((product) => product.id === item.productId);
      if (product) {
        total += product.price * item.num;
      }
    }

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [error, setError] = useState<boolean | null>(null);

    const validForm = (): boolean => {
      let hasError = false;

      if (username.trim() === "") {
        setNameError("姓名不可為空白");
        hasError = true;
      } else {
        setNameError("");
      }

      const isValidPhone = /^\d{10}$/.test(phone);
      if (!isValidPhone) {
        setPhoneError("電話須為10碼數字");
        hasError = true;
      } else {
        setPhoneError("");
      }

      if (address.trim() === "") {
        setAddressError("地址不可為空白");
        hasError = true;
      } else {
        setAddressError("");
      }

      setError(hasError);
      return hasError;
    };

    const pay = (): void => {
      const formError = validForm();
      if (!formError) {
        resetCart();
        navigate("/success");
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        validForm();
    };

    return (
        <div className="pt-10 h-screen" style={{backgroundColor: "#FFF7F0"}}>
          <div className="flex flex-col bg-white mt-10 p-4 border mx-6 md:mx-30 rounded shadow" style={{color: "#5A3E36"}}>
            
            <h1 className="mt-2 mb-4 font-bold pl-2 md:text-xl" style={{color: "#FF8360"}}>帳單資訊</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <input 
                  type="text" 
                  placeholder="姓名" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border p-2 rounded"
                  style={{borderColor: "#FFCCBC"}}
                />
                {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}

                <input 
                  type="text" 
                  placeholder="電話" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border p-2 rounded"
                  style={{borderColor: "#FFCCBC"}}
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}

                <input 
                  type="text" 
                  placeholder="地址" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border p-2 rounded"
                  style={{borderColor: "#FFCCBC"}}
                />
                {addressError && <p className="text-red-500 text-sm mt-1">{addressError}</p>}

                <button 
                  type="submit"
                  className="border px-4 py-3 md:px-2 rounded mx-auto transition-colors"
                  style={{borderColor: "#FFCCBC"}}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = "#E66F55";
                    e.currentTarget.style.color = "white";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#5A3E36";
                  }}
                >
                    提交
                </button>
            </form>

            <p className="text-xl font-bold mb-4" style={{color: "#FF8360"}}>付款金額: {Math.round(total)}</p>
            
            <div className="flex flex-row justify-center gap-x-4">
              <button 
                onClick={() => navigate("/cart")} 
                className="border p-2 rounded transition-colors"
                style={{borderColor: "#FFCCBC"}}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#FFF1EB"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                type="button"
              >
                返回購物車
              </button>

              <button 
                onClick={() => pay()} 
                className="border p-2 rounded transition-colors"
                style={{borderColor: "#FFCCBC"}}
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
                確認購買
              </button>
            </div>
            {error && <p className="text-red-600 mt-4 text-center">請先完成表單資訊</p>}
          </div>
        </div>
    )
}

export default Checkout;




