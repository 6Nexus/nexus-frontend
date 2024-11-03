import React, { useEffect, useState } from "react";
import api from "../../../api"
import styles from './Course.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardCurso from "../../components/CardCurso/CardCurso";
import HeaderCategory from "../../components/HeaderCategory/HeaderCategory";
import Pagination from '@mui/material/Pagination';

const Course = () => {
    const [cardsData, setCardsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };


    function buscarCursos() {
        api.get().then((response) => {
            const { data } = response;
            console.log(data);
            setCardsData(data)

        }).catch((e) => {
            console.log("Deu erro", e)
        })
    }

    useEffect(() => {
        buscarCursos();
    }, [])

    return (
        <>
            <div className={styles["course-container"]}>
                <SideBar backgroundColor={'#245024'} />

                <div className={styles["course-container__content"]}>
                    <SearchBar />

                    <HeaderCategory />

                    <div className={styles["course-container__content__courseList"]}>
                        <p className={styles["courseList__title"]}>Cursos encontrados</p>
                        <div className={styles["courseList__cards"]}>
                            {currentCards && currentCards.map((data, _) => (
                              
                                    <CardCurso
                                        id={data.idModulo}
                                        title={data.titulo}
                                        subtitle={data.descricao}
                                        category={data.categoria}
                                        inProgress={data.emProgresso}
                                        liked={data.curtido}
                                        imageUrl={data.imagem}
                                        progress={data.progreso}
                                    />
                            
                            ))}
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
                                fontSize:'16px'
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: '#3B9D3B', 
                                color: 'white',
                            },
                        }}
                    />
                </div>
            </div>
        </>
    );
};
export default Course