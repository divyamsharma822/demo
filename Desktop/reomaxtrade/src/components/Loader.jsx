import React from 'react';
import LOGO from '@assets/loder.png';

const Loader = ({}) => {
    return (
        <div className="absolute inset-0 bg-black/50 z-[100] flex justify-center items-center">
            <img src={LOGO} alt="Galaxy Game" className="h-[100px] animate-ping duration-1000" />
        </div>
    );
};

export default Loader;
