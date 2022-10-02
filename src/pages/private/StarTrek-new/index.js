import React, { useEffect } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import Timer, { zeroPad } from 'react-countdown'
import confirm from 'reactstrap-confirm'
import { Link } from 'react-router-dom'

import r from '../../../constants/routes.constants'
import * as actions from '../../../actions/milkyway.actions'
//import previewText from '../../../scss/media/startrek-logo.f688a0a8.svg'
import NavBar from '../../../components/layout/Navbar'
//import UserInfo from '../../../components/UserInfo'
import Button from '../../../components/Button'

import Statisticsmilkyway from './Statistics'
//import Documents from './Documents'
import Summarymilkyway from './Summary'
import { Spinner } from 'react-bootstrap'
import MyViewElements from '../../../components/MyViewElements/MyViewElement'

function Milkyway() {
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
      title: 'Приобретение планеты',
      message: 'Вы хотите приобрести место в очереди?',
      confirmText: 'Подтвердить',
      confirmColor: 'danger',
      cancelText: 'Отмена',
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
          <div className="root-page-title color-milkey">Млечный путь v2.0</div>
          }/>

          <Spinner isLoading={isLoading}>
          <MyViewElements element={
            <Summarymilkyway />
          }/>

            <Statisticsmilkyway />
            <div className="text-center">
              <Link className='link-blue' to={r.milkywayPlanets} >
                Мои места
              </Link>
              {/* TODO: delete all functions */}
              <Button

                className='link-blue'
                loading={isBuyLoading}
                disabled={Boolean(timer) || isBuyLoading}
                onClick={handleButtonClick}
              >
                {timer ? (
                  <Timer
                    date={timer}
                    renderer={renderer}
                    onComplete={() => {
                      dispatch(actions.milkywayResetTimer())
                    }}
                  />
                ) : (
                  `${
                    statistics?.myPlanet > 0
                      ? 'Приобрести место'
                      : 'Активировать Млечный путь v2.0'.toLocaleUpperCase()
                  }`
                )}
              </Button>
            </div>
            <div className="text-center">
              <Link className='link-blue' to={r.milkywayStatistic}>
                Статистика
              </Link>
            </div>


          </Spinner>
        </Col>
      </Row>
    </Container>
  )
}

export default Milkyway
