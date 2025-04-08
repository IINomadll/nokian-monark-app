import axios from "axios";
const baseUrl = "http://localhost:3001/api/posts";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => axios.get(baseUrl);

// const getById = (id) => axios.get(`${baseUrl}/${id}`);

const create = (postObject) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(baseUrl, postObject, config);
};

const update = (id, postObject) => {
  return axios.put(`${baseUrl}/${id}`, postObject);
};

const eradicate = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, eradicate, setToken };
