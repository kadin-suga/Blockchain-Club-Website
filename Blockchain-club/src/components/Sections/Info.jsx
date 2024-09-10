import React from 'react'
import river from "../../assets/river.jpg";  // Import the image correctly
import ScrollReveal from 'scrollreveal';
import { useRef } from 'react';
import { useEffect } from 'react';


function Info() {
  const scopeItems = [
    "Bitcoin", "Altcoins", "CBDCs", "Memecoins",
    "Blockchain", "Fintech", "Decentralized Finance"
  ];

  useEffect(() => {
    ScrollReveal().reveal('.scope-item', {
      delay: 200,
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      interval: 100
    });
  }, []);

  const ScopeItem = ({ title }) => (
    <div className="scope-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 p-4">
        <h2 className="text-lg font-semibold text-center text-gray-800">{title}</h2>
      </div>
    </div>
  );

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <img src={river} alt="River background" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Our Scope</h1>
        <div className="flex flex-wrap -mx-2 justify-center">
          {scopeItems.map((item, index) => (
            <ScopeItem key={index} title={item} />
          ))}
        </div>
      </div>
    </section>
  );

}

export default Info
