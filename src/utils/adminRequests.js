import axios from "axios";
import { API_ADMIN_REQUEST_URL } from "./base";

export const fetchRequests = async (params) => {
  try {
    const result = await axios.get(API_ADMIN_REQUEST_URL,{ params });
    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};
export const seenPatch = async(id)=>{
    try {
        await axios.patch(`${API_ADMIN_REQUEST_URL}/${id}`);
    } catch (error) {
        console.log(error);
    }
}
export const deleteReq = async(id)=>{
    try {
        await axios.delete(`${API_ADMIN_REQUEST_URL}/${id}`);
    } catch (error) {
        console.log(error);
    }
}