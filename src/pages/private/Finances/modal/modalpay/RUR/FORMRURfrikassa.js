import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import cl from './MyModal.module.css';
import MyInput from "../../../../../../components/Input/MyInput";
import MyBtnFiled from "../../../../../../components/buttonback/MyBtnFiled";
import { Formik, Form, Field } from 'formik'

const FORMRURfrikassa =({ title, initialValues, freekassa, setFreekassa, submitCreatePayForm, validationSchema})=>{
  const { t } = useTranslation('common');
  const blockModal = useRef('')
  const rootClasses = [cl.modalBlock]
  const rootContentClasses = [cl.modalContent]

  freekassa && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
  return(
    <>
      <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setFreekassa(false)}}>
        <div className={rootContentClasses.join` `}>
          <Formik initialValues={initialValues} onSubmit={submitCreatePayForm} validationSchema={validationSchema}>
            {({isValid, dirty})=>(
              <Form className={cl.modalForm} onClick={e=>e.stopPropagation()}>
                <h3 className={cl.modalTitle}>{title}</h3>
                <p className={cl.modalDescr}>{t('private.finances.modalDescr')}</p>
                <div>
                  <Field name={'amount'} type={'text'} classesInput={cl.modalInput} classesPlace={cl.modalPlace} component={MyInput} placeholder={`${t('private.finances.place')}`}/>
                </div>
                <p className={cl.modalWarning}>{t('private.finances.modalWarning')}</p>
                <span className={cl.modalExit} onClick={e=>{e.preventDefault();setFreekassa(false)}}></span>
                <div className={cl.btnBlock}>
                  <div className={cl.btnBlock}>
                    <MyBtnFiled  type="submit" disabled={!(isValid && dirty)} classes={cl.modalBtn} >{t('private.finances.modalBtn')}</MyBtnFiled>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )

}
export default FORMRURfrikassa
