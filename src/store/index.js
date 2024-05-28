import { createStore } from 'vuex';
import axios from 'axios';
import  {authUser} from "../utils/authRequest"

export default createStore({
  state: {
    isAuthenticated: false,
    rooms:[],
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    GET_ROOMS(state,rooms){
      state.rooms = rooms
    }
  },
  actions: {
    login({ commit }) {
      // Perform authentication logic
      // For example, set isAuthenticated to true after successful login
      
      commit('SET_AUTHENTICATED', true);
    },
    logout({ commit }) {
      // Perform logout logic
      // For example, set isAuthenticated to false
      commit('SET_AUTHENTICATED', false);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});
