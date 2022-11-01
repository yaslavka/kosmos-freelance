import React, { useEffect } from 'react'
import Header from './Header'
//import Banner from './Banner'
//import Authentication from './Authentication'
import Footer from './Footer'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Hero from './Hero'
import Advantages from "./advantages";
//import Materials from "./Materials";


function Home() {
  useEffect(() => {
    AOS.init()
    AOS.refresh()
  }, [])

  return (
    <div className="page">
      <Header />
      <Hero />
      <Advantages/>
      {/*<Materials />*/}
      <Footer />
    </div>
  )
}

export default Home
