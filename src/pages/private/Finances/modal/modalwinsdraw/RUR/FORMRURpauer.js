import React, {useState,  useRef} from "react";
import cl from './MyModal.module.css';
import {useTranslation} from "react-i18next";
import MyInput from "../../../../../../components/Input/MyInput";
import MyBtnFiled from "../../../../../../components/buttonback/MyBtnFiled";

const FORMRURpauer = ({ title, visible, setVisible, changeCurrencyAndCount, currencyAndCount})=>{
  const { t } = useTranslation('common');
  const [modalInfo, setModalInfo] = useState({count: '', currency: ''})
  const blockModal = useRef('')
  let forServerInfo = {}
  const rootClasses = [cl.modalBlock]
  const rootContentClasses = [cl.modalContent]
  const addModalInfo = (e)=>{
    e.preventDefault();
    setVisible(false);
    const newModal = {
      ...modalInfo, id: Date.now()
    }
    forServerInfo = {...newModal}
    setModalInfo({count:'',tel:''})
  }
  let clean = false
  visible && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
  return (
    <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setVisible(false)}}>

      <div  className={rootContentClasses.join` `} >
        <form action="" id='modal' className={cl.modalForm} onClick={e=>e.stopPropagation()}>
          <h3 className={cl.modalTitle}>{title}</h3>
          <p className={cl.modalDescr}>{t('private.finances.modalDescr')}</p>
          <MyInput valueInput={modalInfo.namePerson} type="number"  required clean={clean} classesInput={cl.modalInput} classesPlace={cl.modalPlace} place={`${t('private.finances.place')}`}  setInput={setModalInfo} input={modalInfo}/>
          <select className={cl.select} onChange={e=>setModalInfo({...modalInfo, currency:e.target.value})}>
            <option value={"RUB"}>RUB</option>
          </select>
          <p className={cl.modalWarning}>{t('private.finances.modalWarning')}</p>
          <span className={cl.modalExit} onClick={e=>{e.preventDefault();setVisible(false)}}></span>
          <div className={cl.btnBlock}>
            <a target='_blank' href={'#'} onClick={e=>{addModalInfo(e); clean = true; changeCurrencyAndCount({...currencyAndCount,count: modalInfo.count, currency: modalInfo.currency})}}>
              <MyBtnFiled  type='submit' form='modal' classes={cl.modalBtn} >{t('private.finances.modalBtn')}</MyBtnFiled>
            </a>
          </div>
        </form>
      </div>

    </div>
  )
}
export default FORMRURpauer
