import React, { useState, useEffect } from 'react';
import SideBar from '../../componentes/SideBar/SideBar';
import NavBar from '../../componentes/NavBar/NavBar';
import Titulos from '../../componentes/Titulos/Titulos';
import Card from '../../componentes/Card/Card';
import Pagination from '@mui/material/Pagination';
import styles from '../Global.module.css';
import { cursosAtivos, cursosBloqueados } from '../../../data';

function Curso() {
    const [dados, setDados] = useState(cursosAtivos);
    const [tipoSelecionado, setTipoSelecionado] = useState('ativos-curso');
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = dados.slice(indexOfFirstCard, indexOfLastCard);

    useEffect(() => {
        setCurrentPage(1);
    }, [dados]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const mostrarCards = (tipo) => {
        const dadosSelecionados = tipo === 'ativos-curso' ? cursosAtivos : cursosBloqueados;
        setDados(dadosSelecionados);
        setTipoSelecionado(tipo);
    };

    return (
        <div className={styles.container}>
            <NavBar />
            <SideBar 
                backgroundColor="#245024"
                onCursoClick={() => mostrarCards('ativos-curso')}
            />

            <div className={styles.content}>
                <h1 className={styles.titulo}>Cursos</h1>
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

export default Curso;