import React, { useEffect, useState } from "react";
import styles from './Certificates.module.css'
import CardCertificate from "../../components/CardCertificate/CardCertificate";
import Pagination from '@mui/material/Pagination';
import Main from "../Main/Main.jsx";
import api from "../../../api";
import ContentNotFound from "../../components/ContentNotFound/ContentNotFound";

const Certificates = () => {
    const id = sessionStorage.getItem('userId');
    const name = sessionStorage.getItem('usuario');
    const [cardsData, setCardsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 5;

    function buscarCertificados() {
        api.get(`/certificados/${id}`).then((response) => {
            const { data } = response;
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

                <div className={styles['certificates-container__content__cardCertificateList']}>
                        <p className={styles["cardCertificateList__title"]}>Certificados encontrados</p>
                        {currentCards && currentCards.length > 0 ? (
                            currentCards.map((data, _) => {
                                const date = new Date(data.dataConclusao);
                                const formattedDate = new Intl.DateTimeFormat('pt-BR', {
                                    dateStyle: 'short'
                                }).format(date);

                                return (
                                    <CardCertificate
                                        id={data.id}
                                        name={name}
                                        module="Culinária Italiana"
                                        title={data.curso.titulo}
                                        teacher={data.curso.professorNome}
                                        duration={data.curso.categoria}
                                        date={formattedDate} 
                                    />
                                );
                            })
                        ) : (
                            <ContentNotFound content="Desculpe, não encontramos nenhum certificado." />
                        )}
                    </div>
                    {cardsData && (<Pagination
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
                    />)}
                </div>
            </div>
        </Main>
    );
};
export default Certificates