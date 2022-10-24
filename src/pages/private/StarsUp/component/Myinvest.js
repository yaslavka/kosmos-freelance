import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import { Row, Col, Button } from 'reactstrap'
import NavBar from '../../../../components/layout/Navbar'
import cl from './../StarsUp.module.css';

class Myinvest extends Component {
  render() {
    return (
      <section className={cl.investbox}>
        <div className={['container', cl.cont].join` `}>
          <Row>
            <Col xl={3} className={cl.navBlock}>
              <NavBar />
            </Col>
            <Col xl={8} style={{marginLeft:'14%'}}>
            <div className="inset_page">
              <div className="startrek__title1">
                <h1 className={cl.title}>Мои инвестиции</h1>
              </div>
              <p className={cl.descr}>Вкладывайте свободные Средства в InvestBox! Это инструмент для получения дополнительного дохода</p>
              <div className="investbox_page">
              <ul className={cl.investListText}>
                <li>
                    <span>
                      Это НЕ пирамида/HYIP, все платежи делаются из специального фонда.
                    </span>

                </li>
                <li>
                    <span>
                      InvestBox может менять статус с «Активен» на «Нет монет», но вы можете закрыть инвестицию в любой момент, это 100% безопасно.
                    </span>

                </li>
                <li>
                  <span>InvestBox со статусом «новый» - невозможно закрыть, вы можете получать только месячный процент.</span>
                </li>
              </ul>
                <div className="clear"/>
                <div className={cl.listLinks}>
                  <Link to={routes.starsUp} className="active">
                    Инвестиционный план
                  </Link>
                  <span>/</span>
                  <Link to={routes.myinvestments}>Мои инвестиции</Link>
                  <span>/</span>
                  <Link to={routes.investbox} className="active">
                    история инвестиций
                  </Link>
                </div>
                <div className="clear"/>
                <div className="create_new">
                  <table className={cl.tableMain}>
                    <tbody >
                      <tr>
                        <td >
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
                                            <div className={cl.theadEl}>Packet</div>

                                          </th>
                                          <th className={cl.sort} rowSpan="1" colSpan="1">
                                            <div className={cl.theadEl}>Percent</div>
                                          </th>
                                          <th className={cl.sort} rowSpan="1" colSpan="1">
                                          <div className={cl.theadEl}>Period</div>

                                          </th>
                                          <th className={cl.sort} rowSpan="1" colSpan="1">
                                            <div className={cl.theadEl}>Amount</div>

                                          </th>
                                          <th className={cl.sort} rowSpan="1" colSpan="1">
                                          <div className={cl.theadEl}>Status</div>

                                          </th>
                                          <th className={cl.sort} rowSpan="1" colSpan="1">
                                          <div className={cl.theadEl}>Next</div>

                                          </th>
                                          <th className={cl.sort} rowSpan="1" colSpan="1">

                                            &nbsp;
                                          </th>
                                        </tr>
                                      </thead>

                                        <tbody className={cl.tbody}>
                                          <tr className="odd">
                                            <td
                                              valign="top"
                                              colSpan="7"
                                              className="dataTables_empty"
                                            >
                                              Нет записей
                                            </td>
                                          </tr>
                                        </tbody>
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
                                  Назад
                                </Button>
                                <Button
                                  className={cl.btnPag}
                                  aria-controls="investbox_packs_list"
                                  data-dt-idx="1"
                                  tabIndex="0"
                                  id="investbox_packs_list_next"
                                >
                                  Далее
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
}
export default Myinvest
