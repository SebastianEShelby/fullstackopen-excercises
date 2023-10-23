import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl)

const create = (newObject) => axios.post(baseUrl, newObject)

export default { getAll, create }