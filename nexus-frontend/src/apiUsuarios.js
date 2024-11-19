import axiosAdmin from "axios"; 

const apiUsuarios = axiosAdmin.create({ 
    baseURL: process.env.REACT_APP__URL_USUARIO
}); 

export default apiUsuarios; 