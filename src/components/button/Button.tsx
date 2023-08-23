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
}

const Button: React.FC<ButtonProps> = ({ name, backgroundColor, color, border, height = '40px', padding = '56px', fontSize = '20px' }) => {
    const buttonStyles: React.CSSProperties = {
        color: color,
        backgroundColor: backgroundColor,
        border: border ? border : 'transparent',
        height: height,
        borderRadius: '56px',
        padding: `0px ${padding}`,
        fontSize: fontSize ? fontSize : '',
    };

    return (
        <button style={buttonStyles} className={styles.buttonWrapper}>
            {name}
        </button>
    );
};

export default Button;
