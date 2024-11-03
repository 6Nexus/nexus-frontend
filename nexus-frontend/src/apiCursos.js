import axios from "axios"; 

const apiCursos = axios.create({ 
    baseURL: "https://66f0ab79f2a8bce81be668d6.mockapi.io/cursos"
}); 

export default apiCursos; 