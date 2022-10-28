import React, {useEffect, useState} from 'react'
import cl from './StarsUp.module.css';
import NavBar from '../../../components/layout/Navbar'
import routes from '../../../constants/routes.constants'
import {Link} from 'react-router-dom'
import {Col, Row} from "reactstrap";
import {api} from "../../../api";


const StarsUp = () => {
  const initialState = { amount: '' }
  const [userData, setUserData] = useState(initialState)
  const { amount } = userData


  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]:value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    api.investBox(userData).then().catch(() => {})
  }

  return (
    <section className={cl.invetbox}>
      <Row>
        <div className={['container', cl.cont].join` `}>
          <Col xl={3} className={cl.navBlock}>
            <NavBar/>
          </Col>
          <Col xl={8} style={{marginLeft: "14%"}}>
            <div className="content">
              <div className={cl.investPage}>
                <div className="startrek__title1">
                  <h1 className={cl.title}>Инвистиционные планы</h1>
                </div>
                <p className={cl.descr}>Вкладывайте свободные Средства в InvestBox! Это инструмент для получения дополнительного дохода</p>
                <div className={cl.investBlock}>
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
                                                <button type="submit" className={cl.nameInput}>Инвестировать</button>
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
          </Col>
        </div>
      </Row>
    </section>
  )
}
export default StarsUp
