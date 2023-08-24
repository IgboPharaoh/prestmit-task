import React from 'react';
import './App.css';
import BlogSection from './components/blog-section/BlogSection';
import FeatureSection from './components/features-section/FeatureSection';
import Hero from './components/hero-page/Hero';
import ServiceSection from './components/service-section/ServiceSection';
import Testimonials from './components/testimonial-section/Testimonials';

function App() {
    return (
        <div className='App'>
            <Hero />
            <ServiceSection />
            <FeatureSection />
            <Testimonials />
            <BlogSection />
        </div>
    );
}

export default App;
