import React from 'react';
import styles from "./ReviewCard.module.scss"

const ReviewCard = (reviewData) => {
    const data = reviewData.reviewData;
    const profileImage = `${"http://ploshadmin.ourappdemo.com/backend/images/"}${data.user.avatar}`;

    return (
        <div className={styles.reviewContainer}>
            <div className={styles.imageSection}>    
                <div className={styles.imagecontainer}>
                    <img src={data.user.avatar !== null ? profileImage : "./photo-1591258739299-5b65d5cbb235 1.png"} alt='img' className={styles.image}/>
                </div>
                <div className={styles.AboutUser}>
                    <span className={styles.name}>{data.user.name.charAt(0).toUpperCase() + data.user.name.slice(1) }</span>
                    <span className={styles.address}>{data.user.email}</span>
                </div>
            </div>
            <div className={styles.reviewdescription}>
                <span className={styles.userfeedback}>{data.message.charAt(0).toUpperCase() + data.message.slice(1)} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, quod inventore nemo nobis, similique necessitatibus vel corporis quis ipsam harum ab distinctio animi tempore doloremque? Nam odio laudantium adipisci vero.</span>
            </div>
            <div className={styles.silderdata}>
                <div className={styles.silderDataInformation}>
                    <div className={styles.Sliderauthenticity}>
                        <div className={styles.authenticityHeading}>Authenticity</div>
                        <div className={styles.silderbar}>
                            <div className={styles.smallbar}>
                                <div className={styles.barspan} style={{ width: `${(data.authenticity/10) * 100}%` }}></div>
                            </div>
                            <div className={styles.num}>{data.authenticity}</div>
                        </div>
                    </div>
                    <div className={styles.Sliderauthenticity}>
                        <div className={styles.authenticityHeading}>Taste</div>
                        <div className={styles.silderbar}>
                            <div className={styles.smallbar}>
                                <div className={styles.barspan} style={{ width: `${(data.taste/10) * 100}%` }}></div>
                            </div>
                            <div className={styles.num}>{data.taste}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewCard;
