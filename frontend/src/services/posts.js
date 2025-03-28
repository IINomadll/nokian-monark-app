import axios from "axios";
const baseUrl = "http://localhost:3001/api/posts";

const getAll = () => axios.get(baseUrl);

// const getById = (id) => axios.get(`${baseUrl}/${id}`);

const create = (postObject) => {
  return axios.post(baseUrl, postObject);
};

const update = (id, postObject) => {
  return axios.put(`${baseUrl}/${id}`, postObject);
};

const eradicate = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, eradicate };
