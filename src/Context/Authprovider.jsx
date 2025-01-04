import { createContext,useState } from "react";

const AuthContext=createContext({});

export function Authprovider({children}){

    const [auth,setauth]=useState({});

    return(
        <AuthContext.Provider value={{auth,setauth}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;