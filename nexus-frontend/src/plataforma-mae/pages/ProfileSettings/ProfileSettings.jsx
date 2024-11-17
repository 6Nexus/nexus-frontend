import React from "react";
import styles from './ProfileSettings.module.css'
import SideBar from '../../components/SideBar/SideBar'
import SearchBar from "../../components/SearchBar/SearchBar";
import DownloadIcon from '@mui/icons-material/Download';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import api from "./../../../api";
import Swal from 'sweetalert2';

const ProfileSettings = () => {
    const schema = Yup.object().shape({
        email: Yup.string().email("Email inválido"),
        password: Yup.string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .matches(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
            .matches(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
            .matches(/[0-9]/, "Deve conter pelo menos um número")
            .matches(/[!@#$%^&*]/, "Deve conter pelo menos um caractere especial"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "As senhas não coincidem")
    });

    const schemDelete = Yup.object().shape({
        passwordDelete: Yup.string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("Para excluir a conta é obrigatório confirmar sua senha atual")
    });

    const userName = sessionStorage.getItem('usuario');
    const userEmail = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('authToken');
    const id = sessionStorage.getItem('userId');

    function salvarDados(values) {
        Swal.fire({
            title: "Confirmar atualização",
            text: "Tem certeza de que deseja atualizar os dados?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B9D3B",
            cancelButtonColor: "#dadada",
            cancelTextColor: "#00000",
            confirmButtonText: "Confimar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                api
                    .put(`associados/${id}`,
                        {
                            nome: values.name || null,
                            email: values.email || null,
                            senha: values.password || null,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        if (response.status == 201) {
                            Swal.fire({
                                title: "Atualizado!",
                                text: "Seus dados foram atualizados com sucesso.",
                                icon: "success"
                            });

                            sessionStorage.setItem('usuario', response.data.nome);
                            sessionStorage.setItem('email', response.data.email)

                        } else {
                            Swal.fire({
                                title: "Erro ao realizar sua solicitação",
                                text: "Por favor, tente novamente mais tarde ou entre em contato com o suporte se o erro persistir.",
                                icon: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Erro ao realizar sua solicitação",
                            text: "Por favor, tente novamente mais tarde ou entre em contato com o suporte se o erro persistir.",
                            icon: "error"
                        });
                    });


            }
        });
    }

    function excluirConta(values) {
        Swal.fire({
            title: "Confirmar exclusão",
            text: "Tem certeza de que deseja excluir permanentemente a sua conta?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3B9D3B",
            cancelButtonColor: "#dadada",
            cancelTextColor: "#00000",
            confirmButtonText: "Confimar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(userEmail, values.passwordDelete);
                api
                    .delete(`associados/${id}`,
                        {
                            data: {
                                email: userEmail,
                                senha: values.passwordDelete,
                            }
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then((response) => {
                        if (response.status == 204) {
                            Swal.fire({
                                title: "Conta excluída!",
                                text: "Sua conta foi excluída com sucesso. Iremos te redirecionar para o login.",
                                icon: "success"
                            }).then(() => {
                               sessionStorage.clear();
                                window.location.href = '/login';
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.status == 401) {
                            Swal.fire({
                                title: "Erro ao realizar exclusão",
                                text: "A senha informada está incorreta.",
                                icon: "error"
                            });
                        } else {
                            Swal.fire({
                                title: "Erro ao realizar sua solicitação",
                                text: "Por favor, tente novamente mais tarde ou entre em contato com o suporte se o erro persistir.",
                                icon: "error"
                            });
                        }
                    });
            }
        });
    }

    return (
        <>

            <div className={styles['profileSettings-container']}>
                <SideBar backgroundColor={'#245024'} />
                <div className={styles['profileSettings-container__content']}>
                    <SearchBar />

                    <div className={styles['profileSettings-container__content__sectionData']}>
                        <h1 className={styles['sectionData__title']}>Informações pessoais</h1>

                        <Formik
                            validationSchema={schema}
                            initialValues={{
                                name: userName || '',
                                email: userEmail || '',
                                password: '',
                                confirmPassword: ''
                            }}
                            onSubmit={(values) => salvarDados(values)}
                        >
                            {({ errors }) => (
                                <Form className={styles['sectionData__form']}>
                                    <div className={styles['sectionData__input']}>
                                        <div className={styles['sectionData__input__nestedField']}>
                                            <label htmlFor="name">Nome</label>
                                            <Field type="text" name="name" id="name" placeholder="Seu nome" />
                                            {errors.name && (
                                                <p className={styles['sectionData__input__error']}>{errors.name}</p>
                                            )}
                                        </div>
                                        <div className={styles['sectionData__input__nestedField']}>
                                            <label htmlFor="name">Email</label>
                                            <Field type="text" name="email" id="email" placeholder="nome@gmail.com" />
                                            {errors.email && (
                                                <p className={styles['sectionData__input__error']}>{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles['sectionData__input']}>
                                        <div className={styles['sectionData__input__nestedField']}>
                                            <label htmlFor="password">Senha</label>
                                            <Field type="text" name="password" id="password" placeholder="*****" />
                                            {errors.password && (
                                                <p className={styles['sectionData__input__error']}>{errors.password}</p>
                                            )}
                                        </div>
                                        <div className={styles['sectionData__input__nestedField']}>
                                            <label htmlFor="confirmPassword">Confirmar senha</label>
                                            <Field type="text" name="confirmPassword" id="confirmPassword" placeholder="*****" />
                                            {errors.confirmPassword && (
                                                <p className={styles['sectionData__input__error']}>{errors.confirmPassword}</p>
                                            )}
                                        </div>
                                    </div>
                                    <button type="submit" className={styles['sectionData__buttonSave']}>Salvar</button>
                                </Form>
                            )}
                        </Formik>



                    </div>
                    <div className={styles['profileSettings-container__content__sectionData']}>
                        <h1 className={styles['sectionData__title']}>Termos de uso e política de privacidade</h1>
                        <button className={styles['sectionData__buttonTerm']}>
                            <DownloadIcon />
                            Acesso aos termos de uso
                        </button>
                    </div>
                    <div className={styles['profileSettings-container__content__sectionData']}>
                        <h1 className={styles['sectionData__title']}>Quero excluir minha conta</h1>
                        <Formik
                            validationSchema={schemDelete}
                            initialValues={{
                                passwordDelete: '',
                            }}
                            onSubmit={(values) => excluirConta(values)}
                        >
                            {({ errors }) => (
                                <Form className={styles['sectionData__form']}>
                                    <div className={styles['sectionData__input']}>
                                        <div className={styles['sectionData__input__nestedField']}>
                                            <label htmlFor="">Confirme sua senha</label>
                                            <Field type="text" name="passwordDelete" id="passwordDelete" placeholder="*****" />
                                            {errors.passwordDelete && (
                                                <p className={styles['sectionData__input__error']}>{errors.passwordDelete}</p>
                                            )}
                                        </div>
                                        <button type="submit" className={styles['sectionData__buttonDelete']}>
                                            Excluir
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
};
export default ProfileSettings