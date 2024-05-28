const host =  import.meta.env.VITE_SERVER_APP_HOST;
const port =  import.meta.env.VITE_SERVER_APP_PORT;
const nodeEnv = import.meta.env.MODE;


console.log(host,port,nodeEnv);

export const IMAGE_URL = `http://${host}:${port}/images/`;

export const API_BASE_URL = `http://${host}:${port}/api/v1`;
export const API_ADMIN_URL = `http://${host}:${port}/api/v1/admin`;

export const API_ADMIN_ROOMS_HISTORY_URL = `${API_ADMIN_URL}/rooms/bookHistory`;
export const API_ADMIN_ROOMS_URL = `${API_ADMIN_URL}/rooms/list`;
export const API_ADMIN_USERS_URL = `${API_ADMIN_URL}/users`;
export const API_ADMIN_REQUEST_URL = `${API_ADMIN_URL}/requests`;
export const API_ADMIN_LOGIN_URL = `${API_BASE_URL}/login`;



export const API_USER_ROOMS_URL = `${API_BASE_URL}/rooms`;
export const API_USER_ROOM_HISTORY_URL = `${API_BASE_URL}/rooms/history`;
export const API_USER_REQUEST_URL = `${API_BASE_URL}/requests`;

