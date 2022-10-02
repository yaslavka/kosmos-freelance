import * as ActionTypes from '../constants/milkyway.constants'

/* MILKYWAY Statistics */
export const milkywayStatistics = () => ({
  type: ActionTypes.MILKYWAY_STATISTICS_REQUEST,
})
export const milkywayStatisticsSuccess = (statistics) => ({
  type: ActionTypes.MILKYWAY_STATISTICS_SUCCESS,
  payload: statistics,
})
export const milkywayStatisticsError = (error) => ({
  type: ActionTypes.MILKYWAY_STATISTICS_ERROR,
  payload: error,
})

/* MILKYWAY Statistic */
export const milkywayStatistic = () => ({
  type: ActionTypes.MILKYWAY_STATISTIC_REQUEST,
})
export const milkywayStatisticSuccess = (statistics) => ({
  type: ActionTypes.MILKYWAY_STATISTIC_SUCCESS,
  payload: statistics,
})
export const milkywayStatisticError = (error) => ({
  type: ActionTypes.MILKYWAY_STATISTIC_ERROR,
  payload: error,
})

/* MILKYWAY Buy */
export const milkywayBuy = () => ({ type: ActionTypes.MILKYWAY_BUY_REQUEST })
export const milkywayBuySuccess = (timer) => ({
  type: ActionTypes.MILKYWAY_BUY_SUCCESS,
  payload: timer,
})
export const milkywayBuyError = (error) => ({
  type: ActionTypes.MILKYWAY_BUY_ERROR,
  payload: error,
})

export const milkywayResetTimer = () => ({
  type: ActionTypes.MILKYWAY_RESET_TIMER,
})

/* MILKYWAY Planets */
export const milkywayPlanets = () => ({
  type: ActionTypes.MILKYWAY_PLANETS_REQUEST,
})
export const milkywayPlanetsSuccess = (planets) => ({
  type: ActionTypes.MILKYWAY_PLANETS_SUCCESS,
  payload: planets,
})
export const milkywayPlanetsError = (error) => ({
  type: ActionTypes.MILKYWAY_PLANETS_ERROR,
  payload: error,
})

export const setMilkywayPlanetsPage = (page) => ({
  type: ActionTypes.SET_MILKYWAY_PLANETS_PAGE,
  payload: page,
})

/* MILKYWAY Update Planets */
export const milkywayPlanetsUpdate = () => ({
  type: ActionTypes.MILKYWAY_PLANETS_UPDATE_REQUEST,
})
export const milkywayPlanetsUpdateSuccess = () => ({
  type: ActionTypes.MILKYWAY_PLANETS_UPDATE_SUCCESS,
})
export const milkywayPlanetsUpdateError = (error) => ({
  type: ActionTypes.MILKYWAY_PLANETS_UPDATE_ERROR,
  payload: error,
})

export const setMilkywayForUpdate = (planetId) => ({
  type: ActionTypes.SET_PLANET_FOR_UPDATE,
  payload: planetId,
})

export const toggleAllPlanetmilkywayOnPage = () => ({
  type: ActionTypes.TOGGLE_ALL_PLANET_ON_PAGE,
})


