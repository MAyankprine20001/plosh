import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from "./ChangePassword.module.scss";
import Input from '../..//component/Input/Input';
import Button from '../../component/Button/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { changePassword } from "../../../src/AxiosWork/AxiosApi";

const ChangePassword = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        newPassword: yup.string()
            .min(8, 'New Password must be at least 8 characters long')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-:-@[-`{-~]).{8,}$/,
                "Your password should contain a combination of uppercase and lowercase letters, at least one number, and at least one special character."
            )
            .required("Please enter your new password."),
        oldPassword: yup.string().required("Please enter your old password."),
        confirmPassword: yup.string()
            .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
            .required('Please confirm your password')
    });

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await changePassword(values, localStorage.getItem("Login_user"));
                if (response?.success) {
                    toast.success(response.message);
                    navigate("/restaurant");
                } else {
                    toast.error(response?.message);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
        formik.setFieldTouched(name, true, false);
    };

    return (
        <div className={styles.loginbox}>
            <img src="./Plosh 4.png" alt='plosh' className={styles.img}/>
            <p className={styles.heading}>{"Change Password"}</p>

            <form className={styles.form} onSubmit={formik.handleSubmit}> 
                <div className={styles.inputsField}>
                    <div className={styles.emailaddress}>
                        <label className={styles.label}>Old Password</label>
                        <div className={styles.showhide}>
                            <Input name="oldPassword" control={formik.getFieldProps} required type={showOldPassword ? "text" : "password"} onChange={(e)=>handleInputChange(e)} styletype="signupInputBox" />
                            <span className={styles.hideimg} onClick={() => setShowOldPassword(!showOldPassword)}>
                                {showOldPassword ? <FaEye/> : <FaEyeSlash/>}
                            </span>
                        </div> 
                        {formik.touched.oldPassword && formik.errors.oldPassword && <p style={{color:"red"}} className={styles.error}>{formik.errors.oldPassword}</p>}
                    </div>

                    <div className={styles.emailaddress}>
                        <label className={styles.label}>New Password</label>
                        <div className={styles.showhide}>
                            <Input name="newPassword" control={formik.getFieldProps} required type={showPassword1 ? "text" : "password"} onChange={handleInputChange} styletype="signupInputBox"/>
                            <span className={styles.hideimg} onClick={() => setShowPassword1(!showPassword1)}>
                                {showPassword1 ? <FaEye/> : <FaEyeSlash/>}
                            </span>
                        </div> 
                        {formik.touched.newPassword && formik.errors.newPassword && <p className={styles.error} style={{color:"red"}}>{formik.errors.newPassword}</p>}
                    </div>

                    <div className={styles.emailaddress}>
                        <label className={styles.label}>Confirm New Password</label>
                        <div className={styles.showhide}>
                            <Input name="confirmPassword" control={formik.getFieldProps} required type={showPassword2 ? "text" : "password"}  onChange={handleInputChange} styletype="signupInputBox"/>
                            <span className={styles.hideimg} onClick={() => setShowPassword2(!showPassword2)}>
                                {showPassword2 ? <FaEye/> : <FaEyeSlash/>}
                            </span>
                        </div> 
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className={styles.error} style={{color:"red"}}>{formik.errors.confirmPassword}</p>}
                    </div>
                </div>

                <div className={styles.btndiv}>
                    <Button btn={loading ? "loading" : "Change Password"} styletype="signupButton" type="submit" disabled={!formik.isValid || loading}/>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
