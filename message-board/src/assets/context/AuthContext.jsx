
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();//類似一個全域變數容器

export function AuthProvider({children}) {

/*
    用有沒有token判定是否登入 不單純用localStorage操作而多用state
    是為了在token變化時自動re-render localStorage的變化不會自動re-render
    因此要手動去同步這兩個東西 讓localStorage的變化變成state的變化來自動re-render
*/

    const [token, setToken] = useState(localStorage.getItem("token")||null) ;

    const login = (token_param) => {   
        setToken(token_param);
        localStorage.setItem("token", token_param);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    }

    const isAuthenticated_admin = (token == "adminToken") ;
    const isAuthenticated_user = (token == "userToken") ;

    return (
        <AuthContext.Provider value={{token, login, logout, isAuthenticated_admin, isAuthenticated_user}}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext)
}
/*
    這會讓之後要拿Context變得更方便
    本來是這樣 const { token, login } = useContext(AuthContext)
    等同於const { token, login } = useAuth()
*/


