import Axios from 'axios';

export const axios = Axios.create({
  baseURL: `http://localhost:3000`,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
  },
});
