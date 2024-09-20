import React from 'react'
import Header from '../Sections/Header'
import Home from '../Sections/Home'
import Mission from '../Sections/Mission'
import Contact from '../Sections/Contact'
import Info from '../Sections/Info'
import Footer from '../Sections/Footer'
import Touch from '../Sections/Touch'
import NextEvent from '../Sections/NextEvent'


function HomePage() {
  return (
    <div>
        <Header/>
        <Home/>
        <Mission/>
        <Info/>
        <NextEvent text="Check out our" span="upcoming events" />
        <Contact/>
        <Footer/>
    </div>
  )
}

export default HomePage
