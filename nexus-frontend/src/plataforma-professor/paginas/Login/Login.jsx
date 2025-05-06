import React, { useState } from "react";
import './Login.css'
import logo from '../../../utils/assets/logo-nexus-com-texto2.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import api from "../../../api.js";


function Login() {

    // validações
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Formato de email inválido") 
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|biz|info|br|com\.br|org\.br|edu\.br)$/, 
                "Por favor, insira um email com um domínio válido."
            )
            .required("O email é obrigatório"),

            senha: Yup.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .required("A senha é obrigatória"),
    });


    // useState para alterar estado de visibilidade da senha
    const [senhaVisivel, setSenhaVisivel] = useState(false)

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    };

    const navigate = useNavigate();

    // const [userLoginInfo, setUserLoginInfo] = useState({
    //     email: '',
    //     senha: ''
    // })

    const handleSubmit = (values) => {

        api.post('/professores/login', { 
            email: values.email,
            senha: values.senha
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200 && response.data?.token) {
                    sessionStorage.setItem('username', response.data.nome)
                    sessionStorage.setItem('authToken', response.data.token)
                    sessionStorage.setItem('userId', response.data.userId) 

                    // alert("Login sucess")
                    toast.success('Login realizado com sucesso!');
                    navigate('/curso-setup');
                } else {
                    // alert("Falhou")              
                    throw new Error('Ops! Ocorreu um erro interno.');
                    
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                            toast.error('Acesso negado! Aguarde sua conta ser aprovado pelo administrador do sistema');
                }else{
                toast.error('Ops! Ocorreu um erro interno.');
                // alert(error.message)
                }
            });
    };


    return (

        <div className="container-login">
            <div className="box-login">

                <img className="logo" src={logo} alt="logo nexus" />
                <Formik 
                    initialValues={{ email: '', senha: '' }} 
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}

                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <div className="input-login">
                                <Field
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className={touched.email ? errors.email ? 'input-erro' : 'input-success' : ''}
                                />

                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>

                            <div className="input-login">
                                <Field
                                    type={senhaVisivel ? 'text' : 'password'}
                                    name="senha"
                                    placeholder="Senha"
                                    className={touched.senha ? errors.senha ? 'input-erro' : 'input-success' : ''}
                                />
                                <span
                                    className="icon-olho"
                                    onClick={toggleSenhaVisivel}
                                >
                                    {senhaVisivel ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                                <ErrorMessage name="senha" component="div" className="error-message" />
                            </div>

                            <div className="recuperar-senha">
                                <a href="https://www.example.com">Esqueceu sua senha?</a>
                            </div>



                            <button className="acessar" type="submit" disabled={isSubmitting}>
                                Acessar
                            </button>


                            <div className="registre-se">
                                <p>Não tem uma conta? <Link to="/cadastro-professor">Registre-se</Link></p>
                            </div>
                        </Form>
                    )}

                </Formik>

            </div>
        </div>
    )

}

export default Login;