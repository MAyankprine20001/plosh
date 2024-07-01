import React, { useEffect, useState } from 'react';
import styles from "./FavouriteCard.module.scss";
import { removeFavouriteResturarant } from "../../AxiosWork/AxiosApi";
import { toast } from "react-toastify";

const FavouriteCard = ({ favoriteItem, setFavoriteData}) => {
    const AuthenticityPercentage = (favoriteItem.authenticity / 10) * 100;
    const ratingPercentage = (favoriteItem.rating / 10) * 100;
    const token = localStorage.getItem("Login_user");
    const [isFavorite, setIsFavorite] = useState(true);
    const [favState, setFavState] = useState(localStorage.getItem(`fav_${favoriteItem._id}`) === "true");
    console.log(favState , "fav page gbbgb")

    useEffect(() => {
        setIsFavorite(true);
    }, []); 

    const removeHandlerFavourite = async () => {
        try {
            const response = await removeFavouriteResturarant(favoriteItem._id, token);
            if (response?.data?.success === true) {
                setFavState(false);
                setIsFavorite(false);
                toast("Restaurant removed from your favorites");
                localStorage.setItem(`fav_${favoriteItem._id}`, "false");

                setFavoriteData(null);
                setFavState(false);

                
            } else {
                console.log(response, "Error removing favorite restaurant");
            }
        } catch (error) {
            console.error("Error removing favorite restaurant:", error);
        }
    };

    return (
        
            <div className={styles.card}>
                <div className={styles.restaurantcard}>
                    <div className={styles.headingsectioncontainer}>
                        <h1 className={styles.restname}>{favoriteItem.name}</h1>
                        <div className={styles.imageFavourite}>
                            <img src="./bookmark 2.png" alt="bookmarkimage" className={styles.faveImage} onClick={removeHandlerFavourite} />
                        </div>
                    </div>
                    <div className={styles.imgdiv}>
                        <img src="./half-grilled-half-ready-raw-steaks-grill 2.png" className={styles.img1} alt='img1' />
                        <img src="./lavash-snack-roll-with-cheese-grenate-seeds-bread-vegetables-sorbet-white-plate-snack 1.png" className={styles.img1} alt='img2' />
                        <img src="./Group 66.png" className={styles.img1} alt='img1' />
                    </div>
                    <div className={styles.info}>
                        <div className={styles.auth}>
                            <div className={styles.head}>Authenticity</div>
                            <div className={styles.barnum}>
                                <div className={styles.bar}>
                                    <div className={styles.barspan} style={{ width: `${AuthenticityPercentage}%`, maxWidth: "100%" }}></div>
                                </div>
                                <div className={styles.num}>{favoriteItem.authenticity}</div>
                            </div>
                        </div>
                        <div className={styles.auth}>
                            <div className={styles.head}>Taste</div>
                            <div className={styles.barnum}>
                                <div className={styles.bar}>
                                    <div className={styles.barspan} style={{ width: `${ratingPercentage}%`, maxWidth: "100%" }}></div>
                                </div>
                                <div className={styles.num}>{favoriteItem.rating}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
}

export default FavouriteCard;
