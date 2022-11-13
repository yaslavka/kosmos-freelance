import React, { useEffect, useMemo } from 'react'
import { Row, Col, Container } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../../../actions/startrek.actions'
import NavBar from '../../../components/layout/Navbar'
import Table from '../../../components/Table'
import { Spinner } from 'react-bootstrap'
import {useTranslation} from "react-i18next";

const Statistic = () => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.startrek.loadings.table)
  const list = useSelector((state) => state.startrek.table)

  const arrayList = useMemo(
    () => list.map((el) => ({ ...el, level: `${t('private.StarTrek.Statistic.level')} ${el.level}` })),
    [list],
  )

  const columns = useMemo(
    () => ({
      level:`${t('private.StarTrek.Statistic.columns.level')}`,
      matrix:`${t('private.StarTrek.Statistic.columns.matrix')}`,
    }),
    [t],
  )

  useEffect(() => {
    dispatch(actions.milkywayStatistic())
  }, [dispatch])

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <NavBar />
        </Col>
        <Col xl={9}>
          <h1 className="root-page-title">{t('private.StarTrek.Statistic.title')}</h1>
          <Spinner isLoading={isLoading}>
            <Table columns={columns} data={arrayList} withoutPaginate />
          </Spinner>
        </Col>
      </Row>
    </Container>
  )
}

export default Statistic
