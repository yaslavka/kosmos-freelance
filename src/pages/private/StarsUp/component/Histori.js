import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import {Row, Col, Button, Container} from 'reactstrap'
import NavBar from '../../../../components/layout/Navbar'
import cl from './../StarsUp.module.css';
import './../StarsUp.module.css';

class Histori extends Component {
  render() {
    return (
      <Container className={'investbox'}>
        <Row>
          <Col xl={3} className={'navBlock'}>
            <NavBar/>
          </Col>
          <Col xl={8}>
            <div className={['container', 'cont'].join` `}>
              <div className="contentos">
                <div className={'investPage'}>
                  <div className="startrek__t">
                    <h1 className={cl.title}>История инвестиций</h1>
                    <p className={cl.descr}>Вкладывайте свободные Средства в InvestBox! Это инструмент для получения
                      дополнительного дохода.</p>
                    <div className="investBlock">
                      <ul className={'investListText'}>
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
                        <div className="newline">

                          <div
                            id="investbox_pack_history_table_wrapper"
                            className="dataTables_wrapper no-footer"
                          >
                            <div className="top"></div>
                            <div className="dataTables_scroll">
                              <div className="dataTables_scrollHead">
                                <div className="dataTables_scrollHeadInner">
                                  <table
                                    className={cl.tableMain}
                                    role="grid"
                                  >
                                    <thead className={cl.thead}>
                                    <tr role="row">
                                      <th
                                        width="10%"
                                        className={cl.sort}
                                        rowSpan="1"
                                        colSpan="1"
                                      >
                                        <div className={cl.theadEl}>Date</div>

                                      </th>
                                      <th
                                        width="10%"
                                        className={cl.sort}
                                        rowSpan="1"
                                        colSpan="1"
                                      >
                                        <div className={cl.theadEl}>Event</div>

                                      </th>
                                      <th
                                        width="6%"
                                        className={cl.sort}
                                        rowSpan="1"
                                        colSpan="1"
                                      >
                                        <div className={cl.theadEl}> Packet</div>

                                      </th>
                                      <th
                                        width="12%"
                                        className={cl.sort}
                                        rowSpan="1"
                                        colSpan="1"
                                      >
                                        <div className={cl.theadEl}> Packet Dx</div>

                                      </th>
                                      <th
                                        width="15%"
                                        className={cl.sort}
                                        rowSpan="1"
                                        colSpan="1"
                                      >
                                        <div className={cl.theadEl}>Packet Before</div>

                                      </th>
                                      <th
                                        width="15%"
                                        className={cl.sort}
                                        rowSpan="1"
                                        colSpan="1"
                                      >
                                        <div className={cl.theadEl}>Packet After</div>

                                      </th>
                                      <th
                                        width="12%"
                                        className={cl.sort}
                                        rowSpan="1"
                                        colSpan="1"
                                      >

                                        <div className={cl.theadEl}> Balance Dx</div>
                                      </th>
                                      <th
                                        width="10%"
                                        className={cl.sort}
                                        rowSpan="1"
                                        colSpan="1"
                                      >
                                        <div className={cl.theadEl}>Balance Before</div>
                                      </th>
                                      <th className={cl.sort} rowSpan="1" colSpan="1">
                                        <div className={cl.theadEl}>Balance After</div>

                                      </th>
                                    </tr>
                                    </thead>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div
                              className={cl.paginate}
                              id="investbox_pack_history_table_paginate"
                            >
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <Button
                                className={cl.btnPag}
                                aria-controls="investbox_pack_history_table"
                                data-dt-idx="0"
                                tabIndex="0"
                                id="investbox_pack_history_table_previous"
                              >
                                Назад
                              </Button>
                              <span></span>
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <Button
                                className={cl.btnPag}
                                aria-controls="investbox_pack_history_table"
                                data-dt-idx="1"
                                tabIndex="0"
                                id="investbox_pack_history_table_next"
                              >
                                Далее
                              </Button>
                            </div>
                            <div className="clear"></div>
                          </div>
                        </div>
                      </div>
                      <div className="clear"></div>
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
}

export default Histori
