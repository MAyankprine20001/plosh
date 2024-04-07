import { NavLink } from 'react-router-dom';
import styles from "./HeaderTest.module.scss";
import Button from "../Button/Button";
import { CgMenuRight } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import categories from "../../../public/categories 3.png";
import home from "../../../public/home 2.png"
import restaurant from "../../../public/restaurant 1.png";
import user from "../../../public/user (1) 1.png";
import plosh from "../../../public/Plosh 1.png";
import Category1 from "../../../public/categories 1.png";
import account1 from "../../../public/account 1.png";
import resturant2 from "../../../public/restaurant 2.png";

const HeaderTest = ({isMenuVisible, setIsMenuVisible}) => { 
    const menuList = [
        { icon: home, altIcon: home, text: 'Home', link: '/restaurant' },
        { icon: categories, altIcon: Category1, text: 'Categories', link: '/category' },
        { icon: resturant2, altIcon: restaurant,text: 'Restaurant', link: '/restaurant' },
        { icon: user, altIcon: account1, text: 'Profile', link: '/profile' }
    ];   

    let location = useLocation();
    const navigate = useNavigate();

    const changeHandle = () => {
        location.pathname === "/" ? navigate("/signup") : navigate("/");
        console.log("click hander calling ", location.pathname);
    }

    const openMenuItem = (e) => {
        setIsMenuVisible(!isMenuVisible);
        e.preventDefault(); 
    }

    const token = localStorage.getItem("Login_user");

    return (
        <>
        {token === null ? (
            <div className={styles.header}>
                <div className={styles.logodiv}>
                    <img src={plosh} alt='plosh' className={styles.logo}/>
                </div>
                <div className={styles.logodiv}>
                    <Button btn={location.pathname === "/" ? "Register" : "Login"} onClick={changeHandle} styletype="headerbtn"/>
                </div>
            </div> 
        ) : (
            <div className={styles.header1}>
                <div className={styles.logodiv1}>
                    <img src={plosh} alt='plosh' className={styles.logo1}/>
                </div>
                <div className={styles.right}>
                    {menuList.map((item, index) => (
                        <NavLink key={index} to={item.link} className={styles.navLink} activeClassName={styles.activeLink}>
                            <div className={styles.homediv}>
                                <img src={location.pathname === item.link ? item.altIcon : item.icon} alt={item.text} className={styles.homeimg} />
                                <span className={styles.homeheading}>{item.text}</span>
                            </div>
                        </NavLink>
                    ))}
                    <div className={styles.menudiv} onClick={openMenuItem}>
                        <CgMenuRight size={30} />
                        <span className={styles.homeheading}>Menu</span>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default HeaderTest;
