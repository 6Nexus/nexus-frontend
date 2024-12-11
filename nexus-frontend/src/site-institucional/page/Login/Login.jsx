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

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Tenta fazer login no endpoint 'associados/login'
          const response = await api.post('/associados/login', {
            email: email,
            senha: password,
          });
      
          // Se o login for bem-sucedido
          if (response.status === 200 && response.data?.token) {
            handleLoginSuccess(response.data, '/aluno/inicio');
          } else {
            throw new Error('Falha no login do associado.');
          }
        } catch (error) {
          // Se o primeiro login falhar, tenta o segundo endpoint
          try {
            const adminResponse = await api.post('/administradores/login', {
              email: email,
              senha: password,
            });
      
            // Se o login no endpoint de administradores for bem-sucedido
            if (adminResponse.status === 200 && adminResponse.data?.token) {
              handleLoginSuccess(adminResponse.data, '/admin/professores');
            } else {
              throw new Error('Falha no login do administrador.');
            }
          } catch (adminError) {
            // Exibe mensagem de erro para o usuário
            toast.error('Login falhou. Verifique suas credenciais.');
            console.error(adminError.message);
          }
        }
      };
      
      // Função auxiliar para lidar com o sucesso do login
      const handleLoginSuccess = (data, redirectPath) => {
        sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('usuario', data.nome);
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('email', data.email);
      
        toast.success('Login realizado com sucesso!');
        navigate(redirectPath); // Redireciona para o caminho especificado
      };
      
    const handleNavigation = (item, route) => {
        navigate(route);
    };

    return (
        <section className={styles.login}>
            <div className={styles.home}>
                <div className={styles.voltar} onClick={() => handleNavigation('home', '/')}>
                    <NavigateBeforeIcon />  <p>Voltar</p>
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
                            />
                            <span
                                className={styles.olho}
                                onClick={toggleSenhaVisivel}
                            >
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

                        <p className={styles.cadastro} >
                            Não tem uma conta? <a href="#" className={styles.linkCadastro} onClick={() => handleNavigation('cadastro', '/cadastro')}>Inscreva-se</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
