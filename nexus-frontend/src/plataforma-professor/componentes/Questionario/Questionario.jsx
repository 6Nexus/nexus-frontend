import React, { useState } from 'react';
import './Questionario.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { toast } from 'react-toastify';


function Questao({ questao, atualizarQuestao, deletarQuestao, index }) {
    const [texto, setTexto] = useState(questao.texto || '');
    const [alternativas, setAlternativas] = useState(questao.alternativas || []);

    const handleTextoChange = (e) => {
        const novoTexto = e.target.value;
        setTexto(novoTexto);
        atualizarQuestao({ ...questao, texto: novoTexto });
    };

    const addAlternativa = () => {
        if (alternativas.length >= 4) return;
        const novaAlternativa = { id: Date.now(), texto: '', correta: false };
        const novasAlternativas = [...alternativas, novaAlternativa];
        setAlternativas(novasAlternativas);
        atualizarQuestao({ ...questao, alternativas: novasAlternativas });
    };

    const atualizarAlternativa = (id, novoTexto) => {
        const novasAlternativas = alternativas.map(alt =>
            alt.id === id ? { ...alt, texto: novoTexto } : alt
        );
        setAlternativas(novasAlternativas);
        atualizarQuestao({ ...questao, alternativas: novasAlternativas });
    };

    const setAlternativaCorreta = (id) => {
        const novasAlternativas = alternativas.map(alt => ({
            ...alt,
            correta: alt.id === id,
        }));
        setAlternativas(novasAlternativas);
        atualizarQuestao({ ...questao, alternativas: novasAlternativas });
    };



    return (
        <div className="question-container">
            <div className='header-questao'>
                <h4>Questão {index + 1}</h4>

                <button className="btn-remover" type="button" onClick={deletarQuestao}>
                    <CloseRoundedIcon />
                </button>
            </div>
            <input
                type="text"
                className="question-input"
                value={texto}
                onChange={handleTextoChange}
                placeholder="Digite a pergunta"
            />
            <button className="btn-add-alternativa" type="button" onClick={addAlternativa}>
                + Alternativa
            </button>
            {alternativas.map((alt) => (
                <div key={alt.id} className="container-alternativa">
                    <input
                        type="text"
                        className="alternative-input"
                        value={alt.texto}
                        onChange={(e) => atualizarAlternativa(alt.id, e.target.value)}
                        placeholder="Digite a alternativa"
                    />

                    <input
                        type="radio"
                        name={`correta-${questao.id}`}
                        checked={alt.correta}
                        onChange={() => setAlternativaCorreta(alt.id)}
                    /> Correta

                    <button className="btn-remover" type="button" onClick={() => {
                        setAlternativas(alternativas.filter((item) => item.id !== alt.id));
                    }}>
                        <CloseRoundedIcon />
                    </button>

                </div>
            ))}

        </div>
    );
}

function Questionario({ onClose, onSave }) {
    const [questoes, setQuestoes] = useState([]);

    const handleAddQuestao = () => {
        setQuestoes([...questoes, { id: Date.now(), texto: '', alternativas: [] }]);
    };

    const handleSalvarQuestionario = () => {
        if (questoes.length === 0) {
            toast.warning('Adicione pelo menos uma questão antes de salvar.');
            return;
        }

        for (const [index, questao] of questoes.entries()) {
            if (!questao.texto) {
                toast.warning(`A questão "${index + 1}" precisa ter um texto!`);
                return;
            }

            if (questao.alternativas.length === 0) {
                toast.warning(`A questão "${index + 1}" não possui alternativas. Adicione pelo menos uma alternativa!`);
                return;
            }


            for (const alternativa of questao.alternativas) {
                if (!alternativa.texto) {
                    toast.warning(`A alternativa da questão "${index + 1}" está vazia!`);
                    return;
                }
            }


            const alternativaCorreta = questao.alternativas.find(alt => alt.correta);
            if (!alternativaCorreta) {
                toast.warning(`A questão "${index + 1}" precisa de uma alternativa correta!`);
                return;
            }
        }


        onSave(questoes);
        console.log('Questionário Salvo', questoes)
        toast.success('Questionário Salvo!')
    };

    return (
        <div className='container-questionario'>

            <div className="questionario">
                <div className='header-questionario'>
                    <h2>Criar Questionário</h2> <br />
                    <button type="button" className='btn-fechar-questionario' onClick={onClose}>
                        <CloseRoundedIcon />
                    </button>
                </div>
                {questoes.map((questao, index) => (
                    <Questao
                        key={questao.id}
                        questao={questao}
                        index={index}
                        atualizarQuestao={(atualizada) => {
                            const novasQuestoes = questoes.map(q =>
                                q.id === atualizada.id ? atualizada : q
                            );
                            setQuestoes(novasQuestoes);
                        }}
                        deletarQuestao={() => {
                            setQuestoes(questoes.filter(q => q.id !== questao.id));
                        }}
                    />
                ))}
                <button type="button" className='btn-add-questao' onClick={handleAddQuestao}>Adicionar Questão</button>
                <button type="button" className='btn-salvar-questionario' onClick={handleSalvarQuestionario}>Salvar Questionário</button>

            </div>
        </div>
    );
}

export default Questionario;
