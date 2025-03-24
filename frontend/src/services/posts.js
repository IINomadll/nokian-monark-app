import axios from "axios";
const baseUrl = "http://localhost:3001/api/posts";

const getAll = () => axios.get(baseUrl);

// const getById = (id) => axios.get(`${baseUrl}/${id}`);

export default { getAll };
