

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRouteUser({children}) {

    const {isAuthenticated_user} = useAuth();
    if (!isAuthenticated_user) {
        console.log("need login");
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRouteUser;