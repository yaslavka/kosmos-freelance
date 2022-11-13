import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import {Row, Col, Button} from 'reactstrap'
import NavBar from '../../../../components/layout/Navbar'
import cl from './../StarsUp.module.css';
import {useDispatch, useSelector} from "react-redux";
import * as actions from '../../../../actions/casino.actions';
import {isEmpty} from "lodash-es";
import List from "./list";
import {useTranslation} from "react-i18next";


function Myinvest() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const list = useSelector(state => state.casino.active.list);

  useEffect(() => {
    dispatch(actions.casinoActiveList());
  }, [dispatch]);


  return (
    <section className={cl.investbox}>
      <div className={['container', cl.cont].join` `}>
        <Row>
          <Col xl={3} className={cl.navBlock}>
            <NavBar/>
          </Col>
          <Col xl={8} style={{marginLeft: '14%'}}>
            <div className="inset_page">
              <div className="startrek__title1">
                <h1 className={cl.title}>{t('private.investbox.Myinvest.title')}</h1>
              </div>
              <p className={cl.descr}>{t('private.investbox.descr')}</p>
              <div className="investbox_page">
                <ul className={cl.investListText}>
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
                <div className="clear"/>
                <div className={cl.listLinks}>
                  <Link to={routes.starsUp} className="active">
                    {t('private.investbox.starsUp')}
                  </Link>
                  <span>/</span>
                  <Link to={routes.myinvestments}>{t('private.investbox.myinvestments')}</Link>
                </div>
                <div className="clear"/>
                <div className="create_new">
                  <table className={cl.tableMain}>
                    <tbody>
                    <tr>
                      <td>
                        <div className="newline ">
                          <div
                            id="investbox_packs_list_wrapper"
                            className="dataTables_wrapper no-footer"
                          >
                            <div className="top"/>
                            <div className="dataTables_scroll">
                              <div className="dataTables_scrollBody">
                                <div className="jspContainer">
                                  <div className="jspPane">
                                    <table
                                      id="investbox_packs_list"
                                      className={cl.tableMain}
                                      role="grid"
                                    >
                                      <thead className={cl.thead}>
                                      <tr role="row">
                                        <th
                                          className={cl.sort}
                                          rowSpan="1"
                                          colSpan="1"
                                        >
                                          <div className={cl.theadEl}>{t('private.investbox.valuta')}</div>

                                        </th>
                                        <th className={cl.sort} rowSpan="1" colSpan="1">
                                          <div className={cl.theadEl}>{t('private.investbox.procent')}</div>
                                        </th>
                                        <th className={cl.sort} rowSpan="1" colSpan="1">
                                          <div className={cl.theadEl}>{t('private.investbox.period')}</div>

                                        </th>
                                        <th className={cl.sort} rowSpan="1" colSpan="1">
                                          <div className={cl.theadEl}>{t('private.investbox.Myinvest.sum')}</div>

                                        </th>
                                        <th className={cl.sort} rowSpan="1" colSpan="1">
                                          <div className={cl.theadEl}>{t('private.investbox.Myinvest.status')}</div>

                                        </th>
                                        <th className={cl.sort} rowSpan="1" colSpan="1">
                                          <div className={cl.theadEl}>{t('private.investbox.Myinvest.action')}</div>

                                        </th>
                                      </tr>
                                      </thead>
                                      {!isEmpty(list) ? (
                                        list.map(draw =>(
                                          <tbody className={cl.tbody}>
                                          <tr>
                                          <td>руб</td>
                                          <td>5%</td>
                                          <td>{t('private.investbox.period')}</td>
                                          <List draw={draw}/>
                                          </tr>
                                          </tbody>
                                        ))
                                      ) : (
                                        <tbody className={cl.tbody}>
                                        <tr className="odd">
                                          <td
                                            valign="top"
                                            colSpan="7"
                                            className="dataTables_empty"
                                          >
                                            {t('private.investbox.action')}
                                          </td>
                                        </tr>
                                        </tbody>
                                      )
                                      }
                                    </table>
                                  </div>

                                </div>
                              </div>
                            </div>
                            <div
                              className={cl.paginate}
                              id="investbox_packs_list_paginate"
                            >
                              <Button
                                className={cl.btnPag}
                                aria-controls="investbox_packs_list"
                                data-dt-idx="0"
                                tabIndex="0"
                                id="investbox_packs_list_previous"
                              >
                                {t('private.investbox.btnPag')}
                              </Button>
                              <Button
                                className={cl.btnPag}
                                aria-controls="investbox_packs_list"
                                data-dt-idx="1"
                                tabIndex="0"
                                id="investbox_packs_list_next"
                              >
                                {t('private.investbox.next')}
                              </Button>
                            </div>
                            <div className="clear"/>
                          </div>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div className="clear"/>
                <div className="create_new"/>
                <div className="clear"/>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default Myinvest
