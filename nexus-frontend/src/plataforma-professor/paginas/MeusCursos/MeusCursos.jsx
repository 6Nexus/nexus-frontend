import React, {useState, useEffect}  from "react";
import './MeusCursos.css';
import SideBar from "../../componentes/SideBar/SideBar";
import imagemCapa from '../../../utils/assets/capa_curso.jpg';
import api from "../../../api";

function MeusCursos() {

    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [imageUrls, setImageUrls] = useState({});
    

    useEffect(() => {
        
        const buscarCursos = async () => {
            try {
                const response = await api.get('/cursos'); 
                if (response.status === 200) {
                    setCursos(response.data); 
                } 
            } finally {
                setTimeout(() => {
                    setLoading(false); 
                }, 1000);
            }
        };

        buscarCursos();
    }, []); 


    useEffect(() => {
        const fetchImages = async () => {
          const newImageUrls = {};

          for (const curso of cursos) {
            try {
              const response = await api.get(`/cursos/capa/${curso.id}`, { responseType: 'blob' });
              const contentType = response.headers['content-type'];

          if (contentType && contentType.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(response.data);
            newImageUrls[curso.id] = imageUrl;
          } else {
            newImageUrls[curso.id] = imagemCapa;
          }
              
            } catch (error) {
              console.error('Erro ao buscar a imagem para o curso', curso.id, error);
              newImageUrls[curso.id] = imagemCapa; 
            }
          }
    
          setImageUrls(newImageUrls);
        };
    
        if (cursos && cursos.length > 0) {
          fetchImages();
        }
      }, [cursos]);


    if (loading) {
        return (
            <div className="carregando">
                <SideBar backgroundColor={'#94065E'} />
                <div class="loader"></div>
            </div>
        )
    }

    return (
        <>
            <SideBar backgroundColor={'#94065E'} />
            
                <div className="header-cursos-criados">
                    <p class="title-cursos">Cursos criados</p>
                </div>
                <div className="cursos-criados">
                    {cursos.map((curso, index) => (
                        <div className="curso-criados-info" key={index}>
                            <div className="img-capa">
                                <img src={imageUrls[curso.id] || imagemCapa} alt={`Imagem do ${curso.titulo}`} />
                            </div>
                            <div className="info-cards">
                                <h2>{curso.titulo}</h2>
                                <p>{curso.categoria}</p>
                            </div>
                            <div className="button-editar-curso">
                                <button>Editar</button>
                            </div>
                        </div>
                    ))}
                </div>

          
        </>
    );
}

export default MeusCursos;
