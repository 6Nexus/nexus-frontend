import React from "react";
import styles from './Instructions.module.css'
import SideBar from '../../components/SideBar/SideBar'
import SearchBar from "../../components/SearchBar/SearchBar";

import YoutubePlaylist from "./YoutubePlaylist";

const Instructions = () => {
    return (
        <>
            <div className={styles['instructions-container']}>
                <SideBar backgroundColor={'#245024'}/>
                <div className={styles["instructions-container__content"]}>
                    <SearchBar/>
                    <YoutubePlaylist playlistId="PLcIvMDtKQxKjOjrulFBUppJQxvP6duWNZ" />
                </div>
            </div>
        </>
    );
};
export default Instructions