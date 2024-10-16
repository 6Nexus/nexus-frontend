import React, { useState } from 'react';
import NavBar from '../../componentes/NavBar/NavBar';
import Titulos from '../../componentes/Titulos/Titulos';
import Card from '../../componentes/Card/Card';
import styles from './Home.module.css';
import {professoresEmAprovacao, professoresAprovados, professoresBloqueados, alunosAtivos, alunosBloqueados, cursosAtivos, cursosBloqueados} from '../../../data';

function Home() {
    const [dados, setDados] = useState(professoresEmAprovacao);
    const [titulo, setTitulo] = useState('Professores');
    const [tipoSelecionado, setTipoSelecionado] = useState('emAprovacao-professor');

    const mostrarCards = (tipo) => {
        let dadosSelecionados = [];

        switch (tipo) {
            case 'emAprovacao-professor':
                dadosSelecionados = professoresEmAprovacao;
                break;
            case 'aprovados-professor':
                dadosSelecionados = professoresAprovados;
                break;
            case 'bloqueados-professor':
                dadosSelecionados = professoresBloqueados;
                break;
            case 'ativos-aluno':
                dadosSelecionados = alunosAtivos;
                break;
            case 'bloqueados-aluno':
                dadosSelecionados = alunosBloqueados;
                break;
            case 'ativos-curso':
                dadosSelecionados = cursosAtivos;
                break;
            case 'bloqueados-curso':
                dadosSelecionados = cursosBloqueados;
                break;
            default:
                break;
        }

        if (tipo.includes('professor')) {
            setTitulo('Professores');
        } else if (tipo.includes('aluno')) {
            setTitulo('Alunos');
        } else if (tipo.includes('curso')) {
            setTitulo('Cursos');
        }

        setDados(dadosSelecionados);
        setTipoSelecionado(tipo);
    };

    return (
        <div className={styles.container}>
            <NavBar
                onProfessorClick={() => mostrarCards('emAprovacao-professor')}
                onAlunoClick={() => mostrarCards('ativos-aluno')}
                onCursoClick={() => mostrarCards('ativos-curso')}
            />
            <div className={styles.content}>
                <h1 className={styles.titulo}>{titulo}</h1>
                <Titulos tipo={tipoSelecionado} mostrarCards={mostrarCards} />
                <Card dados={dados} tipoSelecionado={tipoSelecionado} />
            </div>
        </div>
    );
}

export default Home;