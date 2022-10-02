import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { randomBetween } from '../../../utils'

import * as actions from '../../../actions/milkyway.actions'

function MyPlanetsElement({ planet, classPlanet }) {
  const dispatch = useDispatch()
  const { level, comets, sum, dateCreate, id } = planet
  const selected = useSelector((state) => state.milkyway.selected)
  const isSelected = !!selected.includes(id)

  const random = useMemo(() => randomBetween(1, 8), [])
  const planetImg = useMemo(() => require(`../../../scss/media/planet-${random}.png`), [random])

  const handleOnSetPlanetForUpdate = () => dispatch(actions.setMilkywayForUpdate(id))


  console.log(id,dateCreate,level,sum,comets);
  return (
    <div
      onClick={handleOnSetPlanetForUpdate}
      className={classnames('startrek__planet-card', {
        'startrek__planet-card--selected': isSelected,
      })}
    >
      <div className={['planet', classPlanet].join` `}>

      </div>
    </div>
  )
}

MyPlanetsElement.propTypes = {
  planet: PropTypes.shape({
    id: PropTypes.number,
    level: PropTypes.number,
    sum: PropTypes.number,
    comets: PropTypes.number,
    dateCreate: PropTypes.string,
  }),
}

export default MyPlanetsElement
