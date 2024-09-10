import React from 'react'
import coins from "../../assets/Coins.png"
import NextEvent from './NextEvent';
import track from '../../assets/tracks.jpg';


function About() {
    const classNamesB = "hover:font-bold py-2";
  return (
    <section className='py-10 bg-cover bg-center' >
      <div className='bg-cover bg-center bg-gray-800 '>
        <div className='p-2 py-5 ml-7'>
          <h1 className='p-3 text-4xl bg-gray-700 text-white'>We are a club that surrounds ourself with topics of Cryptocurrency and Blockchain</h1>
        </div>
        <div>
          <img src={coins} alt="" className='md:w-[800px] md:h-[400px] w-[500px] h-[300px] justify-center'/>
        </div>

      </div>
        <div style={{ backgroundImage: `url(${track})` }} className='bg-cover bg-center py-10'>
          <div className='bg-opacity-80 bg-white m-10 hover:scale-105 duration-300 border-black border-2 shadow-md rounded-lg p-6'>
              <h1 className='text-3xl textbold'>Our mission:</h1>
              <div className='mt-3'>
                  <p className='text-2xl'>
                  We want to help students understand cryptocurrencies and blockchain technology.
                  </p>
              </div>
          </div>

          <div className='bg-opacity-80 my-20 border-black p-3 mr-7 bg-yellow-500'>
              <p className='text-2xl'>At Blockchain LUC, we host meetings about educating our community about cryptocurrency and blockchain technologies using:</p>
              <ul className='justify-between-3 list-disc list-inside ml-6'>
                  <li className={classNamesB}>Lectures</li>
                  <li className={classNamesB}>Guest Speakers</li>
                  <li className={classNamesB}>Projects</li>
                  <li className={classNamesB}>Events</li>
              </ul>
          </div>
          <NextEvent text="Our next event is" span="over here"/>
        </div>
    </section>
  )
}





export default About
