import React, {useState} from 'react'
import cl from './Finance.module.css';
import {useTranslation} from "react-i18next";
import RurBalanse from "./RUR";
import CreatePayrur from "./modal/modalpay/RUR";
import WinsdrawRUR from "./modal/modalwinsdraw/RUR";
import BTCbalance from "./BTC";
import CreatePayBTC from "./modal/modalpay/BTC";
import CreatewinsdrawBTC from "./modal/modalwinsdraw/BTC/ndex";
function ReplenishmentOfMoney({userInfo}) {
  const [modalrur, setModalrur] = useState(false)
  const [modaleWru, setModalWru] = useState(false)
  const [btcmodel, setBtcmodel]= useState(false)
  const [btcmodelw, setBtcmodelw]= useState(false)
  const [modaleFru, setModalFru] = useState(false)
  const { t } = useTranslation('common');




  return (
    <div className={cl.transBlock}>
      <RurBalanse modalrur={modalrur} setModalrur={setModalrur} modaleWru={modaleWru} setModalWru={setModalWru}/>
      <CreatePayrur title={`${t('private.finances.sistem')}`} userInfo={userInfo} modalrur={modalrur} setModalrur={setModalrur} modaleWru={modaleWru} setModalWru={setModalWru}/>
      <WinsdrawRUR
        title={`${t('private.finances.sistem')}`}
        modalrur={modalrur}
        setModalrur={setModalrur}
        modaleWru={modaleWru}
        setModalWru={setModalWru}
        modaleFru={modaleFru}
        setModalFru={setModalFru}
      />
      <BTCbalance btcmodel={btcmodel} setBtcmodel={setBtcmodel} btcmodelw={btcmodelw} setBtcmodelw={setBtcmodelw}/>
      <CreatePayBTC setBtcmodel={setBtcmodel} btcmodel={btcmodel} title={'ВВОД BTC'}/>
      <CreatewinsdrawBTC btcmodelw={btcmodelw} setBtcmodelw={setBtcmodelw} title={'ВЫВОД BTC'}/>
    </div>
  )
}

export default ReplenishmentOfMoney
