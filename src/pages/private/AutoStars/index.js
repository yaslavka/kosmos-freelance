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
                    <div className={styles.count}>Клоны {matrixTypes[0].count}</div>
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
                      <div className={styles.count}>Клоны {matrixTypes[1].count}</div>
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
                      <div className={styles.count}>Клоны {matrixTypes[2].count}</div>
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
                      <div className={styles.count}>Клоны {matrixTypes[3].count}</div>
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
                      <div className={styles.count}>Клоны {matrixTypes[4].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/6"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[5])
                    }}
                  >

                    <span>6</span>
                    {!!Number(matrixTypes[5].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[5].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/7"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[6])
                    }}
                  >

                    <span>7</span>
                    {!!Number(matrixTypes[6].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[6].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/8"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[7])
                    }}
                  >

                    <span>8</span>
                    {!!Number(matrixTypes[7].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[7].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/9"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[8])
                    }}
                  >

                    <span>9</span>
                    {!!Number(matrixTypes[8].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[8].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/10"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[9])
                    }}
                  >

                    <span>10</span>
                    {!!Number(matrixTypes[9].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[9].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/11"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[10])
                    }}
                  >

                    <span>11</span>
                    {!!Number(matrixTypes[10].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[10].count}</div>
                    )}
                  </Link>
                }/>
                <MyViewElement element={
                  <Link
                    to="/MATRIX2-table/12"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[11])
                    }}
                  >

                    <span>12</span>
                    {!!Number(matrixTypes[11].count) && (
                      <div className={styles.count}>Клоны {matrixTypes[11].count}</div>
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
