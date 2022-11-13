import React from 'react'
import { useTranslation } from 'react-i18next'
import contractOffer from '../documents/contract-offer.pdf'
import privacyPolicy from '../documents/privacy-policy.pdf'
import termsOfUse from '../documents/terms-of-use.pdf'
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
          <a className="footer__contract-offer" download={t('mainPage.footer.links.contractOffer')} href={contractOffer}>
            {t('mainPage.footer.links.contractOffer')}
          </a>
          <a
            className="footer__contract-offer"
            download={t('mainPage.footer.links.privacyPolicy')}
            href={privacyPolicy}
          >
            {t('mainPage.footer.links.privacyPolicy')}
          </a>
          <a
            className="footer__contract-offer"
            download={t('mainPage.footer.links.termsOfUse')}
            href={termsOfUse}
          >
            {t('mainPage.footer.links.termsOfUse')}
          </a>
        </div>
        <div className={cl.footerSoc}>
          <a
            className={cl.footerLinkBlock}
            href="https://t.me/kosmosmatrix"
            rel="noreferrer"
            target="_blank"
          >
            <span className={[cl.icon, cl.tg].join` `}/>
          </a>
          <a
            className={cl.footerLinkBlock}
            href="https://t.me/kosmosmatrix"
            rel="noreferrer"
            target="_blank"
          >
            <span className={[cl.icon, cl.yb].join` `}/>
          </a>

          <a className={cl.footerLinkBlock} href="/" rel="noreferrer" target="_blank">
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
