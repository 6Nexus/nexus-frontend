import React from "react";
import styles from './ProfileSettings.module.css'
import SideBar from '../../components/SideBar/SideBar'
import SearchBar from "../../components/SearchBar/SearchBar";
import DownloadIcon from '@mui/icons-material/Download';


const ProfileSettings = () => {
    return (
        <>

            <div className={styles['profileSettings-container']}>
                <SideBar backgroundColor={'#245024'} />
                <div className={styles['profileSettings-container__content']}>
                    <SearchBar />

                    <div className={styles['profileSettings-container__content__sectionData']}>
                        <h1 className={styles['sectionData__title']}>Informações pessoais</h1>

                        <div className={styles['sectionData__input']}>
                            <div className={styles['sectionData__input__nestedField']}>
                                <label htmlFor="">Nome</label>
                                <input type="text" name="" id="" placeholder="Seu nome" />
                            </div>
                            <div className={styles['sectionData__input__nestedField']}>
                                <label htmlFor="">Email</label>
                                <input type="text" name="" id="" placeholder="nome@gmail.com" />
                            </div>
                        </div>

                        <div className={styles['sectionData__input']}>
                            <div className={styles['sectionData__input__nestedField']}>
                                <label htmlFor="">Senha</label>
                                <input type="text" name="" id="" placeholder="*****" />
                            </div>
                        </div>

                        <button className={styles['sectionData__buttonSave']}>Salvar</button>
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