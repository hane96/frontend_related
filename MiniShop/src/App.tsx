import { Route, Routes } from "react-router-dom"
import Home from "./assets/pages/Home"
import Cart from "./assets/pages/Cart"
import Success from "./assets/pages/Success"
import Notfound from "./assets/pages/Notfound"
import "./index.css"
import Products from "./assets/pages/Products"
import ProductDetail from "./assets/pages/ProductDetail"
import Checkout from "./assets/pages/Checkout"
import Login from "./assets/pages/Login"
import LoginSuccess from "./assets/pages/LoginSuccess"
import { ProtectLogin, ProtectCheckout, AfterLogin } from "./assets/components/ProtectedRoute"

function App() {
  return (
  
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/product" element={<Products/>} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={
        <AfterLogin>
          <Cart/>
        </AfterLogin>
        } />
      <Route path="/success" element={
        <AfterLogin>
          <Success />
        </AfterLogin>
        } />
      <Route path="/checkout" element={
        <ProtectCheckout>
          <Checkout/>
        </ProtectCheckout>
        } />
      <Route path="/login" element={
        <ProtectLogin>
          <Login />
        </ProtectLogin>
        } />
      <Route path="/loginsuccess" element={
        <AfterLogin>
          <LoginSuccess />
        </AfterLogin>
        } />
      <Route path="*" element={<Notfound />} />
    </Routes>
    
  )
}

export default App
