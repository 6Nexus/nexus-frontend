import React from 'react';
import styles from './Card.module.css';
import foto from '../../../utils/assets/foto-perfil.png';
import BlockIcon from '@mui/icons-material/Block';

function Card({ dados, tipoSelecionado }) {
    return (
        <div className={styles.cardContainer}>
            {dados.map((dado, index) => (
                <div key={index} className={styles.card}>
                    {tipoSelecionado.includes('bloqueados') && (
                        <BlockIcon fontSize="small" className={styles.fotoCanto} />
                    )}
                    <img src={foto} alt={dado.nome} className={styles.foto} />
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
            return <button className={styles.btnAtivo}>Bloquear</button>;
        case 'denunciados-professor':
            return (
                <>
                    <button className={styles.btn}>Acessar</button>
                    <button className={styles.btnBloq}>Bloquear</button>
                </>
            );
        case 'bloqueados-professor':
            return (
                <>
                    <button className={styles.btn}>Acessar</button>
                    <button className={styles.btnBloq}>Bloquear</button>
                </>
            );
        case 'ativos-aluno':
            return (
                <>
                    <button className={styles.btn}>Acessar</button>
                    <button className={styles.btnBloq}>Bloquear</button>
                </>
            );
        case 'bloqueados-aluno':
            return <button className={styles.btn}>Desbloquear</button>;
        case 'ativos-curso':
            return (
                <>
                    <button className={styles.btn}>Acessar</button>
                    <button className={styles.btnBloq}>Bloquear</button>
                </>
            );
        case 'bloqueados-curso':
            return (
                <>
                    <button className={styles.btn}>Acessar</button>
                    <button className={styles.btnBloq}>Bloquear</button>
                </>
            );
        default:
            return null;
    }
}

export default Card;