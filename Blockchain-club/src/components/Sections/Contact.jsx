import React from 'react';
import NextEvent from './NextEvent';
import subway from '../../assets/subway.jpg';
import { NavLink } from 'react-router-dom';

function Contact() {
  const data1 = {
    title: 'Our LUCCommunity',
    text: 'LUCCommunity is the official platform for the Blockchain LUC profile. By joining through LUCCommunity, you can become a member and receive email updates about upcoming events.',
    buttName: 'Become a member',
    link: 'https://luc.campuslabs.com/engage/organization/bluc',
  }

  const data2 = {
    title: 'Our Slack Community',
    text: 'Our Slack community is where we will post our event updates and community updates. With the Slack page you are able to talk to other fellow members and collab on various topics.',
    buttName: 'Join the community',
    link: 'https://join.slack.com/t/blockchainluc/shared_invite/zt-2p4949wd3-ARWzYkNRyWlpNdveJKIHYg',
  }

  function contactBlock({title, text, buttName, link}) {

    return (
      <div className='hover:scale-105 duration-300 w-max-[450px] m-5 justify-center p-8 bg-white bg-opacity-80 rounded-lg pb-10'>
        <div>
          <h1 className='text-2xl'>{title}</h1>
          <p className='text-md'>{text}</p>
        </div>

        <NavLink to={link}>
          <button className='cursor-pointer mb-4 mt-4  text-white text-lg items-center justify-center my-2 p-3 rounded-md shadow-lg border-none  bg-[rgb(114,57,73)] hover:bg-[rgb(140,70,90)]'>{buttName}</button>
        </NavLink>
      </div>
    );
  }

  return (
    <section className='relative min-h-screen w-full bg-cover bg-fixed bg-center' style={{ backgroundImage: `url(${subway})` }}>
      <div className='absolute inset-0 bg-black bg-opacity-50'></div>
      <div className='relative z-10 pt-10 pb-20 px-4'>
        <div className='justify-center text-center mb-10'>
          <h1 className='text-4xl font-bold text-white'>Get involved</h1>
          <p className='text-l py-3 text-gray-200'>These are some ways you can be involved in the Blockchain LUC community</p>
        </div>

        <div className='mb-20 grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          {contactBlock(data1)}
          {contactBlock(data2)}
        </div>
        <NextEvent text='Join us in our next' span='event' />
      </div>
    </section>
  );
}

export default Contact;
