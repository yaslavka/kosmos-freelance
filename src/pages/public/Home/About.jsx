import React from 'react'
import Planet from "../../../assets/images/logo.png";
import Planets from "../../../scss/media/planet-1.gif";

const About = ()=>{
    return (
        <section id="about" className="parallax__group">
            <div className={"parallax__layer parallax__layer--base"}>
              <div className={"page__container"}>
                <div className='why-choose-us' id="aboutProject">
                  <div className="why-choose-us__logo-wrap" style={{opacity:"1"}}>
                    <h3 className="why-choose-us__logo-title">
                      Почему выбирают
                    </h3>
                    <img src={Planet} alt={Planet} className={"why-choose-us__logo"} style={{width:"300px"}}/>
                  </div>
                  <div className="why-choose-us__item why-choose-us__item--1" style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                    <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                    <div className={"why-choose-us__item-wrap"}>
                      <h3 className="why-choose-us__item-title">Надежность</h3>
                      <p className="why-choose-us__item-text">Платформа Космос официально зарегистрирована в
                        Великобритании</p>
                    </div>
                  </div>
                  <div className={"why-choose-us__item why-choose-us__item--2"} style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                    <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                    <div className="why-choose-us__item-wrap">
                      <h3 className="why-choose-us__item-title">Актуальность</h3><p
                      className="why-choose-us__item-text">Создатели платформы регулярно обновляют программы Космос в
                      соответствии с актуальными трендами сетевой индустрии</p></div>
                  </div>
                  <div className={"why-choose-us__item why-choose-us__item--3"} style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                    <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                    <div className="why-choose-us__item-wrap">
                      <h3 className="why-choose-us__item-title">Сообщество сетевых предпринимателей</h3><p
                      className="why-choose-us__item-text">Первое независимое коммьюнити сетевых предпринимателей в России и на территории СНГ</p></div>
                  </div>
                  <div className={"why-choose-us__item why-choose-us__item--4"} style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                    <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                    <div className="why-choose-us__item-wrap">
                      <h3 className="why-choose-us__item-title">Экспертность</h3><p
                      className="why-choose-us__item-text">Создатели платформы Космос являются успешными сетевыми предпринимателями и делятся лично проверенными знаниями</p></div>
                  </div>
                  <div className={"why-choose-us__item why-choose-us__item--5"} style={{transform:"translate(0px, 0px)", opacity:"1"}}>
                    <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                    <div className="why-choose-us__item-wrap">
                      <h3 className="why-choose-us__item-title">Партнёрская программа</h3><p
                      className="why-choose-us__item-text">Наличие партнерской программы помогает пользователям развиваться целыми командами</p></div>
                  </div>
                  <div className={"why-choose-us__item why-choose-us__item--6"}>
                    <img src={Planets} className="why-choose-us__item-icon" alt={''} style={{width:"25px"}}/>
                    <div className="why-choose-us__item-wrap">
                      <h3 className="why-choose-us__item-title">Доступность</h3><p
                      className="why-choose-us__item-text">Все учебные материалы доступны каждому пользователю платформы Космос</p></div>
                  </div>
                </div>
              </div>
            </div>
        </section>
    )
}


export default About
