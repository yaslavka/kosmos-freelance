import React from "react";
import "./adv.css"
import {Col, Row} from "reactstrap";
import { useTranslation } from 'react-i18next';
function Advantages(){
  const { t } = useTranslation('common');
  return(
    <>
      <section id="advantages" className={"our-services section-margin section-padding"}>
        <div>
          <div className={"one-title dsn-active"} data-dsn-animate="up">
            <div className={"title-sub-container"}>
              <p className={"title-sub"} data-i18n="what we offer">{t('mainPage.sections.advantages.mainTitle')}</p>
            </div>
            <h2 className="title-main" data-i18n="our services">{t('mainPage.sections.advantages.mainTitles')}</h2>
          </div>
          <Row>
            <Col md={6}>
              <div className={"services-item"}>
                <div className="line-before"/>
                <h4 className={"subtitle s"}>
                  <span className={"ss"} data-i18n="package of services for">
                    {t(`mainPage.sections.advantages.advantagesList.title`)}
                  </span> 500 <i className={"rouble"}>₽</i> <span data-i18n="non-recurrent">({t(`mainPage.sections.advantages.advantagesList.titles`)})</span>
                </h4>
                <ol data-dsn-animate="up" className="dsn-active">
                  <li className="decimal">
                    <p data-i18n="main basic">{t(`mainPage.sections.advantages.advantagesList.text`)}</p>
                    <ul className="list-check">
                      <li data-i18n="maintenance and monetization of social networks">{t(`mainPage.sections.advantages.advantagesList.text2`)}</li>
                      <li data-i18n="traffic arbitration">{t(`mainPage.sections.advantages.advantagesList.text3`)}</li>
                      <li data-i18n="design">{t(`mainPage.sections.advantages.advantagesList.text4`)}</li>
                      <li data-i18n="psychology">{t(`mainPage.sections.advantages.advantagesList.text5`)}</li>
                      <li data-i18n="advertising management">{t(`mainPage.sections.advantages.advantagesList.text6`)}</li>
                      <li data-i18n="copywriting">{t(`mainPage.sections.advantages.advantagesList.text7`)}</li>
                    </ul>
                  </li>
                  <li className="decimal" data-i18n="access to creatives promo">{t(`mainPage.sections.advantages.advantagesList.text8`)}</li>
                  <li className=" decimal" data-i18n=" access to basic">{t(`mainPage.sections.advantages.advantagesList.text9`)}</li>
                </ol>
                <div className="link-custom">
                  <a className="image-zoom" href={"/sign-up"}>
                    <span data-i18n="buy package">{t(`mainPage.sections.advantages.advantagesList.text10`)}</span>
                    <div className="icon-circle"/>
                  </a>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className={"services-item"}>
                <div className="line-before"/>
                <h4 className={"subtitle s"}>
                  <span className={"ss"} data-i18n="package of services for">
                    {t(`mainPage.sections2.advantages.advantagesList.title`)}
                  </span> 2160 <i className={"rouble"}>₽</i> <span data-i18n="non-recurrent">{t(`mainPage.sections2.advantages.advantagesList.titles`)}</span>
                </h4>
                <ol data-dsn-animate="up" className="dsn-active">
                  <li className="decimal">
                    <p data-i18n="main basic">{t(`mainPage.sections2.advantages.advantagesList.text`)}</p>
                    <ul className="list-check">
                      <li data-i18n="maintenance and monetization of social networks">{t(`mainPage.sections2.advantages.advantagesList.text2`)}</li>
                      <li data-i18n="traffic arbitration">{t(`mainPage.sections2.advantages.advantagesList.text3`)}</li>
                      <li data-i18n="design">{t(`mainPage.sections2.advantages.advantagesList.text4`)}</li>
                      <li data-i18n="psychology">{t(`mainPage.sections2.advantages.advantagesList.text5`)}</li>
                      <li data-i18n="advertising management">{t(`mainPage.sections2.advantages.advantagesList.text6`)}</li>
                      <li data-i18n="copywriting">{t(`mainPage.sections2.advantages.advantagesList.text7`)}</li>
                    </ul>
                  </li>
                  <li className="decimal" data-i18n="access to creatives promo">{t(`mainPage.sections2.advantages.advantagesList.text8`)}</li>
                  <li className=" decimal" data-i18n=" access to basic">{t(`mainPage.sections2.advantages.advantagesList.text9`)}</li>
                </ol>
                <div className="link-custom">
                  <a className="image-zoom" href={"/sign-up"}>
                    <span data-i18n="buy package">{t(`mainPage.sections2.advantages.advantagesList.text10`)}</span>
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
