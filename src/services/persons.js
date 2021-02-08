import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons/';

const getAll = () => {
	return axios.get(baseUrl);
};

const getOne = (id) => {
	return axios.get(`${baseUrl}${id}`);
};

const create = (newPerson) => {
	return axios.post(baseUrl, newPerson);
};

const remove = (id) => {
	return axios.delete(`${baseUrl}${id}`);
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
