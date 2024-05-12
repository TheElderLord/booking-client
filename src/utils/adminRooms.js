import axios from "axios";
import { API_ADMIN_ROOMS_URL } from "./base";

export const fetchRooms = async () => {
  try {
    const result = await axios.get(API_ADMIN_ROOMS_URL);
    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};

export const postRoom = async (formData) => {
  try {
    await axios.post(API_ADMIN_ROOMS_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteMethod = async (id) => {
  try {
    await axios.delete(`${API_ADMIN_ROOMS_URL}/${id}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
