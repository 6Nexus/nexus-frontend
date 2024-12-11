import React, { useEffect, useState } from "react";
import './Perfil.css';
import UploadImagem from "../../componentes/UploadImagem/UploadImagem";
import SideBar from "../../componentes/SideBar/SideBar";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from "../../../api";
import { cpf } from 'cpf-cnpj-validator';

function Perfil() {
    const [initialValues, setInitialValues] = useState({
        nome: '',
        sobrenome: '',
        cpf: '',
        areaAtuacao: '',
        email: '',
        senha: '',
        confirmeSenha: ''
    });

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
            .nullable(),
        senha: Yup.string()
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .required('Insira sua senha para confirmar atualização'),
        confirmeSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais')
            .required('Insira sua senha para confirmar atualização')
    });

    const id = sessionStorage.getItem('userId');
    

    // Carrega os dados do professor ao montar o componente
    useEffect(() => {
        if (id) {
            api.get(`/professores/${id}`)
                .then(response => {
                    console.log('Dados recebidos do backend:', response.data);
                    setInitialValues({
                        nome: response.data.nome || '',
                        sobrenome: response.data.sobrenome || '',
                        cpf: response.data.cpf || '',
                        areaAtuacao: response.data.areaAtuacao || '',
                        email: response.data.email || '',
                        senha: '',
                        confirmeSenha: ''
                    });
                })
                .catch(error => {
                    toast.error('Erro ao carregar dados do professor.');
                    console.error(error);
                });
        }
    }, [id]);

    const handleSalvarAlteracoesPerfil = (values, { setSubmitting, resetForm, setValues }) => {
        const payload = {};
        Object.keys(values).forEach((key) => {
            if (values[key] !== undefined && values[key] !== '') {
                payload[key] = values[key];
            }
        });
    
        api.put(`professores/${id}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Resposta recebida:', response); 
                if (response.status >= 200 && response.status < 300) {
                    try {
                        toast.success('Dados atualizados com sucesso');
                        sessionStorage.setItem('username', response.data.nome);
                        sessionStorage.setItem('email', response.data.email);
                        console.log('Payload enviado:', payload); 
                        
                        setValues(response.data);
                    } catch (formError) {
                        console.error('Erro ao redefinir o formulário:', formError);
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao atualizar perfil:', error); 
                toast.error('Erro ao atualizar os dados.');
            })
            .finally(() => setSubmitting(false));
    };
    


    return (
        <>
            <SideBar backgroundColor={'#94065E'} />
            <div>
                <div className="container-geral">
                    <div className="container-info">
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize // Permite que o formulário re-inicialize com os valores do state
                            validationSchema={validationSchemaPerfil}
                            onSubmit={handleSalvarAlteracoesPerfil}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="infos">
                                    <h4>Informações Pessoais</h4>

                                    <Field type="text" name="nome" placeholder="Nome"
                                        className={touched.nome ? errors.nome ? 'input-erro' : 'input-success' : ''}
                                    />
                                    <ErrorMessage name="nome" component="div" className="error-message" />

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
    );
}

export default Perfil;
