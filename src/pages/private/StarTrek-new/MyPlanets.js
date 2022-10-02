import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { zeroPad } from 'react-countdown'
import { Row, Col, Container } from 'reactstrap'
import confirm from 'reactstrap-confirm'
import isEmpty from 'lodash-es/isEmpty'
import { declOfNum } from '../../../utils'
import dayjs from 'dayjs'
import * as actions from '../../../actions/milkyway.actions'
import NavBar from '../../../components/layout/Navbar'
import Button from '../../../components/Button'
import Icon from '../../../components/Icon'




function MyPlanetsmilkyway() {
  const history = useHistory()
  const dispatch = useDispatch()
  const list = useSelector((state) => state.milkyway.list)
  const selected = useSelector((state) => state.milkyway.selected)
  const isLoading = useSelector((state) => state.milkyway.loadings.list)
  const isUpdateLoading = useSelector((state) => state.milkyway.loadings.update)
  // const user = useSelector(state => state.app.user);
  const start = dayjs().tz('Europe/Minsk').startOf('date')
  const end = start.add(10, 'hour')



  const isDisable = useMemo(() => {
    return dayjs().isBetween(start, end)
  }, [start, end])

  useEffect(() => {
    dispatch(actions.milkywayPlanets())
  }, [dispatch])

  const handleOnChangePage = useCallback(
    (page) => {
      dispatch(actions.setMilkywayPlanetsPage(page))
    },
    [dispatch],
  )

  const handleOnPlanetsUpdate = async () => {
    const planetLength = selected.length
    let result = await confirm({
      title: 'Продление мест',
      message: `Вы хотите продлить ${planetLength} ${declOfNum(planetLength, [
        'место',
        'места',
        'мест',
      ])}, на сумму ${planetLength * 2500} RUB`,
      confirmText: 'Подтвердить',
      confirmColor: 'danger',
      cancelText: 'Отмена',
      cancelColor: 'link text-muted',
    })

    if (result) {
      dispatch(actions.milkywayPlanetsUpdate())
    }
  }

  const handleSelectAllOnPage = () => {
    dispatch(actions.toggleAllPlanetmilkywayOnPage())
  }

  const rendererTimer = ({ hours, minutes, seconds }) => (
    <span>
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  )


  const [activePlanet, setActivePlanet] = useState(0)

  const [infoPlanet, setInfoPlanet] = useState({namePlanet: 'Mercury', frozen: '', comets: '', dateCreate: '', sum: '', id: ''})

  useEffect(()=>{
    if (list[activePlanet] !== undefined) {
      setInfoPlanet({...infoPlanet, id: list[activePlanet].id, level: list[activePlanet].level, dateCreate: list[activePlanet].dateCreate, sum: list[activePlanet].sum})
    }
  },[list, activePlanet])




  const [solaryList, setSolaryList]  = useState([{count: 0, namePlanet: 'Mercury', classItem:['mercury-line-1'], classPlanet: ['mercury active-planet'], classDescr: ['mercury-descr planet-descr'], descr: 'mercury'},
  {count: 1, namePlanet: 'Venus', classItem:['venus-line-1'], classPlanet: ['venus'], classDescr: ['venus-descr planet-descr'], descr: 'venus'},
  {count: 2, namePlanet: 'Earth', classItem:['earth-line-1'], classPlanet: ['earth'], classDescr: ['earth-descr planet-descr'], descr: 'earth'},
  {count: 3, namePlanet: 'Mars', classItem:['mars-line-1'], classPlanet: ['mars'], classDescr: ['mars-descr planet-descr'], descr: 'mars'},
  {count: 4, namePlanet: 'Jupiter', classItem:['jupiter-line-1'], classPlanet: ['jupiter'], classDescr: ['jupiter-descr planet-descr'], descr: 'jupiter'},
  {count: 5, namePlanet: 'Saturn', classItem:['saturn-line-1'], classPlanet: ['saturn'], classDescr: ['saturn-descr planet-descr'], descr: 'saturn'},
  {count: 6, namePlanet: 'Urans', classItem:['urans-line-1'], classPlanet: ['urans'], classDescr: ['urans-descr planet-descr'], descr: 'urans'},
  {count: 7, namePlanet: 'Neptune', classItem:['neptune-line-1'], classPlanet: ['neptune'], classDescr: ['neptune-descr planet-descr'], descr: 'neptune'}
  ])

  let viewSolary = solaryList.filter((el,i)=>list[i]!==undefined)
  console.log(list)


  useMemo(()=>{
    if (list[activePlanet] !== undefined) {
      setInfoPlanet({...infoPlanet, namePlanet: viewSolary[activePlanet].namePlanet , frozen: !list[activePlanet].frozen ? 'Откл':'Вкл', comets: list[activePlanet].comets, dateCreate: list[activePlanet].dateCreate, sum: list[activePlanet].sum, id: list[activePlanet].id})
    }
  },[list, activePlanet])

  let handleOnSetPlanetForUpdate = () => dispatch(actions.setMilkywayForUpdate(infoPlanet.id))





  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={8}>
          <div className="root-page-header">
            <div className="root-page-header__left">
              <Button
                className="root-page-header__back"
                onClick={() => history.goBack()}
                color="link"
                size="lg"
              >
                <Icon iconName="back" />
              </Button>
            </div>
            <h1 className="root-page-title color-solar">Моя система</h1>
            <div className="solar-list-info">
              <ul className="list-info-s">
                <li className='item-info-s'>
                  Имя планеты: {infoPlanet.namePlanet}
                </li>
                <li className='item-info-s'>
                  Дата создания: {infoPlanet.dateCreate}
                </li>
                <li className='item-info-s'>
                  №: {infoPlanet.id}
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="text-center">
            <h3>
              Авто-продление планет{' '}
              <strong>{user?.autoRefill ? 'включено' : 'выключено'}</strong>
            </h3>
            <Link to={r.settings}>изменить</Link>
          </div> */}
          {/* <Spinner isLoading={isLoading}>
            <Row>
              {!isEmpty(list) ? (
                list.map((planet) => (
                  <Col key={planet.id} lg={6}>
                    <MyPlanetsElement planet={planet} />
                  </Col>
                ))
              ) : (
                <Col>
                  <h4 className="text-center mb-4 mt-4">У вас нет планет</h4>
                </Col>
              )}
            </Row>
            {!isEmpty(list) && !isLoading && (
              <ReactPaginate
                forcePage={page}
                marginPagesDisplayed={1}
                activeClassName="active"
                pageCount={Math.ceil(total / limit)}

                onPageChange={(props) => handleOnChangePage(props.selected)}
                containerClassName="pagination"
                previousLabel={<img src={arrowLeft} className="arrowLeft" alt="Arrow left" />}
                nextLabel={<img src={arrowRight} className="arrowRight" alt="Arrow right" />}
              />
            )}
          </Spinner> */}
          {/* <div className="text-center mt-5 mb-5">
            {!isEmpty(selected) &&
              (isDisable && end ? (
                <div className="mb-5">
                  <p>
                    В данный момент осуществляется запуск комет, <br /> продление баланса комет
                    будет доступно с 10:00 по мск
                  </p>
                  <div>
                    Осталось: <Timer date={end.format()} renderer={rendererTimer} />
                  </div>
                </div>
              ) : (
                <Button
                  color="primary"
                  onClick={handleOnPlanetsUpdate}
                  disabled={isUpdateLoading}
                  loading={isUpdateLoading}
                >
                  Продлить выбранные
                </Button>
              ))}
            {!isLoading && (
              <div className="mt-3">
                <Button color="primary" onClick={handleSelectAllOnPage}>
                  {selected.length !== list.length ? 'Выбрать' : 'Убрать'} все
                </Button>
              </div>  list
            )}
          </div> */}

              {!isEmpty(list) ?
              <div className='solry-all-block'>
                 <div className='solary-card'>
                    <div className='solary-block'>
                      <div className="wrapper-solary">
                      <div className="sun" >

                      </div>

                      {viewSolary.map((e,i)=>
                        <div className={e.classItem.join` `}><div className={e.classPlanet.join` `}><p className={e.classDescr.join` `}>{list[i].values}</p></div></div>
                        )}
                    </div>
                    </div>
                  </div>
                  <div className="planets-block">
                    <ul className="planets-list" onClick={handleOnSetPlanetForUpdate}>
                    {viewSolary.map(e=><li className='planet-btn-item'><button className={'planet-btn'} id={e.count} onClick={e=>{setActivePlanet(e.target.id)}}>{e.namePlanet}</button></li>)}
                    </ul>
                    {!isLoading && (
                      <div className="mt-3 btn-clear-block">
                        <btn className="btn-clear-space" onClick={handleSelectAllOnPage}>
                          {selected.length !== list.length ? 'Выбрать' : 'Убрать'} все
                        </btn>
                      </div>
                    )}
                    {!isEmpty(selected) &&
                    <div className='update-planet-block'>
                             <button
                              onClick={handleOnPlanetsUpdate}
                              disabled={isUpdateLoading}
                              loading={isUpdateLoading}

                              className={'btn-clear-space'}
                            >
                              Продлить выбранные
                            </button>
                        </div>
                    }
                  </div>
              </div>

               :
                <Col>
                  <h4 className="text-center mb-4 mt-4">У вас нет планет</h4>
                </Col>
              }

        </Col>

      </Row>

    </Container>
  )
}

export default MyPlanetsmilkyway
