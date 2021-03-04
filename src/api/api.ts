import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pythagorean-calculator-api.herokuapp.com',
});

export default api;
