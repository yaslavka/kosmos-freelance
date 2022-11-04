import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import cl from './Team.module.css';
import personImgDef from './../../../scss/media/person-img-main.svg';
import r from '../../../constants/routes.constants'
import { matrixActions } from '../../../store/matrix/actions'
import StarRating from '../../../components/StarRating'
function TeamMember({ member }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    id,
    username,
    email,
    // eslint-disable-next-line react/prop-types
    phone,
    // eslint-disable-next-line react/prop-types
    telegram,
    // eslint-disable-next-line react/prop-types
    vkontakte,
    // eslint-disable-next-line react/prop-types
    instagram,
    // eslint-disable-next-line react/prop-types
    first_name,
    matrix,
    auto,
    // eslint-disable-next-line react/prop-types
    last_name,
    payed,
    superStar
  } = member

  const saveCurrentMatrix = useCallback(
    (matrixInfo) => {
      dispatch(matrixActions.saveCurrentMatrix(matrixInfo))
    },
    [dispatch],
  )
  let personImg = '';

  return (
    <div className={cl.itemPerson}>
      <div className={cl.personBlock}>
      <div className={cl.personIcon}>
        <div className={cl.personCircle}>
          <img src={personImg ? personImg : personImgDef} className={personImg ? cl.imgPerson : cl.imgUnknow} alt={''}/>
        </div>

      </div>
      <div className={cl.viewElements}>
          <h3 className={cl.personNick}>
              <Link className={cl.personLink} to={`${r.team}/${id}`}>
                {username}
              </Link>
            </h3>
          <div className={cl.initialsBlock}>
            <div className={cl.initials}>{`${first_name} ${last_name}`}</div>
          </div>

          <div className=''>
            <div className={cl.payedBlock}>Оплата: {payed ? <span className={cl.checkmark}></span> : <span className={cl.notPayed}></span>}</div>
          </div>

      </div>
      </div>
      {/* <div className="card__header-right">ID: {id}</div> */}
      {/* <div className="">
            <div className="list-info__value">{email}</div>
          </div> */}
      {/* <div className="">
            <div className="list-info__value">{phone}</div>
          </div> */}

          <div className={cl.hiddenElements}>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Млечный путь 2.0:</div>
            <div className={cl.starsList}>
              {superStar ? (
                <StarRating
                  max={10}
                  size={18}
                  matrix={Object.values(superStar)}
                  onClick={(value) => {
                    saveCurrentMatrix(value)
                    history.push(`/MATRIX3-table/${value.matrixId}`, {
                      useBack: true,
                    })
                  }}
                />
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Млечный путь:</div>
            <div className={cl.starsList}>
              {matrix ? (
                <StarRating
                  max={10}
                  size={18}
                  matrix={Object.values(matrix)}
                  onClick={(value) => {
                    saveCurrentMatrix(value)
                    history.push(`/table/${value.matrixId}`, { useBack: true })
                  }}
                />
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Пегас:</div>
            <div className={cl.starsList}>
              {auto ? (
                <StarRating
                  max={10}
                  size={18}
                  matrix={Object.values(auto)}
                  onClick={(value) => {
                    saveCurrentMatrix(value)
                    history.push(`/auto-table/${value.matrixId}`, {
                      useBack: true,
                    })
                  }}
                />
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Email:</div>
            <div className={cl.blockValues}>{email}</div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Телефон:</div>
            <div className={cl.blockValues}>{phone}</div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Instagram:</div>
            <div className={cl.blockValues}>
              {instagram ? (
                <a href={`https://www.instagram.com/${instagram}`} rel="noreferrer" target="_blank">
                  {instagram}
                </a>
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Вконтакте:</div>
            <div className={cl.blockValues}>
              {vkontakte ? (
                <a href={`https://vk.com/${vkontakte}`} rel="noreferrer" target="_blank">
                  {vkontakte}
                </a>
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Telegram:</div>
            <div className={cl.blockValues}>
              {telegram ? (
                <a href={`https://t.me/${telegram}`} rel="noreferrer" target="_blank">
                  {telegram}
                </a>
              ) : (
                '-'
              )}
            </div>
          </div>

        </div>
    </div>
  )
}

TeamMember.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }),
}

export default TeamMember
