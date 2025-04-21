import React from "react";
import './Ajuda.css'
import SideBar from "../../componentes/SideBar/SideBar";
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';


function Ajuda() {
    return (
        <>
            <SideBar />
            <div className="header-titulo">
                <p>Ajuda e Suporte</p>
            </div>

           
                <div className="form-de-ajuda">
                    <form>
                        <div className="header-ajuda">
                            <SupportAgentRoundedIcon style={{ fontSize: '30px', color: '#94065E' }} /> <h3>Abrir um chamado</h3>
                        </div>
                        <label htmlFor="">Confirmação de e-mail para<span style={{ color: 'red' }}>*</span></label>
                        <input type="text" />

                        <label htmlFor="">Assunto da solicitação<span style={{ color: 'red' }}>*</span></label>
                        <input type="text" />

                        <label htmlFor="">Escolha a categoria correspondente à sua necessidade</label>
                        <select name="tipo-de-problema" id="tipo-de-problema">
                            <option value="*"></option>
                            <option value="conteudo-curso">Conteúdo do Curso</option>
                            <option value="engajamento-alunos">Engajamento dos Alunos</option>
                            <option value="tecnologia-ferramentas">Tecnologia e Ferramentas</option>
                            <option value="avaliacao-feedback">Avaliação e Feedback</option>
                            <option value="acessibilidade-inclusao">Acessibilidade e Inclusão</option>
                            <option value="administracao-gestao">Administração e Gestão do Curso</option>
                            <option value="recursos-didaticos">Recursos Didáticos</option>
                            <option value="suporte-comunicacao">Suporte e Comunicação</option>
                            <option value="adaptacao-mudancas">Adaptação a Mudanças</option>
                            <option value="Outros">Outros</option>
                        </select>

                        <label htmlFor="">
                            Por favor, forneça uma descrição detalhada do problema, incluindo todas as ações que você tomou até agora.
                        </label>
                        <label htmlFor="">Descrição<span style={{ color: 'red' }}>*</span></label>
                        <input type="text" className="input-descricao" />
 
                        <label for="anexo" className="anexo-solicitacao">Anexar Arquivo:</label>
                        <span className="desc-anexo">Caso necessário, anexe prints</span>
                        <input action="/upload" type="file" id="anexo" name="anexo" />


                        <button className="btn-enviar-solicitacao" >Enviar Solicitação</button>
                    </form>
                </div>
           

        </>
    )
}
export default Ajuda;