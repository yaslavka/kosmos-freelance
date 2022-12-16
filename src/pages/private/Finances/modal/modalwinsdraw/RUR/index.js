import React, {useState, useRef} from "react";
import cl from './MyModal.module.css';
import {api} from "../../../../../../api";
import payeerLogo from '../../../../../../assets/images/payeer-logo.8aa750cc.svg'
import {useTranslation} from "react-i18next";
import FORMRURfrikassa from "./FORMRURfrikassa";
import FORMRURpauer from "./FORMRURpauer";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {formatter} from "../../../../../../utils";
import * as actions from '../../../../../../actions/app.actions'
import confirm from 'reactstrap-confirm'
import { toast } from 'react-toastify'
import FORMRURCard from "./FORMRURCard";
import logo from './visa-mastercard.png'
import FORMRURadv from "./FORMRURadv";


const initialValues = {
  amount: '',
  wallet: '',
  password: '',
}

const payeerValidationSchema = yup.object({
  wallet: yup.string().required('Необходимо заполнить это поле'),
  password: yup.string().required('Необходимо заполнить это поле'),
  amount: yup
    .number()
    .typeError('Сумма должно быть числом')
    .positive('Сумма должна быть положительной')
    .required('Необходимо заполнить это поле')
    .test(
      'amount',
      'Сумма должна быть не меньше 50 и не больше 10 000',
      (value) => value >= 50 && value <= 10000,
    ),
})

const freeKassaValidationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Сумма должно быть числом')
    .positive('Сумма должна быть положительной')
    .required('Необходимо заполнить это поле')
    .test(
      'amount',
      'Сумма должна быть не меньше 500 и не больше 10 000',
      (value) => value >= 500 && value <= 10000,
    ),
})

const WinsdrawRUR =({ title, setModalWru, modaleWru, modaleFru, setModalFru})=>{
  const dispatch = useDispatch()
  const { t } = useTranslation('common');
  const [modals, setModals] = useState(false)
  const [modales, setModales] = useState(false)
  const [advCash, setAdvCash]= useState(false)
  const blockModal = useRef('')
  const rootClasses = [cl.modalBlock]
  const rootContentClasses = [cl.modalContent]
  const [isCurrencyAndCount, setIsCurrencyAndCount] = useState({count: '', currency: ''})
  const [isCurrencyAndCounts, setIsCurrencyAndCounts] = useState({count: '', currency: ''})
  const submitCreateWithdrawForm = async (values, formBag) => {
    setModalWru(false);
    setModals(false);
    setModales(false);
    setModalFru(false);
    setAdvCash(false)
    let result = await confirm({
      title: `Перевод ${values.system.toUpperCase()}`,
      message: `Перевести ${formatter
        .format(values.amount)
        .replace('₽', '₽')} по адресу "${values.system.toUpperCase()}" (${values.wallet})`,
      confirmText: 'Подтвердить',
      confirmColor: 'primary',
      cancelText: 'Отмена',
      cancelColor: 'link text-muted',
    })

    if (result) {
      api
        .createWithdraw({ ...values, amount: Number(values.amount) })
        .then(() => {
          toast.success('Ваша заявка принята, ожидайте зачисление')
          formBag.resetForm()
          api
            .getUserInfo()
            .then((response) => {
              dispatch(actions.userInfoSuccess(response))
            })
            .catch(() => {})
        })
        .catch((error) => {
          if (error.message) {
            toast.error(error.message)
          }
        })
    }
  }

modaleWru && rootClasses.push(cl.active) && rootContentClasses.push(cl.activeContent)
  return(
    <>
      <div ref={blockModal} className={rootClasses.join` `} onClick={(e)=>{e.preventDefault();setModalWru(false)}}>
        <div  className={rootContentClasses.join` `} onClick={e=>e.stopPropagation()}>
          <div  id='modal' className={cl.modalForm} >
           <h3 className={cl.modalTitle}>{title}</h3>
            <p className={cl.modalDescr}>{title}</p>
            <div className={cl.btnBlock}>
              <img src={payeerLogo} role={"button"} alt={''} onClick={(e)=>{e.preventDefault();setModals(true)}}/>
              <FORMRURpauer
                initialValues={initialValues}
                payeerValidationSchema={payeerValidationSchema}
                currencyAndCount={isCurrencyAndCount}
                changeCurrencyAndCount={setIsCurrencyAndCount}
                setParentModal={setModalWru}
                submitCreateWithdrawForm={submitCreateWithdrawForm} title={`${t('private.finances.sum')}`}
                setVisible={setModals} visible={modals} setModalWru={setModalWru}/>
            </div>
            <br/>
            <br/>
            <div className={cl.btnBlock} >
              <img src={"https://www.free-kassa.ru/img/fk_btn/23.png"} role={"button"} alt={''} style={{width:"400px"}} onClick={(e)=>{e.preventDefault();setModales(true)}}/>
              <FORMRURfrikassa
                currencyAndCount={isCurrencyAndCounts}
                changeCurrencyAndCount={setIsCurrencyAndCounts}
                title={`${t('private.finances.sum')}`}
                setModales={setModales}
                initialValues={initialValues}
                modales={modales}
                setParentModals={setModalWru}
                submitCreateWithdrawForm={submitCreateWithdrawForm}
                freeKassaValidationSchema={freeKassaValidationSchema}
              />
            </div>
            <br/>
            <br/>
            <div className={cl.btnBlock} >
              <img src={logo} role={"button"} alt={''} style={{width:"400px"}} onClick={(e)=>{e.preventDefault();setModalFru(true)}}/>
              <FORMRURCard
                currencyAndCount={isCurrencyAndCounts}
                changeCurrencyAndCount={setIsCurrencyAndCounts}
                title={`${t('private.finances.sum')}`}
                setModalFru={setModalFru}
                initialValues={initialValues}
                modaleFru={modaleFru}
                setParentModales={setModalWru}
                submitCreateWithdrawForm={submitCreateWithdrawForm}
                freeKassaValidationSchema={freeKassaValidationSchema}
              />
            </div>
            <br/>
            <br/>
            <div className={cl.btnBlock} >
              <img src={`https://static.openfintech.io/payment_methods/advcash_wallet/logo.svg?w=400&c=v0.59.26#w200`} role={"button"} alt={''} style={{width:"400px"}} onClick={(e)=>{e.preventDefault();setAdvCash(true)}}/>
              <FORMRURadv
                currencyAndCount={isCurrencyAndCounts}
                changeCurrencyAndCount={setIsCurrencyAndCounts}
                title={`${t('private.finances.sum')}`}
                setAdvCash={setAdvCash}
                initialValues={initialValues}
                advCash={advCash}
                setParentsModales={setModalWru}
                submitCreateWithdrawForm={submitCreateWithdrawForm}
                freeKassaValidationSchema={freeKassaValidationSchema}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default WinsdrawRUR
