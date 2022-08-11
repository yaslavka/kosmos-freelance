import React, {useState, useMemo, useRef} from "react";
import cl from './MyModal.module.css';
import MyBtnFiled from "../buttonback/MyBtnFiled";
import MyInput from "../Input/MyInput";


const MyModal = ({block, title, visible, setVisible, setThx})=>{

    const [modalInfo, setModalInfo] = useState({namePerson: '', tel: ''})

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
        setModalInfo({namePerson:'',tel:''})
        // postRequest(forServerInfo)
        // console.log(forServerInfo)
        // ContactsService.setPhoneNName(modalInfo.tel, modalInfo.tel)
    }


    let clean = false

    let [distance, setDistance] = useState(0)

    // useMemo(()=>{
    //     if (visible){
    //         document.body.classList.add('desable-scroll');
    //         document.documentElement.classList.add('html-overflow')
    //         rootContentClasses.push(cl.contentM)
    //     }else{
    //          rootContentClasses.pop(cl.contentM)
    //         document.documentElement.classList.remove('html-overflow')
    //         document.body.classList.remove('desable-scroll');
    //     }},[visible])





    visible && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
    return (
        <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setVisible(false)}}>

                <div  className={rootContentClasses.join` `} >
                    <form action="" id='modal' className={cl.modalForm} onClick={e=>e.stopPropagation()}>
                        <h3 className={cl.modalTitle}>{title}</h3>
                        <p className={cl.modalDescr}>Менеджер свяжется с вами в течение дня, чтобы обсудить вашу задачу</p>
                        <MyInput valueInput={modalInfo.namePerson} type="number"  required clean={clean} classesInput={cl.modalInput} classesPlace={cl.modalPlace} place='Введите сумму' setInput={setModalInfo} input={modalInfo}/>
                        <select className={cl.select}>
                            <option>Доллары</option>
                            <option>Рубли</option>
                            <option>Евро</option>
                        </select>
                        <p className={cl.modalWarning}>Нажимая на кнопку, вы даете согласие на обработку ваших персональных данных</p>
                        <span className={cl.modalExit} onClick={e=>{e.preventDefault();setVisible(false)}}></span>
                        <div className={cl.btnBlock}>
                            <a target='_blank' href={'#'} onClick={e=>{addModalInfo(e); clean = true; setThx(true)}}>
                                <MyBtnFiled  type='submit' form='modal' classes={cl.modalBtn} >ОТПРАВИТЬ</MyBtnFiled>
                            </a>

                        </div>
                    </form>
                </div>

        </div>
    )
}

export default MyModal
