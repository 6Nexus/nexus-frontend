import React, { useState } from "react";
import api from "../../../api";
import styles from './Card.module.css';
import foto from '../../../utils/assets/foto-perfil.png';
import BlockIcon from '@mui/icons-material/Block';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify";

function Card({ dados, tipoSelecionado }) {
  const isCurso = tipoSelecionado.includes('curso');
  const isMae = tipoSelecionado.includes('aluno');

  // Estado para o menu, armazenando id do card que abriu o menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuCardId, setMenuCardId] = useState(null);

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuCardId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuCardId(null);
  };

  const handleAprovar = async (id, tipo) => {
    try {
      if (tipo === "professor") {
        await api.put(`/administradores/professor/aprovar/${id}`);
        toast.success("Professor aprovado com sucesso!");
      } else if (tipo === "aluno") {
        await api.put(`/administradores/associados/aprovar/${id}`);
        toast.success("Aluno aprovado com sucesso!");
      }
      handleMenuClose();
    } catch (error) {
      console.error(`Erro ao aprovar o ${tipo}:`, error);
      toast.error(`Erro ao aprovar o ${tipo}`);
    }
  };

  const handleBloquear = async (id, tipo) => {
    try {
      if (tipo === "professor") {
        await api.put(`/administradores/professor/bloquear/${id}`);
        toast.success("Professor bloqueado com sucesso!");
      } else if (tipo === "aluno") {
        await api.put(`/administradores/associados/bloquear/${id}`);
        toast.success("Aluno bloqueado com sucesso!");
      }
      handleMenuClose();
    } catch (error) {
      console.error(`Erro ao bloquear o ${tipo}:`, error);
      toast.error(`Erro ao bloquear o ${tipo}`);
    }
  };

  const handleExcluir = async (id) => {
    try {
      await api.delete(`/associados/${id}`);
      toast.success('Associado excluído com sucesso!');
      handleMenuClose();
    } catch (error) {
      console.error("Erro ao excluir o associado:", error);
      toast.error("Ocorreu um erro ao tentar excluir o associado.");
    }
  };

  return (
    <div className={styles.cardContainer}>
      {dados.map((dado) => (
        <div
          key={dado.id}
          className={`${styles.card} ${isCurso ? styles.cursoCard : ''} ${isMae ? styles.maeCard : ''}`}
        >
          {tipoSelecionado.includes('bloqueados') && (
            <BlockIcon fontSize="small" className={styles.fotoCanto} />
          )}

          {(tipoSelecionado.includes('ativos-aluno') || tipoSelecionado.includes('aprovados') || tipoSelecionado.includes('professor')) && (
            <IconButton
              onClick={(e) => handleMenuClick(e, dado.id)}
              className={styles.menuClick}
              aria-controls={menuCardId === dado.id ? 'menu' : undefined}
              aria-haspopup="true"
              aria-expanded={menuCardId === dado.id ? 'true' : undefined}
            >
              <MoreVertIcon fontSize="medium" />
            </IconButton>
          )}

          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={menuCardId === dado.id}
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
            {renderMenuItems(tipoSelecionado, dado.id, handleAprovar, handleBloquear, handleExcluir)}
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
            {renderBotao(tipoSelecionado, dado.id, handleAprovar, handleBloquear, handleExcluir)}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderMenuItems(tipoSelecionado, id, handleAprovar, handleBloquear, handleExcluir) {
  switch (tipoSelecionado) {
    case 'emAprovacao-professor':
      return (
        <MenuItem onClick={() => handleAprovar(id, 'professor')}>Aprovar</MenuItem>
      );
    case 'aprovados-professor':
      return (
        <MenuItem onClick={() => handleBloquear(id, 'professor')}>Bloquear</MenuItem>
      );
    case 'ativos-aluno':
      return (
        <MenuItem onClick={() => handleBloquear(id, 'aluno')}>Bloquear</MenuItem>
      );
    case 'bloqueados-aluno':
      return (
        <MenuItem onClick={() => handleAprovar(id, 'aluno')}>Aprovar</MenuItem>
      );
    default:
      return null;
  }
}

function renderBotao(tipoSelecionado, id, handleAprovar, handleBloquear, handleExcluir) {
  switch (tipoSelecionado) {
    case 'emAprovacao-professor':
      return (
        <button className={styles.btn} onClick={() => handleAprovar(id,'professor')}>
          Aprovar
        </button>
      );
    case 'aprovados-professor':
      return (
        <button className={styles.btnBloq} onClick={() => handleBloquear(id,'professor')}>
          Bloquear
        </button>
      );
    case 'ativos-aluno':
      return (
        <button className={styles.btnBloq} onClick={() => handleBloquear(id,"aluno")}>Bloquear</button>
      );
    case 'bloqueados-aluno':
      return (
        <button className={styles.btn} onClick={() => handleAprovar(id,"aluno")}>Aprovar</button>
      );
    default:
      return null;
  }
}

export default Card;
