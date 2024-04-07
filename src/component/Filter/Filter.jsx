import React, { useState, useEffect } from 'react';
import styles from "./FIlter.module.scss";
import { cuisines } from "../../AxiosWork/AxiosApi";
import Button from '../Button/Button';
import Slider from '../Slider/Slider';

const Filter = ({ isOpen, onClose, restaurant }) => {
    const [cuisinesData, setCuisinesData] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Data = await cuisines();
                setCuisinesData(Data.data);
            } catch (error) {
                console.error('Error fetching cuisine data:', error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`${styles.rightSideMenu} ${isOpen ? styles.open : ''}`}>
            <div className={styles.menuContent}>
                {/* heading */}
                <div className={styles.HeadingSidemenu}>
                    <p>Filter</p>
                    {/* close icons */}
                    <div className={styles.closeIcon} onClick={onClose}>
                        <img src="./cancel 1 (1).png" alt="Close"  className={styles.closeButtonicons} />
                    </div>
                </div>

                {/* sort of rating */}
                <div className={styles.filterbox2}>
                    <p className={styles.sort}>Sort by rating</p>
                    <div className={styles.info}>
                        <div className={styles.auth}>
                            <p className={styles.head}>Authenticity </p>
                            <Slider/>
                        </div>
                        <div className={styles.auth}>
                            <p className={styles.head}>Taste</p>
                            <Slider/>
                        </div>

                    </div>
                </div>
                {console.log(cuisinesData, "cuisions data wdjhaJKFHJFHJFH")}
                {/* sort of cuisines */}
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={styles.sortOfCuisions}>
                        <p>Sort by Cusisines</p>
                        {cuisinesData && cuisinesData.map(cuisine => (
                            <div key={cuisine._id} className={styles.checkboxContainer}>
                                <input type="checkbox" id={cuisine._id} value={cuisine.name} />
                                <label htmlFor={cuisine._id}>{cuisine.name.split(' ')[0]}</label>
                            </div>
                        ))}


                    </div>
                )}
            </div>

            <div className={styles.filterbox4}>
                <Button styletype="button2" btn={"Clear all"} />
                <Button styletype="button3" btn={"Apply"} />
            </div>
        </div>
    );
}

export default Filter;
