import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'reactstrap'
import styles from './Table.module.scss'
import { api } from '../../../../api'
import { matrixActions } from '../../../../store/matrix/actions'
import * as actions from '../../../../actions/app.actions'
import routes from '../../../../constants/routes.constants'
import closeIcon from '../../../../assets/images/icons/close.ac2aaa1a.svg'
import isEmpty from 'lodash-es/isEmpty'
import Select from '../../../../components/Select'
import Button from '../../../../components/OldButton'
import MatrixCell from './MatrixCell'
import PartnerModal from './PartnerModal'
import ClonesModal from './ClonesModal'
import BuyStatusModal from './BuyStatusModal'
import BuyMatrixModal from './BuyMatrixModal'
import PartnersClonesModal from './PartnersClonesModal'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'

// eslint-disable-next-line react/prop-types
export default function MTable({ location: { state = {}, pathname } }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [buyingStatus, setBuyingStatus] = useState({ type: '', message: '' })
  const [isFetching, setIsFetching] = useState(true)
  const [matrixTree, setMatrixTree] = useState([])
  const [visiblePartnerModal, setVisiblePartnerModal] = useState(false)
  const [visibleBuyModal, setVisibleBuyModal] = useState(false)
  const [visibleClonesModal, setVisibleClonesModal] = useState(false)
  const [visiblePartnersClonesModal, setVisiblePartnersClonesModal] = useState(false)
  const [searchUsers, setSearchUsers] = useState([])
  const [currentSearchValue, setCurrentSearchValue] = useState('')
  const [selectItems, setSelectItems] = useState(null)
  const [visibleBuyMatrixModal, setVisibleBuyMatrixModal] = useState(false)
  const matrixInfo = useSelector((state) => state.matrixReducer.matrixInfo)
  const matricesList = useSelector((state) => state.matrixReducer.matricesList)

  const buyMatrix = () => {
    if (matrixInfo && matrixInfo.id) {
      setBuyingStatus({ type: 'pending', message: '' })
      api
        .buyMatrixMini(Number(matrixInfo.id))
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
              dispatch(actions.userInfoSuccess(response))
            })
            .catch(() => {})

          api
            .getMatrixMiniTypes()
            .then((response) => {
              const filter = response.items.find((x) => x.id === matrixInfo.id)
              if (filter) {
                dispatch(matrixActions.saveCurrentMatrix(filter))
              }
            })
            .catch(() => {})

          api
            .getMatrixMiniStructureByType(matrixInfo.id)
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

  //TODO: Rewrite
  const showPartnerModal = (info, place) => {
    if (window.innerWidth < 1200) {
      document.body.style.overflow = 'hidden'
    }

    if ((place === 4) && matrixTree['1']) {
      if (!info) {
        dispatch(
          matrixActions.saveCurrentMatrixCellInfo({
            ancestor_id: matrixTree['0'].id,
            place,
          }),
        )
        setVisiblePartnersClonesModal(true)
      }
    } else if ((place === 5 || place === 6) && matrixTree['2']) {
      if (!info) {
        dispatch(
          matrixActions.saveCurrentMatrixCellInfo({
            ancestor_id: matrixTree['0'].id,
            place,
          }),
        )
        setVisiblePartnersClonesModal(true)
      }
    } else if (place === 1 || place === 2 || place === 3) {
      if (!info) {
        dispatch(
          matrixActions.saveCurrentMatrixCellInfo({
            ancestor_id: matrixTree['0'].id,
            place,
            matrix_id:matrixInfo.id
          }),
        )
        setVisiblePartnersClonesModal(true)
      }
    }
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

  const closePartnerModal = () => {
    document.body.style.overflow = 'initial'
    setVisiblePartnerModal(false)
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      if (pathname.startsWith('/personal-Gliese')) {
        api
          .getMatrixMiniStructureByType(matrixInfo.id)
          .then((response) => {
            if (response.items) {
              setMatrixTree(response.items)
              setIsFetching(false)
            }
          })
          .catch(() => {})
      } else {
        api
          .getMatrixMiniStructureById(id)
          .then((response) => {
            if (response.items) {
              setMatrixTree(response.items)
              setIsFetching(false)
            }
          })
          .catch(() => {})
      }
    }, 2000)
  }

  const closeClonesModal = () => {
    document.body.style.overflow = 'initial'
    setVisibleClonesModal(false)
    setIsFetching(true)
  }

  const closeBuyModal = () => {
    setVisibleBuyModal(false)
  }

  const navigateTo = (direction) => {
    if (matrixInfo && matricesList) {
      if (direction === 'left') {
        if (matrixInfo.id !== 1) {
          const prevMatrix = matricesList.find((matrix) => matrix.id === matrixInfo.id - 1)
          setIsFetching(true)
          dispatch(matrixActions.saveCurrentMatrix(prevMatrix))
          history.push(`/personal-Gliese/${matrixInfo.id - 1}`)
        }
      } else {
        if (matrixInfo.id !== 8) {
          const nextMatrix = matricesList.find((matrix) => matrix.id === matrixInfo.id + 1)
          setIsFetching(true)
          dispatch(matrixActions.saveCurrentMatrix(nextMatrix))
          history.push(`/personal-Gliese/${matrixInfo.id + 1}`)
        }
      }
    }
  }

  const closePartnersClonesModal = () => {
    document.body.style.overflow = 'initial'
    setVisiblePartnersClonesModal(false)
    setIsFetching(true)
  }

  const showPartnersModal = () => {
    setVisiblePartnerModal(true)
  }

  const redirectToUserMatrix = (matrixId) => {
    history.push(`/personal-Gliese/${matrixId}`)
    setSearchUsers([])
  }

  useEffect(() => {
    if (matrixInfo && matrixInfo.isActive && isFetching) {
      api
        .getMatrixMiniStructureByType(matrixInfo.id)
        .then((response) => {
          if (response.items) {
            setMatrixTree(response.items)
            setIsFetching(false)
          }
        })
        .catch()
    } else if (id) {
      api
        .getMatrixMiniStructureById(id)
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
        .getNeighboringMatricesMini(matrixInfo.id)
        .then((response) => {
          if (Array.isArray(response.items) && response.items.length > 0) {
            const result = response.items.map(({ name, id }) => ({
              label: name,
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
        .getMatrixMiniTypes()
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

  //TODO: Remove hardcoded matrixTree

  const handleUpMatrix = () => {
    if (id) {
      api
        .getUpperMiniStructureById(id)
        .then((response) => {
          if (response.items) {
            setMatrixTree(response.items)
            setIsFetching(false)
            history.goBack()
          }
        })
        .catch()
    }
  }

  const backRouteElement = useMemo(() => {
    let returnRoute = (
      <Link to={routes.matrixmini} className={styles.close}>
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
        <div className={styles.header}> {matrixInfo && <h1 className={styles.title}>Gliese - M{matrixInfo.id}</h1>} {backRouteElement}</div>
      }/>
        <div className={styles.container}>
          <div className={styles.sidebar}>

            {selectItems && (
              <MyViewElement element={
              <Select
                values={selectItems}
                placeholder="Выберите клон"
                className={styles.matrixSelect}
                onChange={(value) => {
                  if (value) {
                    history.push(`/personal-Gliese/${value}`)
                  }
                }}
              />
            }/>

            )}
            {id && (
              <MyViewElement element={
              <Button
                onClick={handleUpMatrix}
                disabled={buyingStatus.type === 'pending'}
                className="w-1001"
                color="perrywinkle"
                size="small"
              >
                Наверх
              </Button>
            }/>

            )}
            {matrixInfo && matrixInfo.canBuy && (
              <div className={styles.footer}>
              <MyViewElement element={
                <p className={styles.price}>Цена - {matrixInfo.summ} RUB</p>
              }/>
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

              </div>
            )}
          </div>
          <div className={styles.content}>
          <MyViewElement element={

            <div className={styles.matrixTree}>
              <MatrixCell
                place={0}
                info={matrixTree['0']}
                isActive={matrixInfo && matrixInfo.isActive}
              />
              <div className={styles.secondRow}>
                {matrixInfo.id === 1
                  ?
                  <>
                    <MatrixCell
                      place={1}
                      info={matrixTree['1']}
                      ancestorInfo={matrixTree['0']}
                      isActive={matrixInfo && matrixInfo.isActive}
                      onDoubleClick={() => {
                        showPartnerModal(matrixTree['1'], 1)
                      }}
                    />
                    <MatrixCell
                      place={2}
                      ancestorInfo={matrixTree['0']}
                      info={matrixTree['2']}
                      isActive={matrixInfo && matrixInfo.isActive}
                      onDoubleClick={() => {
                        showPartnerModal(matrixTree['2'], 2)
                      }}
                    />
                    <MatrixCell
                      place={3}
                      ancestorInfo={matrixTree['0']}
                      info={matrixTree['3']}
                      isActive={matrixInfo && matrixInfo.isActive}
                      onDoubleClick={() => {
                        showPartnerModal(matrixTree['3'], 3)
                      }}
                    />
                  </>
                  :
                  <>
                    <MatrixCell
                      place={1}
                      info={matrixTree['1']}
                      ancestorInfo={matrixTree['0']}
                      isActive={matrixInfo && matrixInfo.isActive}
                      onDoubleClick={() => {
                        showPartnerModal(matrixTree['1'], 1)
                      }}
                    />
                    <MatrixCell
                      place={2}
                      ancestorInfo={matrixTree['0']}
                      info={matrixTree['2']}
                      isActive={matrixInfo && matrixInfo.isActive}
                      onDoubleClick={() => {
                        showPartnerModal(matrixTree['2'], 2)
                      }}
                    />
                  </>

                }
              </div>
            </div>
            }/>
            {matrixInfo && matrixInfo.canBuy && (
              <div className={styles.footer}>
                <p className={styles.price}>Цена - {matrixInfo.summ} RUB</p>
                <Button
                  onClick={showBuyMatrixModal}
                  disabled={buyingStatus.type === 'pending'}
                  className="w-1001"
                  color="perrywinkle"
                  size="small"
                >
                  Купить
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
      {visibleBuyModal && <BuyStatusModal status={buyingStatus} onClose={closeBuyModal} />}
      {visiblePartnersClonesModal && (
        <PartnersClonesModal
          onClose={closePartnersClonesModal}
          showPartnersModal={showPartnersModal}
        />
      )}
      {visiblePartnerModal && <PartnerModal onClose={closePartnerModal} />}
      {visibleClonesModal && matrixInfo && matrixInfo.id && (
        <ClonesModal matrixType={matrixInfo.id} onClose={closeClonesModal} />
      )}
      {visibleBuyMatrixModal && (
        <BuyMatrixModal status={buyingStatus} onSubmit={buyMatrix} onClose={closeBuyMatrixModal} />
      )}
    </div>
  )
}
