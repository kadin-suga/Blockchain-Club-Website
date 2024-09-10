import React from 'react'

function Event() {
  return (
    <div className='p-3 mb-4'>
        <div className='flex justify-center my-3'>
            <h1 className='text-3xl'>Events</h1>
        </div>
        <div className='h-[800px] sm:h-[600px]'>
            <iframe src="https://calendar.google.com/calendar/embed?src=loyolablockchain%40gmail.com&ctz=America%2FChicago"
                    className="top-0 left-0 w-full h-full border-0"
                    frameBorder="0"
                    scrolling="no"
                    />
        </div>
    </div>
  )
}

export default Event
