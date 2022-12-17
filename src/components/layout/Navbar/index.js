import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import routes from '../../../constants/routes.constants'
import user from '../../../assets/images/icons/acc.svg'
import news from '../../../assets/images/icons/news.svg'
import question from '../../../assets/images/icons/about-m.svg'
import money from '../../../assets/images/icons/briefcase.svg'
import team from '../../../assets/images/icons/seo.svg'
import logo from '../../../assets/images/icons/business.svg'
// import luckyStar from '../../../assets/images/icons/stonks.svg'
// import starsUp from '../../../assets/images/icons/marketing.svg'
// import bbb from '../../../assets/images/icons/gamepad.svg'
import gear from '../../../assets/images/icons/settings-met.svg'
import leader from '../../../assets/images/icons/mentor-blue.svg'
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
    label: 'tables',
    route: routes.tables,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'matrixs',
    route: routes.matrixs,
    isDisabled: false,
    icon: logo,
  },
  // {
  //   label: 'matrixmini',
  //   route: routes.matrixmini,
  //   isDisabled: false,
  //   icon: logo,
  // },
  // {
  //   label: 'premiumStars',
  //   route: routes.premiumStars,
  //   isDisabled: false,
  //   icon: logo,
  // },
  // {
  //   label: 'superStars',
  //   route: routes.superStars,
  //   isDisabled: false,
  //   icon: logo,
  // },
  // {
  //   label: 'starTrek',
  //   route: routes.starTrek,
  //   isDisabled: false,
  //   icon: logo,
  // },
  // {
  //   label: 'milkyway',
  //   route: routes.milkyway,
  //   isDisabled: false,
  //   icon: logo,
  // },
  // {
  //   label: 'exchange',
  //   route: routes.exchange,
  //   isDisabled: false,
  //   icon: starsUp ,
  // },
  // {
  //   label: 'starsUp',
  //   route: routes.starsUp,
  //   isDisabled: false,
  //   icon: luckyStar,
  // },
  // {
  //   label: 'casino',
  //   route: routes.casino,
  //   isDisabled: false,
  //   classImg: styles.gamepad,
  //   icon: bbb,
  // },
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
