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
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>

          <MyViewElement element={<h1 className="root-page-title-m">Наставник</h1>}/>
          {userInfo && (
            <>
            <MyViewElement element={
              <div className={'leader ava-leader'}>
              <div className="leader__figure">
                <div className="leader__image-mentor">
                  <img
                    src={
                      userInfo.referal.avatar
                        ? `${process.env.REACT_APP_BASE_URL}/user/${userInfo.referal.avatar}`
                        : avatar
                    }
                    alt={userInfo.referal.avatar}
                  />
                </div>
              </div>
              <div className="leader__info">
                <div className="card">
                  <div className="card__header">
                    <div className="card__header-left">
                      <h3 className="card__title">{userInfo.referal.first_name} {userInfo.referal.last_name}</h3>
                    </div>
                  </div>
                  <div className="card__body">
                    <div className="list-info list-info--horizontal">
                      <div className="list-info__group">
                        <div className="list-info__label">Telegram:</div>
                        <div className="list-info__value">
                          {userInfo.referal.telegram ? (
                            <a
                              href={`https://t.me/${userInfo.referal.telegram}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {userInfo.referal.telegram}
                            </a>
                          ) : (
                            '-'
                          )}
                        </div>
                      </div>
                      <div className="list-info__group">
                        <div className="list-info__label">ВКонтакте: </div>
                        <div className="list-info__value">
                          {userInfo.referal.vkontakte ? (
                            <a
                              href={`https://vk.com/${userInfo.referal.vkontakte}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {userInfo.referal.vkontakte}
                            </a>
                          ) : (
                            '-'
                          )}
                        </div>
                      </div>
                      <div className="list-info__group">
                        <div className="list-info__label">Instagram:</div>
                        <div className="list-info__value">
                          {userInfo.referal.instagram ? (
                            <a
                              href={`https://www.instagram.com/${userInfo.referal.instagram}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {userInfo.referal.instagram}
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
                    <h3 className="card__title card__title-info">Kosmo_ЧАТ</h3>
                  }/>

                  </div>
                </div>
                <div className="card__body">
                <MyViewElement element={
                  <span className="card__title-body">
                    Хочешь быть в курсе всех новостей, оперативно отслеживать все события и
                    новых продуктов? Специально для тебя у нас есть KosmoЧАТ,{' '}
                  </span>
                  }/>
                <MyViewElement element={
                  <div className='card__btn-strong'>
                    <strong className='card__strong'>
                      ОБЯЗАТЕЛЬНО вступай в него нажав на кнопку ниже!
                    </strong>
                    <Button tag="a" color="primary" href={`https://t.me/kosmosmatrix`} className='card__btn'>
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

                  <p className='card__title-body'> {userInfo.referal.description || '-'}</p>
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
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Leader
