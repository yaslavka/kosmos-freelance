import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import { Row, Col, Container, Button } from 'reactstrap'
//import UserInfo from '../../../../components/UserInfo'
import NavBar from '../../../../components/layout/Navbar'
import cl from './../StarsUp.module.css';

class Histori extends Component {
  render() {
    return (
      <section className={cl.investbox}>
        <div className={['container', cl.cont].join` `}>
          <div className={cl.navBlock}>
              <NavBar />
          </div>
        
            <div className="inset_page">
              <div className="startrek__title1">
                <h1 className={cl.title}>History</h1>
              </div>
              <p className={cl.descr}>Stocks, bonds, and other investments are ultra-useful financial tools that allow investors (or anyone who's willing to make educated, cash-backed financial decisions) to increase their worth and become part of today's fast-moving business landscape.</p>
              <div className="investbox_page">
                <ul className={cl.investListText}>
                    <li>
                      <span>
                        Invest your free coins to InvestBox! It’s a tool for devs to promote their coins.
                        It’s NOT Pyramid/HYIP, all payments are made from special fund.
                      </span>
                    
                    </li>
                  <li>
                      <span>
                        InvestBoxes can change status from Active to «No coins», but you can close your
                        investment any time, it’s 100% safe.
                      </span>
                      
                  </li>
                  <li>
                    <span>
                      InvestBoxes with «new» type - no investment close, you can only get daily percent
                    </span>
                  </li>
                  </ul>
                <div className="clear"></div>
                <div className={cl.listLinks}>
                  <Link to={routes.starsUp} className="active">
                    Investment plans
                  </Link>
                  <span>/</span>
                  <Link to={routes.myinvestments}>My investments</Link>
                  <span>/</span>
                  <Link to={routes.investbox} className="active">
                    History
                  </Link>
                </div>
                <div className="clear"></div>
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
                                    
                                    <div className={cl.theadEl}>  Balance Dx</div>
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
                        {/* <div className="dataTables_scrollBody">
                          <div className="jspContainer">
                            <div className="jspPane">
                              <table
                                id="investbox_pack_history_table"
                                className="tables_line big_table big_table_top ib_table_history dataTable no-footer"
                                role="grid"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      width="10%"
                                      className="sorting_disabled"
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className="dataTables_sizing">Date</div>
                                    </th>
                                    <th
                                      width="10%"
                                      className="sorting_disabled"
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className="dataTables_sizing">Event</div>
                                    </th>
                                    <th
                                      width="6%"
                                      className="sorting_disabled"
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className="dataTables_sizing">Packet</div>
                                    </th>
                                    <th
                                      width="12%"
                                      className="sorting_disabled"
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className="dataTables_sizing">Packet Dx</div>
                                    </th>
                                    <th
                                      width="15%"
                                      className="sorting_disabled"
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className="dataTables_sizing">Packet Before</div>
                                    </th>
                                    <th
                                      width="15%"
                                      className="sorting_disabled"
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className="dataTables_sizing">Packet After</div>
                                    </th>
                                    <th
                                      width="12%"
                                      className="sorting_disabled"
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className="dataTables_sizing">Balance Dx</div>
                                    </th>
                                    <th
                                      width="10%"
                                      className="sorting_disabled"
                                      rowSpan="1"
                                      colSpan="1"
                                    >
                                      <div className="dataTables_sizing">Balance Before</div>
                                    </th>
                                    <th className="sorting_disabled" rowSpan="1" colSpan="1">
                                      <div className="dataTables_sizing">Balance After</div>
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  <tr className="odd">
                                    <td valign="top" colSpan="9" className="dataTables_empty">
                                      Нет записей
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div> */}
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
      </section>
    )
  }
}
export default Histori
