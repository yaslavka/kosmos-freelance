import React, {useRef} from "react";
import cl from './MyModal.module.css';
import {useTranslation} from "react-i18next";
import MyInput from "../../../../../../components/Input/MyInput";
import MyBtnFiled from "../../../../../../components/buttonback/MyBtnFiled";
import { Formik, Form, Field } from 'formik'

const FORMRURpauer = ({ title, modals, setModals,  submitCreatePayeerPayForm, initialValues, userInfo, validationSchema})=>{
  const { t } = useTranslation('common');
  const blockModal = useRef('')

  const rootClasses = [cl.modalBlock]
  const rootContentClasses = [cl.modalContent]

  modals && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
  return(
    <>
      <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setModals(false)}}>
        <div className={rootContentClasses.join` `}>
          <Formik initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={submitCreatePayeerPayForm} id='modal' className={cl.modalForm}>
            {({isValid, dirty}) =>(
              <Form onClick={e=>e.stopPropagation()}>
                <h3 className={cl.modalTitle}>{title}</h3>
                <p className={cl.modalDescr}>{t('private.finances.modalDescr')}</p>
                <div>
                  <input className="tinkoffPayRow" type="hidden" name="terminalkey" value="1670485393713"/>
                  <input className="tinkoffPayRow" type="hidden" name="frame" value="true"/>
                  <input className="tinkoffPayRow" type="hidden" name="language" value="ru"/>
                  <input className="tinkoffPayRow" type="hidden" placeholder="Номер заказа" name="order" value={`${+(new Date())}:${userInfo.username}`}/>
                  <Field name="Amount"  type="text"   classesInput={cl.modalInput} classesPlace={cl.modalPlace} component={MyInput} placeholder={`${t('private.finances.place')}`} />
                </div>

                <p className={cl.modalWarning}>{t('private.finances.modalWarning')}</p>
                <span className={cl.modalExit} onClick={e=>{e.preventDefault();setModals(false)}}> </span>
                <div className={cl.btnBlock}>
                  <MyBtnFiled  type="submit" disabled={!(isValid && dirty)} classes={cl.modalBtn} >{t('private.finances.modalBtn')}</MyBtnFiled>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
export default FORMRURpauer
