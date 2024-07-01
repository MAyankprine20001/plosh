
import React, { useState , useEffect } from "react";
import styles from "./Modol.module.scss"
import Button from "../Button/Button";
import {addReview} from "../../AxiosWork/AxiosApi";
import {toast } from "react-toastify";
import  ProgressBar  from "../ProgressBar/ProgressBar";
import Slider from "../Slider/Slider";
// import CustomProgressBar from "../CustomProgressBar/CustomProgressBar";
// import CustomThumbProgressBar from "../CustomProgressBar/CustomProgressBar";


const Modal = ({ setIsOpenModal, resData }) => {
  const [authenticityValue, setAuthenticityValue] = useState(0);
  const [tasteValue, setTasteValue] = useState(0);
  const [textareaValue, setTextareaValue] = useState("");
  

 

  const submitReview = () => {
    console.log("chal rhe ha button" ,authenticityValue);
    const formdata = {
        message:textareaValue,
        authenticity:authenticityValue,
        taste:tasteValue,
        restaurant:resData._id
    }
    
    addReviews(formdata)
    setIsOpenModal(false)
  };

  const cancelReview = ()=>{
    setIsOpenModal(false)
  }
  const token = localStorage.getItem("Login_user")
  const userDataString = localStorage.getItem("User_Data");
  let UserData;
  if(userDataString){
     UserData = JSON.parse(userDataString);
     console.log(UserData , "user data coming from localstorage")
  }
  const avatarSrc = `http://ploshadmin.ourappdemo.com/backend/images/${UserData?.avatar}`;

  const addReviews = async(formdata)=>{
    
    try {
        const response = await addReview(formdata,token)
        
        if(response.success){
            toast.success(response.message)
          }
          else{
            toast.error(response.message)
        }
    } catch (error) {
        console.log(error)
    }
}

  return (
    <>
      <div className={styles.ModolContainer}></div>
      <div className={styles.ModalContent}>
        <div className={styles.modalsection}>
          <div className={styles.modalHeadingContainer}>
            <div className={styles.modalName}>
              {/* <img src="/Mask group (1).png" alt="img" className={styles.Modalimage} /> */}
              {/* <img src={UserData?.avator} alt="img" className={styles.Modalimage} /> */}
              <img src={avatarSrc} alt="img" className={styles.Modalimage} />
              <div className={styles.modalInformation}>
                <span className={styles.personName}>{UserData?.name}</span>
                <span className={styles.personAddress}>{UserData?.email}</span>
              </div>
            </div>
            <div className={styles.progressSection}>
              <span className={styles.progessDesc}>Rate our service from 1-10</span>
              <div className={styles.progressInfomation}>
                <div className={styles.progressAuthenticity}>
                  <div className={styles.ProgressHeading} >
                   <p>Authenticity</p> 
                    <ProgressBar value={authenticityValue} setValue={setAuthenticityValue} />
                    {/* <Slider value={authenticityValue} setValue={setAuthenticityValue}/> */}
                    
                     {/* <CustomThumbProgressBar/> */}
                  </div>
                </div>
                <div className={styles.progressAuthenticity}>
                  <div className={styles.ProgressTasteHeading} >
                    <p>Taste</p>
                     <ProgressBar value={tasteValue} setValue={setTasteValue}  />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.TextAreaSection}>
              <textarea
                name="postContent"
                placeholder="Share your experience "
                className={styles.textarea}
                onChange={(e) => setTextareaValue(e.target.value)}

              />
            </div>
          </div>
          <div className={styles.ModolButton}>
            <div className={styles.buttonConatiner}>
              <div className={styles.buttonSection}>
                <Button btn={"Cancel"} styletype="reviewCancelButton" onClick={cancelReview} />
                <Button btn={"Submit"} styletype="reviewSubmitButton" onClick={submitReview} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;