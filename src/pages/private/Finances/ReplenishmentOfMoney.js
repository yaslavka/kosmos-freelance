import React, {useState} from 'react'
import cl from './Finance.module.css';
import {useTranslation} from "react-i18next";
import RurBalanse from "./RUR";
import CreatePayrur from "./modal/modalpay/RUR";
import WinsdrawRUR from "./modal/modalwinsdraw/RUR";
import BTCbalance from "./BTC";
import CreatePayBTC from "./modal/modalpay/BTC";
function ReplenishmentOfMoney() {
  const [modalrur, setModalrur] = useState(false)
  const [modaleWru, setModalWru] = useState(false)
  const [btcmodel, setBtcmodel]= useState(false)
  const [btcmodelw, setBtcmodelw]= useState(false)
  const { t } = useTranslation('common');




  return (
    <div className={cl.transBlock}>
      <RurBalanse modalrur={modalrur} setModalrur={setModalrur} modaleWru={modaleWru} setModalWru={setModalWru}/>
      <CreatePayrur title={`${t('private.finances.sistem')}`} modalrur={modalrur} setModalrur={setModalrur} modaleWru={modaleWru} setModalWru={setModalWru}/>
      <WinsdrawRUR title={`${t('private.finances.sistem')}`} modalrur={modalrur} setModalrur={setModalrur} modaleWru={modaleWru} setModalWru={setModalWru}/>
      <BTCbalance btcmodel={btcmodel} setBtcmodel={setBtcmodel} btcmodelw={btcmodelw} setBtcmodelw={setBtcmodelw}/>
      <CreatePayBTC setBtcmodel={setBtcmodel} btcmodel={btcmodel} title={'ВВОД BTC'}/>
    </div>
  )
}

export default ReplenishmentOfMoney
