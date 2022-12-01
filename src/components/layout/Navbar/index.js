import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import routes from '../../../constants/routes.constants'
import user from '../../../scss/media/acc.svg'
import news from '../../../scss/media/news.svg'
import question from '../../../scss/media/about-m.svg'
import money from '../../../scss/media/briefcase.svg'
import team from '../../../scss/media/seo.svg'
import logo from '../../../scss/media/business.svg'
import luckyStar from '../../../scss/media/stonks.svg'
import starsUp from '../../../scss/media/marketing.svg'
import bbb from '../../../scss/media/gamepad.svg'
import cap from '../../../scss/media/bot.svg'
import chat from '../../../scss/media/chat-met.svg'
import gear from '../../../scss/media/settings-met.svg'
import leader from '../../../scss/media/mentor-blue.svg'
import {useTranslation} from "react-i18next";

const navbarLinks = [
  {
    label: 'leader',
    route: routes.leader,
    isDisabled: false,
    icon: leader,
  },
  {
    label: 'dashboard',
    route: routes.dashboard,
    isDisabled: false,
    icon: user,
  },
  {
    label: 'finances',
    route: routes.finances,
    isDisabled: false,
    icon: money,
  },
  {
    label: 'news',
    route: routes.news,
    isDisabled: false,
    icon: news,
  },
  {
    label: 'matrixmini',
    route: routes.matrixmini,
    isDisabled: true,
    icon: logo,
  },
  {
    label: 'matrixs',
    route: routes.matrixs,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'tables',
    route: routes.tables,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'premiumStars',
    route: routes.premiumStars,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'superStars',
    route: routes.superStars,
    isDisabled: true,
    icon: logo,
  },
  {
    label: 'starTrek',
    route: routes.starTrek,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'milkyway',
    route: routes.milkyway,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'exchange',
    route: routes.exchange,
    isDisabled: false,
    icon: starsUp ,
  },
  {
    label: 'starsUp',
    route: routes.starsUp,
    isDisabled: false,
    icon: luckyStar,
  },
  {
    label: 'casino',
    route: routes.casino,
    isDisabled: false,
    classImg: styles.gamepad,
    icon: bbb,
  },
  {
    label: 'aboutUs',
    route: routes.aboutUs,
    isDisabled: false,
    classImg: styles.questImg,
    icon: question,
  },
  {
    label: 'team',
    route: routes.team,
    isDisabled: false,
    icon: team,
  },
  // {
  //   label: 'smm',
  //   route: routes.smm,
  //   isDisabled: false,
  //   icon: team,
  // },
  // {
  //   label: 'Промо',
  //   route: routes.promo,
  //   isDisabled: true,
  //   icon: megaphone,
  // },
  {
    label: 'education',
    route: routes.education,
    isDisabled: true,
    icon: cap,
  },
  {
    label: 'chat',
    isDisabled: false,
    route: routes.chat,
    icon: chat,
  },
  // {
  //   label: 'Отзывы',
  //   route: routes.reviews,
  //   isDisabled: true,
  //   icon: reviews,
  // },
  {
    label: 'settings',
    route: routes.settings,
    isDisabled: false,
    icon: gear,
  },
]



function NavBar() {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={isOpen ? [styles.nav, styles.navActive].join` ` : styles.nav}>
      <nav className={styles.NavBar} onClick={e=>setIsOpen(!isOpen)}>
      {navbarLinks.map(({ label, route, icon, isDisabled, classImg }) => (
        <NavLink
          key={label}
          to={route}
          className={`${styles.navLink} ${isDisabled ? styles.disabled : ''}`}
          activeClassName={styles.active}
          onClick={()=>document.documentElement.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <img className={[styles.icon, classImg].join` `} src={icon} alt="" />
          <span className=''>{t(`private.navlinks.${label.replace(/ /g, "\u00a0")}`)}</span>
        </NavLink>
      ))}
      <span className={isOpen ? [styles.bottonArrow, styles.bottomActive].join` ` : styles.bottonArrow} />
    </nav>
    </div>

  )
}

export default NavBar
