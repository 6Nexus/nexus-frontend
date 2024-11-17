import React, { useState } from "react";
import styles from "./Login.module.css";
import logo from "../../../utils/assets/logotipoSemTexto.png";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HomeIcon from '@mui/icons-material/Home';
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      api.post('/associados/login', {
        email: email,
        senha: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200 && response.data?.token) {
            sessionStorage.setItem('authToken', response.data.token);
            sessionStorage.setItem('usuario', response.data.nome);
            sessionStorage.setItem('userId',response.data.userId)
            sessionStorage.setItem('email',response.data.email)
  
            toast.success('Login realizado com sucesso!');
            navigate('/aluno/inicio');
          } else {
            alert("Falhou")
            throw new Error('Ops! Ocorreu um erro interno.');
          }
        })
        .catch(error => {
          toast.error(error.message);
        alert(error.message)

        });
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
