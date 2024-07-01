import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import style from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../AxiosWork/AxiosApi";
import { toast } from "react-toastify";
import Loader from "../../component/Loader/Loader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      // email: yup.string().email("Invalid email Address").required("Email is required"),
    
        
    }),
    onSubmit: async (values) => {
      setIsLoading(true); 
      try {
        const response = await loginApi(values);
        console.log("res token data", response);
        console.log("response token kyu null ha" , response.data);
        if (response?.success) {
          toast.success(response?.message ?? "Login Successfull, Welcome");
          localStorage.setItem("Login_user", response.token);
          // localStorage.setItem("User_Data" , JSON.stringify(response.data));
          localStorage.setItem("User_Data", JSON.stringify(response.data));
          navigate("/restaurant");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Login Error:", error);
        toast.error("An error occurred during login.");
      } finally {
        setIsLoading(false);
      }
    },
    validateOnChange:true,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClickSignUp = () => {
    navigate("/signup");
  };

  const handleForgetPassword = () => {
    navigate("/forget");
  };

  return (
    <div className={style.login_form}>
      <div className={style.loginContent}>
        <div className={style.login_form_logo}>
          <img src="./Plosh 4.png" alt="" />
        </div>
        <div className={style.loginHeading}>
          <h3>Login</h3>
        </div>
        <form className={style.loginForm} onSubmit={formik.handleSubmit}>
          <div className={style.loginformItem}>
            <label htmlFor="" className={style.loginLabel}>
              Email
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              styletype="signupInputBox"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            { formik.errors.email ? <div style={{color:"red"}}>{formik.errors.email}</div> : null}
          </div>

          <div className={style.loginformItem}>
            <label className={style.loginLabel} htmlFor="password">
              Password
            </label>
            <div className={style.passwordInput}>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                styletype="signupInputBox"
                placeholder="Enter your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <span className={style.toggle_password} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div style={{color:"red"}}>{formik.errors.password}</div>
            ) : null}
            <span className={style.forgetPassword} onClick={handleForgetPassword}>
              <p>Forgot Password?</p>
            </span>
          </div>

          <div className={style.loginformItemButton}>
            <Button btn={isLoading ? <Loader/> : "Login"} styletype="signupButton" type="submit" disabled={isLoading} />
            <div className={style.gotoSignupPage}>
              Don't have an account? <span onClick={handleClickSignUp}> Sign Up</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
