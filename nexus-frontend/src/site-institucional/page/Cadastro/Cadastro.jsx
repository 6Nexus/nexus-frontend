import React, { useState } from 'react';
import styles from './Cadastro.module.css';
import logo from '../../../utils/assets/logotipoSemTexto.png';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useNavigate } from 'react-router-dom';
import api from '../../../api';
import { toast } from 'react-toastify';

const Cadastro = () => {
    // const [step, setStep] = useState(1);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        senha: '',
        telefone: '',
        // rg: '',
        // cpf: '',
        // dataNascimento: '',
        // endereco: '',
        // localNascimento: '',
        // grauParentesco: '',
        // nomeDesaparecido: '',
        // apelido: '',
        // rgDesaparecido: '',
        // cpfDesaparecido: '',
        // dataNascimentoDesaparecido: '',
        // desapareceuAntes: '',
        // corPele: '',
        // corOlhos: '',
        // sexo: '',
        // dataOcorrencia: '',
        // dataComunicacao: '',
        // ultimoLocalVisto: '',
        // roupaDesaparecimento: '',
    });

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    // const nextStep = () => {
    //     if (step < 3) setStep(step + 1);
    // };

    // const previousStep = () => {
    //     if (step > 1) setStep(step - 1);
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const dadosEnvio = {
            nome: formData.nomeCompleto,
            email: formData.email,
            senha: formData.senha,
            telefone: formData.telefone
        };

        try {
            const response = await api.post('/associados', dadosEnvio);

            if (response.status === 201 || response.status === 200) {
                toast.success("Cadastro realizado com sucesso!");
                navigate('/login');
            } else {
                throw new Error("Erro ao realizar cadastro. Tente novamente.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Erro ao realizar cadastro.");
            console.error("Erro no cadastro:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const navigate = useNavigate();
    const handleNavigation = (item, route) => {
        navigate(route);
    };

    return (
        <section className={styles.cadastro}>
            <div className={styles.home}>
                <div className={styles.voltar} onClick={() => handleNavigation('login', '/login')}>
                    <NavigateBeforeIcon /> <p>Voltar</p>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.conteudo}>
                    <div className={styles.logo}>
                        <img src={logo} alt="Logotipo" />
                    </div>
                    <h2 className={styles.titulo}> Cadastro </h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        {/* {step === 1 && ( */}
                            <>
                                <div className={styles.sectionTitle}>Informações do Parente</div>
                                <div className={styles.row}>
                                    <input type="text" name="nomeCompleto" placeholder="Nome completo" className={styles.input} onChange={handleChange} />
                                    <input type="email" name="email" placeholder="Email" className={styles.input} onChange={handleChange} />
                                </div>
                                <div className={styles.row}>
                                    <input type="password" name="senha" placeholder="Senha" className={styles.input} onChange={handleChange} />
                                    <input type="text" name="telefone" placeholder="Telefone" className={styles.input} onChange={handleChange} />
                                </div>
                                {/* <div className={styles.row}>
                                    <input type="text" name="rg" placeholder="RG" className={styles.input} onChange={handleChange} />
                                    <input type="text" name="cpf" placeholder="CPF" className={styles.input} onChange={handleChange} />
                                    <input type="text" name="dataNascimento" placeholder="Data de Nascimento" className={styles.input} onChange={handleChange} />
                                </div>
                                <div className={styles.row}>
                                    <input type="text" name="endereco" placeholder="Endereço" className={styles.input} onChange={handleChange} />
                                    <input type="text" name="localNascimento" placeholder="Local de Nascimento" className={styles.input} onChange={handleChange} />
                                    <input type="text" name="grauParentesco" placeholder="Grau de Parentesco" className={styles.input} onChange={handleChange} />
                                </div> */}
                                <div className={styles.botaoWrapper}>
                                    <button type="submit" className={styles.botao}>Cadastrar</button>
                                </div>
                            </>
                        {/* )} */}
                        {/* {step === 2 && ( ... )} */}
                        {/* {step === 3 && ( ... )} */}
                    </form>

                    {/* <div className={styles.botaoWrapper}>
                        {step > 1 && step <= 2 && (
                            <button type="button" onClick={previousStep} className={styles.botao}>Anterior</button>
                        )}
                        {step < 3 && (
                            <button type="button" onClick={nextStep} className={styles.botao}>Próximo</button>
                        )}
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default Cadastro;
