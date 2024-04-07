import React, { useEffect } from "react";
import Style from "./Search.module.scss";
import Input from "../../component/Input/Input";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();

   useEffect(() => {
     const timeoutId = setTimeout(() => {
       navigate("/login");
     }, 10000);

     return () => clearTimeout(timeoutId);
   }, []);
  return (
    <div className={Style.searchContainer}>
      <div className={Style.SplashImgContainer}>
        <img src="./Plosh 1.png" alt="" />
      </div>
      <div className={Style.InputContainer}>
        <Input styletype="searchInputbox" />
          <img src="./search 2.png" alt="" />
        
      </div>
    </div>
  );
};

export default Search;
