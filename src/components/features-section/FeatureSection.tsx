import React from 'react';
import Wrapper from '../../Wrapper';
import Button from '../button/Button';
import styles from './styles.module.css';
import Man from '../../assets/man.webp';
import Woman from '../../assets/woman.webp';
import { ReactComponent as Check } from '../../assets/check.svg';
import { ReactComponent as EyeIcon } from '../../assets/eye.svg';
import { ReactComponent as SunIcon } from '../../assets/sun.svg';
import { ReactComponent as FeatherIcon } from '../../assets/feather.svg';
import { ReactComponent as BoxBarChart } from '../../assets/box-bar-chart.svg';
import { ReactComponent as CircularSvg } from '../../assets/circular-chat.svg';

interface FeaturesListProps {
    text: string;
}

const FeaturesList: React.FC<FeaturesListProps> = ({ text }) => {
    return (
        <div className={styles.featuresListWrapper}>
            <div className={styles.checkWrapper}>
                <Check />
            </div>
            <p className={styles.featuresListText}>{text}</p>
        </div>
    );
};

interface FeaturesCardProps {
    text: string;
    color: '#ffffff' | '#000000';
    src: React.ReactNode;
    backgroundColor: '#ffffff' | '#0A2640';
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({ text, src, backgroundColor, color }) => {
    return (
        <div style={{ backgroundColor: backgroundColor }} className={styles.featuresCardWrapper}>
            <>{src}</>
            <p style={{ color: color }} className={styles.featuresCardText}>
                {text}
            </p>
        </div>
    );
};

const FeatureSection = () => {
    return (
        <div>
            <Wrapper>
                <div className={styles.featureSectionOverallWrapper}>
                    <section className={styles.featureTopSection}>
                        <div>
                            <div className={styles.FeatureSectionImageWrapper}>
                                <img src={Man} alt='a young man answering a call' className={styles.FeatureSectionImage} />
                            </div>
                            <div className={styles.barChartWrapper}>
                                <BoxBarChart />
                                <section>
                                    <p className={styles.percentText}>30%</p>
                                    <p className={styles.percentSubText}>More income in June</p>
                                </section>
                            </div>
                        </div>
                        <div className={styles.featureTopRigtSection}>
                            <p className={styles.connectText}>We connect our customers with the best, and help them keep up-and stay open.</p>
                            <section className={styles.featureListsWrapper}>
                                <FeaturesList text='We connect our customers with the best.' />
                                <FeaturesList text='Advisor success customer launch party.' />
                                <FeaturesList text='Business-to-consumer long tail.' />
                            </section>
                            <Button name='Start now' backgroundColor='#0A2640' color='#ffffff' height='60px' />
                        </div>
                    </section>

                    <section className={styles.featureTopSection}>
                        <div className={styles.featureTopRigtSection}>
                            <p className={styles.connectText}>We connect our customers with the best, and help them keep up-and stay open.</p>
                            <section className={`${styles.featureListsWrapper} ${styles.featuresCardsListWrapper}`}>
                                <FeaturesCard
                                    text='We connect our customers with the best.'
                                    color='#ffffff'
                                    src={<FeatherIcon />}
                                    backgroundColor='#0A2640'
                                />
                                <FeaturesCard
                                    text='Advisor success customer launch party.'
                                    color='#000000'
                                    src={<EyeIcon />}
                                    backgroundColor='#ffffff'
                                />
                                <FeaturesCard text='Business-to-consumer long tail.' color='#000000' src={<SunIcon />} backgroundColor='#ffffff' />
                            </section>
                        </div>

                        <div>
                            <div className={styles.FeatureSectionImageWrapper}>
                                <img src={Woman} alt='a young man answering a call' className={styles.FeatureSectionImage} />
                            </div>
                            <div className={`${styles.barChartWrapper} ${styles.circularChartWrapper}`}>
                                <CircularSvg height='174px' width='174px' />
                                <section className={styles.circularChartItemsWrapper}>
                                    <aside className={styles.spanAsideWrappers}>
                                        <section className={`${styles.spanBlue} ${styles.spanCircles}`}></section>
                                        <p className={styles.percentSubText}>35% - Agile Development</p>
                                    </aside>
                                    <aside className={styles.spanAsideWrappers}>
                                        <section className={`${styles.spanGreen} ${styles.spanCircles}`}></section>
                                        <p className={styles.percentSubText}>30% - Investor bandwidth</p>
                                    </aside>
                                    <aside className={styles.spanAsideWrappers}>
                                        <section className={`${styles.spanGray} ${styles.spanCircles}`}></section>
                                        <p className={styles.percentSubText}>35% - A/B testing </p>
                                    </aside>
                                </section>
                            </div>
                        </div>
                    </section>
                </div>
            </Wrapper>
        </div>
    );
};

export default FeatureSection;
