import React from 'react'
import { Row, Col, Container, Button } from 'reactstrap'
import cl from './StarsUp.module.css';
import NavBar from '../../../components/layout/Navbar'

//import UserInfo from '../../../components/UserInfo'
import routes from '../../../constants/routes.constants'
import { Link } from 'react-router-dom'

const StarsUp = () => {
  return (
    <section className={cl.invetbox}>
      <div className={['container', cl.cont].join` `}>
      <div className={cl.navBlock}>
            <NavBar />
        </div>

          <div className="content">
            <div className={cl.investPage}>
              <div className="startrek__title1">
                <h1 className={cl.title}>Investment plans</h1>
              </div>
              <p className={cl.descr}>Stocks, bonds, and other investments are ultra-useful financial tools that allow investors (or anyone who's willing to make educated, cash-backed financial decisions) to increase their worth and become part of today's fast-moving business landscape.</p>
              <div className={cl.investBlock}>
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
                  <Link to={routes.myinvestments}>Мои инвестиции</Link>
                  <span>/</span>
                  <Link to={routes.investbox} className="active">
                    History
                  </Link>
                </div>
                <div className="clear"/>
                <div className="create_new">
                  <table className={cl.table}>
                    <tbody>
                      <tr>
                        <td width="49%">
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
                                        className={cl.tableMain}
                                        role="grid">

                                        <thead className={cl.thead}>

                                          <tr role="row">

                                            <th
                                              className={cl.sort}
                                              rowSpan="1"
                                              colSpan="1"
                                            >
                                              <div className={cl.theadEl}>Валюта</div>
                                            </th>
                                            <th
                                              className={cl.sort}
                                              rowSpan="1"
                                              colSpan="1"
                                            >
                                              <div className={cl.theadEl}>Процент</div>
                                            </th>
                                            <th
                                              className={cl.sort}
                                              rowSpan="1"
                                              colSpan="1"
                                            >
                                              <div className={cl.theadEl}>Период</div>
                                            </th>
                                            <th
                                              className={cl.sort}
                                              rowSpan="1"
                                              colSpan="1"
                                            >
                                              <div className={cl.theadEl}>Минимальная сумма</div>
                                            </th>
                                            <th
                                              className={cl.sort}
                                              rowSpan="1"
                                              colSpan="1"
                                            >
                                              <div className={cl.theadEl}>Максимальная сумма</div>
                                            </th>
                                            <th className={cl.sort} rowSpan="1" colSpan="1">
                                              <div className={cl.theadEl}>&nbsp;</div>
                                            </th>
                                          </tr>
                                        </thead>

                                        <tbody className={cl.tbody}>
                                        <tr role="row" className="even">
                                            <td>Руб</td>
                                            <td>5%</td>
                                            <td>В месяц</td>
                                            <td>
                                              <a href="#" onClick="$('#iboxsum1453').val('10').trigger('change'); return false;">
                                                10
                                              </a>
                                            </td>
                                            <td>
                                              <a
                                                href="#" onClick="$('#iboxsum1453').val('10000000').trigger('change'); return false;"
                                              >
                                                10000000
                                              </a>
                                            </td>
                                            <td>
                                              <form>
                                              <div className="create_new2">
                                                <input
                                                  id="iboxsum1453"
                                                  maxLength="25"
                                                  type="text"
                                                  className={cl.inputValue}
                                                />
                                                <button
                                                  type="submit"
                                                  className={cl.nameInput}
                                                  onClick="doInvestBoxInvest(1453);return false;"
                                                >Инвестировать</button>
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
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
export default StarsUp
