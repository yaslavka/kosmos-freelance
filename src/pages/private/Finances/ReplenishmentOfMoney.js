import React, {useState, useMemo} from 'react'
import { Formik, Form, Field } from 'formik'
import { Row, Col, Button, FormGroup } from 'reactstrap'
import * as yup from 'yup'
import { api } from '../../../api'
import cl from './Finance.module.css';

import dollarImg from './../../../scss/media/dollar-svgrepo-com.svg'
import roubleImg from './../../../scss/media/rouble-svgrepo-com.svg'
import euroImg from './../../../scss/media/euro-sign-svgrepo-com.svg'
import btcImg from './../../../scss/media/btc-svgrepo-com.svg'
import usdtImg from './../../../scss/media/usdt-svgrepo-com.svg'
import ethImg from './../../../scss/media/eth-svgrepo-com.svg'
import bchImg from './../../../scss/media/bch-crypto-cryptocurrency-cryptocurrencies-cash-money-bank-payment_95105.svg'
import ltcImg from './../../../scss/media/ltc-alt-svgrepo-com.svg'
import dashImg from './../../../scss/media/dash-svgrepo-com.svg'
import xrpImg from './../../../scss/media/ripple-svgrepo-com.svg'
import dogeImg from './../../../scss/media/doge-alt-svgrepo-com.svg'
import trxImg from './../../../scss/media/trx-logo.svg'
import MyModal from 'src/components/modal/MyModal';
import { useSelector } from 'react-redux'
import {formatter} from "../../../utils";


import Input from '../../../components/Input'
import ReplenishmentOfMoneyItem from './ReplenishmentOfMoneyItem'

const initialValues = { amount: '' }


const validationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Сумма должно быть числом')
    .positive('Сумма должна быть положительной')
    .required('Необходимо заполнить это поле'),
})

function ReplenishmentOfMoney() {
  const userInfo = useSelector(state => state.app.user);
  
  const [isCurrencyAndCount, setIsCurrencyAndCount] = useState({count: '', currency: ''})
  const [isInfoCard, setIsInfoCard] = useState({currency: '', pay: '', option: ''})
  const submitCreatePayForm = ({ amount }) => {
    api
      .createPay({ amount: Number(amount) })
      .then((response) => {
        if (response.url) {
          window.location.replace(response.url)
        }
      })
      .catch(() => {})
  }
  
  const financeData = useSelector(state=>state.financeMoney)
  const submitCreatePayeerPayForm = ( amount,currency,option,pay ) => {
    api
      .createPayeerPay({ amount: Number(amount), curr: currency, option: option, pay: pay })
      .then((response) => {
        if (response.url) {
          window.location.replace(response.url)
        }
      })
      .catch(() => {})
  }
  useMemo(()=>{
    if(isCurrencyAndCount.count) {
      submitCreatePayeerPayForm(isCurrencyAndCount.count, isCurrencyAndCount.currency, isInfoCard.currency)
    }
  },[isCurrencyAndCount])





  const infoData = [{nameCash: 'usd', sign: dollarImg , classes: cl.dollarItem, urlOut: '', urlIn: ''},
  {nameCash: 'rub', sign: roubleImg , classes: cl.rubItem, urlOut: '', urlIn: ''},
  {nameCash: 'eur', sign: euroImg, classes: cl.euroItem, urlOut: '', urlIn: ''},
  {nameCash: 'btc', sign: btcImg , classes: cl.btcItem, urlOut: '', urlIn: ''},
  {nameCash: 'usdt', sign: usdtImg, classes: cl.usdtItem, urlOut: '', urlIn: ''},
  {nameCash: 'eth', sign: ethImg, classes: cl.ethItem, urlOut: '', urlIn: ''},
  {nameCash: 'bch', sign: btcImg, classes: cl.bchItem, urlOut: '', urlIn: ''},
  {nameCash: 'ltc', sign: ltcImg, classes: cl.ltcItem, urlOut: '', urlIn: ''},
  {nameCash: 'dash', sign: dogeImg , classes: cl.dashItem, urlOut: '', urlIn: ''},
  {nameCash: 'xrp', sign:xrpImg, classes: cl.xrpItem, urlOut: '', urlIn: ''},
  {nameCash: 'doge', sign: dogeImg  , classes: cl.dageItem, urlOut: '', urlIn: ''},
  {nameCash: 'trx', sign: trxImg , classes: cl.trxItem, urlOut: '', urlIn: ''}]
  const [modal, setModal] = useState(false)
  
  
   

  return (
    <div className={cl.transBlock}>
      {/* <div className={cl.transCard}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitCreatePayForm}
        >
          {({ isValid, dirty }) => (
            <Form className={cl.transForm}>
              <div className={cl.transCardItem}>
                <div className={cl.transImg}>
                  <a
                      className="pay-image"
                      href="https://www.free-kassa.ru/"
                      rel="noreferrer"
                      target="_blank"
                    >
                    <img src="https://www.free-kassa.ru/img/fk_btn/23.png" alt="Free-Kassa" />
                  </a>
                </div>
               
                <FormGroup>
                  <Field type="text" name="amount" placeholder="Сумма" component={Input} />
                </FormGroup>
                <div className={cl.btnBlock}>
                  <Button type="submit" disabled={!(isValid && dirty)} className='fin-btn' block>
                    Подтвердить
                  </Button>
                </div>
              </div>
              
            </Form>
          )}
        </Formik>
      </div>
      <div className={cl.transCard}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitCreatePayeerPayForm}
        >
          {({ isValid, dirty }) => (
            <Form className={cl.transForm}>
              <div className={cl.transCardItem}>
                <div className={cl.transImg}>
                  <img src={payeerLogo} alt="Payeer" />
                </div>
                <div className={cl.transFrom}>
                  <Field name="amount" type="text" placeholder="Сумма"  component={Input} />
                </div>
                <div className={cl.btnBlock}>
                <Button type="submit" disabled={!(isValid && dirty)} className='fin-btn'>
                  Подтвердить
                </Button>
              </div>
              </div>
              
            </Form>
          )}
        </Formik>
      </div> */}
      
      {infoData.map(e=>
        <ReplenishmentOfMoneyItem cardInfo={isInfoCard} 
              // countPriceInfo={formatter.format(userInfo.balance.filter(el=>el.nameCash == e.nameCash)[0].price > -1 && userInfo.balance.filter(el=>el.nameCash == e.nameCash)[0])} 
              setCardInfo={setIsInfoCard} defaultPriceCount={financeData.filter(el=>el.currency == e.nameCash)[0].value} infoData={e} setActiveModal={setModal} activeModal={modal}/>
      )}
      <MyModal currencyAndCount={isCurrencyAndCount} changeCurrencyAndCount={setIsCurrencyAndCount} title={'Укажите сумму'} setVisible={setModal} visible={modal}/>
    </div>
  )
}

export default ReplenishmentOfMoney
