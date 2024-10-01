import * as React from "react";
import styles from './NavBar.module.css';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

const NavBar = () => {
    return (
        <>
            <nav class="menu" role="navigation" aria-label="Menu de opções da plataforma" className={styles["navbar"]}>
                <div class="menu__menu-icon" className={styles["menuIcon"]}>
                    <MenuIcon sx={{ fontSize: 32, color: '#fff'}}/>
                </div>

                <div class="menu__menu-icon-options" className={styles["menuOptions"]}>
                    <div class="menu-icon-options__primary" className={styles["menuOptions__primary"]}>
                        <HomeIcon sx={{ fontSize: 32, color: '#fff'}}/>
                        <SchoolIcon sx={{ fontSize: 32, color: '#fff'}}/>
                        <InfoIcon sx={{ fontSize: 32, color: '#fff'}}/>
                        <AccountCircleIcon sx={{ fontSize: 32, color: '#fff'}}/>
                    </div>

                    <div className={styles["menuOptions__line"]}></div>
                        
                    <div class="menu-icon-options__secondary" className={styles["menuOptions__secondary"]}>
                        <WorkspacePremiumIcon sx={{ fontSize: 32, color: '#fff'}}/>
                        <FavoriteIcon sx={{ fontSize: 32, color: '#fff'}}/>
                    </div>
                </div>

                <div class="menu__menu-icon-logout" className={styles["menuIconLogout"]}>
                    <LogoutIcon sx={{ fontSize: 32, color: '#fff'}}/>
                </div>
            </nav>
        </>
    );
};
export default NavBar;