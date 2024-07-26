import AboutSection from '@/components/Home/AboutSection';
import ClientReview from '@/components/Home/ClientReview';
import CompanyMarquee from '@/components/Home/CompanyMarquee';
import CoverPage from '@/components/Home/CoverPage';
import DownloadApp from '@/components/Home/DownloadApp';
import ExecutivePartners from '@/components/Home/ExecutivePartners';
import Footer from '@/components/Home/Footer';
import HowItWorks from '@/components/Home/HowItWorks';
import OurDashboard from '@/components/Home/OurDashboard';
import OurServices from '@/components/Home/OurServices';
import OurTeam from '@/components/Home/OurTeam';
import Price from '@/components/Home/Price';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import React from 'react';

const Home = ({}) => {
    return (
        <div className="flex flex-col">
            <CoverPage />
            <CompanyMarquee />
            <AboutSection />
            <HowItWorks />
            <ExecutivePartners />
            <OurServices />
            <Price />
            <OurDashboard />
            <WhyChooseUs />
            <DownloadApp />
            <OurTeam />
            <ClientReview />
        </div>
    );
};

export default Home;
