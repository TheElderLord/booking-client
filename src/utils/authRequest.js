import axios from "axios";
import { API_ADMIN_LOGIN_URL } from "./base";

export const authUser = async (body) => {
  try {
    const result =  await axios.post(API_ADMIN_LOGIN_URL, body);
    console.log(result);
    if(result.data.message!=="Success"){
        return true
    }
    return true;
  } catch (error) {
    console.log(error);
    return false
  }
};

