import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import routes from '../../../constants/routes.constants'
import user from '../../../scss/media/acc.svg'
import news from '../../../scss/media/news.svg'
import question from '../../../scss/media/about-m.svg'
import money from '../../../scss/media/briefcase.svg'
import team from '../../../scss/media/seo.svg'
import car from '../../../scss/media/suprestar.424178cf.svg'
import logo from '../../../scss/media/business.svg'
import superstar from '../../../scss/media/suprestar.424178cf.svg'
import luckyStar from '../../../scss/media/stonks.svg'
import starsUp from '../../../scss/media/marketing.svg'
import bbb from '../../../scss/media/gamepad.svg'

// import megaphone from 'static/icons/megaphone.svg';
import cap from '../../../scss/media/bot.svg'
import chat from '../../../scss/media/chat-met.svg'
// import chat from 'static/icons/chat.svg';
// import reviews from 'static/icons/reviews.svg';
import gear from '../../../scss/media/settings-met.svg'
import leader from '../../../scss/media/mentor-blue.svg'

const navbarLinks = [
  {
    label: 'Наставник',
    route: routes.leader,
    isDisabled: false,
    icon: leader,
  },
  {
    label: 'Кабинет',
    route: routes.dashboard,
    isDisabled: false,
    icon: user,
  },
  {
    label: 'Кошелек',
    route: routes.finances,
    isDisabled: false,
    icon: money,
  },
  {
    label: 'Новости',
    route: routes.news,
    isDisabled: false,
    icon: news,
  },
  {
    label: 'Пегас mini',
    route: routes.matrixmini,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Пегас uno',
    route: routes.matrixs,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Пегас',
    route: routes.tables,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Аида',
    route: routes.premiumStars,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Андромеда',
    route: routes.superStars,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Млечный путь',
    route: routes.starTrek,
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
    label: 'Investbox',
    route: routes.starsUp,
    isDisabled: false,
    icon: luckyStar,
  },
  {
    label: 'Игры',
    route: routes.casino,
    isDisabled: false,
    classImg: styles.gamepad,
    icon: bbb,
  },
  {
    label: 'О нас',
    route: routes.aboutUs,
    isDisabled: false,
    classImg: styles.questImg,
    icon: question,
  },
  {
    label: 'Рефераллы',
    route: routes.team,
    isDisabled: false,
    icon: team,
  },
  {
    label: 'Продвижение',
    route: routes.smm,
    isDisabled: false,
    icon: team,
  },
  // {
  //   label: 'Промо',
  //   route: routes.promo,
  //   isDisabled: true,
  //   icon: megaphone,
  // },
  {
    label: 'Торговый бот',
    route: routes.education,
    isDisabled: false,
    icon: cap,
  },
  {
    label: 'Чат участников',
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
    label: 'Настройки',
    route: routes.settings,
    isDisabled: false,
    icon: gear,
  },
]



function NavBar() {
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
          <img className={[styles.icon, classImg].join` `} src={icon} alt="" /> <span className=''>{label.replace(/ /g, "\u00a0")}</span>
        </NavLink>
      ))}
      <span className={isOpen ? [styles.bottonArrow, styles.bottomActive].join` ` : styles.bottonArrow} ></span>
    </nav>
    </div>
    
  )
}

export default NavBar
