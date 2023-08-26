import React from 'react';
import Wrapper from '../../Wrapper';
import Button from '../button/Button';
import Header from '../header/Header';
import { BarChart, CircularChart, PercentageChart } from './Charts';
import CompanyBlock from './CompanyBlock';
import styles from './styles.module.css';

export interface HeaderProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Hero = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div className={styles.heroWrapper}>
            {open ? (
                <div>
                    <section className={styles.mobileMenuWrapper}>
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
                </div>
            ) : null}
            <Wrapper>
                <Header open={open} setOpen={setOpen} />
                <div className={styles.heroSectionsWrapper}>
                    <section className={styles.heroRightSectionWrapper}>
                        <h1 className={styles.titleText}>Save time by building fast with Boldo Template </h1>
                        <p className={styles.heroSubText}>
                            Funding handshake buyer business-to-business metrics iPad partnership. First mover advantage innovator success deployment
                            non-disclosure.
                        </p>
                        <section className={styles.heroButtonsWrapper}>
                            <Button name='Buy template' backgroundColor='#0A2640' color='#ffffff' height='60px' />
                            <Button name='Explore' backgroundColor='transparent' color='#0A2640' height='60px' border='2px solid #0A2640' />
                        </section>
                    </section>
                    <section className={styles.heroChartsWrapper}>
                        <PercentageChart />
                        <div className={styles.heroLowerChartsWrapper}>
                            <BarChart />
                            <CircularChart />
                        </div>
                    </section>
                </div>
                <CompanyBlock />
            </Wrapper>
        </div>
    );
};

export default Hero;
