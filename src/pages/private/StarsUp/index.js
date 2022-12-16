import React, {useState} from 'react'
import cl from './StarsUp.module.css';
import NavBar from '../../../components/layout/Navbar'
import routes from '../../../constants/routes.constants'
import {Link} from 'react-router-dom'
import {Col, Row, Container} from "reactstrap";
import {api} from "../../../api";
import './StarsUp.module.css';
import {useTranslation} from "react-i18next";


const StarsUp = () => {
  const {t} = useTranslation('common');
  const initialState = {amount: ''}
  const [userData, setUserData] = useState(initialState)
  const {amount} = userData


  const handleChangeInput = e => {
    const {name, value} = e.target
    setUserData({...userData, [name]: value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    api.investBox(userData).then().catch(() => {
    })
  }

  return (
    <Container className={'invetbox'}>
      <Row>
        <Col xl={3} className={'navBlock'}>
          <NavBar/>
        </Col>
        <Col xl={8}>
          <div className={['container', 'cont'].join` `}>
            <div className="contentos">
              <div className={'investPage'}>
                <div className="startrek__t">
                  <h1 className={cl.title}>{t('private.investbox.title')}</h1>
                  <p className={cl.descr}>{t('private.investbox.descr')}</p>
                  <div className={'investBlock'}>
                    <ul className={'investListText'}>
                      <li>
                    <span>
                      {t('private.investbox.text1')}
                    </span>

                      </li>
                      <li>
                    <span>
                      {t('private.investbox.text2')}
                    </span>

                      </li>
                      <li>
                        <span>{t('private.investbox.text3')}</span>
                      </li>
                    </ul>
                  </div>
                  <div className={'listLinks'}>
                    <Link to={routes.starsUp} className="active">
                      {t('private.investbox.starsUp')}
                    </Link>
                    <span>/</span>
                    <Link to={routes.myinvestments}>{t('private.investbox.myinvestments')}</Link>
                  </div>
                  <div className="create_new">

                    <div className="newline">
                      <div
                        id="investbox_boxes_list_wrapper"
                        className="dataTables_wrapper no-footer"
                      >
                        <div className="top"/>
                        <div className="dataTables_scroll">
                          <div className="dataTables_scrollBody jspScrollable" tabIndex="0">
                            <div className="jspContainer">
                              <div className="jspPane">
                                <table
                                  id="investbox_boxes_list"
                                  className={'tableMain'}
                                  role="grid">
                                  <thead className={'thead'}>
                                  <tr role="row" className={'row'}>
                                    <th
                                      className={cl.sort}
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className={cl.theadEl}>{t('private.investbox.valuta')}</div>
                                    </th>
                                    <th
                                      className={cl.sort}
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className={cl.theadEl}>{t('private.investbox.procent')}</div>
                                    </th>
                                    <th
                                      className={cl.sort}
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className={cl.theadEl}>{t('private.investbox.period')}</div>
                                    </th>
                                    <th
                                      className={cl.sort}
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className={cl.theadEl}>{t('private.investbox.minimalsum')}</div>
                                    </th>
                                    <th
                                      className={cl.sort}
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className={cl.theadEl}>{t('private.investbox.maximalsum')}</div>
                                    </th>
                                    <th className={cl.sort} rowSpan="1" colSpan="1">
                                      <div className={cl.theadEl}>&nbsp;</div>
                                    </th>
                                  </tr>
                                  </thead>

                                  <tbody className={'tbody'}>
                                  <tr role="row" className="even">
                                    <td>RUB</td>
                                    <td>5%</td>
                                    <td>{t('private.investbox.mouns')}</td>
                                    <td>
                                      <a role={"button"}>
                                        {10}
                                      </a>
                                    </td>
                                    <td>
                                      <a>
                                        {10000000}
                                      </a>
                                    </td>
                                    <td>
                                      <form onSubmit={handleSubmit}>
                                        <div className="create_new2">
                                          <input
                                            name="amount"
                                            maxLength="25"
                                            type="text"
                                            onChange={handleChangeInput}
                                            value={amount}
                                            className={cl.inputValue}
                                          />
                                          <button type="submit"
                                                  className={'nameInput'}>{t('private.investbox.nameInput')}</button>
                                        </div>
                                      </form>
                                    </td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="clear"/>
                      </div>
                    </div>

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default StarsUp
