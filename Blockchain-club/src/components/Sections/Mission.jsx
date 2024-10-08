import React from 'react';

function Mission() {
  const data1 = {
    title: "Educate",
    info: ["Delve into the fundamentals of Blockchain Technologies.", "Explore the world of Cryptocurrencies.", "Understand the application of Blockchain in everyday life"]
  };
  const data2 = {
    title: "Empower",
    info: ["Drive innovation with cutting-edge Blockchain solutions.", "Unlock the potential of Blockchain.", "Procure a future career in Fintech."]
  };
  const data3 = {
    title: "Enlighten",
    info: ["Engage with a dynamic community and enjoy a transformative learning experience around Blockchain and Cryptocurrency."]
  };

  return (
    <section className='w-full py-[10rem] px-4 bg-red-100'>
      <div className='max-w-[840px] mx-auto'>
        <h1 className='text-2xl font-bold text-center mb-8'>Our mission:</h1>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-8'>
          {helperCard(data1)}
          {helperCard(data2)}
          {helperCard(data3)}
        </div>
      </div>
    </section>
  );
}

function helperCard({ title, info }) {
  return (
    <div className='bg-white w-full border shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
      <h2 className='text-2xl font-bold text-center py-6'>{title}</h2>
      <div className='text-center font-medium '>
        {info.map((item, index) => (
          <p key={index} className='py-3 mx-8 '>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default Mission;
