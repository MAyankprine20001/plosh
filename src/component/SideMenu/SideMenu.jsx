import styles from "./SideMenu.module.scss";
import { useNavigate , Link, NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { useEffect } from "react";
import { parse } from "libphonenumber-js";
import conf from "../../Conf/Conf";

const SideMenu = ({ isMenuVisible, setIsMenuVisible, token }) => {
    const navigate = useNavigate();
    // const sideMenuRef = useRef(null);
    const handleLogout = () => {
      localStorage.removeItem("Login_user");
      localStorage.removeItem("User_Data");
      // localStorage.removeItem("fav_65a62cc192e573f87165a654")
      // localStorage.clear();
      navigate("/");
      setIsMenuVisible(false);
      toast.success("You Have logged out successfully");
      
    };
     
    // const profile = () => {
    //   navigate("/profile");
    // };
    // console.log("bahar click krna pe!" , isMenuVisible);
    useEffect(() => {
      if (isMenuVisible) {
          document.body.style.overflow = 'hidden'; 
      } else {
          document.body.style.overflow = 'unset'; 
      }
  }, [isMenuVisible]);

    
    const userDataString = localStorage.getItem("User_Data");
    let UserData;
    if(userDataString){
       UserData = JSON.parse(userDataString);
       console.log(UserData , "user data coming from localstorage")
    }

    {console.log("user image" , UserData?.avatar)}
    const avatarSrc = conf.appWrite+`${UserData?.avatar}`;

    console.log("avataor source image" , avatarSrc);

   
  
    return (
      <>
            {isMenuVisible && <div className={styles.overlay} ></div>}
        {token !== null && (
          
          <div className={`${styles.menu} ${isMenuVisible && styles.open}`}>
          
            <div className={styles.topbox} >
              <div className={styles.logobox}>
                <img src="./Plosh 4.png" alt='logo' className={styles.logo} />
              </div>
              <div className={styles.close} >
                <img src="./close 2.png" className={styles.close} alt='close' onClick={() => setIsMenuVisible(!isMenuVisible)} />
              </div>
            </div>
            <div className={styles.bottombox}>
              <div className={styles.profile}>
               
                <img src={UserData?.avatar !==null ? avatarSrc : "./53571-[Converted] 1.png"} alt='profile' className={styles.profilepicture} />
               
                {/* <img src={avatarSrc} alt='profile' className={styles.profilepicture} /> */}
                <div className={styles.text}>
                  <div className={styles.heading}>{UserData?.name}</div>
                  <div className={styles.email}>{UserData?.email}</div>
                </div>
              </div> 

              {/* favourites  section */}

              <div className={styles.favourite}>
                <div className={styles.leftbox}>
                  <div className={styles.imgdiv}>
                    <img src="./save-instagram 1.png" alt='fav' className={styles.fav} />
                  </div>
                  <NavLink to="favorite" className={styles.NavigationLink}>  <div className={styles.heading} onClick={() => setIsMenuVisible(!isMenuVisible)}>Favourites</div></NavLink>

                </div>
                <div className={styles.rightbox}>
                  <img src="./right-arrow 1.png" alt='arrow' className={styles.arrow} />
                </div>
              </div>

              {/* profile section */}
              
              <div className={styles.favourite} onClick={""}>
                <div className={styles.leftbox}>
                  <div className={styles.imgdiv}>
                    <img src="./user 1@2x.png" alt='fav' className={styles.fav} />
                  </div>
                  <NavLink to="profile" className={styles.NavigationLink}><div className={styles.heading} onClick={() => setIsMenuVisible(!isMenuVisible)}>Your Profile</div></NavLink>
                  
                </div>
                <div className={styles.rightbox}>
                  <img src="./right-arrow 1.png" alt='arrow' className={styles.arrow} />
                </div>
              </div>

              {/*  Password  change*/}

              <div className={styles.favourite}>
                <div className={styles.leftbox}>
                  <div className={styles.imgdiv}>
                    <img src="./password sidemenu.png" alt='fav' className={styles.fav} />
                  </div>
                  <NavLink to="changepassword" className={styles.NavigationLink}>  <div className={styles.heading}  onClick={() => setIsMenuVisible(!isMenuVisible)}>Change Password</div></NavLink>
                
                </div>
                <div className={styles.rightbox}>
                  <img src="./right-arrow 1.png" alt='arrow' className={styles.arrow} />
                </div>
              </div>

              {/* Logout button */}
              <div className={styles.favourite} onClick={ handleLogout}>
                <div className={styles.leftbox}>
                  <div className={styles.imgdiv}>
                    <img src="./logoutsidemenu.png" alt='fav' className={styles.fav} />
                  </div>
                  <div className={styles.heading}>Logout</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default SideMenu;
  