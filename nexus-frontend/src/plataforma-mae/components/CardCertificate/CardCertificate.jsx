import * as React from "react";
import { jsPDF } from "jspdf";
import styles from './CardCertificate.module.css'
import DownloadIcon from '@mui/icons-material/Download';
import LayoutCertificado from '../../../utils/assets/capa-certificado.png'

const CardCertificate = ({ name, title, module, teacher, duration, date }) => {
    const gerarCertificado = () => {
        const doc = new jsPDF("landscape", "mm", "a4");

        const layout = new Image();
        layout.src = LayoutCertificado;
        doc.addImage(layout, "PNG", 0, 0, 297, 210);

        const setCommonFont = (font = "Helvetica", style = "normal", size = 12, color = [36, 80, 36]) => {
            doc.setFont(font, style);
            doc.setFontSize(size);
            doc.setTextColor(...color);
        };
        
        setCommonFont("Helvetica", "bold", 16, [59, 157, 59]);
        const nameCertificate = `${name}`;
        const marginLeft = 61;
        const maxWidth = 200;
        const lines = doc.splitTextToSize(nameCertificate, maxWidth);
        doc.text(lines, marginLeft, 70);
        
        setCommonFont("Helvetica", "bold", 12, [36, 80, 36]);
        const text = `Concluiu com sucesso o módulo '${module}', ministrado por ${teacher}, com uma carga horária estimada de ${duration} horas.`;
        const lines2 = doc.splitTextToSize(text, maxWidth);
        doc.text(lines2, marginLeft, 78);
        
        const dateCertificate = `Data: ${date}`;
        const lines3 = doc.splitTextToSize(dateCertificate, maxWidth);
        doc.text(lines3, marginLeft, 92);
        
        setCommonFont("Helvetica", "normal", 25, [59, 157, 59]);
        const course = `Curso: ${title}`;
        const lines4 = doc.splitTextToSize(course, maxWidth);
        doc.text(lines4, marginLeft, 115);
        
        doc.save(`${title} - ${module}.pdf`);
    };

    return (
        <>
            <div className={styles["card-curso-container"]}>
                <div className={styles['card-curso-container__informations']}>
                    <img src={LayoutCertificado} />
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

                <button className={styles['card-curso-container__button']} onClick={gerarCertificado}>
                    <DownloadIcon />
                    Baixar certificado
                </button>
            </div>
        </>
    );
};
export default CardCertificate;