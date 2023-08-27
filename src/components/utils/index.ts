import React from 'react';

export const useWindowScrollHeight = () => {
    const [scrollPosition, setPosition] = React.useState(0);
    console.log(scrollPosition, 'scroll position');

    React.useLayoutEffect(() => {
        function updateHeight() {
            setPosition(window.pageYOffset);
        }

        window.addEventListener('scroll', updateHeight);
        updateHeight();

        return () => window.removeEventListener('scroll', updateHeight);
    }, []);

    return { scrollPosition };
};

export const useWindowSizes = () => {
    const [windowSize, setwindowSize] = React.useState({ width: 0, height: 0 });
    const getWindowSizes = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return { width, height };
    };

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
