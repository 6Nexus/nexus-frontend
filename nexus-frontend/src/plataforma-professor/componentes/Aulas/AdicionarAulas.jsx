import React, { useState } from 'react';
import './AdicionarAulas.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import PlayCircleFilledWhiteRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';

function AdicionarAula({ aulaIndex, AdicionarAula, removerAula }) {
    const [aula, setAula] = useState({
        titulo: '',
        descricao: '',
        conteudos: { video: null, pdfs: [] }
    });

    const handleChangeAula = (e) => {
        const { name, value } = e.target;
        setAula((prevAula) => {
            const updatedAula = {
                ...prevAula,
                [name]: value
            };
            AdicionarAula(updatedAula);
            return updatedAula;
        });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAula((prevAula) => {
                const updatedAula = {
                    ...prevAula,
                    conteudos: { ...prevAula.conteudos, video: file }
                };
                AdicionarAula(updatedAula);
                return updatedAula;
            });
        }
    };

    const handleRemoveVideo = () => {
        setAula((prevAula) => {
            const updatedAula = {
                ...prevAula,
                conteudos: { ...prevAula.conteudos, video: null }
            };
            AdicionarAula(updatedAula);
            return updatedAula;
        });
    };

    const handleAddPdf = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAula((prevAula) => {
                const updatedAula = {
                    ...prevAula,
                    conteudos: {
                        ...prevAula.conteudos,
                        pdfs: [...prevAula.conteudos.pdfs, file]
                    }
                };
                AdicionarAula(updatedAula);
                return updatedAula;
            });
        }
    };

    const handleRemovePdf = (index) => {
        setAula((prevAula) => {
            const updatedAula = {
                ...prevAula,
                conteudos: {
                    ...prevAula.conteudos,
                    pdfs: prevAula.conteudos.pdfs.filter((_, i) => i !== index)
                }
            };
            AdicionarAula(updatedAula);
            return updatedAula;
        });
    };

    const handleRemoverAula = () => {
        removerAula(aulaIndex);
        console.log('Aula removida');
    };

    return (
        <div className='container-aulas'>
            <div className='container-header'>
                <h3>Aula {aulaIndex}</h3>
                <button className='btn-remover' onClick={handleRemoverAula}>
                    <CloseRoundedIcon />
                </button>
            </div>
            <div className="form-group">
                <label htmlFor="titulo">Título da Aula<span style={{ color: 'red' }}>*</span></label>
                <input
                    type="text"
                    id="titulo"
                    name='titulo'
                    value={aula.titulo}
                    onChange={handleChangeAula}
                    placeholder="Digite o título da aula"
                    required
                    className="input-field"
                    style={{ width: '40%' }}
                />
            </div>

            <div className="form-group">
                <label htmlFor="descricao">Descrição da Aula<span style={{ color: 'red' }}>*</span></label>
                <input
                    id="descricao"
                    name='descricao'
                    value={aula.descricao}
                    onChange={handleChangeAula}
                    placeholder="Digite a descrição da aula"
                    required
                    className="input-descricao"
                />
            </div>

            <div className="form-group">
                <label>Adicionar Vídeo</label>
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    disabled={!!aula.conteudos.video}
                />
                {aula.conteudos.video && (
                    <div className="file-item">
                        <PlayCircleFilledWhiteRoundedIcon className='icon-play' />
                        <span>{aula.conteudos.video.name}</span>
                        <button onClick={handleRemoveVideo} className="btn-remover">
                            <CloseRoundedIcon fontSize="small" />
                        </button>
                    </div>
                )}
            </div>

            <div className="form-group">
                <label>Adicionar Material de Aula (PDF)</label>
                <input type="file" accept="application/pdf" onChange={handleAddPdf} />
                {aula.conteudos.pdfs.map((pdf, index) => (
                    <div key={index} className="file-item">
                        <PictureAsPdfRoundedIcon className='icon-pdf' />
                        <span>{pdf.name}</span>
                        <button onClick={() => handleRemovePdf(index)} className="btn-remover">
                            <CloseRoundedIcon fontSize="small" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdicionarAula;
