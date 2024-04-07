import React from 'react';
import styles from "./RestaurantCard.module.scss";
import { useNavigate } from 'react-router-dom';



const RestaurantCard = ({ restaurant }) => {
    const AuthenticityPercentage = (restaurant.authenticity / 10) * 100;
    const ratingPercentage = (restaurant.rating / 10) * 100;
    const navigate = useNavigate();

    const navigatefunc = () => {
        console.log("go the restuarant details page ");
        navigate("/restuarantsDetailsPage", { state: { restaurant: restaurant } });
    };

    return (
        <div className={styles.card}  onClick={navigatefunc} >
            <div className={styles.restaurantcard}>
                <h1 className={styles.restname}>{restaurant.name}</h1>
                <div className={styles.imgdiv}>
                    <img src="./half-grilled-half-ready-raw-steaks-grill 2.png" className={styles.img1} alt='img1'/>
                    <img src="./lavash-snack-roll-with-cheese-grenate-seeds-bread-vegetables-sorbet-white-plate-snack 1.png" className={styles.img1} alt='img2'/>
                    <img src="./Group 66.png" className={styles.img1} alt='img1'/>
                </div>
                <div className={styles.info}>
                    <div className={styles.auth}>
                        <div className={styles.head}>Authenticity</div>
                        <div className={styles.barnum}>
                            <div className={styles.bar}>
                                <div className={styles.barspan} style={{ width: `${AuthenticityPercentage}%` ,maxWidth:"100%" }}></div>
                            </div>
                            <div className={styles.num}>{restaurant.authenticity}</div>
                        </div>
                    </div>
                    <div className={styles.auth}>
                        <div className={styles.head}>Taste</div>
                        <div className={styles.barnum}>
                            <div className={styles.bar}>
                                <div className={styles.barspan} style={{ width: `${ratingPercentage}%`  , maxWidth:"100%"}}></div>
                            </div>
                            <div className={styles.num}>{restaurant.rating}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;



























// // RestaurantCard.js
// import React from 'react';
// import Style from './RestaurantCard.module.scss';

// const RestaurantCard = ({ restaurant }) => {
//     // Calculate width for authenticity and taste bars
//     const authenticityWidth = `${(restaurant.authenticity / 10) * 282}px`; // Assuming authenticity ranges from 0 to 5
//     const tasteWidth = `${(restaurant.taste / 10) * 282}px`; // Assuming taste ranges from 0 to 5

//     return (
//         <div className={Style.card}>
//             <h3>{restaurant.name}</h3>
//             <div className={Style.imageContainer}>
//                <img src="./half-grilled-half-ready-raw-steaks-grill 2.png" />
//                <img src="./lavash-snack-roll-with-cheese-grenate-seeds-bread-vegetables-sorbet-white-plate-snack 1.png"/>
//                <img src="./Group 66.png" alt="" />
//             </div>
//             <div className={Style.AuthenticityContainer}>
//                 <p>Authenticity: {restaurant.authenticity}</p>
//                 <div className={Style.emptyRectangle}>
//                     <div className={Style.filledRectangle} style={{ width: authenticityWidth }}></div>
//                 </div>
//             </div>
            
//             <div className={Style.TasteConatiner}>
//                 <p>Taste: {restaurant.taste}</p>
//                 <div className={Style.emptyRectangle1}>
//                     <div className={Style.filledRectangle1} style={{ width: tasteWidth }}></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RestaurantCard;
