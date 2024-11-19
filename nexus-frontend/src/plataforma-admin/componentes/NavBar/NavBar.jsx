import styles from './NavBar.module.css';
import logo from '../../../utils/assets/logo.png';

function NavBar() {


    return (
        <nav>
            <div class="container">
                <div class={styles["navbar-top"]}>
                    <div class={styles["elementos-navtop"]}>
                        <img src={logo} alt="Logo" class={styles.logo} />
                        <div class={styles["admin-title"]}>Administrador</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;