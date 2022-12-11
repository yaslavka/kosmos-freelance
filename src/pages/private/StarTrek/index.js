import React, { useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import Timer, { zeroPad } from 'react-countdown'
import confirm from 'reactstrap-confirm'
import { Link } from 'react-router-dom'
import r from '../../../constants/routes.constants'
import * as actions from '../../../actions/startrek.actions'
import NavBar from '../../../components/layout/Navbar'
import Button from '../../../components/Button'
import Statistics from './Statistics'
import Summary from './Summary'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'
import {useTranslation} from "react-i18next";

function StarTrek() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const timer = useSelector((state) => state.startrek.timer)
  const statistics = useSelector((state) => state.startrek.statistics)

  useEffect(() => {
    dispatch(actions.startrekStatistics())
    dispatch(actions.startrekResetTimer())
  }, [dispatch])

  const handleButtonClick = async () => {
    let result = await confirm({
      title:`${t('private.StarTrek.result.title')}`,
      message: `${t('private.StarTrek.result.message')}`,
      confirmText: `${t('private.StarTrek.result.confirmText')}`,
      confirmColor: 'danger',
      cancelText: `${t('private.StarTrek.result.cancelText')}`,
      cancelColor: 'link text-muted',
    })

    if (result) {
      dispatch(actions.startrekBuy())
    }
  }

  const renderer = ({ hours, minutes, seconds }) => (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  )

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <MyViewElement element={
          <div className="root-page-title color-milkey">{t('private.StarTrek.title')}</div>
          }/>

          <MyViewElement element={
            <Summary />
          }/>

            <Statistics />
            <div className="text-center">
              <Link className='link-blue' to={r.starTrekPlanets} >
                {t('private.StarTrek.link.starTrekPlanets')}
              </Link>
              {/* TODO: delete all functions */}
              <Button

                className='link-blue'
                onClick={handleButtonClick}
              >
                {timer ? (
                  <Timer
                    date={timer}
                    renderer={renderer}
                    onComplete={() => {
                      dispatch(actions.startrekResetTimer())
                    }}
                  />
                ) : (
                  `${
                    statistics?.myPlanet > 0
                      ?`${t('private.StarTrek.link.statistics')}`
                      :`${t('private.StarTrek.link.myPlanet')}`.toLocaleUpperCase()
                  }`
                )}
              </Button>
            </div>
            {/*<div className="text-center">*/}
            {/*  <Link className='link-blue' to={r.starTrekStatistic}>*/}
            {/*    {t('private.StarTrek.link.starTrekStatistic')}*/}
            {/*  </Link>*/}
            {/*</div>*/}
        </Col>
      </Row>
    </Container>
  )
}

export default StarTrek
