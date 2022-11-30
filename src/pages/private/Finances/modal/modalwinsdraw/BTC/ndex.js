import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import cl from './MyModal.module.css';
import {Button, Input} from "reactstrap";
import {api} from "../../../../../../api";
import formatCurrency from 'format-currency'
import MyViewElement from "../../../../../../components/MyViewElements/MyViewElements";
const CreatewinsdrawBTC =({title, btcmodelw, setBtcmodelw})=>{
  const { t } = useTranslation('common');
  const initialState = { amount: '', address:'', totalfess:''}
  const [userData, setUserData] = useState(initialState)
  let fees= 0.00120000
  const { amount, address, totalfess} = userData
  const blockModalbtcmodelw = useRef('')
  const rootClassesbtcmodelw = [cl.modalBlock]
  const rootContentClassesbtcmodelw = [cl.modalContent]
  const handleChangeInput = e => {
    const { name, value } = e.target
    setUserData({...userData, [name]:value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    api.createWithdrawBTC(userData).then().catch(() => {})
  }
  btcmodelw && rootClassesbtcmodelw.push(cl.active) && rootContentClassesbtcmodelw.push(cl.activeContent)
  return(
    <>
      <div ref={blockModalbtcmodelw} className={rootClassesbtcmodelw.join` `} onClick={(e)=>{e.preventDefault();setBtcmodelw(false)}}>
        <div className={rootContentClassesbtcmodelw.join` `}>
          <div id='btcmodelw' className={cl.modalForm} onClick={e=>e.stopPropagation()}>
            <h3 className={cl.modalTitle}>{title}</h3>
            <p className={cl.modalDescrs}>
              <i>пожалуйста вводите коректные данные, в случае ошибочного адреса, средства возвращенны не будут</i>
            </p>
            <form action="" id='modal' className={cl.modalForm} onSubmit={handleSubmit}>
              <i className={cl.modalDescrs}>Введите Адрес кошелька (ВТС)</i>
              <div className={cl.btnBlock}>
                <Input type="text" name="address" placeholder={"Введите Адрес кошелька (ВТС)"} value={address} onChange={handleChangeInput}/>
              </div>
              <i className={cl.modalDescrs}>Количество (ВТС)</i>
              <div className={cl.btnBlock}>
                <Input type="text" name="amount" placeholder={"Количество (ВТС)"} value={amount} onChange={handleChangeInput}/>
              </div>
              <i className={cl.modalDescrs}>Комиссия за транзакцию (BTC)</i>
              <div className={cl.btnBlock}>
                <Input type="text" name="fees" disabled value={fees}/>
              </div>
              <i className={cl.modalDescrs}>Получите (BTC)</i>
              <div className={cl.btnBlock}>
                <Input type="text" name="totalfess" disabled value={totalfess} onChange={handleChangeInput}/>
              </div>
              <MyViewElement element={
                <Button className="fin-btn" type={"submit"}>Отправить</Button>
              }/>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreatewinsdrawBTC
