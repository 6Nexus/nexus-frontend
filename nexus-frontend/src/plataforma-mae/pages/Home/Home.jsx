import React, { useEffect, useState } from "react";
import api from "../../../api.js";
import styles from './Home.module.css'
import SideBar from "../../components/SideBar/SideBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CardCurso from '../../components/CardCurso/CardCurso.jsx';
import Banner from '../../components/Banner/Banner.jsx'
import IconCourse from '../../../utils/assets/course.svg'
import IconInstructions from '../../../utils/assets/instructions.svg'
import IconProfile from '../../../utils/assets/profile.svg'
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [cardsData, setCardsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 3;
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
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

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        buscarCursos();
    }, [])

    return (
        <>
            <div className={styles["home-container"]}>
                <SideBar backgroundColor={'#245024'} />

                <div className={styles["home-container__content"]}>
                    <SearchBar />
                    <Banner />

                    <div className={styles["home-container__content__options"]}>
                        <div className={`${styles["content__options__option"]} ${styles["course"]}`} onClick={() => handleNavigation(`/cursos`)}>
                            <img src={IconCourse} alt="" />
                            <p className={styles["options__option__text"]}>Ver cursos</p>
                        </div>

                        <div className={`${styles["content__options__option"]} ${styles["instructions"]}`} onClick={() => handleNavigation(`/instrucoes`)}>
                            <img src={IconInstructions} alt="" />
                            <p className={styles["options__option__text"]}>Instruções</p>
                        </div>

                        <div className={`${styles["content__options__option"]} ${styles["profile"]}`} onClick={() => handleNavigation(`/perfil`)}>
                            <img src={IconProfile} alt="" />
                            <p className={styles["options__option__text"]}>Meu perfil</p>
                        </div>
                    </div>


                    <div className={styles["home-container__content__courseList"]}>
                        <p className={styles["courseList__title"]}>Continue assistindo</p>
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
export default Home