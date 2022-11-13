import React, {useState} from 'react'
import cl from './Finance.module.css';
import dollarImg from './../../../scss/media/dollar-svgrepo-com.svg'
import roubleImg from './../../../scss/media/rouble-svgrepo-com.svg'
import euroImg from './../../../scss/media/euro-sign-svgrepo-com.svg'
import btcImg from './../../../scss/media/btc-svgrepo-com.svg'
import usdtImg from './../../../scss/media/usdt-svgrepo-com.svg'
import ethImg from './../../../scss/media/eth-svgrepo-com.svg'
import ltcImg from './../../../scss/media/ltc-alt-svgrepo-com.svg'
import xrpImg from './../../../scss/media/ripple-svgrepo-com.svg'
import dogeImg from './../../../scss/media/doge-alt-svgrepo-com.svg'
import trxImg from './../../../scss/media/trx-logo.svg'
import { useSelector } from 'react-redux'
import ReplenishmentOfMoneyItem from './ReplenishmentOfMoneyItem'
import MyModalW from "../../../components/modal/MyModalW";
import MyModalsW from "../../../components/modalW/MyModalW";
import {useTranslation} from "react-i18next";
function ReplenishmentOfMoney() {
  const [isInfoCard, setIsInfoCard] = useState({currency: '', pay: '', option: ''})
  const financeData = useSelector(state=>state.financeMoney)
  const [isInfoCards, setIsInfoCards] = useState({currency: '', pay: '', option: ''})
  const infoData = [
    {nameCash: 'usd', sign: dollarImg , classes: cl.dollarItem, urlOut: '', urlIn: ''},
    {nameCash: 'rub', sign: roubleImg , classes: cl.rubItem, urlOut: '', urlIn: ''},
    {nameCash: 'eur', sign: euroImg, classes: cl.euroItem, urlOut: '', urlIn: ''},
    {nameCash: 'btc', sign: btcImg , classes: cl.btcItem, urlOut: '', urlIn: ''},
    {nameCash: 'usdt', sign: usdtImg, classes: cl.usdtItem, urlOut: '', urlIn: ''},
    {nameCash: 'eth', sign: ethImg, classes: cl.ethItem, urlOut: '', urlIn: ''},
    {nameCash: 'bch', sign: btcImg, classes: cl.bchItem, urlOut: '', urlIn: ''},
    {nameCash: 'ltc', sign: ltcImg, classes: cl.ltcItem, urlOut: '', urlIn: ''},
    {nameCash: 'dash', sign: dogeImg , classes: cl.dashItem, urlOut: '', urlIn: ''},
    {nameCash: 'xrp', sign:xrpImg, classes: cl.xrpItem, urlOut: '', urlIn: ''},
    {nameCash: 'doge', sign: dogeImg  , classes: cl.dageItem, urlOut: '', urlIn: ''},
    {nameCash: 'trx', sign: trxImg , classes: cl.trxItem, urlOut: '', urlIn: ''}]
  const [modal, setModal] = useState(false)
  const [modaleW, setModalW] = useState(false)
  const { t } = useTranslation('common');




  return (
    <div className={cl.transBlock}>
      {infoData.map(e=>
        <ReplenishmentOfMoneyItem cardInfo={isInfoCard}
              setCardInfo={setIsInfoCard} defaultPriceCount={financeData.filter(el=>el.currency === e.nameCash)[0].value} infoData={e} setModal={setModal} modal={modal} setModalW={setModalW} modaleW={modaleW}/>
      )}
      <MyModalW title={`${t('private.finances.sistem')}`} isInfoCards={isInfoCards} setIsInfoCards={setIsInfoCards} isInfoCard={isInfoCard} setIsInfoCard={setIsInfoCard} setModal={setModal} modal={modal}/>
      <MyModalsW title={`${t('private.finances.sistem')}`} isInfoCards={isInfoCards} setIsInfoCards={setIsInfoCards} isInfoCard={isInfoCard} setIsInfoCard={setIsInfoCard} setModal={setModalW} modal={modaleW}/>
    </div>
  )
}

export default ReplenishmentOfMoney
