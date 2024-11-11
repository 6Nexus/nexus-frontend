import React, { useState } from "react";
import styles from './Card.module.css';
import foto from '../../../utils/assets/foto-perfil.png';
import BlockIcon from '@mui/icons-material/Block';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Card({ dados, tipoSelecionado }) {
    const isCurso = tipoSelecionado.includes('curso');
    const isMae = tipoSelecionado.includes('aluno');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.cardContainer}>
            {dados.map((dado, index) => (
                <div key={index} className={`${styles.card} ${isCurso ? styles.cursoCard : ''} ${isMae ? styles.maeCard : ''}`}>
                    {tipoSelecionado.includes('bloqueados') && (
                        <BlockIcon fontSize="small" className={styles.fotoCanto} />
                    )}
                    
                    {(tipoSelecionado.includes('ativos-aluno') || tipoSelecionado.includes('aprovados')) && (
                        <IconButton onClick={handleMenuClick} className={styles.menuClick}>
                            <MoreVertIcon fontSize="medium" />
                        </IconButton>
                    )}

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>Bloquear</MenuItem>
                    </Menu>

                    {(tipoSelecionado.includes('professor') || tipoSelecionado.includes('aluno')) && (
                        <img src={foto} alt={dado.nome} className={styles.foto} />
                    )}

                    <h4 className={styles.nome}>{dado.nome}</h4>

                    {dado.email && (
                        <>
                            <p className={styles["p-title"]}>Email:</p>
                            <p className={styles["p-dados"]}>{dado.email}</p>
                        </>
                    )}

                    {dado.telefone && (
                        <>
                            <p className={styles["p-title"]}>Telefone:</p>
                            <p className={styles["p-dados"]}>{dado.telefone}</p>
                        </>
                    )}

                    {dado.atuacao && (
                        <>
                            <p className={styles["p-title"]}>Área de atuação:</p>
                            <p className={styles["p-dados"]}>{dado.atuacao}</p>
                        </>
                    )}

                    {dado.professor && (
                        <>
                            <p className={styles["p-title"]}>Professor:</p>
                            <p className={styles["p-dados"]}>{dado.professor}</p>
                        </>
                    )}

                    <div className={styles.divBtn}>
                        {renderBotao(tipoSelecionado)}
                    </div>
                </div>
            ))}
        </div>
    );
}

function renderBotao(tipoSelecionado) {
    switch (tipoSelecionado) {
        case 'emAprovacao-professor':
            return (
                <>
                    <button className={styles.btn}>Aprovar</button>
                    <button className={styles.btnBloq}>Recusar</button>
                </>
            );
        case 'aprovados-professor':
            return (
                <>
                    <button className={styles.btn}>Acessar</button>
                    <button className={styles.btnBloq}>Excluir</button>
                </>
            );
        case 'bloqueados-professor':
            return (
                <>
                    <button className={styles.btnDesbloq}>Desbloquear</button>
                </>
            );
        case 'ativos-aluno':
            return (
                <>
                    <button className={styles.btn}>Acessar</button>
                    <button className={styles.btnBloq}>Excluir</button>
                </>
            );
        case 'bloqueados-aluno':
            return (
                <>
                    <button className={styles.btnDesbloq}>Desbloquear</button>
                </>
            );
        case 'ativos-curso':
            return (
                <>
                    <button className={styles.btn}>Acessar</button>
                    <button className={styles.btnBloq}>Excluir</button>
                </>
            );
        case 'bloqueados-curso':
            return (
                <>
                    <button className={styles.btnDesbloq}>Desbloquear</button>
                </>
            );
        default:
            return null;
    }
}

export default Card;
