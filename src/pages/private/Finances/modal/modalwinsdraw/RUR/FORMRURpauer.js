import React, { useRef} from "react";
import cl from './MyModal.module.css';
import {useTranslation} from "react-i18next";
import MyInput from "../../../../../../components/Input/MyInput";
import MyBtnFiled from "../../../../../../components/buttonback/MyBtnFiled";
import { Formik, Form, Field } from 'formik'

const FORMRURpauer = ({ title, visible, setVisible, submitCreateWithdrawForm, payeerValidationSchema, initialValues, setParentModal})=>{
  const { t } = useTranslation('common');
  const blockModal = useRef('')
  const rootClasses = [cl.modalBlock]
  const rootContentClasses = [cl.modalContent]

  visible && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
  return (
    <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setParentModal(false);setVisible(false)}}>

      <div  className={rootContentClasses.join` `} >

          <Formik onSubmit={submitCreateWithdrawForm} validationSchema={payeerValidationSchema} initialValues={{...initialValues, system: 'payeer'} }>
            {({isValid, dirty})=>(
            <Form onClick={e=>e.stopPropagation()}>
              <h3 className={cl.modalTitle}>{title}</h3>
              <p className={cl.modalDescr}>{t('private.finances.modalDescr')}</p>
              <div>
                <Field  name="wallet" type="text"  classesInput={cl.modalInput} component={MyInput}  placeholder={`${t('Номер кошелька')}`} />
              </div>
              <div>
                <Field  name="amount" type="text"  classesInput={cl.modalInput} component={MyInput}  placeholder={`${t('private.finances.place')}`} />
              </div>
              <div >
                <Field  name="password" type="password"  classesInput={cl.modalInput} component={MyInput}  placeholder={`${t('Финансовый пароль')}`} />
              </div>
              <p className={cl.modalWarning}>{t('private.finances.modalWarning')}</p>
              <span className={cl.modalExit} onClick={e=>{e.preventDefault();setParentModal(false);setVisible(false)}}> </span>
              <div className={cl.btnBlock} >
                <MyBtnFiled  type='submit'  classes={cl.modalBtn} disabled={!(isValid && dirty)} >{t('private.finances.modalBtn')}</MyBtnFiled>
              </div>
            </Form>
            )}
          </Formik>
      </div>

    </div>
  )
}
export default FORMRURpauer
