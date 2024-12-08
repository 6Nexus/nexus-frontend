import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigation } from "../../../NavigationContext";
import styles from './ReturnPages.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ReturnPages = ({ enableReturnPages }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialized = useRef(false); // Garante inicialização única
  const { pilha, removeFromPilha } = useNavigation();

  useEffect(() => {
    if (enableReturnPages && !initialized.current) {
      initialized.current = true;
      console.log("Adicionando URL à pilha:", location.pathname);
    }
  }, [location, enableReturnPages]);

  const handleBackNavigation = () => {
    if (pilha.length > 1) {
      removeFromPilha(); // Remove a URL atual
      const previousUrl = pilha[pilha.length - 2]; // Pega a URL anterior
      console.log("Navegando para a página anterior:", previousUrl);
      navigate(previousUrl);
    } else {
      console.log("Não há páginas anteriores.");
      navigate('/aluno/cursos'); // Página padrão se a pilha estiver vazia
    }
  };

  return (
    <div className={styles['returnPages-container']}>
      <ArrowBackIcon 
        className={styles['return__icon']} 
        onClick={handleBackNavigation} 
      />
      <p className={styles['return__text']}>Voltar</p>
    </div>
  );
};

export default ReturnPages;
