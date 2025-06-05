import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../../utils/assets/logotipoSemTexto.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import api from "../../../api";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1ª tentativa: login em /associados/login
    api.post('/associados/login', {
      email: email,
      senha: password
    })
      .then(response => {
        if (response.status === 200 && response.data?.token) {
          // Associado autenticado com sucesso
          sessionStorage.setItem('authToken', response.data.token);
          sessionStorage.setItem('usuario', response.data.nome);
          sessionStorage.setItem('userId', response.data.userId);
          sessionStorage.setItem('email', response.data.email);

          toast.success('Login realizado com sucesso como associado!');
          navigate('/aluno/inicio');
        } else {
          // Status 200 sem token — erro inesperado
          throw new Error('Resposta inesperada de /associados/login');
        }
      })
      .catch(errorAssociado => {
        // Se for 403 para associados, exibe mensagem e interrompe
        if (errorAssociado.response?.status === 403) {
          toast.error('Acesso negado para associado! Aguarde aprovação do administrador.');
        } else {
          // Caso contrário (404, 401 ou outro), tenta admin
          api.post('/administradores/login', {
            email: email,
            senha: password
          })
            .then(responseAdmin => {
              if (responseAdmin.status === 200 && responseAdmin.data?.token) {
                // Administrador autenticado com sucesso
                sessionStorage.setItem('authToken', responseAdmin.data.token);
                sessionStorage.setItem('usuario', responseAdmin.data.nome);
                sessionStorage.setItem('userId', responseAdmin.data.userId);
                sessionStorage.setItem('email', responseAdmin.data.email);

                toast.success('Login realizado com sucesso como administrador!');
                navigate('/admin/maes');
              } else {
                throw new Error('Resposta inesperada de /administradores/login');
              }
            })
            .catch(errorAdmin => {
              if (errorAdmin.response?.status === 403) {
                toast.error('Acesso negado para administrador! Aguarde aprovação do sistema.');
              } else if (errorAdmin.response?.status === 401) {
                toast.error('E-mail ou senha incorretos! Tente novamente');
              } else {
                toast.error('Ops! Não foi possível efetuar login.');
              }
            });
        }
      });
  };

  const handleNavigation = (item, route) => {
    navigate(route);
  };

  return (
    <section className={styles.login}>
      <div className={styles.home}>
        <div className={styles.voltar} onClick={() => handleNavigation('home', '/')}>
          <NavigateBeforeIcon /> <p>Voltar</p>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.conteudo}>
          {/* Logo */}
          <div className={styles.logo}>
            <img src={logo} alt="Logotipo" />
          </div>

          {/* Título */}
          <h2 className={styles.titulo}>Faça seu Login</h2>

          {/* Formulário */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@gmail.com"
              required
            />

            <label htmlFor="senha" className={styles.label}>Senha</label>
            <div className={styles.senhaWrapper}>
              <input
                type={senhaVisivel ? "text" : "password"}
                id="senha"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                required
              />
              <span className={styles.olho} onClick={toggleSenhaVisivel}>
                {senhaVisivel ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </div>

            <div className={styles.opcoes}>
              <label>
                <input type="checkbox" className={styles.checkbox} />
                Lembrar senha
              </label>
              <a href="#" className={styles.esqueceuSenha}>Esqueceu a senha?</a>
            </div>

            <div className={styles.botaoWrapper}>
              <button type="submit" className={styles.botaoLogin}>Login</button>
            </div>

            <p className={styles.cadastro}>
              Não tem uma conta?{' '}
              <a
                href="#"
                className={styles.linkCadastro}
                onClick={() => handleNavigation('cadastro', '/cadastro')}
              >
                Inscreva-se
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
