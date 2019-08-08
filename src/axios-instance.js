import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://motivityapi.herokuapp.com/'
    // baseURL: 'http://localhost:8080/'
});

export default instance;