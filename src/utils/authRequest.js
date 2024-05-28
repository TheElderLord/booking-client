import axios from "axios";
import { API_ADMIN_LOGIN_URL } from "./base";

export const authUser = async (body) => {
  try {
    await axios.post(API_ADMIN_USERS_URL, body);
    return true;
  } catch (error) {
    console.log(error);
  }
};

