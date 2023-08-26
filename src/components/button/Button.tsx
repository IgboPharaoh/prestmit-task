import React from 'react';
import styles from './styles.module.css';

export interface ButtonProps {
    name: string;
    backgroundColor: '#0A2640' | '#65E4A3' | 'transparent';
    color: '#ffffff' | '#0A2640';
    border?: string;
    height?: string;
    padding?: string;
    fontSize?: string;
    otherStyles?: React.CSSProperties;
}

const getWindowSizes = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
};

const useWindowSizes = () => {
    const [windowSize, setwindowSize] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        setwindowSize(getWindowSizes());
        function resize() {
            setwindowSize(getWindowSizes());
        }

        window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, []);

    return windowSize;
};

const Button: React.FC<ButtonProps> = ({
    name,
    backgroundColor,
    color,
    border,
    height = '40px',
    padding = '56px',
    fontSize = '20px',
    otherStyles,
}) => {
    const { width } = useWindowSizes();

    const buttonPaddings = width <= 1260 ? `0px 24px` : width <= 900 ? `0px 24px` : width <= 600 ? `0px 20px` : `0px ${padding}`;
    const buttonFontSizes = width <= 550 ? `16px` : fontSize;
    const buttonHeight = width <= 550 ? `48px` : height;

    const buttonStyles: React.CSSProperties = {
        color: color,
        backgroundColor: backgroundColor,
        border: border ? border : 'transparent',
        height: buttonHeight,
        padding: buttonPaddings,
        fontSize: buttonFontSizes,
    };

    return (
        <button style={{ ...buttonStyles, ...otherStyles }} className={styles.buttonWrapper}>
            {name}
        </button>
    );
};

export default Button;
