import axiosAdmin from "axios"; 

const apiUsuarios = axiosAdmin.create({ 
    baseURL: process.env.REACT_APP_Usuarios_URL 
}); 

export default apiUsuarios; 