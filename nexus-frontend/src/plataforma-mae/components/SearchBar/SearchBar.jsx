import * as React from "react";
import styles from './SearchBar.module.css'
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';


const SearchBar = () => {
    return (
        <>
           <div className={styles["search-bar-container"]}>
                <div className={styles["search-bar-container__text"]}>
                    <SearchIcon className={styles["search-bar-container__text__icon"]}/>
                    <input type="text" placeholder="Pesquisar..." className={styles["search-bar-container__text__input"]}/>
                </div>
                
                <div className={styles["search-bar-container__voice"]}>
                    <button>
                        <KeyboardVoiceIcon className={styles["search-bar-container__voice__icon"]} />
                    </button>
                </div>
           </div>
        </>
    );
};
export default SearchBar;