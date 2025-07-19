import { createContext, useState, useEffect, useContext } from "react";

type CartItem = {
  productId: number;
  num: number;
};

type CartContextType = {
  cart: CartItem[];
  addCart: (id: number) => void;
  removeCart: (id: number) => void;
  resetCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  //把更新搬出來自動處理
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addCart = (id: number) => {
    const item = cart?.find((item) => {
      return item.productId == id;
    });
    if (!item) {
      const newItem: CartItem = { productId: id, num: 1 };
      setCart((preCart) => [...preCart, newItem]);
    } else {
      setCart((preCart) => {
        return preCart.map((item) => {
          return item.productId == id ? { ...item, num: item.num + 1 } : item;
        });
      });
    }
  };

  const removeCart = (id: number) => {
    const item = cart?.find((item) => {
      return item.productId == id;
    });
    if (!item) {
      console.log("item not in cart");
    } else {
      setCart((preCart) => {
        return preCart
          .map((item) => {
            return item.productId == id ? { ...item, num: item.num - 1 } : item;
          })
          .filter((item) => {
            return item.num > 0;
          });
      });
    }
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)!;

  return context;
}
