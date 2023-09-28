import React from 'react'
import Navbar from '../components/navbar/navbar'
import Welcome from '../components/welcome/welcome'
import About from '../components/about/about'
import BestLuck from '../components/bestLuck/bestLuck'

function HomePage() {
  return (
    <>
     <Navbar /> 
     <Welcome />
     <About />
     <BestLuck />
    </>
  )
}

export default HomePage
