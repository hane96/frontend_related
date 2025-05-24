

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRouteAdmin({children}) {

    const {isAuthenticated_admin} = useAuth();
    if (!isAuthenticated_admin) {
        console.log("need login");
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRouteAdmin;