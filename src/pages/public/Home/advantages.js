import React from "react";
import "./adv.css"
import {Col, Row} from "reactstrap";
function Advantages(){
  return(
    <>
      <section id="advantages" className={"our-services section-margin section-padding"}>
        <div>
          <div className={"one-title dsn-active"} data-dsn-animate="up">
            <div className={"title-sub-container"}>
              <p className={"title-sub"} data-i18n="what we offer">Что мы предлагаем</p>
            </div>
            <h2 className="title-main" data-i18n="our services">Наши услуги</h2>
          </div>
          <Row>
            <Col md={6}>
              <div className={"services-item"}>
                <div className="line-before"/>
                <h4 className={"subtitle s"}>
                  <span className={"ss"} data-i18n="package of services for">
                    Пакет услуг за
                  </span> 500 <i className={"rouble"}>₽</i> <span data-i18n="non-recurrent">(единократно)</span>
                </h4>
                <ol data-dsn-animate="up" className="dsn-active">
                  <li className="decimal">
                    <p data-i18n="main basic">Вы получаете постоянный доступ к регулярно обновляемой базе авторских
                      бизнес тренингов, по следующим тематикам:</p>
                    <ul className="list-check">
                      <li data-i18n="maintenance and monetization of social networks">Ведение социальных сетей и их
                        монетизация
                      </li>
                      <li data-i18n="traffic arbitration">Арбитраж трафика</li>
                      <li data-i18n="design">Дизайн</li>
                      <li data-i18n="psychology">Психология</li>
                      <li data-i18n="advertising management">Рекламный менеджмент</li>
                      <li data-i18n="copywriting">Копирайтинг</li>
                    </ul>
                  </li>
                  <li className="decimal" data-i18n="access to creatives promo">Доступ к креативам и промо-материалам</li>
                  <li className=" decimal" data-i18n=" access to basic">Доступ к партнерской программе Пегас</li>
                </ol>
                <div className="link-custom">
                  <a className="image-zoom" href={"/sign-up"}>
                    <span data-i18n="buy package">Приобрести пакет</span>
                    <div className="icon-circle"></div>
                  </a>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={"services-item"}>
                <div className="line-before"/>
                <h4 className={"subtitle s"}>
                  <span className={"ss"} data-i18n="package of services for">
                    Пакет услуг за
                  </span> 2160 <i className={"rouble"}>₽</i> <span data-i18n="non-recurrent">(еже-месячно)</span>
                </h4>
                <ol data-dsn-animate="up" className="dsn-active">
                  <li className="decimal">
                    <p data-i18n="main basic">Вы получаете постоянный доступ к регулярно обновляемой базе авторских
                      бизнес тренингов, по следующим тематикам:</p>
                    <ul className="list-check">
                      <li data-i18n="maintenance and monetization of social networks">Создание и настройка сайтов
                      </li>
                      <li data-i18n="traffic arbitration">Арбитраж трафика</li>
                      <li data-i18n="design">Дизайн</li>
                      <li data-i18n="psychology">Написание кода</li>
                      <li data-i18n="advertising management">Рекламный менеджмент</li>
                      <li data-i18n="copywriting">Копирайтинг</li>
                    </ul>
                  </li>
                  <li className="decimal" data-i18n="access to creatives promo">Доступ к креативам и промо-материалам</li>
                  <li className=" decimal" data-i18n=" access to basic">Доступ к партнерской программе Млечный путь</li>
                </ol>
                <div className="link-custom">
                  <a className="image-zoom" href={"/sign-up"}>
                    <span data-i18n="buy package">Приобрести пакет</span>
                    <div className="icon-circle"></div>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}
export default Advantages
