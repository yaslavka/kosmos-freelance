import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Container, Button } from 'reactstrap'


import avatar from '../../../assets/images/icons/camera_200.png'


import NavBar from '../../../components/layout/Navbar'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'
import {useTranslation} from "react-i18next";
import Chat from "../Chat";

function Leader() {
  const { t } = useTranslation('common');
  const userInfo = useSelector((state) => state.app.user)
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>

          <MyViewElement element={<h1 className="root-page-title-m">{t('private.leader.title')}</h1>}/>
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
                        <div className="list-info__label">{t('private.leader.links3')}</div>
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
                        <div className="list-info__label">{t('private.leader.links')}</div>
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
                        <div className="list-info__label">{t('private.leader.links2')}</div>
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
                    <h3 className="card__title card__title-info">{t('private.leader.chat')}</h3>
                  }/>

                  </div>
                </div>
                <div className="card__body">
                <MyViewElement element={
                  <span className="card__title-body">
                    {t('private.leader.chat1')}{' '}
                  </span>
                  }/>
                <MyViewElement element={
                  <div className='card__btn-strong'>
                    <strong className='card__strong'>
                      {t('private.leader.chat2')}
                    </strong>
                    <Button tag="a" color="primary" href={`https://t.me/kosmosmatrix`} className='card__btn'>
                      {t('private.leader.button')}
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

                    <h3 className="card__title card__title-info">{t('private.leader.info')}</h3>
                  }/>

                  </div>
                </div>
                <div className="card__body">
                <MyViewElement element={

                  <p className='card__title-body'> {userInfo.referal.description || '-'}</p>
                }/>

                </div>
              </div>

            </>
          )}
        </Col>
        <Chat/>
      </Row>
    </Container>
  )
}

export default Leader
