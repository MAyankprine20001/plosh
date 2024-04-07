
import instance from "./Instance";

export const loginApi = async(data)=>{
    try{
        const responce = await instance.post('user/login',data)
        console.log("login api callling ke time",responce);
        return responce.data;
    }catch(err){
      console.log( "error is " , err);
      return err.response.data;
    }
}


export const createUserApi = async (data) => {
  try {
    const response = await instance.post('/user/create', data);
    console.log("response" ,response);
    // return { success: true, data: response.data };
    return response?.data
  } catch (error) { 
    if (error.response && error.response.status === 409) {
      // return { success: false, message: "Email already exists" };
      console.log("error responce", error);
      // return error.responce;
      return error?.response?.data;
    } else {
      console.error(error);
      return { success: false, message: "An error occurred. Please try again later." };
    }
  }
};

export const forgetApi = async(data)=>{
    try{
        const responce = await instance.post('user/forgot_password',data)
        console.log("forget api callling ke time",responce);
      return responce.data;
    }catch(err){
      console.log( "error is " , err);
      return err.response.data;
    }
}

export const RestaurantList = async(data)=>{
  try{
      const responce = await instance.post('restaurant/LIST',data)
      console.log("calling the resturant List",responce);
      return responce.data
  }catch(err){
    console.log( "error is " , err);
    err.responce.data;
  }
}


export const cuisines = async(data)=>{
  try{
      const responce = await instance.get('cuisine/list',data)
      console.log("calling the cuisine List",responce);
      return responce.data
  }catch(err){
    console.log( "error is " , err);
    err.responce.data;
  }
}


export const categoryList = async(data)=>{
  try{
      const responce = await instance.get('category/list',data)
      console.log("calling the cuisine List",responce);
      return responce.data
  }catch(err){
    console.log( "error is " , err);
    err.responce.data;
  }
}



export const updateProfile = async (formData, token) => {

  try {
    const response = await instance.post(
      'user/update_profile',
      formData,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("calling the cuisine List", response);
    return response.data;
  } catch (error) {
    console.log("error is ", error);
    return error.response?.data; 
  }
}




//Get Profile Details
// Import AxiosInstance from wherever it's located

export async function getProfile(token) {
  try {
    const response = await instance.get("/user/detail", {
      headers: {
        "x-access-token": token,
      },
    });
     console.log(response)
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}



export const changePassword = async (Data, token) => {
   console.log(ImageData)
  try {
    const response = await instance.post(
      'user/change_password',
      Data,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("calling the api change password", response);
    return response.data;
  } catch (error) {
    console.log("error is ", error);
    return error.response?.data; 
  }
}

export const reviewListComment = async (restaurantId) => {
  try {
    const response = await instance.post(
      '/review/list',
      { restaurantId } // Send the restaurantId in the request body
    );
    console.log("Got details of of every customer reviews:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    return error.response?.data; 
  }
}

