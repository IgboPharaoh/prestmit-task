import React from "react";
import Wrapper from "../../Wrapper";
import Button from "../button/Button";
import { BarChart, CircularChart, PercentageChart } from "./Charts";
import CompanyBlock from "./CompanyBlock";
import styles from "./styles.module.css";

const Hero = () => {
  return (
    <div className={styles.heroWrapper}>
      <Wrapper>
        <div className={styles.heroSectionsWrapper}>
          <section className={styles.heroRightSectionWrapper}>
            <h1 className={styles.titleText}>Save time by building fast with Boldo Template </h1>
            <p className={styles.heroSubText}>
              First mover advantage innovator success deployment non-disclosure. Funding handshake buyer business-to-business metrics iPad
              partnership.
            </p>
            <section className={styles.heroButtonsWrapper}>
              <Button name='Buy template' backgroundColor='#0A2640' color='#ffffff' height='60px' />
              <Button name='Explore' backgroundColor='transparent' color='#0A2640' height='60px' border='2px solid #0A2640' />
            </section>
          </section>
          <section className={styles.heroChartsWrapper}>
            <PercentageChart />
            <div className={styles.heroLowerChartsWrapper}>
              {/* <BarChart /> */}
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
