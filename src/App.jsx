import Style from "./App.module.scss";
import Router from "./Routers/Router";
import Header from "./component/Header/Header";
import { useEffect , useState } from "react";
import SideMenu from "./component/SideMenu/SideMenu";
import HeaderTest from "./component/Header/HeaderTest";

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
 


  return (
    <div className={Style.appContainer}>
     
      <SideMenu isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible} />
      <HeaderTest isMenuVisible={isMenuVisible} setIsMenuVisible={setIsMenuVisible}         
 />
      <Router  />
    </div>
  );
}

export default App;
