import React from 'react';
import Wrapper from '../../Wrapper';
import Button from '../button/Button';
import styles from './styles.module.css';
import { ReactComponent as Logo } from '../../assets/boldo-logo.svg';

interface FooterBlockProps {
    heading: string;
    links: Array<{ link: string; pill?: React.ReactNode }>;
}

export const footerLinks: Array<FooterBlockProps> = [
    {
        heading: 'Landings',
        links: [{ link: 'Home' }, { link: 'Products' }, { link: 'Services' }],
    },
    {
        heading: 'Company',
        links: [
            { link: 'Home' },
            {
                link: 'Careers',
                pill: (
                    <Button
                        name='Hiring!'
                        backgroundColor='#65E4A3'
                        color={'#0A2640'}
                        otherStyles={{ fontSize: '13px', height: '30px', padding: '0px 14px' }}
                    />
                ),
            },
            { link: 'Services' },
        ],
    },
    {
        heading: 'Resources',
        links: [{ link: 'Blog' }, { link: 'Products' }, { link: 'Services' }],
    },
];

const FooterBlock: React.FC<FooterBlockProps> = ({ heading, links }) => {
    return (
        <div className={styles.footerBlockWrapper}>
            <h4 className={styles.footerBlockHeading}>{heading}</h4>
            <>
                {links.map(({ link, pill }, index) => (
                    <section key={index} className={styles.footerBlockLinksWrapper}>
                        <a href='#0' className={`${styles.footerBlockHeading} ${styles.footerLinkText}`}>
                            {link}
                        </a>
                        {pill ? <aside>{pill}</aside> : null}
                    </section>
                ))}
            </>
        </div>
    );
};

const Footer = () => {
    return (
        <div className={styles.footerOverallWrapper}>
            <Wrapper>
                <div className={styles.footerWrapper}>
                    <section className={styles.footerLeftSectionWrapper}>
                        <Logo />
                        <p className={`${styles.footerLeftSectionMainText} ${styles.footerLeftSectionText}`}>
                            Social media validation business model canvas graphical user interface launch party creative facebook iPad twitter.
                        </p>
                        <p className={styles.footerLeftSectionText}>All rights reserved.</p>
                    </section>

                    <section className={styles.footerRightSectionWrapper}>
                        {footerLinks.map(({ heading, links }) => {
                            return (
                                <div key={heading} className={styles.footerRightSectionWrapper}>
                                    <FooterBlock heading={heading} links={links} />
                                </div>
                            );
                        })}
                    </section>
                </div>
            </Wrapper>
        </div>
    );
};

export default Footer;
