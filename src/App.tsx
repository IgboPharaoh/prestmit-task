import React from 'react';
import './App.css';
import FeatureSection from './components/features-section/FeatureSection';
import Hero from './components/hero-page/Hero';
import ServiceSection from './components/service-section/ServiceSection';

function App() {
    return (
        <div className='App'>
            <Hero />
            <ServiceSection />
            <FeatureSection />
        </div>
    );
}

export default App;
