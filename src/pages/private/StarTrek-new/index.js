import React, { useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import Timer, { zeroPad } from 'react-countdown'
import confirm from 'reactstrap-confirm'
import { Link } from 'react-router-dom'
import r from '../../../constants/routes.constants'
import * as actions from '../../../actions/milkyway.actions'
import NavBar from '../../../components/layout/Navbar'
import Button from '../../../components/Button'
import Statisticsmilkyway from './Statistics'
import Summarymilkyway from './Summary'
import { Spinner } from 'react-bootstrap'
import MyViewElements from '../../../components/MyViewElements/MyViewElement'
import {useTranslation} from "react-i18next";

function Milkyway() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const timer = useSelector((state) => state.milkyway.timer)
  const statistics = useSelector((state) => state.milkyway.statistics)
  const isLoading = useSelector((state) => state.milkyway.loadings.statistics)
  const isBuyLoading = useSelector((state) => state.milkyway.loadings.buy)

  useEffect(() => {
    dispatch(actions.milkywayStatistics())
    dispatch(actions.milkywayResetTimer())
  }, [dispatch])

  const handleButtonClick = async () => {
    let result = await confirm({
      title: `${t('private.StarTrek.result.title')}`,
      message: `${t('private.StarTrek.result.message')}`,
      confirmText: `${t('private.StarTrek.result.confirmText')}`,
      confirmColor: 'danger',
      cancelText: `${t('private.StarTrek.result.cancelText')}`,
      cancelColor: 'link text-muted',
    })

    if (result) {
      dispatch(actions.milkywayBuy())
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
          <MyViewElements element={
          <div className="root-page-title color-milkey">{t('private.StarTrek.title')} v2.0</div>
          }/>

          <Spinner isLoading={isLoading}>
          <MyViewElements element={
            <Summarymilkyway />
          }/>

            <Statisticsmilkyway />
            <div className="text-center">
              <Link className='link-blue' to={r.milkywayPlanets} >
                {t('private.StarTrek.link.starTrekPlanets')}
              </Link>
              {/* TODO: delete all functions */}
              {/*<Button*/}

              {/*  className='link-blue'*/}
              {/*  loading={isBuyLoading}*/}
              {/*  disabled={Boolean(timer) || isBuyLoading}*/}
              {/*  onClick={handleButtonClick}*/}
              {/*>*/}
              {/*  {timer ? (*/}
              {/*    <Timer*/}
              {/*      date={timer}*/}
              {/*      renderer={renderer}*/}
              {/*      onComplete={() => {*/}
              {/*        dispatch(actions.milkywayResetTimer())*/}
              {/*      }}*/}
              {/*    />*/}
              {/*  ) : (*/}
              {/*    `${*/}
              {/*      statistics?.myPlanet > 0*/}
              {/*        ? `${t('private.StarTrek.link.statistics')}`*/}
              {/*        : `${t('private.StarTrek.link.myPlanet')} v2.0`.toLocaleUpperCase()*/}
              {/*    }`*/}
              {/*  )}*/}
              {/*</Button>*/}
            </div>
            {/*<div className="text-center">*/}
            {/*  <Link className='link-blue' to={r.milkywayStatistic}>*/}
            {/*    {t('private.StarTrek.link.starTrekStatistic')}*/}
            {/*  </Link>*/}
            {/*</div>*/}


          </Spinner>
        </Col>
      </Row>
    </Container>
  )
}

export default Milkyway
