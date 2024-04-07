import styles from "./SideMenu.module.scss";
import { useNavigate , Link, NavLink } from 'react-router-dom';
import { toast } from "react-toastify";

const SideMenu = ({ isMenuVisible, setIsMenuVisible, token }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("Login_user");
      navigate("/");
      setIsMenuVisible(false);
      toast.success("You Have logged out successfully");
    };
  
    // const profile = () => {
    //   navigate("/profile");
    // };
  
    return (
      <>
        {token !== null && (
          <div className={`${styles.menu} ${isMenuVisible && styles.open}`}>
            <div className={styles.topbox} onClick={() => setIsMenuVisible(!isMenuVisible)}>
              <div className={styles.logobox}>
                <img src="./Plosh 4.png" alt='logo' className={styles.logo} />
              </div>
              <div className={styles.close}>
                <img src="./close 2.png" className={styles.close} alt='close' />
              </div>
            </div>
            <div className={styles.bottombox}>
              <div className={styles.profile}>
                <img src="./53571-[Converted] 1.png" alt='profile' className={styles.profilepicture} />
                <div className={styles.text}>
                  <div className={styles.heading}>Lorem Ipsum</div>
                  <div className={styles.email}>loremipsum@mail.com</div>
                </div>
              </div>

              {/* favourites  section */}

              <div className={styles.favourite}>
                <div className={styles.leftbox}>
                  <div className={styles.imgdiv}>
                    <img src="./save-instagram 1.png" alt='fav' className={styles.fav} />
                  </div>
                  <div className={styles.heading}>Favourites</div>
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
  