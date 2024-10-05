import React from "react";
import styles from './Home.module.css'
import NavBar from "../../components/NavBar/NavBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

const Home = () => {
    return (
        <>
        <div className={styles["home-container"]}>
            <NavBar />
            <SearchBar />
        </div>
            
        </>
    );
};
export default Home