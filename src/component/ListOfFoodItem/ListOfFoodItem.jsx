import {useState , useEffect} from "react"
import {RestaurantList} from "../../AxiosWork/AxiosApi";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import Style from "./ListOfFoodItem.module.scss"

const ListOfFoodItem = () => {
    const [loading, setLoading] = useState(true);
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const response = await RestaurantList();
                setRestaurantData(response.data);
            
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
              {restaurantData && restaurantData.map((restaurant, index) => (
                <RestaurantCard key={index} restaurant={restaurant} />
            ))}
        </div>
      )}
    </> 
  )
}

export default ListOfFoodItem
