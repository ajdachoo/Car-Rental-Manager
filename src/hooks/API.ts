import axios from "axios";

const API = axios.create({
    baseURL: 'https://rentcar-api-app.azurewebsites.net/api',
});

export default API;