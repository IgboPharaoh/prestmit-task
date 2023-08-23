import React from 'react';
import './App.css';

const Wrapper = React.memo(function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className='pageContentWrapper'>
            <div className='pageWrapper'>{children}</div>
        </div>
    );
});

export default Wrapper;
