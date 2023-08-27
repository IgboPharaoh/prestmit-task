import React from 'react';
import styles from './styles.module.css';
import Button from '../button/Button';
import { ReactComponent as Logo } from '../../assets/boldo-logo.svg';
import { ReactComponent as MenuIcon } from '../../assets/menu.svg';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import Wrapper from '../../Wrapper';
import { useWindowScrollHeight, useWindowSizes } from '../utils';

export interface HeaderProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ open, setOpen }) => {
    const toggle = () => setOpen(!open);
    const { scrollPosition } = useWindowScrollHeight();
    const { width } = useWindowSizes();

    const scrollPositionStyles: React.CSSProperties = {
        position: 'sticky',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 32px 0px rgba(0, 0, 0, 0.08)',
        top: '0px',
        bottom: '40px',
        borderRadius: '32px',
        padding: '18px 18px',
    };

    return (
        <Wrapper>
            <div className={styles.headerWrapper} style={scrollPosition > 300 && width <= 768 ? scrollPositionStyles : {}}>
                <Logo className={styles.companiesLogo} />
                <section className={styles.headerRightSection}>
                    <section className={styles.navlinksWrapper}>
                        <a href='#0' className={styles.navlinks}>
                            Products
                        </a>
                        <a href='#0' className={styles.navlinks}>
                            Services
                        </a>
                        <a href='#0' className={styles.navlinks}>
                            About
                        </a>
                    </section>
                    <Button
                        name='Log In'
                        backgroundColor='transparent'
                        color='#0A2640'
                        border={`2px solid #0A2640`}
                        padding='40px'
                        fontSize='16px'
                        otherStyles={{ height: '40px', padding: '0px 18px' }}
                    />
                    <section className={styles.iconWrapper}>
                        {open ? (
                            <CloseIcon height='36px' width='36px' onClick={toggle} cursor='pointer' />
                        ) : (
                            <MenuIcon height='36px' onClick={toggle} cursor='pointer' width='36px' />
                        )}
                    </section>
                </section>
            </div>
        </Wrapper>
    );
};

export default Header;
