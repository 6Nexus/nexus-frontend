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

    const navigate = useNavigate();

    const handleSubmit = (values, {setSubmitting, resetForm}) => {
       
        api.post('/professores', values, {
             headers:{
                'Content-Type': 'application/json'
             }
        })
        
            .then( response => {
                if(response.status === 201){
                    toast.success('Cadastro realizado com sucesso!')
                    console.log(values)
                    resetForm()
                    navigate('/curso-setup')
                } else {
                    throw new Error('Ops! Ocorreu um erro interno, tente mais tarde.');
                } 
            })

            .catch(error => {
                toast.error(error.message);
                // alert(error.message)

            })
            
            .finally(() => setSubmitting(false))
    };

    return (

         <section>

            <div className="container-cadastro">
                <div className="container-form">
                    <img className="logo" src={logo} alt="logo nexus" />
                   
                    <Formik
                        initialValues={{nome: '', sobrenome: '', cpf: '', areaAtuacao: '', email: '', senha: '', confirmeSenha: ''}} 
                        validationSchema={validationSchema} 
                        onSubmit={handleSubmit} 
                        
                    >

                        {({isSubmitting, errors, touched}) => (
                            <Form>

                        
                            <div className="input-cadastro">
                                <Field type="text" name="nome" placeholder="Nome" 
                                className={touched.nome ? errors.nome ? 'input-erro' : 'input-success' : ''}
                                />
                                <ErrorMessage name="nome" component="div" className="error-message" />

                                <Field type="text" name="sobrenome" placeholder="Sobrenome" 
                                className={touched.sobrenome ? errors.sobrenome ? 'input-erro' : 'input-success' : ''}
                                />
                                <ErrorMessage name="sobrenome" component="div" className="error-message" />

                                <Field type="text" name="cpf" placeholder="CPF" 
                                className={touched.cpf ? errors.cpf ? 'input-erro' : 'input-success' : ''}
                                />
                                <ErrorMessage name="cpf" component="div" className="error-message" />

                                <Field type="text" name="areaAtuacao" placeholder="Área de atuação" 
                                className={touched.areaAtuacao ? errors.areaAtuacao ? 'input-erro' : 'input-success' : ''}
                                />
                                <ErrorMessage name="areaAtuacao" component="div" className="error-message" />

                                <Field type="text" name="email" placeholder="Email" 
                                className={touched.email ? errors.email ? 'input-erro' : 'input-success' : ''}
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />

                                <Field type="password" name="senha" placeholder="Senha" 
                                className={touched.senha ? errors.senha ? 'input-erro' : 'input-success' : ''}
                                />
                                <ErrorMessage name="senha" component="div" className="error-message" />

                                <Field type="password" name="confirmeSenha" placeholder="Confirme sua senha" 
                                className={touched.confirmeSenha ? errors.confirmeSenha ? 'input-erro' : 'input-success' : ''}
                                />
                                <ErrorMessage name="confirmeSenha" component="div" className="error-message" />
                            </div>

                                <button className="btn-cadastrar" type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
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
