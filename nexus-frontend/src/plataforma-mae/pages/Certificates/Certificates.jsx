import React from "react";
import styles from './Certificates.module.css'
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import HeaderCategory from "../../components/HeaderCategory/HeaderCategory";
import CardCertificate from "../../components/CardCertificate/CardCertificate";

const Certificates = () => {
    return (
        <>
            <div className={styles["certificates-container"]}>
                <SideBar backgroundColor={'#245024'}/>

                <div className={styles["certificates-container__content"]}>
                    <SearchBar />
                    <HeaderCategory/>

                    <div className={styles['certificates-container__content__cardCertificateList']}>
                        <CardCertificate/>
                    </div>
                    
                </div>
            </div>
        </>
    );
};
export default Certificates