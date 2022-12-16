import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './AutoStars.module.css'
import { api } from '../../../api'
import { matrixActions } from '../../../store/matrix/actions'
import NavBar from '../../../components/layout/Navbar'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'

export default function SStars() {
  const [matrixTypes, setMatrixTypes] = useState(null)
  const dispatch = useDispatch()

  const saveMatrixInfo = (matrixInfo) => {
    dispatch(matrixActions.saveCurrentMatrix(matrixInfo))
  }

  useEffect(() => {
    api
      .ssMatrixTypes()
      .then((response) => {
        if (Array.isArray(response.items)) {
          dispatch(matrixActions.saveUserMatrices(response.items))
          setMatrixTypes(response.items)
        }
      })
      .catch(() => {})
  }, [dispatch])

  return (
    <div className={styles.AutoStars}>
      <Container>
        <Row>
          <Col className="d-none d-xl-block" xl={3}>
            <NavBar />
          </Col>
          <Col xs={12} xl={9}>
            {matrixTypes && (
              <div className={styles.tables}>
                <MyViewElement element={
                  <Link
                  to="/aida-table/1"
                  className={styles.table}
                  onClick={() => {
                    saveMatrixInfo(matrixTypes[0])
                  }}
                >

                  <span>1</span>
                  {!!Number(matrixTypes[0].count) && (
                    <div className={styles.count}>Клоны {matrixTypes[0].count}</div>
                  )}
                </Link>
                }/>
                <MyViewElement element={
                 <Link
                    to="/aida-table/2"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[1])
                    }}
                  >

                    <span>2</span>
                    {!!Number(matrixTypes[1].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[1].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/aida-table/3"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[2])
                    }}
                  >

                    <span>3</span>
                    {!!Number(matrixTypes[2].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[2].count}</div>
                    )}
                  </Link>
                }/>
              </div>
            )}
            <div className="pdf-preview"/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
