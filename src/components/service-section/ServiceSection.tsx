import React from 'react';
import Wrapper from '../../Wrapper';
import styles from './styles.module.css';
import WalkingHuman from '../../assets/walking-human.webp';
import SittingHuman from '../../assets/sitting-human.webp';
import ShakingHuman from '../../assets/shaking-humans.webp';
import { ReactComponent as ForwardIcon } from '../../assets/forward.svg';

interface ServiceCardProps {
    src: string;
    title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ src, title }) => {
    return (
        <div className={styles.serviceCardWrapper}>
            <div className={styles.serviceCardImageWrapper}>
                <img src={src} alt='' className={styles.serviceCardImage} />
            </div>
            <p className={styles.serviceCardText}>{title}</p>
            <section className={styles.serviceCardBtnWrapper}>
                <div className={styles.serviceCardBtnWrapperMobile}>
                    <p className={styles.serviceCardLink}>Expore page</p>
                    <ForwardIcon />
                </div>
            </section>
        </div>
    );
};

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
