import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";
//import jwtDecode from "jwt-decode";
// import { getProvider } from '../../authModule/helper/helper'

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

   // const { userId } = jwtDecode(token)
    //console.log(userId)

    if(!token){
        toast.error('First You have to Login');
        return <Navigate to={'/login'} replace={true} />
    }

    return children;
}