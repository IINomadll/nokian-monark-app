import axios from "axios";
const baseUrl = "http://localhost:3001/api/secret";

const getSecret = () => axios.get(baseUrl);

export default getSecret;
