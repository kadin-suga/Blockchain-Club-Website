import React from 'react';

function Touch() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">

      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h1>
        <form
          action="https://docs.google.com/forms/d/e/1FAIpQLSfAct_PnuwCaC1zyG5i4JspkNgyf9YkDjc_up1hPxxlRITByA/formResponse"
          method="POST"
          className="space-y-6"
        >
        <div className='flex flex-row space-x-4'>

            <div className='w-1/2'>
                <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
                >
                First Name
                </label>
                <input
                type="text"
                id="firstName"
                name="entry.285982273"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John"
                required
                />
            </div>

            <div className='w-1/2'>
                <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
                >
                Last Name
                </label>
                <input
                type="text"
                id="lastName"
                name="entry.1527962555"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Smith"
                required
                />
            </div>
            </div>
            <div >
                <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
                >
                Email address
                </label>
                <input
                type="email"
                id="Email"
                name="entry.427599254"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="test@luc.edu"
                required
                />

            </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="entry.344476745"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Subject of your message"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="entry.1000118742"
              rows="4"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[rgb(114,57,73)] hover:bg-[rgb(140,70,90)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Touch;
