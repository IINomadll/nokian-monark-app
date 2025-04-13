import axios from "axios";
import tokenService from "./token";

const baseUrl = "http://localhost:3001/api/products";

const config = () => ({ headers: { Authorization: tokenService.getToken() } });

const getAll = () => axios.get(baseUrl);

const create = (productObject) => {
  return axios.post(baseUrl, productObject, config());
};

const update = (productObject, id) => {
  return axios.put(`${baseUrl}/${id}`, productObject, config());
};

const eradicate = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config());
};

export default { getAll, create, update, eradicate };
