import React from 'react';
import Wrapper from '../../Wrapper';
import Button from '../button/Button';
import styles from './styles.module.css';

const EmailSection = () => {
    return (
        <div className={styles.emailSectionOverallWrapper}>
            <Wrapper>
                <div className={styles.emailSectionWrapper}>
                    <h1 className={styles.emailSectionHeading}>An enterprise template to ramp up your company website</h1>
                    <section className={styles.emailSectionBottomWrapper}>
                        <input type='text' placeholder='Your email address' className={styles.emailSectionInput} />
                        <Button name='Start now' backgroundColor='#65E4A3' color='#0A2640' height='60px' />
                    </section>
                </div>
            </Wrapper>
        </div>
    );
};

export default EmailSection;
