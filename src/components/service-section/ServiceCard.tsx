import React from 'react';
import { ReactComponent as ForwardIcon } from '../../assets/forward.svg';
import styles from './styles.module.css';

export interface ServiceCardProps {
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
                <p className={styles.serviceCardLink}>Expore page</p>
                <ForwardIcon />
            </section>
        </div>
    );
};

export default ServiceCard;
