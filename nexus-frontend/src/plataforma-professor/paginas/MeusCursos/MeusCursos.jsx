import React from "react";
import './MeusCursos.css'
import SideBar from "../../componentes/SideBar/SideBar";
import CardCurso from "../../../plataforma-mae/components/CardCurso/CardCurso"
import { display } from "@mui/system";



function MeusCursos(){

    return (
        <>
            <SideBar backgroundColor={'#94065E'} />
            <div style={{backgroundColor: '#F3F3F3'}}>

            <div 
                className="meus-cursos-criados" 
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10px',
                    gap: '10px',
                    marginLeft: '5rem',
                    height: 'auto'
                }}
            >
                {[...Array(8)].map((_, index) => (
                    <div 
                        key={index} 
                        className="card-cursos-criados"
                        style={{
                            width: '300px', 
                            height: '300px',
                            marginTop: '10rem',
                            
                        }}
                    >
                        <CardCurso  inProgress={{display: 'block'}} />
                    </div>
                ))}
            </div>

            </div>
        </>
    )
    
    

}
export default MeusCursos;