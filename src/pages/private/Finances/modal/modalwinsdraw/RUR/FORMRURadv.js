import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import cl from './MyModal.module.css';
import { Formik, Form, Field } from 'formik'
import MyInput from "../../../../../../components/Input/MyInput";
import MyBtnFiled from "../../../../../../components/buttonback/MyBtnFiled";

const FORMRURadv =({ title, advCash, setAdvCash, setParentsModales, submitCreateWithdrawForm, freeKassaValidationSchema, initialValues})=>{
  const { t } = useTranslation('common');
  const blockModal = useRef('')
  const rootClasses = [cl.modalBlock]
  const rootContentClasses = [cl.modalContent]

  advCash && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
  return (
    <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setParentsModales(false);setAdvCash(false)}}>

      <div  className={rootContentClasses.join` `} >
        <Formik onSubmit={submitCreateWithdrawForm} validationSchema={freeKassaValidationSchema} initialValues={{...initialValues, system: 'advCash'} }>
          {({isValid, dirty})=>(
            <Form onClick={e=>e.stopPropagation()}>
              <h3 className={cl.modalTitle}>{title}</h3>
              <p className={cl.modalDescr}>{t('private.finances.modalDescr')}</p>
              <div>
                <Field  name="wallet" type="text"  classesInput={cl.modalInput} component={MyInput}  placeholder={`${t('Номер карты')}`} />
              </div>
              <div>
                <Field  name="amount" type="text"  classesInput={cl.modalInput} component={MyInput}  placeholder={`${t('private.finances.place')}`} />
              </div>
              <div >
                <Field  name="password" type="password"  classesInput={cl.modalInput} component={MyInput}  placeholder={`${t('Финансовый пароль')}`} />
              </div>
              <p className={cl.modalWarning}>{t('private.finances.modalWarning')}</p>
              <span className={cl.modalExit} onClick={e=>{e.preventDefault();setParentsModales(false);setAdvCash(false)}}> </span>
              <div className={cl.btnBlock}>
                <MyBtnFiled  type='submit'  classes={cl.modalBtn} disabled={!(isValid && dirty)}>{t('private.finances.modalBtn')}</MyBtnFiled>
              </div>
            </Form>
          )}
        </Formik>
      </div>

    </div>
  )
}
export default FORMRURadv
