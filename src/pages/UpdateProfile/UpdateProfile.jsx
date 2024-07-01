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
import conf from '../../Conf/Conf';

const UpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [profileData, setprofileData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image
    const token = localStorage.getItem("Login_user");
    const fileInputRef = useRef(null); // Reference to the file input element

    console.log(fileInputRef , "fileInput ");

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

                console.log(response, "response of the udate profile");

                if (response?.success) {
                    toast.success(response?.message);
                    console.log("get the image " , fileInputRef.current.files[0])
                    // updateLocalStorageAvatar(fileInputRef.current.files[0] , values.name , values.phone , values.email); 
                    updateLocalStorageAvatar(selectedImage , values.name , values.phone , values.email);


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
                console.log(response ,"profile data kya ha get pe");
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
        // console.log("selected image ", selectedImage)
    };
   
    const imageUrl = conf.appWrite+`${profileData.avatar}`;
    console.log("image Selected", );

    useEffect(()=>{
        
    })

   

  
    // const updateLocalStorageAvatar = (newAvatar, newName, newPhone, newEmail) => {
    //     const userDataString = localStorage.getItem('User_Data');
    //     let userData = JSON.parse(userDataString);
    //     console.log("profile  get data" , profileData);

    //     if (newAvatar) {
    //         // const response = await getProfile(token)
    //         // console.log("profile  get data" , profileData);
    //         userData.avatar = newAvatar.name;
    //     }
    
      
    //     if (newName !== userData.name) {
    //         userData.name = newName;
    //     }
    
     
    //     if (newPhone !== userData.phone) {
    //         userData.phone = newPhone;
    //     }
    
    //     if (newEmail !== userData.email) {
    //         userData.email = newEmail;
    //     }
    
      
    //     localStorage.setItem('User_Data', JSON.stringify(userData));
    // };
    const updateLocalStorageAvatar = async () => {
        try {
             // for new data from i have to call the get profile
            const response = await getProfile(token);
            
            
            if (response?.success) {
                
                const profileData = response.data;
                
                // get  the data from the local storage
                const userDataString = localStorage.getItem('User_Data');
                let userData = JSON.parse(userDataString);
                
                // Update the user data with the new profile data
                userData.avatar = profileData.avatar; 
                userData.name = profileData.name; 
                userData.phone = profileData.phone; 
                userData.email = profileData.email;
                
                
                localStorage.setItem('User_Data', JSON.stringify(userData));
                
                console.log('Local storage updated');
            } else {
                toast.error("failed to fetch the Profile Data");
                console.error('Failed to fetch profile data');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };
    
    






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
                      src={selectedImage? URL.createObjectURL(selectedImage) : profileData?.avatar===null ?  userupdate : imageUrl}
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
                      <Input name="name" control={formik.getFieldProps} required type="name" onChange={formik.handleChange} value={formik.values.name} styletype="signupInputBox" />
                  </div>
                  {formik.touched.name && formik.errors.name ? <p className={styles.error}>{formik.errors.name}</p> : null}

                  <div className={styles.updateinputsvalue}>
                      <label className={styles.label}>Phone number</label>
                      <Input name="phone" control={formik.getFieldProps} required type="tel" onChange={formik.handleChange} value={formik.values.phone} styletype="signupInputBox" />
                      {/* <Input name="phone" control={formik.getFieldProps} required type="text" onChange={formik.handleChange} value={`+${formik.values.phone}`} styletype="signupInputBox" /> */}

                  </div>
                  {formik.touched.phone && formik.errors.phone ? <p className={styles.error}>{formik.errors.phone}</p> : null}

                  <div className={styles.updateinputsvalue}>
                      <label className={styles.label}>Email Address</label>
                      <Input name="email" control={formik.getFieldProps} required type="email" value={formik.values.email} readOnly={true} styletype="signupInputBox" />
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
