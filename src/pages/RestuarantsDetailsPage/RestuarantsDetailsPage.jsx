import React , {useState ,useEffect} from 'react';
import styles from "./RestuarantsDetailsPage.module.scss"; 
import { useLocation } from 'react-router-dom';
import MenuComponent from '../../component/MenuComponent/MenuComponent';
import appetizer from "../../../public/appetizer.png"
import drinks from "../../../public/drinks.png";
import Button from '../../component/Button/Button';
import Modal from '../../component/Modal/Modol';
import ReviewCard from '../../component/ReviewCard/ReviewCard';
import {reviewListComment} from "../../AxiosWork/AxiosApi";

const RestuarantsDetailsPage = () => {
  const location = useLocation();
  const restaurant = location.state ? location.state.restaurant : null;
  const [loading,setLoading] = useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const [reviewList,setReviewList] = useState([])
  const [visibleReviews, setVisibleReviews] = useState(2);

  const handleViewMoreComments = () => {
    setVisibleReviews(visibleReviews + 2); 
  };

  useEffect(()=>{
    const restaurantId = restaurant._id;

    getReviewList(restaurantId)
  },[])

  const getReviewList = async (restaurantId) => {

    try {
      setLoading(true)
      const response = await reviewListComment(restaurantId);
      console.log(response,"review ddddd")
      setReviewList(response.data);
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false)

    }
  };

  const modal = ()=>{
    setIsOpen(true)
  }

  return (
    <>
    {restaurant && (
      <div className={styles.DetailContainer}>
        {/* top heading and img heading rating */}
        <div className={styles.topsection}>
          <div className={styles.topsectionImg}>
            <img src="./r1.avif`" alt='img' className={styles.img}/>
            <div className={styles.overlay}></div> 
          </div>
          <div className={styles.topcontainabout}>
            <div className={styles.innertextdiv}>
              <div className={styles.upperboxcontainer}>
                <span className={styles.upperboxheading}>{restaurant.name}</span>
                <div className={styles.restuarantaddress}>
                  <img src="./locationimg.png " alt='location' className={styles.locationimg}/>
                  <div className={styles.restuarantlocation}>{restaurant.address}</div>
                </div>
              </div>
              <div className={styles.lowerboxcontainer}>
                <div className={styles.firstbox}>
                  <div className={styles.firstreviewbox}>
                    <img src="./star.png" alt='star' className={styles.star}/>
                    <span className={styles.rating}>{restaurant.rating}</span>
                  </div>
                  <div className={styles.reviewnumber}>{restaurant.numberOfReviews} Reviews</div>
                </div>
                <div className={styles.secondbox}>
                  <img src="./fav.png" alt='fav' className={styles.fav}/>
                  <div className={styles.Favourite}>Favourite</div>
                </div>
                <div className={styles.thirdbox}>
                  <div className={styles.imgbox}>
                    <img src="./photo.png" alt='photos' className={styles.img}/>
                    <span className={styles.number}>{restaurant.restaurantImages.length}</span>
                  </div>
                  <div className={styles.photo}>Photos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT BOX */}
        <div className={styles.aboutboxsectioncontainer}>
            {/* About */}
            <div className={styles.aboutContainer}>
              <span className={styles.Aboutheading}>About</span>
              <span className={styles.aboutpara}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>

            {/* Cuisine  data */}
            <div className={styles.cuisinesectioncontainer}>
              <span className={styles.cuisineheading}>Cuisine</span>
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

             {/* Menu component */}
             <div className={styles.menusectioncontainer}>
              <span className={styles.menuheading}>Full Menu</span>
              <div className={styles.menucomponentsection}>
                <MenuComponent menuimage={appetizer} heading={"Appetizer"} text={"Appetizer"}/>
                <MenuComponent menuimage={appetizer} heading={"Main Dishes"} text={"Dishes"}/>
                <MenuComponent menuimage={drinks} heading={"Drinks"} text={"Drinks"}/>
              </div>
            </div>

            

            {/* Contact details */}
            <div className={styles.contact}>
              <div className={styles.phonediv}>
                <div className={styles.leftdiv}>
                  <img src="./phonecall.png" alt='phone' className={styles.phone}/>
                  <div className={styles.phoneno}>Phone No.</div>
                </div>
                <div className={styles.rightdiv}>{restaurant.phone}</div>
              </div>


              <div className={styles.phonediv}>
                <div className={styles.leftdiv}>
                  <img src="mail.png" alt='phone' className={styles.phone}/>
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
                 <Button handleClick={""} styletype="signupButton" img={""} btn="Write a Review"/>
                </div>
              </div>

              <div className={styles.bottombox}>
              <div>
              {isOpen && <Modal setIsOpen={setIsOpen} resData={restaurant} />}
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
    )}
    
    </>
  );
};

export default RestuarantsDetailsPage;
