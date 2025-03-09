import axios from "axios";
const baseUrl = "http://localhost:3001/api/posts";

const getAll = () => axios.get(baseUrl);

export default { getAll };
