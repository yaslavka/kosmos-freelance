import React, {useState, useRef, useMemo} from "react";
import cl from './MyModal.module.css';
import MyModalP from "./MyModal";
import payeerLogo from '../../scss/media/payeer-logo.8aa750cc.svg'
import {api} from "../../api";
import MyModalF from "./MyModalF";


const MyModalW = ({ title, setModal, modal, isInfoCard, isInfoCards})=>{
  const [modals, setModals] = useState(false)
  const [modales, setModales] = useState(false)
  const blockModal = useRef('')
  const rootClasses = [cl.modalBlock]
  const rootContentClasses = [cl.modalContent]
  const [isCurrencyAndCount, setIsCurrencyAndCount] = useState({count: '', currency: ''})
  const [isCurrencyAndCounts, setIsCurrencyAndCounts] = useState({count: '', currency: ''})
  const submitCreatePayeerPayForm = ( amount,currency,option,pay ) => {
    api
      .createPayeerPay({ amount: Number(amount), curr: currency, option: option, pay: pay })
      .then((response) => {
        if (response.url) {
          window.location.replace(response.url)
        }
      })
      .catch(() => {})
  }
  useMemo(()=>{
    if(isCurrencyAndCount.count) {
      submitCreatePayeerPayForm(isCurrencyAndCount.count, isCurrencyAndCount.currency, isInfoCard.currency)
    }
  },[isCurrencyAndCount.count, isCurrencyAndCount.currency, isInfoCard.currency])
//
  const submitCreatePayForm = ( amount,currency,option,pay  ) => {
    api
      .createPay({ amount: Number(amount), curr: currency, option: option, pay: pay })
      .then((response) => {
        if (response.url) {
          window.location.replace(response.url)
        }
      })
      .catch(() => {})
  }
  useMemo(()=>{
    if(isCurrencyAndCounts.count) {
      submitCreatePayForm(isCurrencyAndCounts.count, isCurrencyAndCounts.currency, isInfoCards.currency)
    }
  },[isCurrencyAndCounts.count, isCurrencyAndCounts.currency, isInfoCards.currency])

  modal && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
    return (
        <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setModal(false)}}>
          <div  className={rootContentClasses.join` `} >
            <div  id='modal' className={cl.modalForm} onClick={e=>e.stopPropagation()}>
              <h3 className={cl.modalTitle}>{title}</h3>
              <p className={cl.modalDescr}>Выберите Платежную системму</p>
              <div className={cl.btnBlock}>
                <img src={payeerLogo} role={"button"} alt={''} onClick={(e)=>{e.preventDefault();setModals(true)}}/>
                <MyModalP currencyAndCount={isCurrencyAndCount} changeCurrencyAndCount={setIsCurrencyAndCount} title={'Укажите сумму'} setVisible={setModals} visible={modals}/>
              </div>
              <br/>
              <br/>
              <div className={cl.btnBlock} onClick={(e)=>{e.preventDefault();setModales(true)}}>
                <img src={"https://www.free-kassa.ru/img/fk_btn/23.png"} role={"button"} alt={''} style={{width:"400px"}}/>
                <MyModalF currencyAndCount={isCurrencyAndCounts} changeCurrencyAndCount={setIsCurrencyAndCounts} title={'Укажите сумму'} setVisible={setModales} visible={modales}/>
              </div>
            </div>
          </div>
        </div>
    )
}

export default MyModalW
