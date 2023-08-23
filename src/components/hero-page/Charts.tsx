import React from 'react';
import styles from './styles.module.css';
import { ReactComponent as BarChartSvg } from '../../assets/bar-chart.svg';
import { ReactComponent as CircularChartSvg } from '../../assets/circular-chat.svg';

const ChartNavs = () => {
    return (
        <div className={styles.chartNavCircleWrapper}>
            <section className={`${styles.orangeB} ${styles.chartNavCircle}`}></section>
            <section className={`${styles.yellowB} ${styles.chartNavCircle}`}></section>
            <section className={`${styles.greenB} ${styles.chartNavCircle}`}></section>
        </div>
    );
};

interface ChartBarsProps {
    backgroundColor: string;
    width: string;
    text?: string;
}

const ChartBars: React.FC<ChartBarsProps> = ({ backgroundColor, width, text }) => {
    return (
        <div className={styles.chartBarWrapper}>
            <div style={{ backgroundColor: backgroundColor, width: width }} className={styles.chartBar}></div>
            {text ? <p className={styles.chartBarText}>{text}%</p> : null}
        </div>
    );
};

const ChartWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.generalChartWrapper}>
            <ChartNavs />
            <div>{children}</div>
        </div>
    );
};

export const PercentageChart = () => {
    return (
        <ChartWrapper>
            <div className={styles.percentChartWrapper}>
                <section className={styles.indicatorWrapper}>
                    <ChartBars backgroundColor='#95abbc' width='54px' />
                    <ChartBars backgroundColor='#95abbc' width='54px' />
                    <ChartBars backgroundColor='#95abbc' width='54px' />
                    <ChartBars backgroundColor='#95abbc' width='54px' />
                </section>
                <section className={styles.indicatorWrapper}>
                    <ChartBars backgroundColor='#8FB6D5' width='269px' text='80' />
                    <ChartBars backgroundColor='#0dbbfc' width='79px' text='30' />
                    <ChartBars backgroundColor='#fff' width='317px' text='100' />
                    <ChartBars backgroundColor='#65E4A3' width='253px' text='75' />
                </section>
            </div>
        </ChartWrapper>
    );
};

export const BarChart = () => {
    return (
        <ChartWrapper>
            <div className={styles.barChartWrapper}>
                <BarChartSvg />
            </div>
        </ChartWrapper>
    );
};

export const CircularChart = () => {
    return (
        <ChartWrapper>
            <div className={styles.circularChartWrapper}>
                <CircularChartSvg />
                <section className={styles.indicatorWrapper}>
                    <ChartBars backgroundColor='#95abbc' width='72px' />
                    <ChartBars backgroundColor='#95abbc' width='68px' />
                    <ChartBars backgroundColor='#95abbc' width='76px' />
                </section>
            </div>
        </ChartWrapper>
    );
};
