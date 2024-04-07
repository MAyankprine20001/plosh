import React, { useState, useEffect } from "react";
import style from "./Header.module.scss";
import Button from "../Button/Button";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const userLoggedIn = !!localStorage.getItem("Login_user");
    setIsLoggedIn(userLoggedIn);
  }, [location.pathname]); 

  const handleLogout = () => {
    localStorage.removeItem("Login_user");
    setIsLoggedIn(false);
    navigate("/");
  };



  const isSignupPage = location.pathname === "/signup";
    
  const handleClick = (isSignupPage) =>{   
        console.log("issignuppage" , isSignupPage) 
         if(isSignupPage){
          navigate("/");
         }else{
          navigate("/signup");
         }
  }
  return (
    <div className={style.header_container}>
    
      {!isLoggedIn && (
        <div className={style.header_content}>
          <div className={style.header_logo}>
            <img src="./Plosh 4.png" alt="" />
          </div>
          
            <div className={style.navbar_list}>
            <Button btn={isSignupPage ? "Login" : "Register"} styletype="headerbtn" onClick={()=>handleClick(isSignupPage)}/>
            </div>
          
        </div>
      )}

      {isLoggedIn && (
        <div className={style.navbar}>
          <div className={style.header_logo_after}>
            <img src="./Plosh 4.png" alt="" />
          </div>
          <div className={style.navbar_list_after}>
           
            <Link to="/restaurant">
            <div className={style.navbar_list_item}>
              <img src="./home 2.png" alt="homeImage" />
              <p>Home</p>
              </div>
            </Link>
          </div>
          <div className={style.navbar_list_after}>
            <Link to="/category">
              <div className={style.navbar_list_item}>
              <img src="./categories 3.png" alt="Category" />
              <p>Category</p>
              </div>
            </Link>
          </div>
          <div className={style.navbar_list_after}>
            <Link to="/restaurant">
              <div className={style.navbar_list_item}>
              <img src="./restaurant 1.png" alt="Category" />
              <p>Restaurants</p>
              </div>
            </Link>
          </div>
          <div className={style.navbar_list_after}>
            <Link to="/profile">
              <div className={style.navbar_list_item}>
              <img src="./user (1) 1.png" alt="Category" />
              <p>Profile</p>
              </div>
            </Link>
          </div>
          <div className={style.navbar_list_after}>
            <Button btn="Logout" styletype="headerbtn" onClick={handleLogout} />
            {/* <img src="./menu 2.png" alt="" /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
