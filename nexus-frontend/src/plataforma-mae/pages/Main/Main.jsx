import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import ReturnPages from "../../components/ReturnPages/ReturnPages";
import styles from "./Main.module.css";

const Main = ({ children, enableReturnPages }) => {
  return (
    <div className={styles.container}>
      <SideBar backgroundColor={'#245024'} />

      <div className={styles.content}>
        <SearchBar />

        {enableReturnPages && <ReturnPages enableReturnPages={enableReturnPages} />}

        <div className={styles.pageContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Main;
