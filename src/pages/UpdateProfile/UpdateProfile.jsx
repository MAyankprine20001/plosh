import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './UpdateProfile.module.scss';
import Input from '../../component/Input/Input';
import Button from '../../component/Button/Button';
import userupdate from '../../../public/userupdate.png';
import plusicon from '../../../public/plusicon.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile, getProfile } from '../../AxiosWork/AxiosApi';
// import Loader from '../../component/Loader/Loader';

const UpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [profileData, setprofileData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image
    const token = localStorage.getItem("Login_user");
    const fileInputRef = useRef(null); // Reference to the file input element

    const validationSchema = yup.object().shape({
        name: yup.string().required('Please enter your name'),
        phone: yup.string().required('Please enter your contact number.'),
        email: yup.string().email('Please enter a valid email address').required(`Please enter your email address.`),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            // avatar: null
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);

                const formData = new FormData();


                formData.append('file', fileInputRef.current.files[0]);
                formData.append('name', values.name);
                formData.append('phone', values.phone);


                const response = await updateProfile(formData, token);

                console.log(response);

                if (response?.success) {
                    toast.success(response?.message);
                } else {
                    console.log({ response });
                    toast.error(response?.message);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = async () => {
        try {
            const response = await getProfile(token)
            if (response?.success) {
                console.log(response);
                setprofileData(response.data);
                formik.setValues({
                    name: response.data.name,
                    phone: response.data.phone,
                    email: response.data.email,
                });

                console.log(response.data.avatar);
                // if (response.data.avatar) {

                //     setSelectedImage(response.data.avatar);

                // }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // setSelectedImage(URL.createObjectURL(file));
        setSelectedImage(file);
    };
   
    const imageUrl = `http://ploshadmin.ourappdemo.com/backend/images/${profileData.avatar}`;


    console.log("jdhwajhdfjfhfjf", selectedImage);
    {console.log("....jdndhd " , profileData)}
    return (
        <>
        {profileData.length===0 ? <div className={styles.loader}>
            
            </div>:
          <div className={styles.updateProfilebox}>
          <div className={styles.updateHeading}>
              <p className={styles.heading}>Update Profile</p>
          </div>

          <div className={styles.updateimgbox}>
              <div className={styles.imgbox}>

                  <img
                  
                      // src={selectedImage ||  userupdate}
                      src={selectedImage? URL.createObjectURL(selectedImage) : profileData?.avatar===null ? userupdate : imageUrl}
                      alt="User"
                      className={styles.img}
                  />

                  <div className={styles.addFile} onClick={handleAddClick}>
                      <img src={plusicon} alt="Add File" className={styles.plus} style={{}} />
                      <input ref={fileInputRef} name="avatar" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                  </div>
              </div>
          </div>
          <form className={styles.updateform} onSubmit={formik.handleSubmit}>
              <div className={styles.updateinputs}>
                  <div className={styles.updateinputsvalue}>
                      <label className={styles.label}>Full name</label>
                      <Input name="name" control={formik.getFieldProps} required type="text" onChange={formik.handleChange} value={formik.values.name} styletype="signupInputBox" />
                  </div>
                  {formik.touched.name && formik.errors.name ? <p className={styles.error}>{formik.errors.name}</p> : null}

                  <div className={styles.updateinputsvalue}>
                      <label className={styles.label}>Phone number</label>
                      <Input name="phone" control={formik.getFieldProps} required type="text" onChange={formik.handleChange} value={formik.values.phone} styletype="signupInputBox" />
                      {/* <Input name="phone" control={formik.getFieldProps} required type="text" onChange={formik.handleChange} value={`+${formik.values.phone}`} styletype="signupInputBox" /> */}

                  </div>
                  {formik.touched.phone && formik.errors.phone ? <p className={styles.error}>{formik.errors.phone}</p> : null}

                  <div className={styles.updateinputsvalue}>
                      <label className={styles.label}>Email Address</label>
                      <Input name="email" control={formik.getFieldProps} required type="text" value={formik.values.email} readOnly={true} styletype="signupInputBox" />
                  </div>
                  {formik.touched.email && formik.errors.email ? <p className={styles.error}>{formik.errors.email}</p> : null}
              </div>
              <div className={styles.btndiv}>
                  {loading ? <Button btn="Updating..." disabled={true} styletype="signupButton" /> : <Button btn="Update" styletype="signupButton" />}
              </div>
          </form>
      </div>
        
        }
        
        </>
    );
};

export default UpdateProfile;
