import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './AboutUs.module.scss'
import NavBar from '../../../components/layout/Navbar'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'
import {useTranslation} from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation('common');
  return (
    <div className={styles.AboutUs}>
      <Container>
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <div className={styles.userInfo}/>
            <div className="d-none d-xl-block">
              <NavBar />
            </div>
          </Col>
          <Col xs={12} className="d-xl-none">
            <h1 className={styles.mainTitle}>{t('private.AboutUs.title')}</h1>
          </Col>
          <Col xs={12} xl={9}>
          <MyViewElement element={
            <p className={styles.mainDescription}>
              <span>{t('private.AboutUs.title1')}</span> {t('private.AboutUs.title2')}
            </p>
             }/>
            <Row>
          <MyViewElement element={
            <p className={styles.text}>
                  {t('private.AboutUs.text')}
                </p>
             }/>

            </Row>
            <Row className={styles.buildUpWrapper}>
          <MyViewElement element={

                <p className={styles.text}>
                  {t('private.AboutUs.text1')}{' '}
                  <span>{t('private.AboutUs.text2')}</span>
                  {t('private.AboutUs.text3')}
                </p>
             }/>

            </Row>
            <Row className={styles.educationWrapper}>
          <MyViewElement element={

                <p className={styles.text}>
                  {t('private.AboutUs.text4')}
                </p>
             }/>

            </Row>
            <MyViewElement element={

              <div className={styles.finalText}>
                <p className={styles.text}>
                  {t('private.AboutUs.text5')}
                </p>
              </div>
             }/>

          </Col>
        </Row>
      </Container>
    </div>
  )
}
