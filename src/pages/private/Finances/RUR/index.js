import React from 'react'
import MyViewElement from "../../../../components/MyViewElements/MyViewElements";
import {useTranslation} from "react-i18next";
import cl from "../Finance.module.css";
import rubleImg from "../../../../assets/images/icons/rouble-svgrepo-com.svg";
import {useSelector} from "react-redux";
import {formatter} from "../../../../utils";

const RurBalanse = ({setModalrur, setModalWru}) => {
  const userInfo = useSelector((state) => state.app.user)
  const {t} = useTranslation('common');
  return (
    <>
      {userInfo && (
        <>
          <MyViewElement element={
            <div className={[cl.rubItem, cl.transItem].join` `}>
              <div className={cl.transItemTop}>
                <span className={cl.transTopText}>rub</span>
                <span> </span>
                <span className={cl.transTopCircle}>
                  <img src={rubleImg} alt={""}/>
                </span>
              </div>
              <div className={cl.transItemMiddle}>
                <span className={cl.transMidSign}>
                  <img src={rubleImg} alt={""}/>
                </span>
                <div>
                  <span className={cl.transMidFirst}>
                    {formatter
                  .format((userInfo.balanceCrypto.RUR > -1 && userInfo.balanceCrypto.RUR) || 0.00)
                  .replace('₽', '')}
                  </span>
                </div>
              </div>
              <div className={cl.transItemBottom}>
                <div rel="noreferrer">
                  <button className={'fin-btn'} onClick={e => {
                    e.preventDefault();
                    setModalrur(true)
                  }}>{t('private.finances.pays')}</button>
                </div>
                <div rel="noreferrer">
                  <button className={'fin-btn'} onClick={e => {
                    e.preventDefault();
                    setModalWru(true)
                  }}>{t('private.finances.winthdraw')}</button>
                </div>
              </div>
            </div>
          }
          />
        </>
      )}
    </>
  )
}
export default RurBalanse
