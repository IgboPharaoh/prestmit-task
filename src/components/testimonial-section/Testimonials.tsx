import React from 'react';
import styles from './styles.module.css';
import Wrapper from '../../Wrapper';
import { ReactComponent as ForwardIcon } from '../../assets/dark-forward.svg';
import { ReactComponent as BackwardIcon } from '../../assets/dark-backward.svg';
import TestImage1 from '../../assets/test-image1.webp';
import TestImage2 from '../../assets/test-image2.webp';
import TestImage3 from '../../assets/test-image3.webp';

interface TestimonialCardProps {
    comment: string;
    name: string;
    position: string;
    src: string;
}
const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, comment, position, src }) => {
    return (
        <div className={styles.cardWrapper}>
            <p className={styles.cardComment}>{comment}</p>
            <section className={styles.cardBottomWrapper}>
                <img src={src} alt={name} className={styles.cardImage} />
                <aside className={styles.cardBottomTextsWrapper}>
                    <p className={styles.cardName}>{name}</p>
                    <p className={styles.cardPosition}>{position}</p>
                </aside>
            </section>
        </div>
    );
};

const Testimonials = () => {
    return (
        <div className={styles.testimonialOverallWrapper}>
            <Wrapper>
                <div className={styles.testimonialWrapper}>
                    <section className={styles.testimonialHeadingWrapper}>
                        <h1 className={styles.testimonialHeading}>An enterprise template to ramp up your company website</h1>
                        <div className={styles.iconWrapper}>
                            <section className={styles.icon}>
                                <BackwardIcon />
                            </section>
                            <section className={styles.icon}>
                                <ForwardIcon />
                            </section>
                        </div>
                    </section>

                    <section className={styles.testimonialCardsWrapper}>
                        <TestimonialCard
                            comment='“Buyer buzz partner network disruptive non-disclosure agreement business”'
                            name='Albus Dumbledore'
                            position='Manager @ Howarts'
                            src={TestImage1}
                        />
                        <TestimonialCard
                            comment='“Learning curve infrastructure value proposition advisor strategy user experience hypotheses investor.”'
                            name='Severus Snape'
                            position='Manager @ Slytherin'
                            src={TestImage2}
                        />
                        <TestimonialCard
                            comment='“Release facebook responsive web design business model canvas seed money monetization.”'
                            name='Harry Potter'
                            position='Team Leader @ Gryffindor'
                            src={TestImage3}
                        />
                    </section>
                </div>
            </Wrapper>
        </div>
    );
};

export default Testimonials;
