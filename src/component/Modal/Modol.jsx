
import React, { useState } from "react";
import styles from "./Modol.module.scss"
import { RiCloseLine } from "react-icons/ri";
// import reviewimage from "../Images/reviewimage.png";
import Button from "../Button/Button";
// import { API } from "../../API/APIS";
import {toast } from "react-toastify";


const Modal = ({ setIsOpen, resData }) => {
  const [authenticityValue, setAuthenticityValue] = useState(7);
  const [tasteValue, setTasteValue] = useState(7);
  const [textareaValue, setTextareaValue] = useState("");


  const Sliding = ({ value, setValue }) => {
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const progressWidth = `${(value - 1) * 10 + 1}%`;

    return (
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          className={styles.slider}
          onChange={handleChange}
        />
        <div className={styles.progress} style={{ width: progressWidth }}></div>
        <div>{value}</div>
      </div>
    );
  };

  
//   const restaurantid=data.restaurant_id
//   console.log(data.restaurant_id,"im id")

  const submitreview = () => {
    const formvalues = {
        message:textareaValue,
        authenticity:authenticityValue,
        taste:tasteValue,
        restaurant:resData._id
    }
    // console.log(formvalues, "after submit");
    AddReview(formvalues)
    setIsOpen(false)
  };

  const cancel = ()=>{
    setIsOpen(false)
    // console.log(resData,"im data")

  }
  const token = localStorage.getItem("token")
//   console.log(token,"from token")
  const AddReview=async(formvalues)=>{
    // console.log(formvalues)
    try {
        const response= await API.AddReview(formvalues,token)
        // console.log(response)
        if(response?.success){
            toast.success(response?.message)
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
      <div className={styles.darkBG}></div>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.namediv}>
              <img src="" alt="img" className={styles.image} />
              <div className={styles.info}>
                <span className={styles.name}>Lorem ipsum</span>
                <span className={styles.address}>Lorem ipsum</span>
              </div>
            </div>
            <div className={styles.filterbox2}>
              <span className={styles.sort}>Rate our service from 1-10</span>
              <div className={styles.info}>
                <div className={styles.auth}>
                  <div className={styles.head}>
                    Authenticity
                    <Sliding value={authenticityValue} setValue={setAuthenticityValue} />
                  </div>
                </div>
                <div className={styles.auth}>
                  <div className={styles.head}>
                    Taste <Sliding value={tasteValue} setValue={setTasteValue} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.textdiv}>
              <textarea
                name="postContent"
                placeholder="Share your experience "
                className={styles.textarea}
                onChange={(e) => setTextareaValue(e.target.value)}

              />
            </div>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <div className={styles.btndiv}>
                <Button btntext={"Cancel"} styleType={"reviewcancel"} handleClick={cancel} />
                <Button btntext={"Submit"} styleType={"reviewsubmit"} handleClick={submitreview} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;