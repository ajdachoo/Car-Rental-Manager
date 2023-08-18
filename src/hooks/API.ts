import axios from "axios";

const API = axios.create({
    baseURL: 'https://car-rental-manager-api-app.azurewebsites.net/api',
});

export default API;

//https://car-rental-manager-api-app.azurewebsites.net/api
//https://localhost:5001/api