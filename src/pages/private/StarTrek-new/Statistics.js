import React from 'react'
import { useSelector } from 'react-redux'
import { formatterNumber } from '../../../utils'
import cl from './StarTrek.module.css';
import {useTranslation} from "react-i18next";
import MyViewElement from "../../../components/MyViewElements/MyViewElements";

function Statisticsmilkyway() {
  const { t } = useTranslation('common');
  const statistics = useSelector((state) => state.milkyway.statistics)
  return (
    statistics && (
      <ul className={cl.statList}>
        <MyViewElement element={
          <li className={cl.statItem}>
            <div>{t('private.StarTrek.statItem')}</div>
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
            <div>{t('private.StarTrek.myp')}</div>
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
            <div>{t('private.StarTrek.allComet')}</div>
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
            <div>{t('private.StarTrek.myComet')}</div>
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
            <div>{t('private.StarTrek.active')}</div>
            <div className="startrek__counter">
              {formatterNumber
                .format(statistics.active)
                .replace(new RegExp(String.fromCharCode(160), 'g'), '')
                .replace('₽', '')}
            </div>
          </li>
        }/>

      </ul>
    )
  )
}

export default Statisticsmilkyway
