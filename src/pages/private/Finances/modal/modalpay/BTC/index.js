import React, {useRef} from 'react'
import cl from './MyModal.module.css'
import {useTranslation} from "react-i18next";
import {Button} from "reactstrap";
import MyViewElement from "../../../../../../components/MyViewElements/MyViewElements";
import {useSelector} from "react-redux";
import {api} from "../../../../../../api";
import {toast} from "react-toastify";
import QRCodes from "./Qrcode";

const CreatePayBTC =({btcmodel, setBtcmodel, title})=>{
  const userInfo = useSelector((state) => state.app.user)
  const { t } = useTranslation('common');
  const blockModalbtc = useRef('')
  const rootClassesbtc = [cl.modalBlock]
  const rootContentClassesbtc = [cl.modalContent]
  const handleSubmit = e => {
    e.preventDefault()
    api.createBTC().then().catch(() => {})
  }
  const copyBTCaddres = async () => {
    if (userInfo && `${userInfo.address.BTC}`) {
      navigator.clipboard.writeText(`${userInfo.address.BTC}`).then(() => {
        toast.info(`${t('private.finances.copiaddres')}`)
      })
    }
  }

  btcmodel && rootClassesbtc.push(cl.active) && rootContentClassesbtc.push(cl.activeContent)
  return(
    <>
      {userInfo && (
        <>
          <div ref={blockModalbtc} className={rootClassesbtc.join` `} onClick={(e)=>{e.preventDefault();setBtcmodel(false)}}>
            <div className={rootContentClassesbtc.join` `}>
              <div id="window_deposit" className={cl.modalForm} onClick={e=>e.stopPropagation()}>
                <h3 className={cl.modalTitle}>{title}</h3>
                <p className={cl.modalDescrs}>Статус кошелька: Онлайн (765225 блоков)</p>
                <p className={cl.modalDescrs}>Внимание!!! Если вы используете наш BTC адрес для майнинга BTC на пулах, пожалуйста, укажите минимальный размер вывода с пула: 0.001 btc или 0.01 btc</p>
                <div>
                  <p>Ваш адрес для пополнения (<i className="cn_addr">ADDR</i>)</p>
                  <input name="address" type="text" className={[cl.cn_addrs]} value={`${userInfo.address.BTC? userInfo.address.BTC :"Создайте Адрес"}`} onClick={copyBTCaddres} readOnly=""/>
                </div>
                <div className={cl.btnBlock}>
                  <QRCodes value={`${userInfo.address.BTC ? userInfo.address.BTC :"NEW ADDRESS"}`} />
                </div>
                <MyViewElement element={
                  <Button className="fin-btn" onClick={handleSubmit}>Получить новый Адрес</Button>
                }/>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default CreatePayBTC
