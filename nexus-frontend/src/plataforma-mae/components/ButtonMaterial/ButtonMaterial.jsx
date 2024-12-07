import * as React from 'react';
import styles from './ButtonMaterial.module.css'
import DownloadIcon from '@mui/icons-material/Download';

const ButtonMaterial = () => {
    const handleDownload = () => {
        const fileUrl = 'https://drive.google.com/uc?export=download&id=1vyxMiQZD2as7v-93uc5zvAb00JN-9yUN';

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'material_de_apoio.docx'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className={styles['buttonMaterial-container']}>
                <button className={styles['buttonMaterial-container__button']} onClick={handleDownload}>
                    <DownloadIcon/>
                    Baixar materiais de apoio
                </button>
            </div>
        </>
    )
}

export default ButtonMaterial;
