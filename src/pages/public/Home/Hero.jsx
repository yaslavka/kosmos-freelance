import React from 'react';
import cl from './../../../scss/MainPage.module.css';
import Planet from "../../../scss/media/planet-1.gif";
import Authentication from "./Authentication";
import About from "./About";
import Footer from "./Footer";


const Hero = ()=>{
    return (
        <section className={cl.Hero}>
          <div className='container'>
            <div className={cl.wrap}>
              <h1 className={cl.titles} data-aos="flip-left">
                <span>KOSM</span>
                <span className={cl.logos}  >
              <img src={Planet} alt={Planet}/>
            </span>
                <span>S</span>
              </h1>
            </div>
            <Authentication/>
          </div>
          <About />
        </section>
    )
}

export default Hero
