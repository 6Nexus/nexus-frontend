import React from "react";
import styles from './Instructions.module.css'
import NavBar from '../../components/NavBar/NavBar'
import SearchBar from "../../components/SearchBar/SearchBar";

import YoutubePlaylist from "./YoutubePlaylist";

const Instructions = () => {
    return (
        <>
            <div className={styles['instructions-container']}>
                <NavBar/>
                <div className={styles["instructions-container__content"]}>
                    <SearchBar/>
                    <YoutubePlaylist playlistId="PLcIvMDtKQxKjOjrulFBUppJQxvP6duWNZ" />
                </div>
            </div>
        </>
    );
};
export default Instructions