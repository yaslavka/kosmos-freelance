import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './AutoStars.module.css'
//import car from '../../../scss/media/auto-stars-car.ae772906.gif'
//import slogan from '../../../scss/media/premium-star.3dd36913.svg'
//import pdfPreview from '../../../scss/media/pdf-preview-premiumstars.e1c214f4.jpg'
//import carLarge from '../../../scss/media/auto-stars-car-large.0b93bf94.gif'
//import pptRU from '../../../static/documents/star/Новый текстовый документ.txt'
//import pptES from '../../../static/documents/star/Новый текстовый документ.txt'
import { api } from '../../../api'
import { matrixActions } from '../../../store/matrix/actions'

//import UserInfo from '../../../components/UserInfo'
import NavBar from '../../../components/layout/Navbar'
import MyViewElement from 'src/components/MyViewElements/MyViewElements'
//import Icon from '../../../components/Icon'

export default function AutoStars() {
  const [matrixTypes, setMatrixTypes] = useState(null)
  const dispatch = useDispatch()

  const saveMatrixInfo = (matrixInfo) => {
    dispatch(matrixActions.saveCurrentMatrix(matrixInfo))
  }

  useEffect(() => {
    api
      .getAutoMatrixTypes()
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
            <h2 className={styles.mainTitle}>MATRIX2</h2>
            {matrixTypes && (
              <div className={styles.tables}>
                <MyViewElement element={
                  <Link
                  to="/MATRIX2-table/1"
                  className={styles.table}
                  onClick={() => {
                    saveMatrixInfo(matrixTypes[0])
                  }}
                >
               
                  <span>1</span>
                  {!!Number(matrixTypes[0].count) && (
                    <div className={styles.count}>{matrixTypes[0].count}</div>
                  )}
                </Link>
                }/>
                <MyViewElement element={
                 <Link
                    to="/MATRIX2-table/2"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[1])
                    }}
                  >
                   
                    <span>2</span>
                    {!!Number(matrixTypes[1].count) && (
                      <div className={styles.count}>{matrixTypes[1].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/3"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[2])
                    }}
                  >
                  
                    <span>3</span>
                    {!!Number(matrixTypes[2].count) && (
                      <div className={styles.count}>{matrixTypes[2].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                <Link
                    to="/MATRIX2-table/4"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[3])
                    }}
                  >
                    
                    <span>4</span>
                    {!!Number(matrixTypes[3].count) && (
                      <div className={styles.count}>{matrixTypes[3].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/5"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[4])
                    }}
                  >
                  
                    <span>5</span>
                    {!!Number(matrixTypes[4].count) && (
                      <div className={styles.count}>{matrixTypes[4].count}</div>
                    )}
                  </Link>
                }/>
              </div>
            )}
            <div className="pdf-preview"></div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
