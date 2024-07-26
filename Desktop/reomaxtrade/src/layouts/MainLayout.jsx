import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Home/Footer';

const MainLayout = () => {
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <main className="flex flex-col overflow-hidden ">
            <Navbar />
            <Outlet />
            <Footer />
        </main>
    );
};

export default MainLayout;
