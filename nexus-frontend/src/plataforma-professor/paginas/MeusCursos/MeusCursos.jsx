import React from "react";
import './MeusCursos.css';
import SideBar from "../../componentes/SideBar/SideBar";
import imagemCapa from '../../../utils/assets/imagem-card-teste.png';

function MeusCursos() {

    const cursos = [
        { titulo: 'Curso 1', subtitulo: 'Subtítulo 1', categoria: 'Categoria 1' },
        { titulo: 'Curso 2', subtitulo: 'Subtítulo 2', categoria: 'Categoria 2' },
        { titulo: 'Curso 3', subtitulo: 'Subtítulo 3', categoria: 'Categoria 3' },
        { titulo: 'Curso 4', subtitulo: 'Subtítulo 3', categoria: 'Categoria 3' },
        { titulo: 'Curso 5', subtitulo: 'Subtítulo 3', categoria: 'Categoria 3' },
        { titulo: 'Curso 6', subtitulo: 'Subtítulo 3', categoria: 'Categoria 3' },
        { titulo: 'Curso 7', subtitulo: 'Subtítulo 3', categoria: 'Categoria 3' },
        { titulo: 'Curso 8', subtitulo: 'Subtítulo 3', categoria: 'Categoria 3' },
    ];

    return (
        <>
            <SideBar backgroundColor={'#94065E'} />
            <div className="header-cursos-criados">
                <p class="title-cursos">Cursos criados</p>
            </div>
            <div className="cursos-criados">
                {cursos.map((curso, index) => (
                    <div className="curso-criados-info" key={index}>
                        <div className="img-capa">
                            <img src={imagemCapa} alt={`Imagem do ${curso.titulo}`} />
                        </div>
                        <div className="info-cards">
                            <h2>{curso.titulo}</h2>
                            {/* <h4>{curso.subtitulo}</h4> */}
                            {/* <p>{curso.categoria}</p> */}
                        </div>
                        <div className="button-editar-curso">
                            <button>Editar</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MeusCursos;
