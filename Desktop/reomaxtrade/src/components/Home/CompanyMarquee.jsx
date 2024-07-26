import React from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Marquee from 'react-fast-marquee';
import TICKER1 from '../../assets/icon-ticker-1.svg';
import TICKER2 from '../../assets/icon-ticker-2.svg';
import TICKER3 from '../../assets/icon-ticker-3.svg';
import TICKER4 from '../../assets/icon-ticker-4.svg';
import TICKER5 from '../../assets/icon-ticker-5.svg';
import TICKER6 from '../../assets/icon-ticker-6.svg';
import TICKER7 from '../../assets/icon-ticker-7.svg';
import TICKER8 from '../../assets/icon-ticker-8.svg';
import TICKER9 from '../../assets/icon-ticker-9.svg';
import TICKER10 from '../../assets/icon-ticker-10.svg';
import TICKER11 from '../../assets/icon-ticker-11.svg';
import TICKER12 from '../../assets/icon-ticker-12.svg';
import TICKER13 from '../../assets/icon-ticker-13.svg';
import TICKER14 from '../../assets/icon-ticker-14.svg';

const logos = [
    [TICKER1, 'Bitcoin'],
    [TICKER2, 'Etherium'],
    [TICKER3, 'Tether'],
    [TICKER4, 'BNB'],
    [TICKER5, 'Solana'],
    [TICKER6, 'USD Coin'],
    [TICKER7, 'Cardano'],
    [TICKER8, 'Cardano'],
    [TICKER9, 'Dogecoin'],
    [TICKER10, 'Tron'],
    [TICKER11, 'Polygon'],
    [TICKER12, 'Shiba INU'],
    [TICKER13, 'Lite Coin'],
    [TICKER14, 'Stacks'],
];

const duplicatedLogos = [...logos, ...logos];

const CompanyMarquee = ({}) => {
    return (
        <motion.div className="w-full bg-[#20252e] py-5 overflow-hidden">
            <Marquee className="flex gap-5">
                {duplicatedLogos.map(([image, label], index) => (
                    <div className="flex gap-3 items-center mx-5" key={uuidv4()}>
                        <img src={image} alt={label} className="h-10" />
                        <div className="text-white ">{label}</div>
                    </div>
                ))}
            </Marquee>
        </motion.div>
    );
};

export default CompanyMarquee;
