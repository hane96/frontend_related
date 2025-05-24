import { Route, Routes } from "react-router-dom"
import { Home } from "./assets/pages/Home"
import Login from "./assets/pages/Login"
import AdminHome from "./assets/pages/AdminHome"
import NotFound from "./assets/pages/NotFound"
import ProtectedRouteAdmin from "./assets/components/ProtectedRouteAdmin"
import ProtectedRouteUser from "./assets/components/ProtectedRouteUser"
import UserHome from "./assets/pages/UserHome"

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      

      <Route path="/login" element={<Login />} />
      <Route 
          path="/admin" 
          element = {
            <ProtectedRouteAdmin>
              <AdminHome />
            </ProtectedRouteAdmin>
          } 
      />
      <Route 
          path="/user"
          element = {
            <ProtectedRouteUser>
              <UserHome />
            </ProtectedRouteUser>
          }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
