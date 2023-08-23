import styles from './styles.module.css';
import Button from '../button/Button';
import { ReactComponent as Logo } from '../../assets/boldo-logo.svg';

const Header = () => {
    return (
        <div className={styles.headerWrapper}>
            <Logo />
            <section className={styles.headerRightSection}>
                <a href='#0' className={styles.navlinks}>
                    Products
                </a>
                <a href='#0' className={styles.navlinks}>
                    Services
                </a>
                <a href='#0' className={styles.navlinks}>
                    About
                </a>
                <Button name='Log In' backgroundColor='transparent' color='#0A2640' border={`2px solid #0A2640`} padding='40px' fontSize='16px' />
            </section>
        </div>
    );
};

export default Header;
