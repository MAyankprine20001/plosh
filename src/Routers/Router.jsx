import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SIgnUp/SignUp";
import Forget from "../pages/Forget/Forget";
import Restaurant from "../pages/Restaurants/Restaurant";

import Category from "../pages/Category/Category"
import PrivateRoute from "./PrivateRoutes";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import SignUpTest from "../pages/SIgnUp/SignUpTest";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import RestuarantsDetailsPage from "../pages/RestuarantsDetailsPage/RestuarantsDetailsPage";
import Home from "../pages/Home/Home";
import Favourite from "../pages/Favourite/Favourite";
const Router = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      {/* <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/signup" element={<SignUpTest />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/restaurant" element={
      <PrivateRoute>
        <Restaurant listType={"list"} />
      </PrivateRoute>
      } />
      <Route path="/category" element={
       <PrivateRoute><Category/></PrivateRoute>
      }/>
       <Route path="/profile" element={
       <PrivateRoute><UpdateProfile/></PrivateRoute>
      }/>

<Route path="/changepassword" element={
       <PrivateRoute><ChangePassword/></PrivateRoute>
      }/>
      <Route path="/restuarantsDetailsPage" element={
       <PrivateRoute><RestuarantsDetailsPage/></PrivateRoute>
      }/>
       <Route path="/home" element={
       <PrivateRoute><Restaurant listType={"map"}  /></PrivateRoute>
      }/>
       <Route path="/favorite" element={
       <PrivateRoute><Favourite /></PrivateRoute>
      }/>
    </Routes>
  );
};

export default Router;
