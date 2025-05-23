import React, { useState } from "react";
import api from "../../../api"; // <- aqui
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
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleAprovar = async (id, tipo) => {
		try {
			if (tipo === "professor") {
				await api.put(`/administradores/professor/aprovar/${id}`);
				// alert("Professor aprovado com sucesso!");
				toast.success("Professor aprovado com sucesso!")
			} else if (tipo === "aluno") {
				await api.put(`/administradores/associados/aprovar/${id}`);
				// alert("Aluno aprovado com sucesso!");
				toast.success("Aluno aprovado com sucesso!")
			}
		} catch (error) {
			console.error(`Erro ao aprovar o ${tipo}:`, error);
			// alert(`Erro ao aprovar o ${tipo}:`);
			toast.error(`Erro ao aprovar o ${tipo}:`)
		}
	};

	const handleBloquear = async (id, tipo) => {
		try {
			if (tipo === "professor") {
				await api.put(`/administradores/professor/bloquear/${id}`);
				// alert("Professor bloqueado com sucesso!");
				toast.success("Professor bloqueado com sucesso!")
			} else if (tipo === "aluno") {
				await api.put(`/administradores/associados/bloquear/${id}`);
				// alert("Aluno bloqueado com sucesso!");
				toast.success("Aluno bloqueado com sucesso!")
			}
		} catch (error) {
			console.error(`Erro ao bloquear o ${tipo}:`, error);
			// alert(`Erro ao bloquear o ${tipo}:`);
			toast.error(`Erro ao bloquear o ${tipo}:`)
		}
	};

	const handleExcluir = async (id) => {
		try {
			await api.delete(`/associados/${id}`);
			// alert("Associado excluído com sucesso!");
						toast.success('Associado excluído com sucesso!');
		} catch (error) {
			console.error("Erro ao excluir o associado:", error);
			alert("Ocorreu um erro ao tentar excluir o associado.");
		}
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
						{renderBotao(tipoSelecionado, dado.id, handleAprovar, handleBloquear, handleExcluir)}
					</div>
				</div>
			))}
		</div>
	);
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
				<>
					{/* <button className={styles.btnBloq} onClick={() => handleExcluir(id)}>Aprovar</button> */}
                    <button className={styles.btnBloq} onClick={() => handleBloquear(id,"aluno")}>Bloquear</button>
				</>
			);
        case 'bloqueados-aluno':
            return (
				<>
					<button className={styles.btn} onClick={() => handleAprovar(id,"aluno")}>Aprovar</button>
                    {/* <button className={styles.btnBloq} onClick={() => handleExcluir(id)}>Bloquear</button> */}
				</>
			);
		default:
			return null;
	}
}

export default Card;
