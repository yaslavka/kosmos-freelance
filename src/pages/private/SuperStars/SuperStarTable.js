import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import styles from './SuperStars.module.scss'
import { api } from '../../../api'
import { matrixActions } from '../../../store/matrix/actions'
import * as AppActions from '../../../actions/app.actions'
import closeIcon from '../../../scss/media/close.ac2aaa1a.svg'
import isEmpty from 'lodash/isEmpty'
import routes from '../../../constants/routes.constants'

import * as actions from '../../../actions/superstar.actions'

import SearchSelect from '../../../components/SearchSelect'
import Button from '../../../components/OldButton'
import MatrixCell from './components/MatrixCell'
import AssignComets from './modals/AssignComets'
import CometsBuy from './modals/CometsBuyModal'
import BuyStatusModal from './modals/BuyStatus'
import BuyMatrixModal from './modals/BuyMatrix'
import QueueModal from './modals/Queue'
import SuperStarPagination from './SuperStarPagination'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'

// eslint-disable-next-line react/prop-types
function SuperStarTable({ location: { state = {}, pathname } }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [buyingStatus, setBuyingStatus] = useState({ type: '', message: '' })
  const [isFetching, setIsFetching] = useState(true)
  const [matrixTree, setMatrixTree] = useState([])
  const [visibleBuyModal, setVisibleBuyModal] = useState(false)
  const [visibleCometsBuyModal, setVisibleCometsBuyModal] = useState(false)
  const [searchUsers, setSearchUsers] = useState([])
  const [currentSearchValue, setCurrentSearchValue] = useState('')
  const [selectItems, setSelectItems] = useState(null)
  const [visibleBuyMatrixModal, setVisibleBuyMatrixModal] = useState(false)
  const matrixInfo = useSelector((state) => state.matrixReducer.matrixInfo)
  const matricesList = useSelector((state) => state.matrixReducer.matricesList)

  const currentId = useMemo(() => {
    let curr = null
    if (id) {
      curr = id
    } else {
      curr = matrixInfo ? matrixInfo.id : null
    }
    return Number(curr)
  }, [id, matrixInfo])

  const buyMatrix = () => {
    if (matrixInfo && matrixInfo.id) {
      setBuyingStatus({ type: 'pending', message: '' })
      api
        .ssBuyMatrix(Number(matrixInfo.id))
        .then(() => {
          setBuyingStatus({
            type: 'success',
            message: 'Оплата прошла успешно!',
          })
          setVisibleBuyMatrixModal(false)
          setVisibleBuyModal(true)
          setIsFetching(true)

          api
            .getUserInfo()
            .then((response) => {
              dispatch(AppActions.userInfoSuccess(response))
            })
            .catch(() => {})

          api
            .ssMatrixTypes()
            .then((response) => {
              const filter = response.items.find((x) => x.id === matrixInfo.id)
              if (filter) {
                dispatch(matrixActions.saveCurrentMatrix(filter))
              }
            })
            .catch(() => {})

          api
            .ssMatrixStructureByType(matrixInfo.id)
            .then((response) => {
              if (response.items) {
                setMatrixTree(response.items)
                setIsFetching(false)
              }
            })
            .catch()
        })
        .catch((err) => {
          setVisibleBuyMatrixModal(false)
          setBuyingStatus({ type: 'error', message: err.message })
          setVisibleBuyModal(true)
        })
    }
  }

  const showCometsBuyModal = () => {
    if (window.innerWidth < 1200) {
      document.body.style.overflow = 'hidden'
    }
    setVisibleCometsBuyModal(true)
  }

  const showBuyMatrixModal = () => {
    if (window.innerWidth < 1200) {
      document.body.style.overflow = 'hidden'
    }
    setVisibleBuyMatrixModal(true)
  }

  const closeBuyMatrixModal = () => {
    document.body.style.overflow = 'initial'
    setVisibleBuyMatrixModal(false)
    setIsFetching(true)
  }

  const closeCometsBuyModal = () => {
    document.body.style.overflow = 'initial'
    setVisibleCometsBuyModal(false)
    setIsFetching(true)
  }

  const closeBuyModal = () => {
    setVisibleBuyModal(false)
  }

  const redirectToUserMatrix = (matrixId) => {
    history.push(`/MATRIX3-table/${matrixId}`)
    setSearchUsers([])
  }

  useEffect(() => {
    if (matrixInfo && matrixInfo.isActive && isFetching) {
      api
        .ssMatrixStructureByType(matrixInfo.id)
        .then((response) => {
          if (response.items) {
            setMatrixTree(response.items)
            setIsFetching(false)
          }
        })
        .catch()
    } else if (id) {
      api
        .ssMatrixStructureById(id)
        .then((response) => {
          if (response.items) {
            setMatrixTree(response.items)
          }
        })
        .catch()
    }
  }, [id, matrixInfo, isFetching])

  useEffect(() => {
    if (matrixInfo) {
      api
        .ssNeighboringMatrices(matrixInfo.level)
        .then((response) => {
          if (Array.isArray(response.items) && response.items.length > 0) {
            const result = response.items.map(({ name, id }, i) => ({
              label: name,
              page: i + 1,
              value: id,
            }))
            setSelectItems(result)
          }
        })
        .catch(() => {})
    }
  }, [matrixInfo])

  useEffect(() => {
    if (!matricesList) {
      api
        .ssMatrixTypes()
        .then((response) => {
          if (Array.isArray(response.items)) {
            dispatch(matrixActions.saveUserMatrices(response.items))
          }
        })
        .catch(() => {})
    }
  }, [matricesList, dispatch])

  useEffect(() => {
    if (currentSearchValue.length > 2 && matrixInfo) {
      api
        .searchUserByLogin({
          user_name: currentSearchValue,
          matrix_type: matrixInfo.id,
        })
        .then((response) => {
          if (Array.isArray(response.items)) {
            setSearchUsers(
              response.items.map(({ user_name, matrix_id }) => ({
                label: user_name,
                value: matrix_id,
              })),
            )
          }
        })
        .catch(() => {})
    }
  }, [currentSearchValue, matrixInfo])

  const handleToggleQueueModal = useCallback(() => {
    dispatch(actions.toggleSuperStarQueueModal())
  }, [dispatch])

  const backRouteElement = useMemo(() => {
    let returnRoute = (
      <Link to={routes.superStars} className={styles.close}>
         <span className={styles.closeIT}>

        </span>
        <span className={styles.closeIB}>

        </span>
      </Link>
    )
    if (!isEmpty(state) && state.useBack) {
      returnRoute = (
        <div onClick={() => history.goBack()} className={styles.close}>
          <img src={closeIcon} alt="Close" />
        </div>
      )
    }
    return returnRoute
  }, [history, state])

  return (
    <div className={styles.Table}>
      <Container>
        <MyViewElement element={
        <div className={styles.header}>{matrixInfo && <h1 className={styles.title}>MATRIX3 LVL {matrixInfo.level}</h1>} {backRouteElement}</div>
        }/>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            
            {matrixInfo && matrixInfo.id && matrixInfo.isActive && matrixInfo.level <= 3 && (
              <div className="d-none d-xl-block">
              <MyViewElement element={
                <Button
                  onClick={handleToggleQueueModal}
                  className="w-1001"
                  color="perrywinkle"
                  size="small"
                >
                  Очередь
                </Button>
                }/>
              </div>
            )}
            {matrixInfo && matrixInfo.canBuy && (
              <div className={styles.footer}>
              <MyViewElement element={
                <p className={styles.price}>Цена - {matrixInfo.price} RUB</p>
              }/>
              <MyViewElement element={
                <Button
                  onClick={showBuyMatrixModal}
                  disabled={buyingStatus.type === 'pending'}
                  className="w-1001"
                  color="perrywinkle"
                  pending
                  size="small"
                >
                  Купить
                </Button>
              }/>

              </div>
            )}
            {matrixInfo && !matrixInfo.canBuy && matrixInfo.level <= 3 && (
              <div className={styles.footer}>
              <MyViewElement element={
                <p className={styles.price}>Цена - {matrixInfo.price} RUB</p>
              }/>
              <MyViewElement element={
                <Button
                  onClick={showCometsBuyModal}
                  disabled={buyingStatus.type === 'pending'}
                  className="w-1001"
                  color="perrywinkle"
                  pending
                  size="small"
                >
                  Купить кометы
                </Button>
              }/>

              </div>
            )}
          </div>
         
            <div className={styles.content}>
              <MyViewElement element={
                  <SearchSelect
                values={searchUsers}
                placeholder="Поиск партнера по логину"
                onInput={setCurrentSearchValue}
                onChange={redirectToUserMatrix}
              />
            }/>
              <MyViewElement element={

              <div className={styles.matrixTree}>
                <MatrixCell
                  place={null}
                  info={matrixTree['0']}
                  isActive={matrixInfo && matrixInfo.isActive}
                />
                <div className={styles.secondRow}>
                  <MatrixCell
                    info={matrixTree['1']}
                    ancestorInfo={matrixTree['0']}
                    isActive={matrixInfo && matrixInfo.isActive}
                  />
                  <MatrixCell
                    ancestorInfo={matrixTree['0']}
                    info={matrixTree['2']}
                    isActive={matrixInfo && matrixInfo.isActive}
                  />
                  <MatrixCell
                    info={matrixTree['3']}
                    ancestorInfo={matrixTree['0']}
                    isActive={matrixInfo && matrixInfo.isActive}
                  />
                  <MatrixCell
                    info={matrixTree['4']}
                    ancestorInfo={matrixTree['0']}
                    isActive={matrixInfo && matrixInfo.isActive}
                  />
                </div>
              </div>
                }/>

            {!isEmpty(selectItems) && (
              <SuperStarPagination items={[...selectItems]} currentId={currentId} />
            )}

            {matrixInfo && (
              <div className={styles.footer}>
                <MyViewElement element={
                <p className={styles.price}>Цена - {matrixInfo.price} RUB</p>
              }/>

                {matrixInfo.canBuy && (
                <MyViewElement element={

                  <Button
                    onClick={showBuyMatrixModal}
                    disabled={buyingStatus.type === 'pending'}
                    className="w-1001"
                    color="perrywinkle"
                    size="small"
                  >
                    Купить
                  </Button>
              }/>

                )}
                {matrixInfo && matrixInfo.id && matrixInfo.isActive && matrixInfo.level <= 3 && (
                <MyViewElement element={
                  
                 <Button
                    onClick={handleToggleQueueModal}
                    className="w-1001"
                    color="violet-blue"
                    size="small"
                  >
                    Очередь
                  </Button>
              }/>

                )}
                {matrixInfo && !matrixInfo.canBuy && matrixInfo.level <= 3 && (
                <MyViewElement element={

                  <Button
                    onClick={showCometsBuyModal}
                    disabled={buyingStatus.type === 'pending'}
                    className="w-1001"
                    color="perrywinkle"
                    pending
                    size="small"
                  >
                    Купить кометы
                  </Button>
              }/>

                )}
              </div>
            )}
          </div>
          
        </div>
      </Container>
      {visibleBuyModal && <BuyStatusModal status={buyingStatus} onClose={closeBuyModal} />}
      {visibleCometsBuyModal && matrixInfo && matrixInfo.id && (
        <CometsBuy matrixType={matrixInfo.id} onClose={closeCometsBuyModal} />
      )}
      {visibleBuyMatrixModal && matrixInfo && (
        <MyViewElement element={
        <BuyMatrixModal
          status={buyingStatus}
          onClose={closeBuyMatrixModal}
          matrixLevel={matrixInfo.level}
          onSubmit={buyMatrix}
        />
      }/>

      )}
      {matrixInfo && matrixInfo.id && (
        <>
          <QueueModal matrixType={matrixInfo.id} />
          <AssignComets matrixType={matrixInfo.id} />
        </>
      )}
    </div>
  )
}

export default SuperStarTable
