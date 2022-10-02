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
  console.log(isInfoCard)
  useMemo(()=>{
    if(isCurrencyAndCount.count) {
      submitCreatePayeerPayForm(isCurrencyAndCount.count, isCurrencyAndCount.currency, isInfoCard.currency)
    }
  },[isCurrencyAndCount])

  const infoData = [{nameCash: 'usd', sign: dollarImg,count: financeData.find(e=>e.currency === 'usd').value , classes: cl.dollarItem, roubleCount: financeData.find(e=>e.currency === 'usd').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'rub', sign: roubleImg,count: financeData.find(e=>e.currency === 'rub').value , classes: cl.rubItem, roubleCount: financeData.find(e=>e.currency === 'rub').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'eur', sign: euroImg,count:financeData.find(e=>e.currency === 'eur').value, classes: cl.euroItem, roubleCount: financeData.find(e=>e.currency === 'eur').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'btc', sign: btcImg,count: financeData.find(e=>e.currency === 'btc').value , classes: cl.btcItem, roubleCount: financeData.find(e=>e.currency === 'btc').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'usdt', sign: usdtImg,count:financeData.find(e=>e.currency === 'usdt').value, classes: cl.usdtItem, roubleCount: financeData.find(e=>e.currency === 'usdt').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'eth', sign: ethImg,count:financeData.find(e=>e.currency === 'eth').value , classes: cl.ethItem, roubleCount: financeData.find(e=>e.currency === 'eth').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'bch', sign: btcImg,count:financeData.find(e=>e.currency === 'bch').value , classes: cl.bchItem, roubleCount: financeData.find(e=>e.currency === 'bch').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'ltc', sign: ltcImg,count:financeData.find(e=>e.currency === 'ltc').value , classes: cl.ltcItem, roubleCount: financeData.find(e=>e.currency === 'ltc').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'dash', sign: dogeImg,count: financeData.find(e=>e.currency === 'dash').value , classes: cl.dashItem, roubleCount: financeData.find(e=>e.currency === 'dash').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'xrp', sign:xrpImg,count: financeData.find(e=>e.currency === 'xrp').value, classes: cl.xrpItem, roubleCount: financeData.find(e=>e.currency === 'xrp').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'doge', sign: dogeImg,count: financeData.find(e=>e.currency === 'doge').value  , classes: cl.dageItem, roubleCount: financeData.find(e=>e.currency === 'doge').ruble, urlOut: '', urlIn: ''},
  {nameCash: 'trx', sign: trxImg,count: financeData.find(e=>e.currency === 'trx').value , classes: cl.trxItem, roubleCount: financeData.find(e=>e.currency === 'trx').ruble, urlOut: '', urlIn: ''}]
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
        <ReplenishmentOfMoneyItem cardInfo={isInfoCard} setCardInfo={setIsInfoCard} infoData={e} setActiveModal={setModal} activeModal={modal}/>
      )}
      <MyModal currencyAndCount={isCurrencyAndCount} changeCurrencyAndCount={setIsCurrencyAndCount} title={'Укажите сумму'} setVisible={setModal} visible={modal}/>
    </div>
  )
}

export default ReplenishmentOfMoney
