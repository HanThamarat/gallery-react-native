import axios from "axios";

const Apiendpoint  = axios.create({
    baseURL: 'http://192.168.8.248:3000/api',
    responseType: 'json',
    withCredentials: true,
});

export default Apiendpoint;