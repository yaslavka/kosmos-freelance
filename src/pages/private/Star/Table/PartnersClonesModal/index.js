import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './PartnersClonesModal.module.scss'
import { api } from '../../../../../api'
import * as actions from '../../../../../actions/app.actions'

import Button from '../../../../../components/OldButton'

// eslint-disable-next-line react/prop-types
export default function PartnersClonesModal({ onClose, showPartnersModal }) {
  const dispatch = useDispatch()
  const matrixCellInfo = useSelector((state) => state.matrixReducer.matrixCellInfo)
  const matrixInfo = useSelector((state) => state.matrixReducer.matrixInfo)
  const [installCloneStatus, setInstallCloneStatus] = useState(null)
  const [matrixClones, setMatrixClones] = useState(null)
  const [setupClones, setSetupClones] = useState(false)

  const installClones = () => {
    if (matrixCellInfo) {
      setSetupClones(true)
      api
        .setClone(matrixCellInfo)
        .then(() => {
          setInstallCloneStatus('Ваша заявка отправлена')
          api.getUserInfo().then((response) => {
            dispatch(actions.userInfoSuccess(response))
          })
          setSetupClones(false)
        })
        .catch((error) => {
          if (error.message) {
            setInstallCloneStatus(error.message)
          }
          setSetupClones(false)
        })
    }
  }

  useEffect(() => {
    if (matrixInfo) {
      api
        .getMatrixClonesCout(matrixInfo.id)
        .then((response) => {
          if (response.count > -1) {
            setMatrixClones(response.count)
          }
        })
        .catch(() => {})
    }
  }, [matrixInfo])

  return (
    <div className={styles.PartnersClonesModal}>
      <svg
        className={styles.closeButton}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        onClick={onClose}
      >
        <g clipPath="url(#clip0)" fill="#fff">
          <path d="M29.2 24.3L5.7.8c-1-1-2.7-1-3.7 0L.8 2.1c-1 1-1 2.7 0 3.7l23.5 23.5c1 1 2.7 1 3.7 0l1.2-1.2c1-1 1-2.7 0-3.8z" />
          <path d="M24.3.8L.8 24.3c-1 1-1 2.7 0 3.8L2 29.3c1 1 2.7 1 3.7 0L29.2 5.8c1-1 1-2.7 0-3.7L28 .8c-1-1-2.7-1-3.7 0z" />
        </g>
        <defs>
          <clipPath id="clip0">
            <path fill="#fff" d="M0 0h30v30H0z" />
          </clipPath>
        </defs>
      </svg>
      {installCloneStatus ? (
        <div className={styles.statusMessage}>{installCloneStatus}</div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.box}>
            <div className={styles.header}>
              <svg
                className={styles.partnersIcon}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 28 31"
              >
                <path
                  d="M21.4 6.3a3.2 3.2 0 00.6-6L21 0h-.6a3.1 3.1 0 00-2.8 3c-.1 2 1.7 3.6 3.7 3.3z"
                  fill="url(#paint0_linear)"
                />
                <path
                  d="M27.4 15.4a23 23 0 00-.8-3.6 8 8 0 00-4.8-5.2h-.3l-.7.7-.7-.7a.2.2 0 00-.2 0c-.2 0-.4 0-.6.2l-1 .7A7.8 7.8 0 0015 12a25 25 0 00-.8 3.7l.1 1a1.2 1.2 0 001.3.6c.6 0 1-.5 1-1.1.2-1.2.4-2.3.8-3.4v-.3 3.7l.2.7v12.4a1.4 1.4 0 003-.2V19h.2v10.2a1.4 1.4 0 001.8 1.3c.7-.2 1-.8 1-1.5V17.6l.1-.3.2-.9V14v-1.8h.1l.4 1.2.6 3a1.2 1.2 0 001.2 1c.6 0 1.1-.4 1.2-1v-.9z"
                  fill="url(#paint1_linear)"
                />
                <path
                  d="M7 6.3a3.2 3.2 0 00.7-6L6.8 0h-.6a3.1 3.1 0 00-2.8 3C3.3 5 5 6.6 7 6.3z"
                  fill="url(#paint2_linear)"
                />
                <path
                  d="M13.1 15.4a23 23 0 00-.8-3.6 8 8 0 00-5-5.3l-.1.1-.7.7-.6-.7a.2.2 0 00-.3 0c-.1 0-.4 0-.5.2L4 7.5A7.7 7.7 0 00.8 12L0 15.7l.1 1a1.2 1.2 0 001.3.6c.6 0 1-.5 1-1.1.2-1.2.4-2.3.8-3.4v-.3h.1v3.7l.1.7v11.5l.1.9a1.4 1.4 0 002.9-.2V19h.2V29.2a1.4 1.4 0 001.8 1.3c.7-.2 1-.8 1-1.5V17.6l.1-.3.3-.9V14v-1.8l.4 1.2.6 3a1.2 1.2 0 001.2 1c.6 0 1.1-.4 1.2-1v-.9z"
                  fill="url(#paint3_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="20.7"
                    y1="-.8"
                    x2="21.5"
                    y2="23.3"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".1" stopColor="#fff" />
                    <stop offset="1" stopColor="#615AD0" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear"
                    x1="13952.1"
                    y1="7399.6"
                    x2="14481.8"
                    y2="15783.6"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".1" stopColor="#fff" />
                    <stop offset="1" stopColor="#615AD0" />
                  </linearGradient>
                  <linearGradient
                    id="paint2_linear"
                    x1="5398.4"
                    y1="1989.1"
                    x2="5475.2"
                    y2="4199.2"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".1" stopColor="#fff" />
                    <stop offset="1" stopColor="#615AD0" />
                  </linearGradient>
                  <linearGradient
                    id="paint3_linear"
                    x1="11203.1"
                    y1="7572.9"
                    x2="11732.9"
                    y2="15957.4"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".1" stopColor="#fff" />
                    <stop offset="1" stopColor="#615AD0" />
                  </linearGradient>
                </defs>
              </svg>
              <h3 className={styles.title}>
                <span>{matrixClones || 0}</span> клонов
              </h3>
            </div>
            <Button
              size="medium"
              disabled={setupClones}
              color="perrywinkle"
              onClick={installClones}
            >
              Поставить
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
