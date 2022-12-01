import React, { useEffect, useState, useCallback } from 'react'
import { resizeFreeInformationImage, formatterNumber } from '../../../utils'
import { useSelector, useDispatch } from 'react-redux'
import * as htmlToImage from 'html-to-image'
import { saveAs } from 'file-saver'
import { Button } from 'reactstrap'
import Raven from 'raven-js'
import cl from './StarTrek.module.css';
import * as actions from '../../../actions/app.actions'
import avatar from '../../../scss/media/camera_200.png'
import inImage from '../../../scss/media/insta.svg'
import vkImage from '../../../scss/media/vk.svg'
import tgImage from '../../../scss/media/vk.svg'
import Icon from '../../../components/Icon'
import {useTranslation} from "react-i18next";

function Summarymilkyway() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.app.user)
  const statistics = useSelector((state) => state.milkyway.statistics)
  const isLoadingPublish = useSelector((state) => state.app.loadings.publish)
  const [freeInfoAvatar, setFreeInfoAvatar] = useState(null)

  useEffect(() => {
    async function fetchImage() {
      if (userInfo?.avatar) {
        const load = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userInfo.avatar}`)
        const blob = await load.blob()
        const resizeImage = await resizeFreeInformationImage(blob)
        setFreeInfoAvatar(resizeImage)
      } else {
        setFreeInfoAvatar(avatar)
      }
    }
    fetchImage()
  }, [userInfo])

  const downloadSummary = useCallback(async () => {
    dispatch(actions.publishSummaryToTelegram())
    try {
      const imgData = await htmlToImage.toBlob(document.getElementById('milkyway-summary'), {
        style: { backgroundColor: '#130132' },
        cacheBust: true,
        pixelRatio: 1,
      })

      if (imgData && statistics?.totalSum && userInfo?.avatar) {
        // Send to Telegram
        dispatch(actions.publishSummaryToTelegramUpload(imgData))
      } else if (imgData && userInfo) {
        const filename = userInfo.firstName.trim()
          ? `milkyway-summary-${userInfo.firstName.trim()}`
          : 'milkyway-summary'

        saveAs(imgData, `${filename}.jpeg`)
      }
    } catch (error) {
      Raven.captureException(error)
    }
  }, [dispatch, userInfo, statistics])

  return (
    userInfo &&
    statistics && (
      <div className={cl.summaryBlock}>
        <div className={cl.summaryCard} id="milkyway-summary">
          <div className={cl.summaryLeft}>
            <figure className={cl.summaryFigure}>
              <img
                src={freeInfoAvatar || avatar}
                alt={`${userInfo.first_name} ${userInfo.last_name}`}
              />
            </figure>
            <Button
            disabled={isLoadingPublish}
            className={cl.summaryBtnDownload}
            onClick={downloadSummary}
            color="link"
          >
            <Icon iconName="download" />
          </Button>

          </div>
          <div className={cl.summaryRight}>
          <div className={cl.summaryInitials}>
              <div>{userInfo.first_name}</div>
              <div>{userInfo.last_name}</div>
            </div>
          <ul className={cl.summaryInfoList}>
            <li className={cl.summaryInfoItem}>
              {userInfo.myInstagram ? (
                <a
                  href={`https://www.instagram.com/${userInfo.myInstagram}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    className="free-information__social--image"
                    src={inImage}
                    alt={userInfo.myInstagram}
                  />
                  {userInfo.myInstagram}
                </a>
              ) : (
                `${t('private.StarTrek.myInstagram')}`
              )}
            </li>
            <li  className={cl.summaryInfoItem}>
              {userInfo.myTg ? (
                <a href={`https://t.me/${userInfo.myTg}`} rel="noreferrer" target="_blank">
                  <img
                    className="free-information__social--image"
                    src={tgImage}
                    alt={userInfo.myTg}
                  />
                  {userInfo.myTg}
                </a>
              ) : (
                `${t('private.StarTrek.myInstagram')}`
              )}
            </li>
            <li  className={cl.summaryInfoItem}>
              {userInfo.myVk ? (
                <a href={`https://vk.com/${userInfo.myVk}`} rel="noreferrer" target="_blank">
                  <img
                    className="free-information__social--image"
                    src={vkImage}
                    alt={userInfo.myVk}
                  />
                  {userInfo.myVk}
                </a>
              ) : (
                `${t('private.StarTrek.myInstagram')}`
              )}
            </li>
          </ul>
          <div className={cl.summaryCheck}>
            <h3>Общий чек MATRIX Reloaded:</h3>
            <strong>
              {formatterNumber
                .format(statistics.totalSum + statistics.myInviterIncome || 0)
                .replace('₽', '₽')}
            </strong>
          </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Summarymilkyway
