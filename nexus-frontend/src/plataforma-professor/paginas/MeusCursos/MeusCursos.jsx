import React from "react";
import './MeusCursos.css'
import SideBar from "../../componentes/SideBar/SideBar";



function MeusCursos(){

    return (
        <>
            <SideBar backgroundColor={'#94065E'}/>
            <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                   os cursos criados fica aqui 
           </span>
        </>
    )

}
export default MeusCursos;