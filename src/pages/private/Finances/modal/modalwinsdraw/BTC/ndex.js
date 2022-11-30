import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import cl from './MyModal.module.css';
import {Input} from "reactstrap";
const CreatewinsdrawBTC =({title, btcmodelw, setBtcmodelw})=>{
  const { t } = useTranslation('common');
  const blockModalbtcmodelw = useRef('')
  const rootClassesbtcmodelw = [cl.modalBlock]
  const rootContentClassesbtcmodelw = [cl.modalContent]
  btcmodelw && rootClassesbtcmodelw.push(cl.active) && rootContentClassesbtcmodelw.push(cl.activeContent)
  return(
    <>
      <div ref={blockModalbtcmodelw} className={rootClassesbtcmodelw.join` `} onClick={(e)=>{e.preventDefault();setBtcmodelw(false)}}>
        <div className={rootContentClassesbtcmodelw.join` `}>
          <div id='btcmodelw' className={cl.modalForm} onClick={e=>e.stopPropagation()}>
            <h3 className={cl.modalTitle}>{title}</h3>
            <p className={cl.modalDescrs}>
              <i>пожалуйста вводите коректные данные, в случае ошибочного адреса, средства возвращенны не будут</i>
            </p>
            <form>
              <i className={cl.modalDescrs}>Введите Адрес кошелька (ВТС)</i>
              <div className={cl.btnBlock}>
                <Input type="text" name="address" placeholder={"Введите Адрес кошелька (ВТС)"}/>
              </div>
              <i className={cl.modalDescrs}>Количество (ВТС)</i>
              <div className={cl.btnBlock}>
                <Input type="text" name="amount" placeholder={"Количество (ВТС)"}/>
              </div>
              <i className={cl.modalDescrs}>Комиссия за транзакцию (BTC)</i>
              <div className={cl.btnBlock}>
                <Input type="text" name="address" placeholder={"Комиссия за транзакцию (BTC)"} disabled value={""}/>
              </div>
              <div className={cl.btnBlock}>
                <Input type="text" name="address" placeholder={"Введите Адрес кошелька (ВТС)"}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreatewinsdrawBTC
