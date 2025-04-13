import axios from "axios";
import tokenService from "./token";

const baseUrl = "http://localhost:3001/api/posts";

const config = () => ({ headers: { Authorization: tokenService.getToken() } });

const getAll = () => axios.get(baseUrl);

const create = (postObject) => {
  return axios.post(baseUrl, postObject, config());
};

const update = (id, postObject) => {
  return axios.put(`${baseUrl}/${id}`, postObject, config());
};

const eradicate = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config());
};

export default { getAll, create, update, eradicate };
