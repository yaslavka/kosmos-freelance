import React, {useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import cl from './MyModal.module.css';
import {api} from "../../../../../../api";
import payeerLogo from '../../../../../../scss/media/payeer-logo.8aa750cc.svg'
import FORMRURpauer from "./FORMRURpauer";
import FORMRURfrikassa from "./FORMRURfrikassa";

const CreatePayrur =({title, modaleWru, modalrur, setModalrur, setModalWru})=>{
  const { t } = useTranslation('common');
  const [modals, setModals] = useState(false)
  const [modales, setModales] = useState(false)
  const blockModal = useRef('')
  const rootClasses = [cl.modalBlock]
  const rootContentClasses = [cl.modalContent]
  const [isCurrencyAndCount, setIsCurrencyAndCount] = useState({count: '', currency: ''})
  const [isCurrencyAndCounts, setIsCurrencyAndCounts] = useState({count: '', currency: ''})
  const [isInfoCard, setIsInfoCard] = useState({currency: '', pay: '', option: ''})
  const [isInfoCards, setIsInfoCards] = useState({currency: '', pay: '', option: ''})
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
  modalrur && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
  return(
    <>
      <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setModalrur(false)}}>
        <div className={rootContentClasses.join` `}>
          <div id='modal' className={cl.modalForm} onClick={e=>e.stopPropagation()}>
            <h3 className={cl.modalTitle}>{title}</h3>
            <p className={cl.modalDescr}>{title}</p>
            <div className={cl.btnBlock}>
              <img src={payeerLogo} role={"button"} alt={''} onClick={(e)=>{e.preventDefault();setModals(true)}}/>
              <FORMRURpauer currencyAndCount={isCurrencyAndCount} changeCurrencyAndCount={setIsCurrencyAndCount} title={`${t('private.finances.sum')}`} setVisible={setModals} visible={modals}/>
            </div>
            <br/>
            <br/>
            <div className={cl.btnBlock} onClick={(e)=>{e.preventDefault();setModales(true)}}>
              <img src={"https://www.free-kassa.ru/img/fk_btn/23.png"} role={"button"} alt={''} style={{width:"400px"}}/>
              <FORMRURfrikassa currencyAndCount={isCurrencyAndCounts} changeCurrencyAndCount={setIsCurrencyAndCounts} title={`${t('private.finances.sum')}`} setVisible={setModales} visible={modales}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
export default CreatePayrur
