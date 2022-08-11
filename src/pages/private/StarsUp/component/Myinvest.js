import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../../constants/routes.constants'
import { Row, Col, Container, Button } from 'reactstrap'
//import UserInfo from '../../../../components/UserInfo'
import NavBar from '../../../../components/layout/Navbar'
import cl from './../StarsUp.module.css';

class Myinvest extends Component {
  render() {
    return (
      <section className={cl.investbox}>
        <div className={['container', cl.cont].join` `}>
        <div className={cl.navBlock}>
              <NavBar />
          </div>
          
            <div className="inset_page">
              <div className="startrek__title1">
                <h1 className={cl.title}>My investments</h1>
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
                  <table className={cl.tableMain}>
                    <tbody >
                      <tr>
                        <td >
                          <div className="newline ">
                            <div
                              id="investbox_packs_list_wrapper"
                              className="dataTables_wrapper no-footer"
                            >
                              <div className="top"></div>
                              <div className="dataTables_scroll">
                                <div className="dataTables_scrollHead">
                                  <div className="dataTables_scrollHeadInner">
                                    {/* <table
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
                                    </table> */}
                                  </div>
                                </div>
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
                              <div className="clear"></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="clear"></div>
                <div className="create_new"></div>
                <div className="clear"></div>
              </div>
            </div>
         
        </div>
      </section>
    )
  }
}
export default Myinvest
