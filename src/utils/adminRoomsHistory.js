import axios from "axios";
import {
  API_ADMIN_ROOMS_HISTORY_URL,
  API_ADMIN_ROOMS_URL,
} from "./base";

//BOOKHISTORY
export const fetchBookHistory = async (queryParams) => {
  let result;
  try {
    if (queryParams) {
      result = await axios.get(API_ADMIN_ROOMS_HISTORY_URL, {
        params: queryParams,
      });
    } else result = await axios.get(API_ADMIN_ROOMS_HISTORY_URL);

    return result.data.items;
  } catch (error) {
    console.log(error);
  }
};
export const createRecord = async (bookbody) => {
  try {
    await axios.post(`${API_ADMIN_ROOMS_HISTORY_URL}/${id}`, bookbody);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const deleteRecord = async (id) => {
  try {
    await axios.delete(`${API_ADMIN_ROOMS_HISTORY_URL}/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const setGivenPrice = async (id, amount) => {
  try {
    await axios.patch(`${API_ADMIN_ROOMS_HISTORY_URL}/${id}`, {
      amount: amount,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};
export const setPaid = async (id, isPaid) => {
  try {
    await axios.put(`${API_ADMIN_ROOMS_HISTORY_URL}/${id}`, {
      isPaid: isPaid,
    });
    return true;
  } catch (error) {
    console.log(error);
  }
};

//BOOKHISTORY






