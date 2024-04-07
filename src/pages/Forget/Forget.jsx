import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import style from "./Forget.module.scss";
import { forgetApi } from "../../AxiosWork/AxiosApi";
import { toast } from "react-toastify";
import Loader from "../../component/Loader/Loader";

const Forget = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const response = await forgetApi(values);
        console.log("response forget", response);
        if (response.success) {
          toast.success(response?.message ?? "A password reset link has been sent to your email.");
        } else {
          toast.error(response?.message ?? "User not found");
        }
      } catch (error) {
        console.error("Forget Error:", error);
        toast.error("An error occurred during password reset.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={style.forget_form}>
      <div className={style.forgetContent}>
        <div className={style.forget_form_logo}>
          <img src="./Plosh 4.png" alt="Logo" />
        </div>
        <div className={style.forgetHeading}>
          <h3>Forgot Password?</h3>
        </div>
        <form className={style.forgetForm} onSubmit={formik.handleSubmit}>
          <div className={style.forgetFormItem}>
            <label htmlFor="email" className={style.forgetLabel}>
              Email
            </label>
            <Input
              type="email"
              name="email"
              styletype="signupInputBox"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </div>

          <div className={style.forgetFormItemButton}>
            <Button btn={isLoading ? <Loader /> : "Continue"} styletype="signupButton" type="submit" disabled={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forget;


























// // Forget.jsx
// import React ,{useState} from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import Button from '../../component/Button/Button';
// import Input from '../../component/Input/Input';
// import style from './Forget.module.scss';
// import { forgetApi } from '../../AxiosWork/AxiosApi';
// import { toast } from 'react-toastify';
// import Loader from "../../component/Loader/Loader";

// const Forget = () => {

//   const [isLoading, setIsLoading] = useState(false); 

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//     },
//     validationSchema: yup.object({
//       email: yup.string().email('Invalid email address').required('Email is required'),
//     }),
//     onSubmit: (values, { resetForm }) => {
//       console.log(values);
//       handleForget(values);
//       // resetForm();
//     },
//   });

//   const handleForget = async (values) => {
//     const sanitizedEmail = values.email.trim(); 
//     const response = await forgetApi({ email: sanitizedEmail });
//     console.log("response forget", response)
//     if (response.success) {
//       toast.success(response?.message ?? "A password reset link has been sent to your email.");
//     } else {
//       toast.error(response?.message ?? "User not Found")
//     }
//   }

//   return (
//     <div className={style.forget_form}>
//       <div className={style.forgetContent}>
//       <div className={style.forget_form_logo}>
//         <img src="./Plosh 4.png" alt="Logo" />
//       </div>
//       <div className={style.forgetHeading}>
//         <h3>Forgot Password?</h3>
//       </div>
//       <form className={style.forgetForm} onSubmit={formik.handleSubmit}>
//         <div className={style.forgetFormItem}>
//           <label htmlFor="email" className={style.forgetLabel}>
//             Email
//           </label>
//           <Input
//             type="email"
//             name="email"
//             styletype="signupInputBox"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             placeholder="Enter your email"
//           />
//           {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
//         </div>

//         <div className={style.forgetFormItemButton}>
//           <Button btn="Continue" styletype="signupButton" type="submit" />
//         </div>
//       </form>
//       </div>
//     </div>
//   );
// };

// export default Forget;
