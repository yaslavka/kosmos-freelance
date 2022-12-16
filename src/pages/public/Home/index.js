import React, {useState} from 'react'
import './index.css'
import Header from './Header'
import { Col, Row } from 'react-bootstrap'
import Planet from '../../../assets/images/planet-1.gif'
import Authentication from './auth'
import Footer from "./Footer/Footer";
import About from "./abaut";
import Advantages from "./advantages";
function Home() {
  const [about, setAbout]= useState(false)
  const [home, setHome]= useState(true)
  return (
    <>
      <Header setAbout={setAbout} setHome={setHome}/>
      <div className={'page'}>
        <div className={'page-content'}>
          <div className={'content-area'}>
            <div className={'animated-sections'}>
              <section
                id="/"
                className={home?
                  'animated-section start-page bg-slide-blocks-1 ps section-active ps--theme_default':
                  'animated-section start-page ps ps--theme_default'
                }
                data-ps-id="b4b75427-eb77-63ee-e11e-29ac097235a3"
              >
                <div className={'section-content vcentered'}>
                  <Row>
                    <Col sm={12} md={12} lg={12}>
                      <div className={'title-block'}>
                        <section className={'Hero'}>
                          <div className="container">
                            <div className={'wrap'}>
                              <h1 className={'titles'} data-aos="flip-left">
                                <span>KOSM</span>
                                <span className={'logos'}>
                                  <img src={Planet} alt={Planet} />
                                </span>
                                <span>S</span>
                              </h1>
                            </div>
                          </div>
                        </section>
                        <div className={'owl-carousel text-rotation owl-loaded owl-drag'}>
                          <div className={'owl-stage-outer'}>
                            <div className={'owl-stage'}>
                              <div className="owl-item active">
                                <div className="item">
                                  <div className="sp-subtitle">Измени свою жизнь прямо сейчас</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Authentication />
                      </div>
                    </Col>
                  </Row>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <About about={about}/>
      <Advantages/>
      <Footer/>

    </>
  )
}
export default Home
