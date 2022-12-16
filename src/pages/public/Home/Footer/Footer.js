import React from 'react'
import { useTranslation } from 'react-i18next'
import contractOffer from '../documents/contract-offer.pdf'
import AOS from 'aos'


import Planet from './../../../../assets/images/planet-1.gif'
AOS.init()
AOS.refresh()
function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className={'footer'}>
      <div className={["container", 'contF'].join` `} >
        <div className={'wrapperFooter'}>
        <div className={'logoWrap'}>
            <span>KOSM</span>
            <span className={'logo'}>
              <img alt={Planet} src={Planet}/>
            </span>
            <span>S</span>
          </div>
        <div className={'footerleft'}>
        <div className={'footerBottom'}>
          <a className="footer__contract-offer" download={t('mainPage.footer.links.contractOffer')} href={contractOffer}>
            {t('mainPage.footer.links.contractOffer')}
          </a>
          <a

          >
            ИП Алферова Е +79064489361
          </a>
          <a

          >

            yelena.alferova.2001@bk.ru
          </a>
        </div>
        <div className={'footerSoc'}>
          <a
            className={'footerLinkBlock'}
            href="https://t.me/kosmosmatrix"
            rel="noreferrer"
            target="_blank"
          >
            <span className={['icon', 'tg'].join` `}/>
          </a>
          <a
            className={'footerLinkBlock'}
            href="https://t.me/kosmosmatrix"
            rel="noreferrer"
            target="_blank"
          >
            <span className={['icon', 'yb'].join` `}/>
          </a>

          <a className={'footerLinkBlock'} href="/" rel="noreferrer" target="_blank">
            <span className={['icon', 'vk'].join` `}/>
          </a>
        </div>
        </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
