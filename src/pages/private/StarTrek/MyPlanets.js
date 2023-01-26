import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { zeroPad } from 'react-countdown'
import { Row, Col, Container } from 'reactstrap'
import confirm from 'reactstrap-confirm'
import isEmpty from 'lodash-es/isEmpty'
import { declOfNum } from '../../../utils'
import dayjs from 'dayjs'
import * as actions from '../../../actions/startrek.actions'
import NavBar from '../../../components/layout/Navbar'
import Button from '../../../components/Button'
import Icon from '../../../components/Icon'
import {useTranslation} from "react-i18next";

function MyPlanets() {
  const { t } = useTranslation('common');
  const history = useHistory()
  const dispatch = useDispatch()
  const list = useSelector((state) => state.startrek.list)
  const selected = useSelector((state) => state.startrek.selected)
  const isLoading = useSelector((state) => state.startrek.loadings.list)
  const isUpdateLoading = useSelector((state) => state.startrek.loadings.update)




  useEffect(() => {
    dispatch(actions.startrekPlanets())
  }, [dispatch])

  const handleOnPlanetsUpdate = async () => {
    const planetLength = selected.length
    let result = await confirm({
      title:`${t('private.StarTrek.MyPlanets.result.title')}`,
      message: `${t('private.StarTrek.MyPlanets.result.message')} ${planetLength} ${declOfNum(planetLength, [
        `${t('private.StarTrek.MyPlanets.result.variant1')}`,
        `${t('private.StarTrek.MyPlanets.result.variant2')}`,
        `${t('private.StarTrek.MyPlanets.result.variant3')}`,
      ])}, ${t('private.StarTrek.MyPlanets.result.variant4')} ${planetLength * 2160} RUB?`,
      confirmText: `${t('private.StarTrek.MyPlanets.result.confirmText')}`,
      confirmColor: 'danger',
      cancelText: `${t('private.StarTrek.MyPlanets.result.cancelText')}`,
      cancelColor: 'link text-muted',
    })

    if (result) {
      dispatch(actions.startrekPlanetsUpdate())
    }
  }

  const handleSelectAllOnPage = () => {
    dispatch(actions.toggleAllPlanetOnPage())
  }


  useEffect(()=>{
    const data = ''
    console.log(data)
  },[])


  const [solaryList, setSolaryList]  = useState([{count: 0, namePlanet: 'Mercury', classItem:['mercury-line-1'], classPlanet: ['mercury active-planet'], classDescr: ['mercury-descr planet-descr'], descr: 'mercury'},
  {count: 1, namePlanet: 'Venus', classItem:['venus-line-1'], classPlanet: ['venus'], classDescr: ['venus-descr planet-descr'], descr: 'venus'},
  {count: 2, namePlanet: 'Earth', classItem:['earth-line-1'], classPlanet: ['earth'], classDescr: ['earth-descr planet-descr'], descr: 'earth'},
  {count: 3, namePlanet: 'Mars', classItem:['mars-line-1'], classPlanet: ['mars'], classDescr: ['mars-descr planet-descr'], descr: 'mars'},
  {count: 4, namePlanet: 'Jupiter', classItem:['jupiter-line-1'], classPlanet: ['jupiter'], classDescr: ['jupiter-descr planet-descr'], descr: 'jupiter'},
  {count: 5, namePlanet: 'Saturn', classItem:['saturn-line-1'], classPlanet: ['saturn'], classDescr: ['saturn-descr planet-descr'], descr: 'saturn'},
  {count: 6, namePlanet: 'Urans', classItem:['urans-line-1'], classPlanet: ['urans'], classDescr: ['urans-descr planet-descr'], descr: 'urans'},
  {count: 7, namePlanet: 'Neptune', classItem:['neptune-line-1'], classPlanet: ['neptune'], classDescr: ['neptune-descr planet-descr'], descr: 'neptune'}
])


  const [activePlanet, setActivePlanet] = useState(0)

  const [infoPlanet, setInfoPlanet] = useState({namePlanet: 'Mercury', frozen: '', comets: '', dateCreate: '', sum: '', id: ''})
  const [viewSolary, setViewSolary] = useState('')
  useEffect(()=>{
    setViewSolary(solaryList.map((el,i)=>list[i]!==undefined?el:'').filter(e=>e))

      if(list[activePlanet]!==undefined) {
        setInfoPlanet({...infoPlanet, id: list[activePlanet].id, level: list[activePlanet].level, dateCreate: list[activePlanet].createDate, sum: list[activePlanet].sum})
      }

  },[list, activePlanet])
  console.log(list)
  let handleOnSetPlanetForUpdate = () => dispatch(actions.setPlanetForUpdate(infoPlanet.id))





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
            <h1 className="root-page-title color-solar">{t('private.StarTrek.MyPlanets.title')}</h1>
            <div className="solar-list-info">
              <ul className="list-info-s">
                <li className='item-info-s'>
                  {t('private.StarTrek.MyPlanets.namePlanet')} {infoPlanet.namePlanet}
                </li>
                <li className='item-info-s'>
                  №: {infoPlanet.id}
                </li>
                <li className='item-info-s'>
                  {t('private.StarTrek.MyPlanets.dateCreate')} {infoPlanet.dateCreate}
                </li>
                <li className='item-info-s'>
                  {t('private.StarTrek.MyPlanets.level')} {infoPlanet.level}
                </li>
              </ul>
            </div>
          </div>
          {!isEmpty(list) ?
            <div className='solry-all-block'>
              <div className='solary-card'>
                <div className='solary-block'>
                  <div className="wrapper-solary">
                    <div className="sun"/>
                    {viewSolary.map((e)=>
                      <div className={e.classItem.join` `}><div className={e.classPlanet.join` `}><p className={e.classDescr.join` `}>{}</p></div></div>
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
                      {selected.length !== list.length ? `${t('private.StarTrek.MyPlanets.selected')}` : `${t('private.StarTrek.MyPlanets.space')}`} {t('private.StarTrek.MyPlanets.all')}
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
                    {t('private.StarTrek.MyPlanets.button')}
                  </button>
                </div>
                }
              </div>
            </div>

            :
            <Col>
              <h4 className="text-center mb-4 mt-4">{t('private.StarTrek.MyPlanets.solar')}</h4>
            </Col>
          }

        </Col>

      </Row>

    </Container>
  )
}

export default MyPlanets
