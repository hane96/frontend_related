

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export function AfterLogin({children}: Props){

    if(localStorage.getItem("login")=="true"){
        return children;
    }
    else {
        return <Navigate to="/login" replace />
    }
}

export function ProtectCheckout({children}: Props){

    const cart = JSON.parse(localStorage.getItem("cart")||"[]")
    if(cart.length>0 && (localStorage.getItem("login")=="true")){
        return children;
    }
    else {
        return <Navigate to="/cart" replace />
    }
}

export function ProtectLogin({children}: Props){

    if(localStorage.getItem("login")=="true"){
        return <Navigate to="/" replace />
    }
    else {
        return children;
    }
}





