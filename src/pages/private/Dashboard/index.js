import React from 'react'
import { useSelector} from 'react-redux'
import { Row, Col } from 'reactstrap'
import NavBar from '../../../components/layout/Navbar'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { formatter } from '../../../utils'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'
import {useTranslation} from "react-i18next";
import './index.css'
import Avatar from '../../../components/Avatar'
import Chat from "../Chat";



function Dashboard() {
  const { t } = useTranslation('common');
  const userInfo = useSelector((state) => state.app.user)

  const copyRefLinkToClipboard = async () => {
    if (userInfo && `https://kosmos-lif.host/sign-up?ref=${userInfo.username}`) {
      navigator.clipboard.writeText(`https://kosmos-lif.host/sign-up?ref=${userInfo.username}`).then(() => {
        toast.info(`${t('private.Dashboard.copy')}`)
      })
    }
  }


  return (
    <div className={'Layout_Layout__1RN_R'}>
      <div className={'Layout_MainWrapper__3OkYb'}>
        <div className="Layout_Content__2ZjSY">
          <Row>
            <Col xl={3} className="d-none d-xl-block">
              <NavBar />
            </Col>
            {userInfo &&  (
              <>
                <Col xl={8}>
                  <div className={'PageContentLayout_Layout__3hnOn'}>
                    <div className={'PageContentLayout_LayoutMain__3HcNG'} data-testid="page-content-layout-main" id="page-content-layout-main">
                      <h1 data-testid="page-title"
                          className="Title_Title__2JDeu PageTitle_PageTitle__2G2ir Account_AccountTitle__2pWNR">Мой аккаунт</h1>
                      <div className={'AccountHeader_AccountHeader__1lvvv'}>
                        <h2 className="Subtitle_Subtitle__32ycw AccountHeader_AccountFullName__1SNM3">{userInfo.first_name || '-'} {userInfo.last_name || '-'}</h2>
                        <div className="AccountHeader_AccountInfo__2XmTs">
                          <div data-testid="text-copier" className="TextCopier_TextCopier__3uyf6">
                            <p
                              className="Text_Text__2cz7_ TextCopier_TextCopierText__3gQyN"
                            >{userInfo.username || '-'}</p>
                            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" onClick={copyRefLinkToClipboard}>
                              <title>ic_fluent_send_copy_24_filled</title>
                              <desc>Created with Sketch.</desc>
                              <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="ic_fluent_send_copy_24_filled" fill="#4ccaf09d" fillRule="nonzero">
                                  <path d="M20.00476,11.5 C20.5175959,11.5 20.9403528,11.8860402 20.9981302,12.3833789 L21.0048593,12.5 L21.0048593,17.0001214 C21.0048593,19.9636253 18.6609313,22.379631 15.725943,22.4955471 L15.504738,22.4999007 L8.24993798,22.4997406 C7.03638315,22.4996654 6.0247666,21.6349425 5.79766727,20.4880244 L8.14479774,20.4886411 L8.19659656,20.4969162 L8.25002206,20.4997406 L15.5048221,20.4999007 C17.3693464,20.5000163 18.8933974,19.0420688 18.9990155,17.2039591 L19.0048375,17.0124979 L19.00476,12.5 C19.00476,11.9477153 19.4524753,11.5 20.00476,11.5 Z M16.9987669,9.48663219 C17.5116028,9.48663219 17.9342741,9.87267238 17.9920392,10.3700111 L17.9987669,10.4866322 L17.9987669,16.9876328 C17.9987669,18.3131162 16.967231,19.3976715 15.6631426,19.4823151 L15.4987669,19.4876328 L5.49842342,19.4876328 C4.17294002,19.4876328 3.08838475,18.4560969 3.0037411,17.1520085 L2.99842342,16.9876328 L2.99842342,10.4983784 C2.99842342,9.94609367 3.44613867,9.49837842 3.99842342,9.49837842 C4.51125926,9.49837842 4.93393058,9.88441861 4.99169569,10.3817573 L4.99842342,10.4983784 L4.99842342,16.9876328 C4.99842342,17.2330927 5.17529858,17.4372412 5.40854779,17.4795771 L5.49842342,17.4876328 L15.4987669,17.4876328 C15.7442268,17.4876328 15.9483753,17.3107576 15.9907113,17.0775084 L15.9987669,16.9876328 L15.9987669,10.4866322 C15.9987669,9.93434744 16.4464822,9.48663219 16.9987669,9.48663219 Z M6.29265531,5.7931312 L9.79030058,2.2931312 C10.1506633,1.9325259 10.7178851,1.90460555 11.1102789,2.20949854 L11.2045142,2.29265547 L14.706869,5.79265547 C15.0975246,6.18304842 15.0977375,6.81621336 14.7073445,7.20686896 C14.3469818,7.56747412 13.7797601,7.5953944 13.3873664,7.29050145 L13.293131,7.20734453 L11.4994234,5.415 L11.5,14.254946 C11.5,14.7677819 11.1139598,15.1904532 10.6166211,15.2482183 L10.5,15.254946 C9.98716416,15.254946 9.56449284,14.8689058 9.50672773,14.3715672 L9.5,14.254946 L9.49942342,5.412 L7.70734469,7.2068688 C7.34698205,7.56747404 6.77976036,7.59539445 6.38736653,7.29050159 L6.2931312,7.20734469 C5.93252596,6.84698205 5.90460555,6.27976036 6.20949841,5.88736653 L6.29265531,5.7931312 L9.79030058,2.2931312 L6.29265531,5.7931312 Z" id="🎨-Color"></path>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="AccountHeader_AccountEmail__2hVxk">{userInfo.email || '-'}</div>
                        </div>
                      </div>
                      <hr className="Divider_Divider__2SSkV Account_AccountHeaderDivider__Z24gT" data-testid="divider"/>
                      <div className={'MyMentor_Section__3WO1-'}>

                        <MyViewElement element={
                          <div className="leader ava-leader">
                            <div className="leader__figure">
                              <div className="leader__image-mentor">
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
                                        {formatter.format(userInfo.balanceCrypto.RUR || 0).replace('₽', '₽') ? (
                                          <div>
                                            {formatter.format(userInfo.balanceCrypto.RUR|| 0).replace('₽', '₽')}
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

                      </div>
                      <hr className="Divider_Divider__2SSkV Account_AccountMentorDivider__2o0Ii" data-testid="divider"/>
                      <div className={'MyMentor_Section__3WO1-'}>
                        <div className="PageContentAside_PageContentAside__1kEMP Account_AccountReferralSection__3Ipsf"
                             data-testid="page-content-aside">
                          <div className="SectionHeader_SectionHeader__24dDe"><h2
                            className="Subtitle_Subtitle__32ycw SectionHeader_SectionTitle__1eJil">Ваша реферальная
                            ссылка</h2></div>
                          <p
                            className="Text_Text__2cz7_ PageContentAside_PageContentAsideText__3bFnj Text_TextSection__b48AI">Скопируйте
                            вашу реферальную ссылку и опубликуйте ее в социальных сетях с интересным постом, чтобы привлечь
                            новых партнёров в свою команду.</p>
                        </div>
                        <Link role={"button"} data-variant="primary" data-testid="copy-ref-link-btn"
                              onClick={copyRefLinkToClipboard}
                              className="Button_Button__2BYYQ btn btn-secondary">
                          <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" data-testid="page-content-aside-btn-icon">
                            <title>ic_fluent_send_copy_24_filled</title>
                            <desc>Created with Sketch.</desc>
                            <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                              <g id="ic_fluent_send_copy_24_filled" fill="#4ccaf09d" fillRule="nonzero">
                                <path d="M20.00476,11.5 C20.5175959,11.5 20.9403528,11.8860402 20.9981302,12.3833789 L21.0048593,12.5 L21.0048593,17.0001214 C21.0048593,19.9636253 18.6609313,22.379631 15.725943,22.4955471 L15.504738,22.4999007 L8.24993798,22.4997406 C7.03638315,22.4996654 6.0247666,21.6349425 5.79766727,20.4880244 L8.14479774,20.4886411 L8.19659656,20.4969162 L8.25002206,20.4997406 L15.5048221,20.4999007 C17.3693464,20.5000163 18.8933974,19.0420688 18.9990155,17.2039591 L19.0048375,17.0124979 L19.00476,12.5 C19.00476,11.9477153 19.4524753,11.5 20.00476,11.5 Z M16.9987669,9.48663219 C17.5116028,9.48663219 17.9342741,9.87267238 17.9920392,10.3700111 L17.9987669,10.4866322 L17.9987669,16.9876328 C17.9987669,18.3131162 16.967231,19.3976715 15.6631426,19.4823151 L15.4987669,19.4876328 L5.49842342,19.4876328 C4.17294002,19.4876328 3.08838475,18.4560969 3.0037411,17.1520085 L2.99842342,16.9876328 L2.99842342,10.4983784 C2.99842342,9.94609367 3.44613867,9.49837842 3.99842342,9.49837842 C4.51125926,9.49837842 4.93393058,9.88441861 4.99169569,10.3817573 L4.99842342,10.4983784 L4.99842342,16.9876328 C4.99842342,17.2330927 5.17529858,17.4372412 5.40854779,17.4795771 L5.49842342,17.4876328 L15.4987669,17.4876328 C15.7442268,17.4876328 15.9483753,17.3107576 15.9907113,17.0775084 L15.9987669,16.9876328 L15.9987669,10.4866322 C15.9987669,9.93434744 16.4464822,9.48663219 16.9987669,9.48663219 Z M6.29265531,5.7931312 L9.79030058,2.2931312 C10.1506633,1.9325259 10.7178851,1.90460555 11.1102789,2.20949854 L11.2045142,2.29265547 L14.706869,5.79265547 C15.0975246,6.18304842 15.0977375,6.81621336 14.7073445,7.20686896 C14.3469818,7.56747412 13.7797601,7.5953944 13.3873664,7.29050145 L13.293131,7.20734453 L11.4994234,5.415 L11.5,14.254946 C11.5,14.7677819 11.1139598,15.1904532 10.6166211,15.2482183 L10.5,15.254946 C9.98716416,15.254946 9.56449284,14.8689058 9.50672773,14.3715672 L9.5,14.254946 L9.49942342,5.412 L7.70734469,7.2068688 C7.34698205,7.56747404 6.77976036,7.59539445 6.38736653,7.29050159 L6.2931312,7.20734469 C5.93252596,6.84698205 5.90460555,6.27976036 6.20949841,5.88736653 L6.29265531,5.7931312 L9.79030058,2.2931312 L6.29265531,5.7931312 Z" id="🎨-Color"></path>
                              </g>
                            </g>
                          </svg>
                          Скопировать ссылку
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
                <Chat />
              </>
            )}

          </Row>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
