import React from 'react'
import { useSelector } from 'react-redux'
import MyViewElement from 'src/components/MyViewElements/MyViewElements';
import { formatterNumber } from '../../../utils'
import cl from './StarTrek.module.css';

function Statistics() {
  const statistics = useSelector((state) => state.startrek.statistics)
  return (
    statistics && (
      <ul className={cl.statList}>
        <MyViewElement element={
        <li className={cl.statItem}>
        <div>Куплено планет:</div>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.allPlanet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
        </li>
        }/>
        <MyViewElement element={

        <li className={cl.statItem}>
          <div>Мои места:</div>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.myPlanet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
        </li>
        }/>

        <MyViewElement element={

        <li className={cl.statItem}>
          <div>Всего мест:</div>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.allComet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
        </li>
        }/>

        <MyViewElement element={

        <li className={cl.statItem}>
          <div>Мои клонов:</div>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.myComet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
        </li>
        }/>

        <MyViewElement element={

        <li className={cl.statItem}>
        <div>Мест в структуре:</div>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.structurePlanet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
        </li>
        }/>

        <MyViewElement element={

        <li className={cl.statItem}>
        <div>Мест в первой линии:</div>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.firstLinePlanet)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
         
        </li>
        }/>

        <MyViewElement element={

        <li className={cl.statItem}> 
          <div>Реферальные:</div>
          <div className="startrek__counter">
            {formatterNumber
              .format(statistics.myInviterIncome)
              .replace(new RegExp(String.fromCharCode(160), 'g'), '')
              .replace('₽', '')}
          </div>
         
        </li>
        }/>

      </ul>
    )
  )
}

export default Statistics
