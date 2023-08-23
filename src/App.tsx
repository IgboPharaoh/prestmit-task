import React from 'react';
import './App.css';
import Hero from './components/hero-page/Hero';
import ServiceSection from './components/service-section/ServiceSection';

function App() {
    return (
        <div className='App'>
            <Hero />
            <ServiceSection />
        </div>
    );
}

export default App;
