import { takeEvery, call, put, all, select } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

import * as ActionTypes from '../constants/milkyway.constants'
import * as actions from '../actions/milkyway.actions'
import * as api from '../api/mikyway.api'

export function* milkywayStatistics() {
  try {
    const response = yield call(api.milkywayStatistics)
    if (response) {
      yield put(actions.milkywayStatisticsSuccess(response))
    }
  } catch (error) {
    yield put(actions.milkywayStatisticsError(error))

    toast.error(error.message)
  }
}

export function* milkywayStatistic() {
  try {
    const response = yield call(api.milkywayStatistic)
    if (response) {
      yield put(actions.milkywayStatisticSuccess(response))
    }
  } catch (error) {
    yield put(actions.milkywayStatisticError(error))

    toast.error(error.message)
  }
}

export function* milkywayBuy() {
  try {
    const response = yield call(api.milkywayBuy)
    if (response) {
      const timer = dayjs().add(15, 's').format()
      localStorage.setItem('s', timer)
      yield put(actions.milkywayBuySuccess(timer))
      yield put(actions.milkywayStatistics())
    }
  } catch (error) {
    yield put(actions.milkywayBuyError(error))

    toast.error(error.message)
  }
}

export function* milkywayPlanets() {
  const { milkyway } = yield select()
  try {
    const response = yield call(api.milkywayPlanets, milkyway.query)
    if (response) {
      yield put(actions.milkywayPlanetsSuccess(response))
    }
  } catch (error) {
    yield put(actions.milkywayPlanetsError(error))

    toast.error(error.message)
  }
}

export function* milkywayPlanetsUpdate() {
  const { milkyway } = yield select()
  try {
    const response = yield call(api.milkywayPlanetsUpdate, milkyway.selected)
    if (response) {
      yield put(actions.milkywayPlanetsUpdateSuccess())
      yield put(actions.milkywayPlanets())
      toast.success('Спасибо, Ваша заявка отправлена. Успешной работы!')
    }
  } catch (error) {
    yield put(actions.milkywayPlanetsUpdateError(error))

    toast.error(error.message)
  }
}

export default function* mainSaga() {
  yield all([
    takeEvery(ActionTypes.MILKYWAY_PLANETS_UPDATE_REQUEST, milkywayPlanetsUpdate),
    takeEvery(ActionTypes.MILKYWAY_PLANETS_REQUEST, milkywayPlanets),
    takeEvery(ActionTypes.MILKYWAY_STATISTIC_REQUEST, milkywayStatistic),
    takeEvery(ActionTypes.MILKYWAY_STATISTICS_REQUEST, milkywayStatistics),
    takeEvery(ActionTypes.SET_MILKYWAY_PLANETS_PAGE, milkywayPlanets),
    takeEvery(ActionTypes.MILKYWAY_BUY_REQUEST, milkywayBuy),
  ])
}


