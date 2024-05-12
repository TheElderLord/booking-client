import axios from "axios";
import { API_ADMIN_USERS_URL } from "./base";

export const postUser = async (body) => {
  try {
    await axios.post(API_ADMIN_USERS_URL, body);
  } catch (error) {
    console.log(error);
  }
};
export const fetchUsers = async () => {
  try {
    const result = await axios.get(API_ADMIN_USERS_URL);
    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const putUser = async (body) => {
  try {
    await axios.put(`${API_ADMIN_USERS_URL}/${id}`, body);
  } catch (error) {
    console.log(error);
  }
};
export const patchToBlackList = async (id,status) => {
  try {
    console.log(id,status)
    await axios.patch(`${API_ADMIN_USERS_URL}/${id}`,{
      status:status
    } );
   
    return true
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const removeUser = async (id) => {
  try {
    await axios.delete(`${API_ADMIN_USERS_URL}/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
