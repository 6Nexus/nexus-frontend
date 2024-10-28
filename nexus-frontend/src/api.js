import axiosAdmin from "axios"; 

const api = axiosAdmin.create({ 
    baseURL: process.env.REACT_APP_API_URL 
}); 

export default api; 