/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, {useState, useEffect, useMemo} from 'react'
import formatCurrency from 'format-currency'
import { Input } from 'reactstrap'
import Button from '../../../../../../../../components/OldButton'
import {useDispatch, useSelector} from "react-redux";
import SimpleBar from "simplebar-react";
import cl from './../../../../../Exchange.module.css';


const BuyFormComponent = ({ priceBuy, children}) => {
  const {buyExchange} = useSelector(state=>state)
  const userInfo = useSelector((state) => state.app.user)
  const [priceValue, setPriceValue] = useState(0.00000000)
  const [totalValue, setTotalValue] = useState(0.00000000)
  const total = totalValue * priceValue
  const fee = total * (0.2 / 100)
  const netAmount = totalValue * priceValue + fee
  const [amount, setAmount]=useState(0.00000000)
  const [isActiveOrder, setIsActiveOrder] = useState({count: '', dash: '', btc: ''})
  const dispatch = useDispatch();
  const clickRows = (e)=>{
    setIsActiveOrder({...isActiveOrder, count: [...e.target.childNodes][0].textContent, dash: [...e.target.childNodes][1].textContent, btc: [...e.target.childNodes][2].textContent})
  }
  useMemo(()=>{dispatch({type: 'BUY_EXCHANGE_FORM', info: isActiveOrder});console.log(buyExchange)},[isActiveOrder])
  useEffect(()=>{
    setPriceValue(priceBuy)
  },[priceBuy])

  useEffect(()=>{
    setTotalValue(amount)
  },[amount])


  return (
    <div className="col_1">
      <div className="buy_box fild_box">
        <div className="inset clBuyForm">
          <input type="hidden" name="order_type" value="1" />
          <input type="hidden" name="fee_type" value="1" />
          <div className="meta">
            <div className="all_title title">ПОКУПКА</div>
            <div className="sm" id="label_bestbuy">
              {priceBuy}
            </div>
          </div>
          <>
            {userInfo && (
              <div className="line_first">
                <span className="c1">Баланс: </span>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
                <Button className="c2 clBuyBalance">
                  <span id="label_buy_balance" onClick={()=> {setAmount(userInfo.balance > -1 && userInfo.balance)}}>
                    {(userInfo.balance > -1 && userInfo.balance)} {'BTC'}
                  </span>
                </Button>
              </div>
            )}
          </>
          <form>
          <div className="line">
            <span className="span">Количество:</span>
            <div className="poles">
              <Input
                name="amount"
                min={0.00000000}
                onChange={(event) => {
                  setTotalValue(event.target.value)
                }}
                value={totalValue}
              />
              <span className="currency">ETH</span>
            </div>
          </div>
          <div className="line">
            <span className="span">Цена:</span>
            <div className="poles">
              <Input
                name="price"
                maxLength="25"
                type="text"
                onChange={(event) => {
                  setPriceValue(event.target.value)
                }}
                min={0.00000000}
                value={priceValue}
              />
              <span className="currency">BTC</span>
            </div>
          </div>
          <div className="line">
            <span className="span">Всего:</span>
            <div className="poles">
              <Input
                name="total"
                maxLength="25"
                type="text"
                min={0.00000000}
                onChange={(event) => {setPriceValue(event.target.value)}}
                value={priceValue}
              />
              <span className="currency">BTC</span>
            </div>
          </div>
          <div className="line">
            <span className="span">Ком (0.2%):</span>
            <div className="poles">
              <Input name="fee" maxLength="25" type="text" min={0.00000000} value={fee} disabled="">
                {formatCurrency(fee)}
              </Input>
              <span className="currency">BTC</span>
            </div>
          </div>
          <div className="line">
            <span className="span">Всего+Ком:</span>
            <div className="poles">
              <Input
                name="totalfee"
                maxLength="25"
                type="text"
                value={netAmount}
                disabled=""
              >
                {formatCurrency(netAmount)}
              </Input>
              <span className="currency">BTC</span>
            </div>
          </div>
          <div className="line" flow="horizontal">
            <div float="left">
              <Button type="button" className="clCreateOrder" origin="Купить">
                Купить
              </Button>
            </div>
          </div>
          </form>
        </div>
        <div className="sell_orders_box">
          <div className="all_title title">Ордера на продажу</div>
          <div className="result">
            <table className="sell_orders" width="100%">
              <thead>
              <tr>
                <th width="35%" className="first">
                  Цена
                </th>
                <th width="38%">ETH</th>
                <th width="27%">BTC</th>
              </tr>
              </thead>
            </table>
          </div>
          <div className="scrolling" id="scrollbar3">
            <SimpleBar style={{ height: 100, width: '100%' }}>
              <div className="viewport">
                <div className="overview">
                  <table className="sell_orders" width="100%">
                    <tbody id="sellord_table">
                    <tr className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}} role={"button"}>
                      <td width="35%" className="first" >
                        100
                      </td>
                      <td width="38%" >{}</td>
                      <td width="27%">{0.00000000}</td>
                    </tr>
                    {children}
                    </tbody>
                  </table>
                </div>
              </div>
              {children}
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyFormComponent
