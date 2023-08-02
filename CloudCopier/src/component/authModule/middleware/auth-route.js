import { Navigate } from "react-router-dom";
//import jwtDecode from "jwt-decode";
// import { getProvider } from '../../authModule/helper/helper'
//seet alert
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.css';

export const AuthorizeUser = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if(!token){
      //toast.error('First You have to Login');
      return <Navigate to={'/login'} replace={true} />
    }

    //check the user roll
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={'/'} replace={true} />;
    }
    
    return children;
}