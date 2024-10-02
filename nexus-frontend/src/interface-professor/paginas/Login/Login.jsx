import React from 'react';
import './Login.css'
import logo from '../../assets/imagens/logo-nexus-com-texto2.png';
import ButtonLoginGoogle from '../../componentes/ButtonLoginGoogle/ButtonLoginGoogle';

export default function Login() {

    return (

        <div className='container-login'>
            <div className='box-login'>
                <div className='logo'>
                    <img src={logo} alt="logo nexus" />
                </div>
                <form action="" method="">
                    <div className='input-login'>
                        <input type="text" id='email' name='email' placeholder='Email' />
                        <input type="password" id='senha' name='senha' placeholder='Senha' />
                    </div>
                    <button  className='acessar' type='submit'>Acessar</button>
                    <ButtonLoginGoogle />
                    <div className='registre-se'>
                        <p style={{ fontSize: '10px' }}>Não tem uma conta? <a href="https://www.example.com" style={{ color: '#94065E', fontWeight: '500', cursor: 'pointer'}}>Registre-se</a></p>
                    </div>
                </form>
            </div>
        </div>


    )

}

// criar o button de logar com o google separado (componente)
// fazer a integraçao aqui 