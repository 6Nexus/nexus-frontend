import React from "react";
import './Login.css'
import logo from '../../../utils/assets/logo-nexus-com-texto2.png'
import ButtonLoginGoogle from "../../componentes/ButtonLoginGoogle/ButtonLoginGoogle.jsx"


function Login() {

    return (

        <div className="container-login">
            <div className="box-login">  

                    <img className="logo"  src={logo} alt="logo nexus" />
                <form action="" method="">

                    <div className="input-login">
                        <input type="text" placeholder="Email" required />
                    </div>
                    <div className="input-login">
                        <input type="password" placeholder="Senha" required />
                    </div>

                    <div className="recuperar-senha">
                        <a href="https://www.example.com">Esqueceu sua senha?</a>
                    </div>

                    <button className='acessar' type='submit'>Acessar</button>
                    <ButtonLoginGoogle />

                    <div className='registre-se'>
                        <p>Não tem uma conta? <a href="https://www.example.com">Registre-se</a></p>
                    </div>

                </form>

            </div>
        </div>
    )

}

export default Login;