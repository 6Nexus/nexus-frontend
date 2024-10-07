import React from "react";
import styles from "./Home.module.css";
import imgPrincipal from '../../../utils/assets/imgPrincipal.png';
import logo from "../../../utils/assets/logotipo.svg";

const Home = () => {
    return (
        <>
            {/* NavBar */}
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <img src={logo} alt="Logo" />
                </div>
                <div className={styles.navLinks}>
                    <ul>
                        <li><a className={styles.principal} href="#home">Home</a></li>
                        <li><a href="#historia">História</a></li>
                        <li><a href="#sobreNos">Conheça a ONG</a></li>
                        <li><a href="#login">Login</a></li>
                        <li><a href="#contato">Contate-nos</a></li>
                    </ul>
                </div>
            </nav> 

            {/* Seção Home */}
            <section id="home" className={styles.home}>
                <div className={styles.container}>
                    <h1>MÃES EM <span className={styles.fontLuta}>LUTA</span></h1>
                    <p>A expressão Lorem ipsum em design gráfico e editoração é um texto<br></br>
                        padrão em latim utilizado na produção gráfica para preencher<br></br>
                        os espaços de texto testar e ajustar aspectos real. <br></br>

                    </p>

                    <div className={styles.buttonContainer}>
                        <a href="plataforma"> <button className={styles.buttonPlataforma}> Plataforma</button></a>
                        <a href="login" target="_blank"><button className={styles.buttonLogin} >Login</button>
                        </a>
                    </div>
                </div>

            </section>

            {/* Seção Sobre Nós */}
            <section id="sobreNos" className={styles.sectionAbout}>
                <div className={styles.titulo}>
                    <h1>Conheça nossa história</h1>
                </div>
                <div className={styles.conteudo}>
                    <div className={styles.infoFundadora}>
                        <div className={styles.imagemSobreNos + " " + styles.imagemSobreNos01}></div>
                        <div className={styles.textoSobreNos}>
                            <div className={styles.subTituloSobreNos}>
                                <h3>Fundadora</h3>
                            </div>

                            <div className={styles.conteudoSobreNos}>
                                <p>A expressão Lorem ipsum em design gráfico e editoração é
                                    um texto padrão em <span className={styles.destaque}>latim utilizado</span> na produção gráfica para
                                    preencher A expressão Lorem ipsum em design gráfico e <span className={styles.destaque}>editoração é um texto padrão </span>
                                    em latim utilizado na produção gráfica para preencher.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoFundadora}>
                        <div className={styles.textoSobreNos}>
                            <div className={styles.subTituloSobreNos}>
                                <h3>ONG Mães em Luta</h3>
                            </div>

                            <div className={styles.conteudoSobreNos}>
                                <p>A expressão Lorem ipsum em design gráfico e editoração é
                                    um texto padrão em <span className={styles.destaque}>latim utilizado</span> na produção gráfica para
                                    preencher A expressão Lorem ipsum em design gráfico e <span className={styles.destaque}>editoração é um texto padrão </span>
                                    em latim utilizado na produção gráfica para preencher.
                                </p>
                            </div>
                        </div>
                        <div className={styles.imagemSobreNos + " " + styles.imagemSobreNos02}></div>
                    </div>
                </div>
            </section>

            {/* Seção Beneficios */}
            <section id="beneficios" className={styles}>
                <h2>Beneficios</h2>
                <p>Aqui vai ser os beneficios</p>
            </section>

            {/* Seção Parceiros */}
            <section id="parceiros" className={styles.sectionParceiros}>
            <div className={styles.titulo}>
                    <h1>Parceiros</h1>
            </div>
            <div className={styles.conteudo}>

            </div>
            </section>

            {/* Seção Contato */}
            <section id="contato" className={styles}>
                <h2>Contate-nos</h2>
                <p>Aqui vai o conteúdo de contato...</p>
            </section>
        </>
    );
};

export default Home;
