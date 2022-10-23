import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../../../../../../actions/finance.actions'
import Button from '../../../../../../../components/OldButton'
import { formatter } from '../../../../../../../utils'

// eslint-disable-next-line react/prop-types
const Balance = () => {
  const userInfo = useSelector((state) => state.app.user)

  return (
    <>
      {userInfo && (
        <div className="line_first">
          <span className="c1">Баланс:</span>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,no-script-url */}
          <Button className="c2 clBuyBalance">
            <span id="label_buy_balance">
              {(userInfo.balance > -1 && userInfo.balance)}
            </span>{' '}
          </Button>
        </div>
      )}
    </>
  )
}
export default Balance
