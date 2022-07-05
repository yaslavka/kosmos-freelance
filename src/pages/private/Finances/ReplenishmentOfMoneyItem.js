import React from 'react';
import cl from './Finance.module.css';
import rubleImg from './../../../scss/media/rouble-svgrepo-com.svg'


const ReplenishmentOfMoneyItem = ({infoData})=>{
    return (
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
                <button className={cl.transBtn}>Пополнить</button>
                <button className={cl.transBtn}>Вывести</button>
            </div>
        </div>
    )
}

export default ReplenishmentOfMoneyItem