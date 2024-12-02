import React from "react";
import './Perfil.css';
import UploadImagem from "../../componentes/UploadImagem/UploadImagem";
import SideBar from "../../componentes/SideBar/SideBar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from "../../../api";
import { cpf } from 'cpf-cnpj-validator';


function Perfil() {

    const validationSchemaPerfil = Yup.object().shape({
        nome: Yup.string()
            .min(3, "O nome deve ter mais de 3 letras")
            .nullable(), 
    
        sobrenome: Yup.string()
            .min(3, "O sobrenome deve ter mais de 3 letras")
            .nullable(),
    
        cpf: Yup.string()
            .test('valid-cpf', 'CPF inválido', (value) => !value || cpf.isValid(value))
            .nullable(),
    
        areaAtuacao: Yup.string()
            .nullable(),
    
        email: Yup.string()
            .email("Formato de email inválido")
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|int|biz|info|br|com\.br|org\.br|edu\.br)$/,
                "Por favor, insira um email com um domínio válido."
            )
            .nullable(),
    
        senha: Yup.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .nullable(),
    
        confirmeSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais')
            .nullable()
    });
    

    const id = sessionStorage.getItem('userId')

    const handleSlvarAlteracoesPerfil = (values, { setSubmitting, resetForm }) => {

        api.put(`professores/${id}`, values, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(response => {
                if (response.status === 200) {
                    toast.success('Dados atualizados com sucesso')
                    console.log(values)
                    resetForm()
                } else {
                    throw new Error('Ops! Ocorreu um erro interno, tente mais tarde.');
                }
            })

            .catch(error => {
                toast.error(error.message);

            })

            .finally(() => setSubmitting(false))

            console.log(JSON.stringify(values));
            
    }


    return (
        <>

            <SideBar backgroundColor={'#94065E'} />
            <div>
                <div className="container-geral">   
                    <div className="container-info">
                        <Formik
                            initialValues={{ nome: '', sobrenome: '', cpf: '', areaAtuacao: '', email: '', senha: '', confirmeSenha: '' }}
                            validationSchema={validationSchemaPerfil}
                            onSubmit={handleSlvarAlteracoesPerfil}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="infos">
                                    <h4>Informações Pessoais</h4>


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

                                    <div className="btn-editar-info">
                                        <button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'Salvando...' : 'Salvar'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Perfil;