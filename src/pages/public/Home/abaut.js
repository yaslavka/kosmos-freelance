import React, {useEffect}  from 'react'
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'react-bootstrap'
import Planet from "../../../assets/images/logo.png";
import Planets from "../../../assets/images/planet-1.gif";
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = ({about})=>{
  const { t } = useTranslation('common');
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return(
    <>
      <section id="about" className="parallax__group">
              <div className={"parallax__layer parallax__layer--base"} data-aos="fade-up" data-aos-duration="400">
                <div className={"page__container"}>
                  <div className='why-choose-us' id="aboutProject">
                    <div className="why-choose-us__logo-wrap" style={{opacity:"1"}}>
                      <h3 className="why-choose-us__logo-title">
                        {t('mainPage.sections.about.mainTitle.mainWord')}
                      </h3>
                      <img src={Planet} alt={Planet} className={"why-choose-us__logo"} style={{width:"300px"}}/>
                    </div>
                    <div className="why-choose-us__item why-choose-us__item--1" style={{transform:"translate(0px, 0px)", opacity:"1"}} data-aos-duration="400"
                         data-aos="fade-up">
                      <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                      <div className={"why-choose-us__item-wrap"}>
                        <h3 className="why-choose-us__item-title">{t('mainPage.sections.about.mainTitle.title1')}</h3>
                        <p className="why-choose-us__item-text">{t('mainPage.sections.about.mainTitle.text1')}</p>
                      </div>
                    </div>
                    <div className={"why-choose-us__item why-choose-us__item--2"} style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                      <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                      <div className="why-choose-us__item-wrap">
                        <h3 className="why-choose-us__item-title">{t('mainPage.sections.about.mainTitle.title2')}</h3><p
                        className="why-choose-us__item-text">{t('mainPage.sections.about.mainTitle.text2')}</p></div>
                    </div>
                    <div className={"why-choose-us__item why-choose-us__item--3"} style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                      <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                      <div className="why-choose-us__item-wrap">
                        <h3 className="why-choose-us__item-title">{t('mainPage.sections.about.mainTitle.title3')}</h3><p
                        className="why-choose-us__item-text">{t('mainPage.sections.about.mainTitle.text3')}</p></div>
                    </div>
                    <div className={"why-choose-us__item why-choose-us__item--4"} style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                      <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                      <div className="why-choose-us__item-wrap">
                        <h3 className="why-choose-us__item-title">{t('mainPage.sections.about.mainTitle.title4')}</h3><p
                        className="why-choose-us__item-text">{t('mainPage.sections.about.mainTitle.text4')}</p></div>
                    </div>
                    <div className={"why-choose-us__item why-choose-us__item--5"} style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                      <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                      <div className="why-choose-us__item-wrap">
                        <h3 className="why-choose-us__item-title">{t('mainPage.sections.about.mainTitle.title5')}</h3><p
                        className="why-choose-us__item-text">{t('mainPage.sections.about.mainTitle.text5')}</p></div>
                    </div>
                    <div className={"why-choose-us__item why-choose-us__item--6"}>
                      <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                      <div className="why-choose-us__item-wrap">
                        <h3 className="why-choose-us__item-title">{t('mainPage.sections.about.mainTitle.title6')}</h3><p
                        className="why-choose-us__item-text">{t('mainPage.sections.about.mainTitle.text6')}</p></div>
                    </div>
                  </div>
                </div>
              </div>
      </section>
    </>
  )
}
export default About
