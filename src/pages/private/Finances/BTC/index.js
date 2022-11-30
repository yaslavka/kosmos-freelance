import React from 'react'
import cl from '../Finance.module.css';
import {useTranslation} from "react-i18next";
import MyViewElement from "../../../../components/MyViewElements/MyViewElements";
import rubleImg from "../../../../scss/media/rouble-svgrepo-com.svg";
import {useSelector} from "react-redux";
import {formatter} from "../../../../utils";
import btcImg from './../../../../scss/media/btc-svgrepo-com.svg'

const BTCbalance =({setBtcmodel, setBtcmodelw})=>{
  const userInfo = useSelector((state) => state.app.user)
  const { t } = useTranslation('common');
  return(
    <>
      {userInfo &&(
        <MyViewElement element={
          <div className={[cl.transItem, cl.btcItem].join` `}>
            <div className={cl.transItemTop}>
              <div className={cl.transTopText}>BTC</div>
              <span className={cl.transTopRouble}>
                <img src={rubleImg} alt={""}/>
                {`${formatter
                  .format(
                    (userInfo.allBalances> -1 && userInfo.allBalances) || 0,
                  ).replace('₽', '₽')}`}
              </span>
              <span className={cl.transTopCircle}>
                <img src={btcImg} alt={""}/>
              </span>
            </div>
            <div className={cl.transItemMiddle}>
              <span className={cl.transMidSign}>
                <img src={btcImg} alt={""}/>
              </span>
              <div className={cl.transMidValue}>
                <span className={cl.transMidSec}>{userInfo.balanceCrypto.BTC}</span>
              </div>
            </div>
            <div className={cl.transItemBottom}>
              <div>
                <button className={cl.transBtn} onClick={e=>{e.preventDefault();setBtcmodel(true)}}>{t('private.finances.pays')}</button>
              </div>
              <div>
                <button className={cl.transBtn} onClick={e=>{e.preventDefault();setBtcmodelw(true)}}>{t('private.finances.winthdraw')}</button>
              </div>
            </div>
          </div>
        }
        />
      )}

    </>
  )
}
export default BTCbalance
