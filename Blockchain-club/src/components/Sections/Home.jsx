import React from 'react'
import layout from "../../assets/layout.jpg";  // Import the image correctly


function Home() {
  return (
        <div className="relative h-screen w-screen flex justify-center items-center">
          <div className="relative w-full h-full">
          <img src={layout} className="w-full h-full object-cover" alt="background" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-[#53112318]">
            <div className='bg-gray-800 opacity-80 p-5 mx-5 md:mx-10 '>

            <h1 className='text-6xl font-bold text-[#FFD700]'>Blockchain LUC</h1>
            <p className='text-xl text-white'>
              LOYOLA'S ORGANIZATION THAT EXPLORES THE CRYPTOCURRENCY AND BLOCKCHAIN ECOSYSTEM
            </p>
            </div>
          </div>
        </div>
    </div>

  )
}

export default Home
