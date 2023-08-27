import React from 'react';
import './App.css';
import BlogSection from './components/blog-section/BlogSection';
import EmailSection from './components/email-section/EmailSection';
import FeatureSection from './components/features-section/FeatureSection';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Hero from './components/hero-page/Hero';
import ServiceSection from './components/service-section/ServiceSection';
import Testimonials from './components/testimonial-section/Testimonials';
import { useWindowScrollHeight, useWindowSizes } from './components/utils';

function App() {
    const [open, setOpen] = React.useState(false);
    const { scrollPosition } = useWindowScrollHeight();
    const { width } = useWindowSizes();

    return (
        <div className='App'>
            <div className='heroBox'></div>
            <section
                style={{
                    width: '100%',
                    overflow: 'visible',
                    position: scrollPosition > 300 && width <= 768 ? 'sticky' : 'static',
                    top: 0,
                    zIndex: '1000',
                }}
            >
                <Header open={open} setOpen={setOpen} />
                {open ? (
                    <section
                        className={'mobileMenuWrapper'}
                        style={{
                            top: scrollPosition > 300 ? '110px' : '120px',
                        }}
                    >
                        <a href='#0' className={'navlinks'}>
                            Products
                        </a>
                        <a href='#0' className={'navlinks'}>
                            Services
                        </a>
                        <a href='#0' className={'navlinks'}>
                            About
                        </a>
                    </section>
                ) : null}
            </section>
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
