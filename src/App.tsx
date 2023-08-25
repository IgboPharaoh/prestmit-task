import React from 'react';
import './App.css';
import BlogSection from './components/blog-section/BlogSection';
import EmailSection from './components/email-section/EmailSection';
import FeatureSection from './components/features-section/FeatureSection';
import Footer from './components/footer/Footer';
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
            <EmailSection />
            <Footer />
        </div>
    );
}

export default App;
