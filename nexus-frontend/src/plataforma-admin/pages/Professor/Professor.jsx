import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../componentes/SideBar/SideBar';
import NavBar from '../../componentes/NavBar/NavBar';
import Titulos from '../../componentes/Titulos/Titulos';
import Card from '../../componentes/Card/Card';
import styles from '../Pages.module.css';
import Pagination from '@mui/material/Pagination';
import api from '../../../api';
import { toast } from 'react-toastify';

function Professor() {
    const [dados, setDados] = useState([]);
    const [titulo, setTitulo] = useState('Professores');
    const [tipoSelecionado, setTipoSelecionado] = useState('emAprovacao-professor');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const cardsPerPage = 6;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = dados.slice(indexOfFirstCard, indexOfLastCard);

    useEffect(() => {
        setCurrentPage(1);
        buscarDados(tipoSelecionado);
    }, [tipoSelecionado]);

    const buscarDados = async (tipo) => {
        let endpoint = '';
    
        if (tipo === 'emAprovacao-professor') {
            endpoint = '/administradores/professor/aprovadoFalse';
        } else if (tipo === 'aprovados-professor') {
            endpoint = '/administradores/professor/aprovadoTrue';
        } else if (tipo === 'bloqueados-professor') {
            endpoint = '/administradores/professor/aprovadoFalse'; 
        }
    
        console.log(`Buscando dados do endpoint: ${endpoint}`);
    
        try {
            const response = await api.get(endpoint);
            console.log('Resposta da API:', response.data);
            setDados(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error.message);
            console.log('Detalhes do erro:', error);
            toast.error('Erro ao buscar dados!'); 
        }
    };
    
    

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const mostrarCards = (tipo) => {
        setTipoSelecionado(tipo);
        setTitulo('Professores');
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

                {loading ? (
                    <p style={{ textAlign: 'center' }}>Carregando...</p>
                ) : (
                    <Card dados={currentCards} tipoSelecionado={tipoSelecionado} />
                )}

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

export default Professor;
