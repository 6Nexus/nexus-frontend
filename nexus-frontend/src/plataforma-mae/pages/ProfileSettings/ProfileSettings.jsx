import React from "react";
import styles from './ProfileSettings.module.css'
import SideBar from '../../components/SideBar/SideBar'
import SearchBar from "../../components/SearchBar/SearchBar";
import DownloadIcon from '@mui/icons-material/Download';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



const ProfileSettings = () => {
    const schema = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string().email("Email inválido").required("Email é obrigatório"),
        password: Yup.string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .matches(/[a-z]/, "Deve conter pelo menos uma letra minúscula")
            .matches(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
            .matches(/[0-9]/, "Deve conter pelo menos um número")
            .matches(/[!@#$%^&*]/, "Deve conter pelo menos um caractere especial")
            .required("Senha é obrigatória"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "As senhas não coincidem")
            .required("Confirmação de senha é obrigatória"),
    });

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
                                name: '',
                                email: '',
                                password: '',
                                confirmPassword: ''
                            }}
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
                        <div className={styles['sectionData__input']}>
                            <div className={styles['sectionData__input__nestedField']}>
                                <label htmlFor="">Confirme sua senha</label>
                                <input type="text" name="" id="" placeholder="*****" />
                            </div>
                            <button className={styles['sectionData__buttonDelete']}>
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ProfileSettings