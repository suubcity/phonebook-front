import axios from "axios";
const baseUrl = "http://localhost:3001/persons/";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const remove = (id) => {
  const url = baseUrl + id;
  return axios.delete(url);
};

const update = (id, newObject) => {
  return axios.put(baseUrl + id, newObject);
};

export default {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update,
};
