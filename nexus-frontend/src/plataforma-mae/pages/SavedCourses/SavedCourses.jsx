import React, { useEffect, useState } from "react";
import api from "./../../../api";
import styles from './SavedCourses.module.css'
import CardCurso from "../../components/CardCurso/CardCurso";
import HeaderCategory from "../../components/HeaderCategory/HeaderCategory";
import Pagination from '@mui/material/Pagination';
import Main from "../Main/Main";
import ContentNotFound from "../../components/ContentNotFound/ContentNotFound";
import imagemCapaDefault from '../../../utils/assets/capa_curso.jpg'

const SavedCourses = () => {
    const id = sessionStorage.getItem('userId');
    const [cardsData, setCardsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState("Todos");
    const cardsPerPage = 6;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

    const [imageUrls, setImageUrls] = useState({});

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const buscarCursos = (categoria = "Todos") => {
        const endpoint = categoria === "Todos" ? `/cursos/associado/${id}` : `/cursos/categoria/${categoria}`;
        api.get(endpoint)
            .then((response) => {
                const { data } = response;
                setCardsData(data);
                setCurrentPage(1);
            })
            .catch((e) => {
                console.log("Erro ao buscar cursos:", e);
            });
    };

    useEffect(() => {
        const fetchImages = async () => {
          const newImageUrls = {};

          for (const data of currentCards) {
            try {
              const response = await api.get(`/cursos/capa/${data.id}`, { responseType: 'blob' });
              const contentType = response.headers['content-type'];

          if (contentType && contentType.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(response.data);
            newImageUrls[data.id] = imageUrl;
          } else {
            newImageUrls[data.id] = imagemCapaDefault;
          }
              
            } catch (error) {
              console.error('Erro ao buscar a imagem para o curso', data.id, error);
              newImageUrls[data.id] = imagemCapaDefault; 
            }
          }
    
          setImageUrls(newImageUrls);
        };
    
        if (currentCards && currentCards.length > 0) {
          fetchImages();
        }
      }, [currentCards]);

    useEffect(() => {
        buscarCursos(activeCategory);
    }, [activeCategory]);
    return (
        <Main showReturnPages={false}>
            <div className={styles["savedCourses-container"]}>

                <div className={styles["savedCourses-container__content"]}>

                    <HeaderCategory
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />

                    <div
                        className={`${styles["savedCourses-container__content__savedCoursesList"]} ${
                            currentCards.length === 0 ? styles.noContent : ""
                        }`}
                    >
                        <p className={styles["savedCoursesList__title"]}>Cursos encontrados</p>
                        <div
                            className={`${
                                currentCards.length > 0 ? styles.savedCoursesList__cards : ""
                            }`}
                        >
                            {currentCards && currentCards.length > 0 ? (
                                currentCards.map((data, _) => (
                                    <CardCurso
                                        key={data.id}
                                        id={data.id}
                                        title={data.titulo}
                                        subtitle={data.descricao}
                                        category={data.categoria}
                                        inProgress={data.emProgresso}
                                        liked={data.curtido}
                                        imageUrl={imageUrls[data.id] || imagemCapaDefault}
                                        progress={data.progreso}
                                        showIcon="true"
                                    />
                                ))
                            ) : (
                                <ContentNotFound content="Desculpe, não encontramos nenhum curso em que você esteja matriculada." />
                            )}
                        </div>
                    </div>
                    <Pagination
                        count={Math.ceil(cardsData.length / cardsPerPage)}
                        page={currentPage}
                        onChange={handleChange}
                        variant="outlined"
                        shape="rounded"
                        sx={{

                            backgroundColor: '#F3F3F3',
                            padding: '8px',
                            borderRadius: '30px',
                            '& .MuiPaginationItem-root': {
                                color: '#245024',
                                border: 'none',
                                borderRadius: '50%',
                                fontSize: '16px'
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: '#3B9D3B',
                                color: 'white',
                            },
                        }}
                    />
                </div>
            </div>
        </Main>
    );
};
export default SavedCourses