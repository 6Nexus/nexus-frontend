import React from "react";
import styles from './Questionnaire.module.css'
import SideBar from "../../components/SideBar/SideBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Checkbox, Radio } from "@mui/material";

const Questionnaire = () => {
    return (
        <>
            <div className={styles["questionnaire-container"]}>
                <SideBar backgroundColor={'#245024'} />

                <div className={styles["questionnaire-container__content"]}>
                    <SearchBar />

                    <div className={styles['content__return']}>
                        <ArrowBackIcon className={styles['return__icon']} />
                        <p className={styles['return__text']}>Voltar</p>
                    </div>

                    <div className={styles['content__info']}>
                        <h2>Questionáro final</h2>
                        <p>Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam! Aut impedit assumenda rem odio quibusdam id nulla doloribus quo reprehenderit nisi in distinctio amet qui consequuntur sequi sit natus dolorem.</p>
                    </div>

                    <div className={styles['content__review']}>
                        <h2>Perguntas</h2>
                        <div className={styles['review__itens']}>
                            <div className={styles['review__item']}>
                                <Checkbox/>
                                <p>1</p>
                            </div>
                            <div className={styles['review__item']}>
                                <Checkbox/>
                                <p>2</p>
                            </div>
                            <div className={styles['review__item']}>
                                <Checkbox/>
                                <p>3</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles['content__question']}>
                      <h2>Pergunta 1 de 1</h2>
                      <div  className={styles['question__line']}></div>
                      <div className={styles['question__form']}>
                        <h2>1 - Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam</h2>
                        <div className={styles['form__alternatives']}>
                            <div className={styles['alternatives__alternative']}>
                                <Radio/>
                                <p>Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam</p>
                            </div>
                            <div className={styles['alternatives__alternative']}>
                                <Radio/>
                                <p>Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam</p>
                            </div>
                            <div className={styles['alternatives__alternative']}>
                                <Radio/>
                                <p>Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam</p>
                            </div>
                            <div className={styles['alternatives__alternative']}>
                                <Radio/>
                                <p>Lorem ipsum dolor sit amet. Et ullam fugiat qui neque laboriosam ut molestiae officia rem quaerat numquam</p>
                            </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles['content__buttons']}>
                        <button className={styles['buttons__back']}>Voltar</button>
                        <button className={styles['buttons__foward']}>Próxima</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Questionnaire