import axios from "axios";
const baseUrl = "http://localhost:3001/api/admin";

const verifyUuid = (uuid) => {
  return axios.post(`${baseUrl}/verify`, { uuid });
};

export default verifyUuid;
