import React, { useEffect, useState } from 'react';
import styles from "./RestaurantDetail.module.scss";
import { useLocation } from 'react-router-dom';
import restbigimg from "../../components/Images/restbigimg.jpg"
import locationimg from "../../components/Images/locationimg.png"
import star from "../../components/Images/star.png"
import fav from "../../components/Images/fav.png"
import photo from "../../components/Images/photo.png"
import appetizer from "../../components/Images/appetizer.png"
import drinks from "../../components/Images/drinks.png"
import review from "../../components/Images/review.png"
import phonecall from "../../components/Images/phonecall.png"
import mail from "../../components/Images/mail.png"
import BackButton from '../../components/common/BackButton/BackButton';
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import Button from "../../components/Button/Button"
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { API } from '../../API/APIS';
import ClipLoader from "../../components/common/Spinner"
import Modal from '../../components/Modal/Modal';



const RestaurantDetail = () => {
  const [loader,setLoader] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(2); // Initially show 2 reviews
  const handleViewMoreComments = () => {
    setVisibleReviews(visibleReviews + 2); 
  };



  const location = useLocation();
  const { restaurant } = location.state || {};

  const [reviewList,setReviewList] = useState([])

  useEffect(()=>{
    const restaurantId = restaurant._id;

    getReviewList(restaurantId)
  },[])
  const getReviewList = async (restaurantId) => {

    try {
      setLoader(true)
      const response = await API.ReviewList(restaurantId);
      console.log(response,"review")
      setReviewList(response.data);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoader(false)

    }
  };

  const modal = ()=>{
    setIsOpen(true)
  }
 
  return (
    <>
      {restaurant && 
        <div className={styles.detail}>
          {/* PHOTO TOPBOX */}
          <div className={styles.photobox}>
            {/* <BackButton/> */}
            <div className={styles.imgdiv}>
              <img src={restbigimg} alt='img' className={styles.image}/>
              <div className={styles.overlay}></div> 
            </div>
            <div className={styles.textdiv}>
              <div className={styles.innertextdiv}>
                <div className={styles.upperbox}>
                  <span className={styles.heading}>{restaurant.name}</span>
                  <div className={styles.address}>
                    <img src={locationimg} alt='location' className={styles.locationimg}/>
                    <div className={styles.location}>{restaurant.address}</div>
                  </div>
                </div>
                <div className={styles.lowerbox}>
                  <div className={styles.box1}>
                    <div className={styles.reviewbox}>
                      <img src={star} alt='star' className={styles.star}/>
                      <span className={styles.rating}>{restaurant.rating}</span>
                    </div>
                    <div className={styles.reviewnumber}>{restaurant.numberOfReviews} Reviews</div>
                  </div>
                  <div className={styles.box2}>
                    <img src={fav} alt='fav' className={styles.fav}/>
                    <div className={styles.Favourite}>Favourite</div>
                  </div>
                  <div className={styles.box3}>
                    <div className={styles.imgbox}>
                      <img src={photo} alt='photos' className={styles.img}/>
                      <span className={styles.number}>{restaurant.restaurantImages.length}</span>
                    </div>
                    <div className={styles.photo}>Photos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT BOX */}
          <div className={styles.aboutbox}>
            {/* About */}
            <div className={styles.about}>
              <span className={styles.heading}>About</span>
              <span className={styles.para}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>

            {/* Cuisine */}
            <div className={styles.cuisine}>
              <span className={styles.heading}>Cuisine</span>
              <div className={styles.cuisinebox}>
                <span className={styles.eachcuisine}>{restaurant?.cuisine?.[0]?.name.split(" ")[0]
}</span>
                <span className={styles.eachcuisine}>Indian</span>
                <span className={styles.eachcuisine}>French</span>
                <span className={styles.eachcuisine}>Italian</span>
                <span className={styles.eachcuisine}>American</span>
                <span className={styles.eachcuisine}>Korean</span>
                <span className={styles.eachcuisine}>Japenese</span>
                <span className={styles.eachcuisine}>Thai</span>
                <span className={styles.eachcuisine}>Japanese</span>
                <span className={styles.eachcuisine}>Mexican</span>
                <span className={styles.eachcuisine}>Lebanese</span>
                <span className={styles.eachcuisine}>Caribbean</span>
              </div>
            </div>

            {/* Menu */}
            <div className={styles.menu}>
              <span className={styles.heading}>Full Menu</span>
              <div className={styles.menucomponentdiv}>
                <MenuComponent menuimage={appetizer} heading={"Appetizer"} text={"Appetizer"}/>
                <MenuComponent menuimage={appetizer} heading={"Main Dishes"} text={"Dishes"}/>
                <MenuComponent menuimage={drinks} heading={"Drinks"} text={"Drinks"}/>
              </div>
            </div>

            {/* Contact */}
            <div className={styles.contact}>
              <div className={styles.phonediv}>
                <div className={styles.leftdiv}>
                  <img src={phonecall} alt='phone' className={styles.phone}/>
                  <div className={styles.phoneno}>Phone No.</div>
                </div>
                <div className={styles.rightdiv}>{restaurant.phone}</div>
              </div>


              <div className={styles.phonediv}>
                <div className={styles.leftdiv}>
                  <img src={mail} alt='phone' className={styles.phone}/>
                  <div className={styles.phoneno}>Mail</div>
                </div>
                <div className={styles.rightdiv}>{restaurant.email}</div>
              </div>
            </div>

            {/* Review */}
            <div className={styles.reviewbigbox}>
              <div className={styles.topreviewbox}>
                <span className={styles.heading}>Reviews</span>
                <div>
                 <Button handleClick={modal} styleType={"button5"} img={review} btntext={"Write a Review"}/>
                </div>
              </div>

              <div className={styles.bottombox}>
              <div>
              {isOpen && <Modal setIsOpen={setIsOpen} resData={restaurant} />}
            </div>
              {/* {
                loader ? <ClipLoader/> : 
                reviewList.length===0? <div className={styles.nocomments}>No Comments Found </div>: 
                reviewList.map((reviewdata, index) => (
                <ReviewCard
                  reviewData={reviewdata}
                />))} */}
                {loader ? <ClipLoader /> :
                reviewList.length === 0 ? 
                <div className={styles.nocomments}>No Comments Found</div> :
                  reviewList.slice(0, visibleReviews).map((reviewdata, index) => (
                    <ReviewCard
                      key={index}
                      reviewData={reviewdata}
                    />
                  ))
              }
              </div>
            </div>

            {/* View More */}
            {/* <div className={styles.morecomments}>
              <span className={styles.viewmore}>{reviewList.length!==0 && "View more comments"}</span>
            </div> */}
             {reviewList.length > visibleReviews && 
            <div className={styles.morecomments}>
              <span className={styles.viewmore} onClick={handleViewMoreComments}>View more comments</span>
            </div>}
        </div>
      </div>
      }
    </>
  )
}

export default RestaurantDetail;
