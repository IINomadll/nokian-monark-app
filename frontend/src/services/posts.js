import axios from "axios";
const baseUrl = "http://localhost:3001/api/posts";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => axios.get(baseUrl);

const create = (postObject) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(baseUrl, postObject, config);
};

const update = (id, postObject) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.put(`${baseUrl}/${id}`, postObject, config);
};

const eradicate = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, update, eradicate, setToken };
