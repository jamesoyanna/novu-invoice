import axios from "axios";

const api = axios.create({
 baseURL: "https://novu-invoice-backend.onrender.com/", 
});

export default api;
