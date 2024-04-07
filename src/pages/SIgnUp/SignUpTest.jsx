import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import style from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import { createUserApi } from "../../AxiosWork/AxiosApi";
import { toast } from "react-toastify";
import Loader from "../../component/Loader/Loader";
import { parsePhoneNumber } from "libphonenumber-js";

const SignUpTest = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .matches(
        /^[a-zA-Z\s]+$/,
        "Full name must contain only letters"
      )
      .min(3, "Must be 3 characters or more")
      .required("Full Name is Required"),
    phone: yup
      .string()
      .test('phone-number', 'Invalid phone number. Please include the country code starting with + (e.g., +91)', function(value) {
        try {
          const phoneNumber = parsePhoneNumber(value);
          return phoneNumber && phoneNumber.isValid();
        } catch (error) {
          return false;
        }
      })
      .required("Phone number is required"),
    email: yup.string().email("Invalid email Address").required("Email is required"),
    password: yup
      .string()
      .required("Password is Required")
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must not be more than 20 characters")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/,
        "Password must contain at least one number, one lowercase letter, and one uppercase letter"
      )
      .test(
        'has-uppercase',
        'Password must contain at least one uppercase letter',
        function(value) {
          return /[A-Z]/.test(value || ''); // Check if value contains at least one uppercase letter
        }
      )
      .test(
        'has-number',
        'Password must contain at least one number',
        function(value) {
          return /\d/.test(value || ''); // Check if value contains at least one number
        }
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is Required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSignUp(values);
      Navigate("/");
      resetForm();
    },
  });

  const customHandleChange = (name, value, type) => {
    if (!type) {
      throw new Error('Type parameter is required in customHandleChange function');
    }
    
    // Set the field value
    formik.setFieldValue(name, value);
    
    // Check if the field is touched or focused
    if (formik.touched[name] || formik.errors[name]) {
      formik.setFieldTouched(name, true, false); // Mark field as touched without validating
      formik.validateField(name); // Validate the field
    }
  };

  const handleSignUp = async (values) => {
    try {
      setIsLoading(true);
      const response = await createUserApi(values);
      if (response?.success) {
        toast.success(response?.message ?? "user Created Successfully");
      } else {
        toast.error(response?.message ?? "Email ALready Exist");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const clickhandlerlogin = () => {
    Navigate("/");
  };

  return (
    <div className={style.signup_form}>
      <div className={style.signupContent}>
        <div className={style.signup_form_logo}>
          <img src="./Plosh 4.png" alt="" />
        </div>
        <div className={style.signupheading}>
          <h3>Register</h3>
        </div>
        <form className={style.formofSignup} onSubmit={formik.handleSubmit}>
          <div className={style.signupFormItem}>
            <label className={style.signupLabel} htmlFor="full_Name">
              Full Name
            </label>
            <Input
              id="full_Name"
              type="text"
              name="name"
              styletype="signupInputBox"
              placeholder="Enter your Name"
              value={formik.values.name}
              onChange={(e) => customHandleChange('name', e.target.value, 'text')}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
          </div>

          <div className={style.signupFormItem}>
            <label className={style.signupLabel} htmlFor="phone_number">
              Phone Number
            </label>
            <Input
              id="phone_number"
              type="tel"
              name="phone"
              styletype="signupInputBox"
              placeholder="Enter your Phone Number (e.g., +911234567891)"
              value={formik.values.phone}
              onChange={(e) => customHandleChange('phone', e.target.value, 'tel')}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div style={{ color: "red" }}>{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className={style.signupFormItem}>
            <label className={style.signupLabel} htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              styletype="signupInputBox"
              placeholder="Enter your Email"
              value={formik.values.email}
              onChange={(e) => customHandleChange('email', e.target.value, 'email')}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className={style.signupFormItem}>
            <label className={style.signupLabel} htmlFor="password">
              Password
            </label>
            <div className={style.passwordInput}>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                styletype="signupInputBox"
                placeholder="Enter Password"
                value={formik.values.password}
                onChange={(e) => customHandleChange('password', e.target.value, 'password')}
                onBlur={formik.handleBlur}
              />
              <span
                className={style.toggle_password}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </span>
            </div>
            {/* Display specific error messages */}
            {formik.touched.password && (
              <div style={{ color: "red" }}>
                {!formik.values.password && 'Password is required'}
                {formik.values.password && (
                  <>
                    {formik.values.password.length < 8 && 'Password must be at least 8 characters long'}
                    {formik.values.password.length > 20 && 'Password must not be more than 20 characters'}
                    {!/(?=.*[0-9])/.test(formik.values.password) && ' One number is required'}
                    {!/(?=.*[a-z])/.test(formik.values.password) && ' One lowercase letter is required'}
                    {!/(?=.*[A-Z])/.test(formik.values.password) && ' One uppercase letter is required'}
                  </>
                )}
              </div>
            )}
          </div>

          <div className={style.signupFormItem}>
            <label className={style.signupLabel} htmlFor="confirm_password">
              Confirm Password
            </label>
            <div className={style.passwordInput}>
              <Input
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                styletype="signupInputBox"
                placeholder="Enter Confirm Password"
                value={formik.values.confirmPassword}
                onChange={(e) => customHandleChange('confirmPassword', e.target.value, 'password')}
                onBlur={formik.handleBlur}
              />
              <span
                className={style.toggle_password}
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <FaEye size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </span>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          <div className={style.signupFormItemButton}>
            <Button
              btn={isLoading ? <Loader /> : "Register"}
              styletype="signupButton"
              type="submit"
            />
            <div className={style.gotoLoginPage}>
              I have an account. <span onClick={clickhandlerlogin}>Login</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpTest;
