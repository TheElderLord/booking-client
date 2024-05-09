import { API_BASE_URL, API_USER_REQUEST_URL, API_USER_ROOMS_URL, API_USER_ROOM_HISTORY_URL } from "./base";
import axios from "axios";


//HISTORY
export const fetchRoomHistoryById = async (id) => {
    // console.log("URL", API_BASE_URL)
  try {
    const { data } = await axios.get(
      `${API_USER_ROOM_HISTORY_URL}/${id}`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
//HISTORY


//ROOMS
export const fetchRooms = async()=>{
    try {
        const result = await axios.get(`${API_USER_ROOMS_URL}/list`);
        return result.data.items;
    } catch (error) {
        console.log(error)
    }
}
export const fetchRoomById = async(id)=>{
    try {
        const result = await axios.get(`${API_USER_ROOMS_URL}/list/${id}`);
        return result.data.items;
    } catch (error) {
        console.log(error)
    }
}
//ROOMS


//REQUEST

export const createRequest = async(body)=>{
  try {
     await axios.post(`${API_USER_ROOMS_URL}/request`,body);
    return true;
} catch (error) {
    console.log(error);
    return false;
}
}
//REQUEST


