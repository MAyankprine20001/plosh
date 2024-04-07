import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute = (props) => {
  const login = localStorage.getItem("Login_user");
  console.log(login);
  
  if (login !== null) {
     
    return <>{props.children}</>;      
    
  } else {
   return  <Navigate to = "/"/>;
 
  }
};

export default PrivateRoute;