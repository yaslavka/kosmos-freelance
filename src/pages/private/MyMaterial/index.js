import React, {useEffect, useState} from 'react'
import {Col, Row} from "reactstrap";
import NavBar from "../../../components/layout/Navbar";
import {ArrowRight, DoneAll, Home} from "@material-ui/icons";
import './index.css'
import {HashLink} from "react-router-hash-link";
import routes from '../../../constants/routes.constants'
import bot from '../../../assets/images/photo_2022-12-26_22-21-45.jpg'
import Chat from "../Chat";
import {useSelector} from "react-redux";
import {api} from "../../../api";
import {useParams} from "react-router-dom";

const materialLinks = [
  {
    label: 'HUB projects',
    route: routes.educat,
    dataToggle: "pill",
    ariaExpanded: true,
    text: ' - ваша персональная визитка в Телеграм, которая выполняет основные функции для успешного заработка в интернете и не только, а именно:',
    title: 'Объединяет все ваши проекты в одном месте',
    title2: 'Помогает собирать подписную базу',
    title3: 'Помогает строить команду',
    title4: 'в любом проекте за счет дубликации действий',
    title5: 'Теперь у вас есть универсальный инструмент, с которым даже ленивый сможет стать супер успешным Наставником для своей команды!',
    title6: '🤩 Ах, да, еще же есть уникальный маркетинг в самом боте!',
    olata: routes.finances,
    imge: bot
  },
]


function MyMaterial({children}) {
  const userInfo = useSelector((state) => state.app.user)
  return (
    <>
      {userInfo && (
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <NavBar/>
          </Col>
          <Col xl={9}>
            <div className="content-header">
              <div className="content-header-left col-12 mb-2 mt-1">
                <div className="row breadcrumbs-top">
                  <div className="col-12">
                    <div className="breadcrumb-wrapper col-11">
                      <ol className="breadcrumb p-0 mb-0">
                        <h5 className="content-header-title float-left pr-1 mb-0"
                            style={{padding: "10.5px"}}>Материалы</h5>
                        <li className="breadcrumb-item" style={{padding: "10.5px"}}><a href="/leader"><Home/></a></li>
                        <li className="" style={{padding: "10.5px"}}><ArrowRight/> || Полезные Материалы</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <>
              {userInfo.is_verified > 5000 ? (
                <>
                  <Col xl={12}>
                    {materialLinks.map(({
                                          label,
                                          route,
                                          id,
                                          imge,
                                          text,
                                          title,
                                          title2,
                                          title3,
                                          title4,
                                          title5,
                                          title6,
                                        }) => (
                      <div className="wrappp">
                        <div className="grid-wrappp">
                          <div className="">
                            <div className="mainsus">
                              <div className="cons cnt-pts">
                                <div className="grid-wrappp">
                                  <div className="grid-wrapp-colss pd-sms-both game-listen">
                                    <div className="grid-cols__4-12">
                                      <div className="tmbvs">
                                        <i className="stickercs"/>
                                        <div className="tmb-fav">
                                          <div className="icoc icoc-tmb-fav"/>
                                        </div>
                                        <div className="tmb-img">
                                          <HashLink to={route} key={id} id={id}>
                                            <img src={imge} height="1%" alt={""}/>
                                          </HashLink>
                                          <div className="tmb-title">{label}</div>
                                          <div className="card-content">
                                            <div className="card-body">
                                              <ol className="font-medium-2">
                                                <li>
                                                  <span data-i18n="main basic">{text}</span>
                                                  <ul className="list-style-icons">
                                                    <li><DoneAll/> <span
                                                      data-i18n="maintenance and monetization of social networks">{title}</span>
                                                    </li>
                                                    <li><DoneAll/> <span
                                                      data-i18n="traffic arbitration">{title2}</span></li>
                                                    <li><DoneAll/> <span
                                                      data-i18n="design">{title3}</span></li>
                                                    <li><DoneAll/> <span
                                                      data-i18n="psychology">{title4}</span></li>
                                                    <li><DoneAll/> <span
                                                      data-i18n="advertising management">{title5}</span></li>
                                                  </ul>
                                                </li>
                                                <li><span data-i18n="access to">{title6}</span></li>
                                              </ol>
                                              <div className="text-center mt-2">
                                                <HashLink to={route}
                                                          className="btn btn-lg btn-primary shadow error-buy fin-btn">
                                            <span className="align-middle ml-50">
                                              <span data-i18n="buy package">
                                                Перейти
                                              </span>
                                              К
                                              <span className="rouble">
                                                Знакомству
                                              </span>
                                              с Ботом
                                            </span>
                                                </HashLink>
                                              </div>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Col>
                </>
              ) : (<Col xl={12}>
                <div className="wrappp">
                  <div className="grid-wrappp">
                    <div className="">
                      <div className="mainsus">
                        <div className="cons cnt-pts">
                          <div className="grid-wrappp">
                            <div className="grid-wrapp-colss pd-sms-both game-listen">
                              <div className="grid-cols__4-12">
                                <div className="tmbvs">
                                  <i className="stickercs"/>
                                  <div className="tmb-fav">
                                    <div className="icoc icoc-tmb-fav"/>
                                  </div>
                                  <div className="tmb-title">Вы не активированны!... Доступ Появится после активации
                                    Платформы KEPLER
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>)}
            </>
          </Col>
          <Chat/>
        </Row>
      )}
      {children}
    </>
  )
}

export default MyMaterial
