import React from "react";
import styles from './Home.module.css'
import NavBar from "../../components/NavBar/NavBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CardCurso from '../../components/CardCurso/CardCurso.jsx'

const Home = () => {
    return (
        <>
        <div className={styles["home-container"]}>
            <NavBar />
            <SearchBar />
            <CardCurso />
        </div>
            
        </>
    );
};
export default Home