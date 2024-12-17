import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => axios.get(baseURL).then((res) => res.data);

const create = (person) => axios.post(baseURL, person).then((res) => res.data);

const update = (person, id) =>
  axios.put(`${baseURL}/${id}`, person).then((res) => res.data);

const remove = (id) => axios.delete(`${baseURL}/${id}`).then((res) => res.data);

export default { getAll, create, update, remove };
