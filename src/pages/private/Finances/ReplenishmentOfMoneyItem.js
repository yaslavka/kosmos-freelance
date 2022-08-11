import React, { useState, useCallback } from 'react'
import cl from './Finance.module.css';
import rubleImg from './../../../scss/media/rouble-svgrepo-com.svg'
import MyViewElement from 'src/components/MyViewElements/MyViewElements';
import MyModal from 'src/components/modal/MyModal';


const ReplenishmentOfMoneyItem = ({infoData, activeModal, setActiveModal})=>{
    const [modal, setModal] = useState(false)
    return (
        <MyViewElement element={
        <div className={[cl.transItem, infoData.classes].join` `}>
            <div className={cl.transItemTop}>
                <span className={cl.transTopText}>{infoData.nameCash}</span>
                {infoData.nameCash === 'rub' ? 
                    <span></span>                 
                     :
                    <span className={cl.transTopRouble}>
                        <img src={rubleImg}/>
                        {infoData.roubleCount}
                    </span>
                 }
              
                <span className={cl.transTopCircle}>
                    <img src={infoData.sign}/>
                </span>
            </div>
            <div className={cl.transItemMiddle}>
                <span className={cl.transMidSign}>
                    <img src={infoData.sign}/>
                </span>
                <div classname={cl.transMidValue}>
                    <span className={cl.transMidFirst}>{infoData.count.split`.`[0]}</span>
                    <span className={cl.transMidSec}>.{infoData.count.split`.`[1]}</span>
                </div>
            </div>
            <div className={cl.transItemBottom}>
                <a href={infoData.urlOut} target="_blank">
                    <button className={cl.transBtn} onClick={e=>{e.preventDefault();setActiveModal(true)}}>Пополнить</button>
                </a>
                <a href={infoData.urlIn} target="_blank">
                    <button className={cl.transBtn} onClick={e=>{e.preventDefault();setActiveModal(true)}}>Вывести</button>
                </a>
            </div>
           
        </div>
         }/>
    )
}

export default ReplenishmentOfMoneyItem