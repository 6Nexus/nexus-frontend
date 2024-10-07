import React, { useState } from 'react';
import NavBar from '../../componentes/NavBar/NavBar'; // Supondo que NavBar está na pasta components
import Titulos from '../../componentes/Titulos/Titulos';
import Cards from '../../componentes/Cards/Cards';
import styles from './Home.module.css'
import { professoresEmAprovacao, professoresAprovados, professoresDenunciados, professoresBloqueados, alunosAtivos, alunosDenunciados, alunosBloqueados, cursosAtivos, cursosDenunciados, cursosBloqueados } from '../../../data';
  
  function Home () {
    const [dados, setDados] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [tipoSelecionado, setTipoSelecionado] = useState('');

    const mostrarTitulos = (tipo) => {
        // Logica para exibir os títulos (professores, alunos, cursos)
        let dadosSelecionados = [];

        if (tipo === 'professor') {
            // Exibindo professores
            dadosSelecionados = professoresEmAprovacao; // Exemplo inicial
            setTitulo('Professores');
        } else if (tipo === 'aluno') {
            // Exibindo alunos
            dadosSelecionados = alunosAtivos; // Exemplo inicial
            setTitulo('Alunos');
        } else if (tipo === 'curso') {
            // Exibindo cursos
            dadosSelecionados = cursosAtivos; // Exemplo inicial
            setTitulo('Cursos');
        }

        setDados(dadosSelecionados);
        setTipoSelecionado(tipo);
    };

    const mostrarCards = (tipo) => {
        let dadosSelecionados = [];

        switch (tipo) {
            case 'emAprovacao-professor':
                dadosSelecionados = professoresEmAprovacao;
                break;
            case 'aprovados-professor':
                dadosSelecionados = professoresAprovados;
                break;
            case 'denunciados-professor':
                dadosSelecionados = professoresDenunciados;
                break;
            case 'bloqueados-professor':
                dadosSelecionados = professoresBloqueados;
                break;
            case 'ativos-aluno':
                dadosSelecionados = alunosAtivos;
                break;
            case 'denunciados-aluno':
                dadosSelecionados = alunosDenunciados;
                break;
            case 'bloqueados-aluno':
                dadosSelecionados = alunosBloqueados;
                break;
            case 'ativos-curso':
                dadosSelecionados = cursosAtivos;
                break;
            case 'denunciados-curso':
                dadosSelecionados = cursosDenunciados;
                break;
            case 'bloqueados-curso':
                dadosSelecionados = cursosBloqueados;
                break;
            default:
                break;
        }

        // Atualiza o título e os dados
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
      <div>
        <NavBar
          onProfessorClick={() => { mostrarCards('emAprovacao-professor'); mostrarTitulos('professor'); }}
          onAlunoClick={() => { mostrarCards('ativos-aluno'); mostrarTitulos('aluno'); }}
          onCursoClick={() => { mostrarCards('ativos-curso'); mostrarTitulos('curso'); }}
        />
  
        <h1 className={styles.titulo}>{titulo}</h1>
  
        <Titulos tipo={tipoSelecionado} mostrarCards={mostrarCards} />
  
        <Cards dados={dados} tipoSelecionado={tipoSelecionado} />
      </div>
    );
  };

export default Home;