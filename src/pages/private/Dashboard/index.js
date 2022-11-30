import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Container, Button } from 'reactstrap'
import NavBar from '../../../components/layout/Navbar'
import Avatar from '../../../components/Avatar'
import { toast } from 'react-toastify'
import { formatter } from '../../../utils'
import CountdownTimer from '../StarTrek/CountdownTimer/CountdownTimer'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'
import {useTranslation} from "react-i18next";

function Dashboard() {
  const { t } = useTranslation('common');
  const userInfo = useSelector((state) => state.app.user)

  const copyRefLinkToClipboard = async () => {
    if (userInfo && `http://localhost:3000/sign-up?ref=${userInfo.username}`) {
      navigator.clipboard.writeText(`http://localhost:3000/sign-up?ref=${userInfo.username}`).then(() => {
        toast.info(`${t('private.Dashboard.copy')}`)
      })
    }
  }

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <MyViewElement element={
          <h1 className="root-page-title">{t('private.Dashboard.title')}</h1>
          }/>
          {userInfo && (
            <>
          <MyViewElement element={
              <div className="leader">
                <div className="leader__figure">
                  <div className="leader__image">
                    <Avatar
                      className="user-info__avatar"
                      url={userInfo.avatar && `${process.env.REACT_APP_BASE_URL}/user/${userInfo.avatar}`}
                    />
                  </div>
                </div>
                <div className="leader__info">
                  <div className="card">
                    <div className="card__header">
                      <div className="card__header-left">
                        <h3 className="card__title">
                          {userInfo.first_name || '-'} {userInfo.last_name || '-'}
                        </h3>
                      </div>
                    </div>
                    <div className="card__body">
                      <div className="list-info list-info--horizontal">
                        <div className="list-info__group">
                          <div className="list-info__label">{t('private.Dashboard.balance')}</div>
                          <div className="list-info__value">
                            {formatter.format(userInfo.balance || 0).replace('₽', '₽') ? (
                              <div>
                                {formatter.format(userInfo.balance || 0).replace('₽', '₽')}
                              </div>
                            ) : (
                              '-'
                            )}
                          </div>
                        </div>
                        <div className="list-info__group">
                          <div className="list-info__label">{t('private.Dashboard.createdAt')}</div>
                          <div className="list-info__value">
                            {userInfo.createdAt ? (
                              <div>{userInfo.createdAt}</div>
                            ) : (
                              '-'
                            )}
                          </div>
                        </div>
                        <div className="list-info__group">
                          <div className="list-info__label">{t('private.Dashboard.created')}</div>
                          <div className="list-info__value">
                            {userInfo.activationDate ? <div>{userInfo.activationDate}</div> : '-'}
                          </div>
                        </div>
                        <div className="list-info__group">
                          <div className="list-info__label">{t('private.Dashboard.inviter')}</div>
                          <div className="list-info__value">
                            {userInfo.referal ? <div>{userInfo.referal.username}</div> : '-'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                 }/>

                <div className="card__bot">
                <MyViewElement element={
                  <div className="card__header">
                    <div className="card__header-left">
                      <h3 className="card__title card__title-info">{t('private.Dashboard.referallink')}</h3>
                    </div>
                  </div>
              }/>
                <div className="card__body">
          <MyViewElement element={

                  <div className="referral-link">
                    <div className="referral-link__url">{`http://localhost:3000/sign-up?ref=${userInfo.username}`}</div>
                    <Button
                      color="link"
                      className="referral-link__btn"
                      onClick={copyRefLinkToClipboard}
                    >
                     <span> </span>
                    </Button>
                  </div>
                 }/>

                </div>
              </div>
          <MyViewElement element={
            <>
              <div className="startrek__title1 card__title-info">
                <span>{t('private.Dashboard.timer')}</span>
              </div>
              <div className="startrek__title">
                <CountdownTimer countdownTimestampMs={16599836620000} />
              </div>
            </>
            }/>


            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
