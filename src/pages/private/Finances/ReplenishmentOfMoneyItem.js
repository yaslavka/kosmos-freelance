import React from 'react'
import cl from './Finance.module.css';
import rubleImg from './../../../scss/media/rouble-svgrepo-com.svg'
import MyViewElement from 'src/components/MyViewElements/MyViewElements';


const ReplenishmentOfMoneyItem = ({infoData,countPriceInfo,defaultPriceCount, setModal,setModalW, cardInfo, setCardInfo})=>{

    return (
      <MyViewElement element={
        <div className={[cl.transItem, infoData.classes].join` `}>
          <div className={cl.transItemTop}>
            <span className={cl.transTopText}>{infoData.nameCash}</span>
            {infoData.nameCash === 'rub' ?
              <span/>
              :
              <span className={cl.transTopRouble}>
                        <img src={rubleImg} alt={""}/>
                {countPriceInfo !== undefined ? countPriceInfo.rouble : '0.00'}
                      </span>
            }
            <span className={cl.transTopCircle}>
                      <img src={infoData.sign} alt={""}/>
                    </span>
          </div>
          <div className={cl.transItemMiddle}>
                    <span className={cl.transMidSign}>
                      <img src={infoData.sign} alt={""}/>
                    </span>
            <div className={cl.transMidValue}>
              <span className={cl.transMidFirst}>{countPriceInfo !== undefined ?countPriceInfo.count.split`.`[0] :  defaultPriceCount.split`.`[0]}</span>
              <span className={cl.transMidSec}>.{countPriceInfo !== undefined ?countPriceInfo.count.split`.`[1]:  defaultPriceCount.split`.`[1]}</span>
            </div>
          </div>
          <div className={cl.transItemBottom}>
            <a href={infoData.urlOut} target="_blank" rel="noreferrer" >
              <button className={cl.transBtn} onClick={e=>{e.preventDefault();setModal(true);setCardInfo({...cardInfo, pay:true,currency:infoData.nameCash})}}>Пополнить</button>
            </a>
            <a href={infoData.urlIn} target="_blank" rel="noreferrer">
              <button className={cl.transBtn} onClick={e=>{e.preventDefault();setModalW(true);setCardInfo({...cardInfo, pay:false,currency:infoData.nameCash})}}>Вывести</button>
            </a>
          </div>
        </div>
      }/>
    )
}

export default ReplenishmentOfMoneyItem
