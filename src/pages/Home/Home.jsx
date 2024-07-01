import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Style from "./Home.module.scss";
import Button from "../../component/Button/Button";
import Input from "../../component/Input/Input";
import SimpleMap from "../../component/SimpleMap/SimpleMap";
import ListOfFoodItem from "../../component/ListOfFoodItem/ListOfFoodItem";
import Filter from "../../component/Filter/Filter";

const Home = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(
    location.pathname === "/home" ? "Map" : "List"
  );
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  useEffect(() => {
    // Update activeButton when location changes
    setActiveButton(location.pathname === "/home" ? "Map" : "List");
  }, [location]);

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
          <Input placeholder="Nearby Restaurants" styletype="searchContainer" />
          <Button btn="Search" styletype="btn_inputbox" />
        </div>

        <div className={Style.filterList}>
          <img src="./setting 2.png" alt="" onClick={toggleMenu} />
          <Filter isOpen={isMenuOpen} onClose={toggleMenu} />
        </div>
      </div>

      <div className={Style.MapResponsive} style={{ width: "100%" }}>
        {activeButton === "Map" ? <SimpleMap /> : <ListOfFoodItem />}
      </div>
    </div>
  );
};

export default Home;
