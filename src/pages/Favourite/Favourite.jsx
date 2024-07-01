import React, { useState , useEffect} from 'react';
import style from "./Favourite.module.scss";
import { getFavouriteList } from "../../AxiosWork/AxiosApi";
import FavouriteCard from '../../component/FavouriteCard/FavouriteCard';

const Favourite = () => {
    const [loading, setLoading] = useState(false);
    const [favoriteData, setFavoriteData] = useState(null);
    const token = localStorage.getItem("Login_user");

    useEffect(() => {
        const fetchFavouriteData = async () => {
            setLoading(true)
            try {
                
                const response = await getFavouriteList(token);
                console.log(response.favoriteRestaurants, "Favourite list data");
                setFavoriteData(response.favoriteRestaurants);
            } catch (error) {
                console.log("Error fetching restaurant data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavouriteData();
    }, []);   

    return (
        <>
            {loading ? (
                <div className={style.loader}></div>
            ) : (
                <div className={style.favContainer}>
                    <div className={style.headingSection}>
                        <p className={style.favheading}>Favourite</p>
                    </div>
                    <div className={style.favouriteList}>
                        {favoriteData && favoriteData.map((favouriteItem, index) => (
                            <FavouriteCard key={index} favoriteItem={favouriteItem} setFavoriteData={setFavoriteData} />
                        ))}
                        {(!favoriteData || favoriteData.length === 0) && (
                            <p className={style.noFavoritesMessage}>No favorite restaurants</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Favourite;
