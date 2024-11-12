import React from "react";
import './Cadastro.css';
import flatDesing from '../../../utils/assets/img-flat1.png';
import logoBranca from '../../../utils/assets/logo-nexus-branca.png';
import ButtonLoginGoogle from "../../componentes/ButtonLoginGoogle/ButtonLoginGoogle.jsx";
import { Link } from "react-router-dom";
import logo from '../../../utils/assets/logo-nexus-com-texto2.png'

 
function Cadastro() {

    return ( 

        <section>
            {/* <div className="container-banner">
                <a href="#"><img className="logoBranca" src={logoBranca} /></a>
                <h1>Registre-se para fazer parte da nossa comunidade de <br /> professores!</h1>
                <img className="img-flat" src={flatDesing} alt="" />
            </div> */}
            <div className="container-cadastro">
                <div className="container-form">
                <img className="logo"  src={logo} alt="logo nexus" />
                    <h1>Crie sua conta</h1>
                    <form action="" method=""> 
                        <div className="input-cadastro">
                            <input type="text" placeholder="Nome" required />
                            <input type="text" placeholder="Sobrenome" required />
                            <input type="text" placeholder="Email" required />
                            <input type="text" placeholder="Senha" required />
                            <input type="text" placeholder="Confirme sua senha" required />

                            <button className="btn-cadastrar">Criar Conta</button>
                            {/* <ButtonLoginGoogle /> */}
                        </div>
                        <div className='link-logar'>
                            <p>Já tem uma conta? <Link to="/login-professor">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default Cadastro;
