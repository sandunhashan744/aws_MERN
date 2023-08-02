import axios from 'axios';

const instance = axios.create({baseURL:'https://c-copier-auth-server.onrender.com' });  

export default instance

// http://localhost:8080
// https://c-copier-auth-server.onrender.com