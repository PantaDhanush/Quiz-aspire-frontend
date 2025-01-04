import { useContext } from "react"
import AuthContext from "../Context/Authprovider.jsx"


const useAuth=()=>{
    return useContext(AuthContext);
}

export default useAuth;