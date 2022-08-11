import React from 'react'
import cl from './../../../../Exchange.module.css';

const Result = () => {
  return (
    <div className={cl.result}>
      <table className="marketes" width="100%">
        <thead>
          <tr id="mktspot">
            <th width="25%" className="first">
              <span>Валюта</span>
            </th>
            <th width="33%">
              <span>Цена</span>
              </th>
            <th width="26%">
              <span>Изм.</span>
              </th>
            <th width="16%">
              <span>Об.</span>
              </th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
export default Result
