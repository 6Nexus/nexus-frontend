import * as React from "react";
import styles from './SearchBar.module.css'
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Logotipo from '../../../utils/assets/logotipo.svg'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {

    const [activeItem, setActiveItem] = useState('home');
    const navigate = useNavigate();
    const goToHome = () => {
        setActiveItem('home'); 
        navigate('/aluno/inicio');
    };

    return (
        <>
           <div className={styles["search-bar-container"]}>
                <div className={styles["search-bar-container__logotipo"]} onClick={goToHome}>
                   <img src={Logotipo} alt="" />
                </div>

                <div className={styles["search-bar-container__search"]}>
                    <div className={styles["search__text"]}>
                        <SearchIcon className={styles["search__text__icon"]}/>
                        <input type="text" placeholder="Pesquisar..." className={styles["search__text__input"]}/>
                    </div>
                    
                    <div className={styles["search__voice"]}>
                        <button>
                            <KeyboardVoiceIcon className={styles["search__voice__icon"]} />
                        </button>
                    </div>
                </div>

                <div className={styles["search-bar-container__preferences"]}>

                    <button>
                        <TextIncreaseIcon className={styles["icon-preference"]}/>
                        Aumentar fonte
                    </button>
                    
                   
                </div>
           </div>
        </>
    );
};
export default SearchBar;