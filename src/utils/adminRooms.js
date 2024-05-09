import axios from "axios";
import {
  API_ADMIN_ROOMS_HISTORY_URL,
  API_ADMIN_ROOMS_URL,
  API_ADMIN_BOOK_ROOMS_URL,
} from "./base";

export const fetchBookHistory = async () => {
  try {
    const result = await axios.get(API_ADMIN_ROOMS_HISTORY_URL);
    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};
export const fetchRooms = async () => {
  try {
    const result = await axios.get(API_ADMIN_ROOMS_URL);
    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};



//Request
export const createRecord = async (bookbody) => {
  try {
    await axios.post(`${API_ADMIN_BOOK_ROOMS_URL}/${id}`, bookbody);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const deleteRecord = async(id)=>{
    try {
        await axios.delete(`${API_ADMIN_ROOMS_HISTORY_URL}/${id}`)    
    } catch (error) {
        console.log(error)
    }
}
