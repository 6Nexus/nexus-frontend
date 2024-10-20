import * as React from 'react';
import styles from './ButtonMaterial.module.css'
import DownloadIcon from '@mui/icons-material/Download';

const ButtonMaterial = () => {
    return (
        <>
            <div className={styles['buttonMaterial-container']}>
                <button className={styles['buttonMaterial-container__button']}>
                    <DownloadIcon/>
                    Baixar materiais de apoio
                </button>
            </div>
        </>
    )
}

export default ButtonMaterial;
