import { createContext,useContext,useState,useEffect } from "react";
import { useRouter } from "next/router";

// creating the context
const AuthContext= createContext();

// context provider

export const AuthProvider=({children})=>
{
    const router=useRouter();
    const [user,setUser]=useState(null);
    const [token,setToken]=useState("");

    // using useffect to make the login data persists

    useEffect(()=>
    {
          const savedToken= localStorage.getItem("token");
          const savedUser= localStorage.getItem("user");
          if(savedToken && savedUser)
          {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
          }
    },[]);

    const login =(token,user)=>
    {
        setToken(token);
        setUser(user);
        localStorage.setItem("token",token);
        localStorage.setItem("user",JSON.stringify(user));
    };

    const logout=()=>
    {
        setToken("");
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    return(
        <AuthContext.Provider value={{user,token,login,logout}}>
            {children}
        </AuthContext.Provider>

    );
};

export const useAuth=()=>useContext(AuthContext);

