import React, { useState, useEffect } from "react";
import styles from "./RestuarantsDetailsPage.module.scss";
import { useLocation } from "react-router-dom";
import MenuComponent from "../../component/MenuComponent/MenuComponent";
import appetizer from "../../../public/appetizer.png";
import drinks from "../../../public/drinks.png";
import Button from "../../component/Button/Button";
import Modal from "../../component/Modal/Modol";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import { addFavouriteResturarant, reviewListComment, removeFavouriteResturarant } from "../../AxiosWork/AxiosApi";

import { toast } from "react-toastify";

const RestuarantsDetailsPage = () => {
  const location = useLocation();
  const restaurant = location.state ? location.state.restaurant : null;
  const [loading, setLoading] = useState(false);
  const [saveFavImg, setSaveFavImg] = useState(false);



  const [isOpenModal, setIsOpenModal] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(2);

  const token = localStorage.getItem("Login_user");

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset';    
    }
  }, [isOpenModal]);

  useEffect(() => {
    const favState = localStorage.getItem(`fav_${restaurant._id}`);
    console.log(favState , "favstate")
    if (favState === "true") {
      setSaveFavImg(true);
    } else {
      setSaveFavImg(false);
    }
  }, [restaurant]);

  console.log("favState" , saveFavImg);
  
  const handleViewMoreComments = () => {
    setVisibleReviews(visibleReviews + 2);
  };

  useEffect(() => {
    const restaurantId = restaurant._id;
    getReviewList(restaurantId);
  }, []);

  const getReviewList = async (restaurantId) => {
    try {
      setLoading(true);
      const response = await reviewListComment(restaurantId);
      console.log(response, "review ddddd");
      setReviewList(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleModal = () => {
    setIsOpenModal(true);
  };

 

  
  const SaveRestuarantHandler = async () => {
    const response = await addFavouriteResturarant(restaurant._id, token);
    if (response?.data?.success === true) {
      setSaveFavImg(true);
      localStorage.setItem(`fav_${restaurant._id}`, true);
      /*
       const favResturant = localStorage.getItem
      */
      toast("Restaurant added to your favorites.");
    } else {
      console.log(response, "Error adding favorite");
    }
  };

  const removeHandlerFavourite = async () => {
    const response = await removeFavouriteResturarant(restaurant._id, token);
    if (response?.data?.success === true) {
      setSaveFavImg(false);
      localStorage.setItem(`fav_${restaurant._id}`, false);
      toast("Restaurant removed from your favorites.");
    } else {
      console.log(response, "Error removing favorite");
    }
  };
  
  console.log("savefavimg" , saveFavImg);
  return (
    <>
      {restaurant && (
        <div className={styles.restuarantContainer}>
          <div className={styles.topContainer}>
            <div className={styles.imageContainer}>
              <img
                src="/c4bp49g_restaurant-generic_625x300_21_November_23.webp"
                alt="img"
                className={styles.img}
              />
              <div className={styles.overlay}></div>
            </div>
            <div className={styles.textContent}>
              <div className={styles.textContainer}>
                <div className={styles.headingcontainer}>
                  <span className={styles.restuarantName}>
                    {restaurant?.name}
                  </span>
                  <div className={styles.restuarantaddress}>
                    <img
                      src="./locationimg.png "
                      alt=""
                      className={styles.ImageLocation}
                    />
                    <div className={styles.restuarantlocation}>
                      {restaurant?.address}
                    </div>
                  </div>
                </div>
                <div className={styles.ReviewRatingcontainer}>
                  <div className={styles.ReviewContainer}>
                    <div className={styles.reviewSection}>
                      <img
                        src="./star.png"
                        alt="star"
                        className={styles.star}
                      />
                      <span className={styles.rating}>{restaurant.rating}</span>
                    </div>
                    <div className={styles.reviewnumber}>
                      {restaurant.numberOfReviews} Reviews
                    </div>
                  </div>
                  <div className={styles.secondbox}>
                  {saveFavImg ?   <img src="./fav.png" alt="fav" className={styles.fav}  onClick={removeHandlerFavourite} style={{cursor:"pointer"}}/>:
                   <svg
                  fill="#ffffff"
                  viewBox="0 0 52 52"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                  width="27px"
                  height="40px"
                  onClick={() => {
                    SaveRestuarantHandler()
                  }}
                  style={{cursor:"pointer"}}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M43.62,52a2,2,0,0,1-1.09-.33L26,40.83,9.47,51.67a2,2,0,0,1-2,.09,2,2,0,0,1-1-1.76V2a2,2,0,0,1,2-2H43.62a2,2,0,0,1,2,2V50a2,2,0,0,1-1,1.76A2,2,0,0,1,43.62,52ZM26,36.44a2.1,2.1,0,0,1,1.1.32L41.62,46.3V4H10.38V46.3L24.9,36.76A2.1,2.1,0,0,1,26,36.44Z"></path>
                  </g>
                </svg>
                   }   
                    <div className={styles.Favourite}>Favourite</div>
                  </div>
                  <div className={styles.thirdbox}>
                    <div className={styles.imgbox}>
                      <img
                        src="./photo.png"
                        alt="photos"
                        className={styles.img}
                      />
                      <span className={styles.number}>
                        {restaurant.restaurantImages.length}
                      </span>
                    </div>
                    <div className={styles.photo}>Photos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT Section */}
          <div className={styles.aboutboxsectioncontainer}>
            {/* About */}
            <div className={styles.aboutContainer}>
              <span className={styles.Aboutheading}>About</span>
              <span className={styles.aboutpara}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </span>
            </div>

            {/* Cuisine  data */}
            <div className={styles.cuisinesection}>
              <span className={styles.cuisHeading}>Cuisine</span>
              <div className={styles.cuisContainer}>
                <span className={styles.CuisineItem}>
                  {restaurant?.cuisine?.[0]?.name.split(" ")[0]}
                </span>
                <span className={styles.CuisineItem}>French</span>
                <span className={styles.CuisineItem}>Italian</span>
                <span className={styles.CuisineItem}>American</span>
                <span className={styles.CuisineItem}>Korean</span>
                <span className={styles.CuisineItem}>Japenese</span>
                <span className={styles.CuisineItem}>Thai</span>
                <span className={styles.CuisineItem}>Japanese</span>
                <span className={styles.CuisineItem}>Mexican</span>
                <span className={styles.CuisineItem}>Lebanese</span>
                <span className={styles.CuisineItem}>Caribbean</span>
                <span className={styles.CuisineItem}>Indian</span>
              </div>
            </div>

            {/* Menu component */}
            <div className={styles.menusectioncontainer}>
              <span className={styles.menuheading}>Full Menu</span>
              <div className={styles.menucomponentsection}>
                <MenuComponent
                  menuimage={appetizer}
                  heading={"Appetizer"}
                  text={"Appetizer"}
                />
                <MenuComponent
                  menuimage={appetizer}
                  heading={"Main Dishes"}
                  text={"Dishes"}
                />
                <MenuComponent
                  menuimage={drinks}
                  heading={"Drinks"}
                  text={"Drinks"}
                />
              </div>
            </div>

            {/* Contact details */}
            <div className={styles.contact}>
              <div className={styles.phonediv}>
                <div className={styles.leftdiv}>
                  <img
                    src="./phonecall.png"
                    alt="phone"
                    className={styles.phone}
                  />
                  <div className={styles.phoneno}>Phone No.</div>
                </div>
                <div className={styles.rightdiv}>{restaurant.phone}</div>
              </div>

              <div className={styles.phonediv}>
                <div className={styles.leftdiv}>
                  <img src="mail.png" alt="phone" className={styles.phone} />
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
                  <Button
                    onClick={handleModal}
                    styletype="restuarantCardButton"
                    btn="Write a Review"
                  />
                </div>
              </div>

              <div className={styles.bottombox}>
                <div>
                  {isOpenModal && (
                    <Modal
                      setIsOpenModal={setIsOpenModal}
                      resData={restaurant}
                    />
                  )}
                </div>

                {loading ? (
                  "loading"
                ) : reviewList.length === 0 ? (
                  <div className={styles.nocomments}>No Comments Found</div>
                ) : (
                  reviewList
                    .slice(0, visibleReviews)
                    .map((reviewdata, index) => (
                      <ReviewCard key={index} reviewData={reviewdata} />
                    ))
                )}
              </div>
            </div>

            {reviewList.length > visibleReviews && (
              <div className={styles.morecomments}>
                <span
                  className={styles.viewmore}
                  onClick={handleViewMoreComments}
                >
                  View more comments
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RestuarantsDetailsPage;
