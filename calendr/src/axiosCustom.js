import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
    headers: { Authorization: localStorage.getItem('jwt')}
  });

  export default instance;