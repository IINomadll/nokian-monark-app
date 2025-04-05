import axios from "axios";
const baseUrl = "http://localhost:3001/api/login";

const login = (credentials) => {
  return axios.post(baseUrl, credentials);
};

export default login;
