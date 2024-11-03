import * as React from "react";
import styles from './CardCertificate.module.css'
import DownloadIcon from '@mui/icons-material/Download';
import imagemTeste from '../../../utils/assets/teste-certificado.png'

const CardCertificate = ({title, teacher, duration, date}) => {
    return (
        <>
            <div className={styles["card-curso-container"]}>
                <div className={styles['card-curso-container__informations']}>
                    <img src={imagemTeste} />
                    <div className={styles['informations__description']}>
                        <h1 className={styles['description__title']}>{title}</h1>

                        <div className={styles['description__main']}>
                            <h4 className={styles['main__text']}>Professor(a): {teacher}</h4>
                            <h4 className={styles['main__text']}>Duração: {duration}</h4>
                        </div>

                        <h4 className={styles['description__date']}>
                            Retirado em {date}
                        </h4>
                    </div>

                </div>

                <button className={styles['card-curso-container__button']}>
                    <DownloadIcon />
                    Baixar certificado
                </button>
            </div>
        </>
    );
};
export default CardCertificate;