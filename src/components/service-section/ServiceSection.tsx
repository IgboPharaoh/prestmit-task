import React from 'react';
import Wrapper from '../../Wrapper';
import ServiceCard from './ServiceCard';
import styles from './styles.module.css';
import WalkingHuman from '../../assets/walking-human.webp';
import SittingHuman from '../../assets/sitting-human.webp';
import ShakingHuman from '../../assets/shaking-humans.webp';

const ServiceSection = () => {
    return (
        <div className={styles.serviceSectionOverallWrapper}>
            <Wrapper>
                <div className={styles.serviceSectionWrapper}>
                    <section className={styles.serviceHeadingWrapper}>
                        <p className={styles.servicetitleText}>Our Services</p>
                        <h1 className={styles.serviceSectionHeading}>Handshake infographic mass market crowdfunding iteration.</h1>
                    </section>
                    <section className={styles.serviceSectionCardsWrapper}>
                        <ServiceCard src={WalkingHuman} title='Cool feature title' />
                        <ServiceCard src={ShakingHuman} title='Even cooler feature ' />
                        <ServiceCard src={SittingHuman} title='Cool feature title' />
                    </section>
                </div>
            </Wrapper>
        </div>
    );
};

export default ServiceSection;
