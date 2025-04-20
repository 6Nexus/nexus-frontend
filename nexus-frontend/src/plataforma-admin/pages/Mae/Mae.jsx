import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../componentes/SideBar/SideBar';
import NavBar from '../../componentes/NavBar/NavBar';
import Titulos from '../../componentes/Titulos/Titulos';
import Card from '../../componentes/Card/Card';
import Pagination from '@mui/material/Pagination';
import styles from '../Pages.module.css';

function Mae() {
    const [dados, setDados] = useState([]);
    const [titulo, setTitulo] = useState('Mães');
    const [tipoSelecionado, setTipoSelecionado] = useState('ativos-aluno');
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = dados.slice(indexOfFirstCard, indexOfLastCard);

    // Função para buscar dados da API
    const fetchDados = async (tipo) => {
        try {
            const response = await axios.get(`http://localhost:8080/associados?tipo=${tipo}`);
            setDados(response.data);
        } catch (error) {
            console.error('Erro ao carregar os dados:', error);
        }
    };

    // Inicializa os dados com o tipo padrão
    useEffect(() => {
        fetchDados(tipoSelecionado);
    }, [tipoSelecionado]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const mostrarCards = (tipo) => {
        setTipoSelecionado(tipo); // Isso acionará o useEffect para buscar os dados
        setTitulo('Mães'); // Mantém o título fixo como 'Mães'
    };

    return (
        <div className={styles.container}>
            <NavBar />
            <SideBar
                backgroundColor={'#245024'}
                onProfessorClick={() => mostrarCards('emAprovacao-professor')}
            />

            <div className={styles.content}>
                <h1 className={styles.titulo}>{titulo}</h1>
                <Titulos tipo={tipoSelecionado} mostrarCards={mostrarCards} />
                <Card dados={currentCards} tipoSelecionado={tipoSelecionado} />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Pagination
                        count={Math.ceil(dados.length / cardsPerPage)}
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
                                fontSize: '16px',
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: '#3B9D3B',
                                color: 'white',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Mae;
