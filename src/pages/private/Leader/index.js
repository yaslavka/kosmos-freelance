import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Container, Button } from 'reactstrap'

import posterVideo from '../../../scss/media/leader-poster-video.56a4c9bf.jpg'
import avatar from '../../../scss/media/camera_200.png'
import video from '../../../scss/media/leader-poster-video.56a4c9bf.jpg'

import NavBar from '../../../components/layout/Navbar'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'
//import UserInfo from '../../../components/UserInfo'

function Leader() {
  const userInfo = useSelector((state) => state.app.user)
  const user = 'Наставник'
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col>
          
          <MyViewElement element={<h1 className="root-page-title-m">Наставник</h1>}/>
          {userInfo && (
            <>
            <MyViewElement element={
              <div className={'leader ava-leader'}>
              <div className="leader__figure">
                <div className="leader__image-mentor">
                  <img
                    src={
                      userInfo.inviterAvatar
                        ? `${process.env.REACT_APP_BASE_URL}${userInfo.inviterAvatar}`
                        : avatar
                    }
                    alt={userInfo.inviterFio}
                  />
                </div>
              </div>
              <div className="leader__info">
                <div className="card">
                  <div className="card__header">
                    <div className="card__header-left">
                      <h3 className="card__title">{userInfo.inviterFio}</h3>
                    </div>
                  </div>
                  <div className="card__body">
                    <div className="list-info list-info--horizontal">
                      <div className="list-info__group">
                        <div className="list-info__label">Telegram:</div>
                        <div className="list-info__value">
                          {userInfo.tg ? (
                            <a
                              href={`https://t.me/${userInfo.tg}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {userInfo.tg}
                            </a>
                          ) : (
                            '-'
                          )}
                        </div>
                      </div>
                      <div className="list-info__group">
                        <div className="list-info__label">ВКонтакте: </div>
                        <div className="list-info__value">
                          {userInfo.vk ? (
                            <a
                              href={`https://vk.com/${userInfo.vk}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {userInfo.vk}
                            </a>
                          ) : (
                            '-'
                          )}
                        </div>
                      </div>
                      <div className="list-info__group">
                        <div className="list-info__label">Instagram:</div>
                        <div className="list-info__value">
                          {userInfo.instagram ? (
                            <a
                              href={`https://www.instagram.com/${userInfo.instagram}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {userInfo.instagram}
                            </a>
                          ) : (
                            '-'
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            }/>
              <div className="card__bot">
                <div className="card__header">
                  <div className="card__header-left">
                  <MyViewElement element={
                    <h3 className="card__title card__title-info">Kosmo_Bot</h3>
                  }/>

                  </div>
                </div>
                <div className="card__body">
                <MyViewElement element={
                  <span className="card__title-body">
                    Хочешь быть в курсе всех новостей, оперативно отслеживать все регистрации и
                    финансовые операции в своём кабинете? Специально для тебя у нас есть KosmoBot,{' '}
                  </span>
                  }/>
                <MyViewElement element={

                  <div className='card__btn-strong'>
                    <strong className='card__strong'>
                      ОБЯЗАТЕЛЬНО вступай в него нажав на кнопку ниже!
                    </strong>
                  
                    <Button tag="a" color="primary" href={``} className='card__btn'>
                      Вступить
                      <span></span><span></span><span></span><span></span>
                    </Button>
                  </div>
                  }/>
                </div>
              </div>
        

              <div className="card__bot">
                <div className="card__header">
                  <div className="card__header-left">
                  <MyViewElement element={

                    <h3 className="card__title card__title-info">Обо мне</h3>
                  }/>

                  </div>
                </div>
                <div className="card__body">
                <MyViewElement element={

                  <p className='card__title-body'> {userInfo.description || '-'}</p>
                }/>

                </div>
              </div>
              <MyViewElement element={

              <div className='video__block'>
                <video
                  controls
                  poster={posterVideo}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  className='video__nas'
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
                }/>

              {userInfo && userInfo.showInviter && (
                <MyViewElement element={

                <h3 className="text-center mb-5 mt-5">
                  Если хотите пополнить кабинет без комиссии, напишите мне в Telegram, ссылка
                  наверху
                </h3>
                }/>

              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Leader
