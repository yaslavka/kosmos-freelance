import React, {useState} from 'react'
import cl from './Finance.module.css';
import {useTranslation} from "react-i18next";
import RurBalanse from "./RUR";
import CreatePayrur from "./modal/modalpay/RUR";
import WinsdrawRUR from "./modal/modalwinsdraw/RUR";
function ReplenishmentOfMoney() {
  const [modalrur, setModalrur] = useState(false)
  const [modaleWru, setModalWru] = useState(false)
  const { t } = useTranslation('common');




  return (
    <div className={cl.transBlock}>
      <RurBalanse modalrur={modalrur} setModalrur={setModalrur} modaleWru={modaleWru} setModalWru={setModalWru}/>
      <CreatePayrur title={`${t('private.finances.sistem')}`} modalrur={modalrur} setModalrur={setModalrur} modaleWru={modaleWru} setModalWru={setModalWru}/>
      <WinsdrawRUR title={`${t('private.finances.sistem')}`} modalrur={modalrur} setModalrur={setModalrur} modaleWru={modaleWru} setModalWru={setModalWru}/>
    </div>
  )
}

export default ReplenishmentOfMoney
