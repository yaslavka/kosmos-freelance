import React from 'react'
import { useTranslation } from 'react-i18next'

import contractOffer from '../documents/contract-offer.pdf'
import privacyPolicy from '../documents/privacy-policy.pdf'
import termsOfUse from '../documents/terms-of-use.pdf'
//import payeerLogo from '../../../scss/media/payeer-logo.8aa750cc.svg'
import AOS from 'aos'
import cl from './../../../scss/MainPage.module.css';

import Planet from './../../../scss/media/planet-1.gif'
AOS.init()
AOS.refresh()
function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className={cl.footer}>
      <div className={["container", cl.contF].join` `} >
        <div className={cl.wrapperFooter}>
        <div className={cl.logoWrap}>
            <span>KOSM</span>
            <span className={cl.logo}>
              <img alt={Planet} src={Planet}/>
            </span>
            <span>S</span>
          </div>
        <div className={cl.footerleft}>
        <div className={cl.footerBottom}>
          <a className="footer__contract-offer" download="Договор оферты" href={contractOffer}>
            {t('Договор оферты')}
          </a>
          <a
            className="footer__contract-offer"
            download={t('Политика конфендициальности')}
            href={privacyPolicy}
          >
            {t('Политика конфендициальности')}
          </a>
          <a
            className="footer__contract-offer"
            download={t('Правила использования')}
            href={termsOfUse}
          >
            {t('Правила использования')}
          </a>
          {/* <a
            className="footer__bottom-box"
            href="https://www.free-kassa.ru/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://www.free-kassa.ru/img/fk_btn/23.png" alt="" />
          </a> */}
          {/* <div className="footer__bottom-box payeer-logo">
            <img src={payeerLogo} alt="" />
          </div> */}
        </div>
        <div className={cl.footerSoc}>
          {/* <a
            className={cl.footerLinkBlock}
            href="https://t.me/kosmosmatrix"
            rel="noreferrer"
            target="_blank"
          >
            <span>tg&nbsp;chat -</span>
            <span className={[cl.icon, cl.tg].join` `}></span>
          </a> */}

          <a
            className={cl.footerLinkBlock}
            href="https://t.me/kosmosmatrix"
            rel="noreferrer"
            target="_blank"
          >

            {/* <span>tg&nbsp;media -</span> */}
            <span className={[cl.icon, cl.tg].join` `}/>
          </a>

          <a
            className={cl.footerLinkBlock}
            href="https://t.me/kosmosmatrix"
            rel="noreferrer"
            target="_blank"
          >

            {/* <span>inst -</span> */}
            <span className={[cl.icon, cl.inst].join` `}/>
          </a>

          <a
            className={cl.footerLinkBlock}
            href="https://t.me/kosmosmatrix"
            rel="noreferrer"
            target="_blank"
          >

            {/* <span>youtube -</span> */}
            <span className={[cl.icon, cl.yb].join` `}/>
          </a>

          <a className={cl.footerLinkBlock} href="/" rel="noreferrer" target="_blank">

            {/* <span>vk -</span> */}
            <span className={[cl.icon, cl.vk].join` `}/>
          </a>
        </div>
        </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
