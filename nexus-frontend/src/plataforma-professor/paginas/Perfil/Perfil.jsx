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
            .nullable(),
        confirmeSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], 'As senhas devem ser iguais')
            .nullable()
    });

    const id = sessionStorage.getItem('userId'); // Recupera o ID do sessionStorage

    // Carrega os dados do professor ao montar o componente
    useEffect(() => {
        if (id) {
            api.get(`/professores/${id}`)
                .then(response => {
                    console.log('Dados recebidos do backend:', response.data); // Para depuração
                    setInitialValues({
                        nome: response.data.nome || '',
                        sobrenome: response.data.sobrenome || '',
                        cpf: response.data.cpf || '', // Certifique-se de que isso só aparece se o backend retornar
                        areaAtuacao: response.data.areaAtuacao || '',
                        email: response.data.email || '',
                        senha: '', // Não tente carregar a senha aqui
                        confirmeSenha: ''
                    });
                })
                .catch(error => {
                    toast.error('Erro ao carregar dados do professor.');
                    console.error(error);
                });
        }
    }, [id]);

    const handleSalvarAlteracoesPerfil = (values, { setSubmitting, resetForm }) => {
        // Cria um payload contendo apenas os campos preenchidos (ou modificados)
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
                if (response.status === 200) {
                    toast.success('Dados atualizados com sucesso');
                    sessionStorage.setItem('username', response.data.nome);
                    sessionStorage.setItem('email', response.data.email);
                    console.log(payload); // Para depuração, exibe o que foi enviado
                    resetForm();
                } else {
                    throw new Error('Ops! Ocorreu um erro interno, tente mais tarde.');
                }
            })
            .catch(error => {
                const errorMessage = 'Erro ao atualizar dados.';
                toast.error(errorMessage);
                console.error(error);
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
