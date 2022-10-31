import React, {useState,  useRef} from "react";
import cl from './MyModal.module.css';
import MyBtnFiled from "../buttonback/MyBtnFiled";
import MyInput from "../Input/MyInput";


const MyModalsF = ({ title, visible, setVisible, changeCurrencyAndCount, currencyAndCount})=>{
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
                        <p className={cl.modalDescr}>Менеджер свяжется с вами в течение дня, чтобы обсудить вашу задачу</p>
                        <MyInput valueInput={modalInfo.namePerson} type="number"  required clean={clean} classesInput={cl.modalInput} classesPlace={cl.modalPlace} place='Введите сумму' setInput={setModalInfo} input={modalInfo}/>
                        <select className={cl.select} onChange={e=>setModalInfo({...modalInfo, currency:e.target.value})}>
                          <option value={"USD"}>USD</option>
                          <option value={"RUB"}>RUB</option>
                          <option value={"EUR"}>EUR</option>
                        </select>
                        <p className={cl.modalWarning}>Нажимая на кнопку, вы даете согласие на обработку ваших персональных данных</p>
                        <span className={cl.modalExit} onClick={e=>{e.preventDefault();setVisible(false)}}></span>
                        <div className={cl.btnBlock}>
                          <a target='_blank' href={'#'} onClick={e=>{addModalInfo(e); clean = true; changeCurrencyAndCount({...currencyAndCount,count: modalInfo.count, currency: modalInfo.currency})}}>
                            <MyBtnFiled  type='submit' form='modal' classes={cl.modalBtn} >ОТПРАВИТЬ</MyBtnFiled>
                          </a>
                        </div>
                    </form>
                </div>

        </div>
    )
}

export default MyModalsF
