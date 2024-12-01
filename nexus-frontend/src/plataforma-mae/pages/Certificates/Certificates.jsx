import React, { useEffect, useState } from "react";
import styles from './Certificates.module.css'
import HeaderCategory from "../../components/HeaderCategory/HeaderCategory";
import CardCertificate from "../../components/CardCertificate/CardCertificate";
import Pagination from '@mui/material/Pagination';
import Main from "../Main/Main.jsx";
import apiCurso from "../../../apiCursos";

const Certificates = () => {
    const [cardsData, setCardsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 5;

    function buscarCertificados() {
        apiCurso.get().then((response) => {
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
        buscarCertificados();
    }, [])

    return (
        <Main>
            <div className={styles["certificates-container"]}>

                <div className={styles["certificates-container__content"]}>
                    <HeaderCategory />

                    <div className={styles['certificates-container__content__cardCertificateList']}>
                        {currentCards && currentCards.map((data, _) => (

                            <CardCertificate
                                id={data.id}
                                name="Maria Eduarda Veroneze"
                                module="Culinária Italiana"
                                title={data.titulo}
                                teacher={data.professor}
                                duration="4"
                                date={data.dataFim}
                            />

                        ))}
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
export default Certificates