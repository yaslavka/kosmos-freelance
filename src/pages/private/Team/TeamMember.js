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
    payed,
    phone,
    // eslint-disable-next-line react/prop-types
    matrix,
    // eslint-disable-next-line react/prop-types
    super: superStar,
    // eslint-disable-next-line react/prop-types
    comet,
    // eslint-disable-next-line react/prop-types
    planet,
    // eslint-disable-next-line react/prop-types
    auto,
    // eslint-disable-next-line react/prop-types
    tg,
    // eslint-disable-next-line react/prop-types
    vk,
    // eslint-disable-next-line react/prop-types
    instagram,
    // eslint-disable-next-line react/prop-types
    firstName,
    // eslint-disable-next-line react/prop-types
    lastName,
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
          <img src={personImg ? personImg : personImgDef} className={personImg ? cl.imgPerson : cl.imgUnknow}/>
        </div>
      
      </div>
      <div className={cl.viewElements}>
          <h3 className={cl.personNick}>
              <Link className={cl.personLink} to={`${r.team}/${id}`}>
                {username}
              </Link>
            </h3>
          <div className={cl.initialsBlock}>
            <div className={cl.initials}>{`${firstName} ${lastName}`}</div>
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
            <div className={cl.titleItems}>SuperStar:</div>
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
            <div className={cl.titleItems}>Stars:</div>
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
            <div className={cl.titleItems}>PremiumStars:</div>
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
            <div className={cl.titleItems}>Куплено планет:</div>
            <div className={cl.blockValues}>{planet}</div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Куплено комет:</div>
            <div className={cl.blockValues}>{comet}</div>
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
              {vk ? (
                <a href={`https://vk.com/${vk}`} rel="noreferrer" target="_blank">
                  {vk}
                </a>
              ) : (
                '-'
              )}
            </div>
          </div>
          <div className={cl.cardHidden}>
            <div className={cl.titleItems}>Telegram:</div>
            <div className={cl.blockValues}>
              {tg ? (
                <a href={`https://t.me/${tg}`} rel="noreferrer" target="_blank">
                  {tg}
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
