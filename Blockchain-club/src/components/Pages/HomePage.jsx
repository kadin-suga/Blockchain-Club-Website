import React, { useEffect } from 'react';
import Header from '../Sections/Header';
import Home from '../Sections/Home';
import Mission from '../Sections/Mission';
import Contact from '../Sections/Contact';
import Info from '../Sections/Info';
import Footer from '../Sections/Footer';
import NextEvent from '../Sections/NextEvent';

function HomePage() {
  function trackref() {
    const user = 'User1'; // This can be dynamically fetched if needed
    const page = window.location.pathname; // Get current page path

    const eventData = { 
      "User id": user, 
      "Referred by": document.referrer || 'Direct visit', // Provide a default value if referrer is empty
      "Current page": page  // Optionally track the current page
    };

    // Send data to the backend
    fetch('http://localhost:3000/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then(response => response.json())
    .then(data => console.log('Activity tracked:', data))
    .catch(error => console.error('Error tracking activity:', error));
  }

  useEffect(() => {
    trackref();
  }, []); // Empty dependency array to run only once

  return (
    <div>
      <Header />
      <Home />
      <Mission />
      <Info />
      <NextEvent text="Check out our" span="upcoming events" />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;
