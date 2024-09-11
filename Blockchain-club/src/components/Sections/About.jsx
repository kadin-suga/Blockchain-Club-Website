import React from 'react';
import coins from "../../assets/Coins.png";
import NextEvent from './NextEvent';
import track from '../../assets/tracks.jpg';

function About() {
    const listItemClass = "hover:font-bold py-2 transition-all duration-300";

    return (
        <section className='min-h-screen bg-cover bg-center bg-fixed flex flex-col items-center justify-center py-20 lg:px-10' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${track})` }}>
            <div className='max-w-4xl w-full bg-gray-800 bg-opacity-90 rounded-lg shadow-xl overflow-hidden mb-10 mr-6 md:mr-10 lg:mr-0'>
                <div className='p-8'>
                    <h1 className='text-4xl md:text-5xl font-bold text-white mb-6 text-center '>
                        We explore Cryptocurrency and Blockchain
                    </h1>
                </div>
                <div className="w-full h-64 md:h-96 overflow-hidden">
                    <img src={coins} alt="Cryptocurrency coins" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className='max-w-4xl w-full space-y-10'>
                <div className='bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 rounded-lg shadow-lg p-8 ml-4 md:ml-10 lg:ml-0'>
                    <h2 className='text-3xl font-bold mb-4'>Our Mission</h2>
                    <p className='text-xl'>
                        We aim to help students understand cryptocurrencies and blockchain technology, fostering innovation and knowledge in this rapidly evolving field.
                    </p>
                </div>

                <div className='bg-yellow-500 bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 rounded-lg shadow-lg p-8 mr-4 md:mr-10 lg:mr-0'>
                    <h2 className='text-3xl font-bold mb-4'>What We Offer</h2>
                    <p className='text-xl mb-4'>
                        At Blockchain LUC, we educate our community about cryptocurrency and blockchain technologies through:
                    </p>
                    <ul className='grid grid-cols-2 gap-4'>
                        <li className={listItemClass}>📚 Lectures</li>
                        <li className={listItemClass}>🎙️ Guest Speakers</li>
                        <li className={listItemClass}>🛠️ Projects</li>
                        <li className={listItemClass}>🎉 Events</li>
                    </ul>
                </div>

                <NextEvent text="Our next event is" span="coming soon" />
            </div>
        </section>
    );
}

export default About;
