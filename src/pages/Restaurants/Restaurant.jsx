import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Style from "./Restaurant.module.scss";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import SimpleMap from "../../component/SimpleMap/SimpleMap";
import ListOfFoodItem from "../../component/ListOfFoodItem/ListOfFoodItem";
import Filter from "../../component/Filter/Filter";

const Restaurant = ({listType}) => {
  const [activeButton, setActiveButton] = useState(
    listType ==='list' ? "List" : "Map"
  );
  const [isMenuOpen, setMenuOpen] = useState(false);

  const [restaurantData, setRestaurantData] = useState(null);
  // const [filteredRestaurantData, setFilteredRestaurantData] = useState([]);
  const[copyRestuarantData , setCopyRestuarantData] = useState(null);

  const[searchData , setSearchData] = useState(null);


  useEffect(()=>{
    setActiveButton(listType ==='list' ? "List" : "Map")
  },[listType])

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   if (isMenuOpen) {
  //     document.body.style.overflow = 'hidden'; 
  //   } else {
  //     document.body.style.overflow = 'unset'; 
  //   }
  // }, [isMenuOpen]);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleChangeInput = (e)=>{
    console.log(e.target.value)
    
    setSearchData(e.target.value);
    if(e.target.value === ""){
      setRestaurantData(copyRestuarantData)
    }

  }
//   const handleChangeInput = (e) => {
//     // Get the input value from the event
//     let value = e.target.value;
    
//     // Trim leading spaces from the input value
//     value = value.trimStart(); // Alternatively, you can use value.replace(/^\s+/, '')

//     // Update the state with the trimmed value
//     setSearchData(value);
    
//     // If the trimmed input value is empty, reset the restaurant data to the initial copy
//     if (value === "") {
//         setRestaurantData(copyRestuarantData);
//     }
// };
  const searchItem = () => {
    const filterArray = copyRestuarantData?.filter((item, index) =>
      item?.name?.toLowerCase().includes(searchData.toLowerCase())
    );
    setRestaurantData(filterArray);
  };

  console.log("resturant data coming " ,restaurantData)


  return (
    <div className={Style.restaurant_Container}>
      <div className={Style.topConatiner}>
        <div className={Style.restaurant_heading}>
          <p>Trending Near You</p>
        </div>
        <div className={Style.Button_Switching}>
          <Button
            btn="Map"
            name="Map"
            active={activeButton === "Map"}
            onClick={() => handleClick("Map")}
            styletype={activeButton === "List" ? "button_map_active" : "button_map"}
          />
          <Button
            btn="List"
            name="List"
            active={activeButton === "List"}
            onClick={() => handleClick("List")}
            styletype="button_list"
          />
        </div>
      </div>

      <div className={Style.Restaurant_search_Input}>
        <div className={Style.InputConatiner}>
          <img src="./search 1.png" alt="" />
          <Input placeholder="Nearby Restaurants" styletype="searchContainer"   type="name"
          searchData={searchData}
          setSearchData={setSearchData}
          onChange={handleChangeInput}
 />
          <Button btn="Search" styletype="btn_inputbox"  onClick={searchItem} />
        </div>

        <div className={Style.filterList}>
          <img src="./setting 2.png" alt="" onClick={toggleMenu} />
          <Filter isOpen={isMenuOpen} onClose={toggleMenu} />
        </div>
      </div>

      <div className={Style.MapResponsive} style={{ width: "100%" }}>
        {activeButton === "Map" ? <SimpleMap /> : <ListOfFoodItem  restaurantData={restaurantData}  setRestaurantData = {setRestaurantData}  copyRestuarantData={copyRestuarantData} setCopyRestuarantData={setCopyRestuarantData}  />}
      </div>
    </div>
  );
};

export default Restaurant;

















