import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container } from 'reactstrap'
import { useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import isEmpty from 'lodash-es/isEmpty'
import styles from './Team.module.scss'

import * as actions from '../../../actions/team.actions'
import arrowRight from '../../../scss/media/angle-right.2219c635.svg'
import arrowLeft from '../../../scss/media/angle-left.309b1344.svg'
import NavBar from '../../../components/layout/Navbar'
import TeamMember from './TeamMember'
import { Spinner } from 'react-bootstrap'
import cl from './Team.module.css';
function Team() {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const list = useSelector((state) => state.team.list)
  const { name, limit } = useSelector((state) => state.team.query)
  const { total, page } = useSelector((state) => state.team.meta)
  const isLoading = useSelector((state) => state.team.isLoading)

  useEffect(() => {
    dispatch(actions.userStructure(userId))
  }, [dispatch, userId])

  const handleOnChangeSearch = useCallback(
    (event) => {
      dispatch(actions.setUserStructureSearch(userId, event.target.value))
    },
    [dispatch, userId],
  )

  const handleOnChangePage = useCallback(
    (page) => {
      dispatch(actions.setUserStructurePage(userId, page))
    },
    [dispatch, userId],
  )

  return (
    <Container className="root-page">
           <div className={cl.navBlock}>
                <NavBar />
            </div>
          <div className={cl.contentBlock}>

         
          <h1 className={["root-page-title", cl.title].join` `}>Команда</h1>
          <div className={styles.search}>
            <input
              type="text"
              autoComplete="off"
              defaultValue={name}
              onChange={handleOnChangeSearch}
              placeholder="Поиск партнера по логину"
              className={cl.search}
            />
          </div>
          <Spinner isLoading={isLoading}>
            <div className={styles.teamCard}>
              {!isEmpty(list) ? (
                <div className={cl.listPersons}>
                  {
                     list.map((member) => (
                      <div>
                        <TeamMember member={member} />
                      </div>
                    ))
                  }
                </div>
               
              ) : (
                <Col>
                  <h4 className={cl.notTeam}>
                    У этого пользователя нет людей в команде
                  </h4>
                </Col>
              )}
            </div>
            {!isEmpty(list) && !isLoading && (
              <ReactPaginate
                forcePage={page}
                marginPagesDisplayed={1}
                activeClassName="active"
                pageCount={Math.ceil(total / limit)}
                /* eslint-disable-next-line react/prop-types */
                onPageChange={(props) => handleOnChangePage(props.selected)}
                containerClassName="pagination"
                previousLabel={<img src={arrowLeft} className="arrowLeft" alt="Arrow left" />}
                nextLabel={<img src={arrowRight} className="arrowRight" alt="Arrow right" />}
              />
            )}
          </Spinner>
          </div>
        
    
    </Container>
  )
}

export default Team
