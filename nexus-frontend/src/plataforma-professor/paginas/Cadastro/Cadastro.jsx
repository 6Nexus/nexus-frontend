import React from "react";
import './Cadastro.css';
import flatDesing from '../../../utils/assets/img-flat1.png';
import logoBranca from '../../../utils/assets/logo-nexus-branca.png';
import ButtonLoginGoogle from "../../componentes/ButtonLoginGoogle/ButtonLoginGoogle.jsx";
import { Link } from "react-router-dom";
import logo from '../../../utils/assets/logo-nexus-com-texto2.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from "../../../api.js";
import { cpf } from 'cpf-cnpj-validator';

function Cadastro() {
    
    const validationSchema = Yup.object().shape({
        nome: Yup.string()
            .min(3, "O nome deve ter mais de 3 letras")
            .required(""),

        sobrenome: Yup.string()
            .min(3, "O sobrenome deve ter mais de 3 letras"),

        cpf: Yup.string()
            .test('valid-cpf', 'CPF inválido', (value) => cpf.isValid(value)) 
            .required('O CPF é obrigatório'),
      
        areaAtuacao: Yup.string()
            .required("Insira sua área de atução"), 
            
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

        confirmeSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null],'As senhas devem ser iguais')
            .required("A senha é obrigatória")

    })

    return (

         <section>

            <div className="container-cadastro">
                <div className="container-form">
                    <img className="logo" src={logo} alt="logo nexus" />
                    {/* <h1>Crie sua conta</h1> */}

                    <Formik
                        initialValues={{nome: '', sobrenome: '', email: '', senha: '', confirmeSenha: ''}} 
                        validationSchema={validationSchema} 
                        onSubmit={''} // coloca a função de enviar
                    >

                        {({isSubmitting, errors, touched}) => (
                            <Form>

                        
                            <div className="input-cadastro">
                                <Field type="text" name="nome" placeholder="Nome" />
                                <ErrorMessage name="nome" component="div" className="error-message" />

                                <Field type="text" name="sobrenome" placeholder="Sobrenome" />
                                <ErrorMessage name="sobrenome" component="div" className="error-message" />

                                <Field type="text" name="cpf" placeholder="CPF" />
                                <ErrorMessage name="cpf" component="div" className="error-message" />

                                <Field type="text" name="areaAtuacao" placeholder="Área de atuação" />
                                <ErrorMessage name="areaAtuacao" component="div" className="error-message" />

                                <Field type="text" name="email" placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error-message" />

                                <Field type="password" name="senha" placeholder="Senha" />
                                <ErrorMessage name="senha" component="div" className="error-message" />

                                <Field type="password" name="confirmeSenha" placeholder="Confirme sua senha" />
                                <ErrorMessage name="confirmeSenha" component="div" className="error-message" />
                            </div>

                                <button className="btn-cadastrar" type="submit" disabled={isSubmitting}>
                                    Criar Conta
                                </button>

                            <div className='link-logar'>
                                <p>Já tem uma conta? <Link to="/login-professor">Login</Link></p>
                            </div>
                       
                            </Form>
                        )}


                    </Formik>

                </div>
            </div>
         </section> 

    )
}

export default Cadastro;
