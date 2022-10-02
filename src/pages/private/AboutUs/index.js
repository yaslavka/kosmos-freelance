import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './AboutUs.module.scss'

import NavBar from '../../../components/layout/Navbar'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'
//import UserInfo from '../../../components/UserInfo'

export default function AboutUs() {
  return (
    <div className={styles.AboutUs}>
      <Container>
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <div className={styles.userInfo}></div>
            <div className="d-none d-xl-block">
              <NavBar />
            </div>
          </Col>
          <Col xs={12} className="d-xl-none">
            <h1 className={styles.mainTitle}>О нас</h1>
          </Col>
          <Col xs={12} xl={9}>
          <MyViewElement element={
            <p className={styles.mainDescription}>
              <span>Космос</span> - Вселенная возможностей.
            </p>
             }/>
            <Row>
          <MyViewElement element={
             
                <p className={styles.text}>
                  Комбинированная платформа Космос-является доступным инструментом для заработка в
                  сети, как лидера, так и новичка. Здесь собраны почти все виды заработка в сети и
                  это является уникальной особенностью нашей платформы, а также у нас неограниченные
                  возможности партнерской программы. Благодаря такому подходу, каждый партнер
                  платформы Космос может выбрать для себя наиболее выгодный способ заработка и
                  самостоятельно создать для себя, а также своей команды комфортные условия работы и
                  задать нужный темп развития.
                </p>
             }/>
            
            </Row>
            <Row className={styles.buildUpWrapper}>
          <MyViewElement element={
             
                <p className={styles.text}>
                  Особенность комбинированной платформы Космос{' '}
                  <span>множество партнерских программ, объединенных в единую платформу,</span>
                  что позволяет обеспечить максимальную прибыль.
                </p>
             }/>
              
            </Row>
            <Row className={styles.educationWrapper}>
          <MyViewElement element={
           
                <p className={styles.text}>
                  Одним из основных продуктов нашей платформы Космос является уникальный торговый
                  бот, который позволит Вам зарабатывать в разы больше на полном пассиве,
                  прикладывая минимум усилий.
                </p>
             }/>
            
            </Row>
            <MyViewElement element={
         
              <div className={styles.finalText}>
                <p className={styles.text}>
                  Здесь сможет зарабатывать каждый, не важно умеешь ли ты приглашать, лидер ты или
                  новичок, благодаря комбинированной платформе Космос, с неограниченным партнерским
                  доходом.
                </p>
              </div>
             }/>
           
          </Col>
        </Row>
      </Container>
    </div>
  )
}
