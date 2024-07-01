import {useState , useEffect} from "react"
import {RestaurantList} from "../../AxiosWork/AxiosApi";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import Style from "./ListOfFoodItem.module.scss"

const ListOfFoodItem = ({restaurantData , setRestaurantData , copyRestuarantData , setCopyRestuarantData }) => {
    const [loading, setLoading] = useState(true);
    // const [restaurantData, setRestaurantData] = useState(null);
     
    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await RestaurantList();
                setRestaurantData(response.data);
                setCopyRestuarantData(response.data);
            
            } catch (error) {
                console.log("Error fetching restaurant data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurantData();
    }, []);   
    
  return (
    <>
      {loading ? (
        <div className={Style.loader}>
            
        </div>
      ):(
        <div className={Style.restaurantList}>
        {restaurantData && restaurantData.length > 0 ? (
          restaurantData.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))
        ) : (
          <>No Resturant found </>
        )}
      </div>
      )}
    </> 
  )
}

export default ListOfFoodItem
