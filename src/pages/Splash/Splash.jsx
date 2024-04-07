import React from "react";
import Style from "./Splash.module.scss";
import { useLinkClickHandler, useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("./search")
  }
  return (
    <div className={Style.SplashContainer}>
      <div className={Style.SplashImgContainer}>
        <img src="./Plosh 1.png" alt="" onClick={clickHandler} />
      </div>
    </div>
  );
};

export default Splash;
