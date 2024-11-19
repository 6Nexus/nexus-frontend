import React from "react"; 
import styles from "./Home.module.css";
import logo from "../../../utils/assets/logotipo.svg";
import MarkunreadIcon from '@mui/icons-material/Markunread';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handleNavigation = (item, route) => {
        navigate(route);
    };

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
                        <li onClick={() => handleNavigation('login', '/login')}><a href="#login">Login</a></li>
                        <li><a href="#contato">Contate-nos</a></li>
                    </ul>
                </div>
            </nav>

            {/* Seção Home */}
            <section id="home" className={styles.home}>
                <div className={styles.container}>
                    <h1>MÃES EM <span className={styles.fontLuta}>LUTA</span></h1>
                    <p>A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim<br></br>
                        padrão em latim utilizado na produção gráfica para preencher padrão em latim utilizado<br></br>
                        os espaços de texto testar e ajustar aspectos real. <br></br>

                    </p>

                    <div className={styles.buttonContainer} onClick={() => handleNavigation('login', '/login')}>
                        <a href=""> <button className={styles.buttonPlataforma}> Plataforma</button></a>
                        {/* <a href="login" target="_blank"><button className={styles.buttonLogin} >Login</button>
                        </a> */}
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
            <section id="beneficios" className={styles.sectionBeneficios}>
                <div className={styles.titulo}>
                    <h1>Beneficios</h1>
                </div>

                <div className={styles.containerBeneficios}>
                    <div className={styles.conteudoBeneficios}>
                        <div className={styles.cardBeneficios}>
                            <div className={styles.imgBeneficios01}></div>
                            <div className={styles.plataformaDeCursos}>
                                <div className={styles.icone}> <SchoolOutlinedIcon fontSize="large" className={styles.customIcon} />  </div>
                                <div className={styles.textoBeneficios + " " + styles.textoBeneficios01}>
                                    <p>
                                        Plataforma<br></br>
                                        De Cursos.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardBeneficios}>
                            <div className={styles.forumParaAjuda}>
                                <div className={styles.textoBeneficios + " " + styles.textoBeneficios02}>
                                    <p>
                                        Fórum<br></br>
                                        Para Ajuda.
                                    </p>
                                </div>
                                <div className={styles.icone}>  <GroupsIcon fontSize="large" className={styles.customIcon2} /> </div>
                            </div>
                            <div className={styles.professor}>
                                <div className={styles.icone}> <FavoriteBorderRoundedIcon fontSize="large" className={styles.customIcon} /> </div>
                                <div className={styles.textoBeneficios + " " + styles.textoBeneficios03}>
                                    <p>
                                        Torne-se<br></br>
                                        Um Professor<br></br>
                                        Voluntário.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardBeneficios}>
                            <div className={styles.desaparecidos}></div>
                        </div>
                        <div className={styles.cardBeneficios}>
                            <div className={styles.sejaParceiro}>
                                <div className={styles.icone}> <HandshakeIcon fontSize="large" className={styles.customIcon} /> </div>
                                <div className={styles.textoBeneficios + " " + styles.textoBeneficios01}>
                                    <p>
                                        Seja Nosso<br></br>
                                        Parceiro.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.imgBeneficios02}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção Parceiros */}
            <section id="parceiros" className={styles.sectionParceiros}>
                <div className={styles.titulo}>
                    <h1>Parceiros</h1>
                </div>

                <div className={styles.conteudo}>
                    <div className={styles.teste01}></div>
                    <div className={styles.teste02}></div>
                    <div className={styles.teste03}></div>
                    <div className={styles.teste04}></div>
                </div>
            </section>

            {/* Seção Contato */}
            <section id="contato" className={styles.footer}>
                <div className={styles.containerFooter}>
                    {/* Redes Sociais */}
                    <div className={styles.footerRedes}>
                        <h4>Mães em Luta</h4>
                        <p>Acesse nossas redes:</p>

                        <div className={styles.Redes}>
                            <div className={styles.instagram}> <InstagramIcon fontSize="small" /> </div>
                            <div className={styles.twitter}> <XIcon fontSize="small" /> </div>
                            <div className={styles.facebook}> <FacebookIcon fontSize="small" /> </div>
                        </div>

                    </div>

                    {/* Endereço e contato */}
                    <div className={styles.footerInfo}>
                        <h4>Contatos</h4>
                        <p>Rua Exemplo, 1234, Bairro Centro<br /> São Paulo, SP, Brasil</p>
                        <p>Email: contato@maesemluta.org</p>
                        <p>Telefone: +55 (11) 1234-5678</p>

                    </div>

                    {/* Formulário de contato ou simples caixa de mensagem */}
                    <div className={styles.footerFaleConosco}>
                        <h4>Fale Conosco</h4>
                        <button className={styles.buttonContato}>Envie sua mensagem <MarkunreadIcon /> </button>

                    </div>

                </div>

                <hr />

                <div className={styles.DiretrizesFooter}>
                    <h4>Copyright © 2024 Mel Inc. Todos os direitos reservados. Mulheres em Luta Ltda. CNPJ: 00.000.000/0000-00</h4>
                </div>

            </section>
        </>
    );
};

export default Home;
