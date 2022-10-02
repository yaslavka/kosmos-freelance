import React, { useMemo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import cl from './../../../../Exchange.module.css';
const OrderBook = () => {
  const [isActiveOrder, setIsActiveOrder] = useState({count: '', dash: '', btc: ''})
  const {buyExchange} = useSelector(state=>state)
  const dispatch = useDispatch();
  const clickRows = (e)=>{
    setIsActiveOrder({...isActiveOrder, count: [...e.target.childNodes][0].textContent, dash: [...e.target.childNodes][1].textContent, btc: [...e.target.childNodes][2].textContent})
  }
  useMemo(()=>{dispatch({type: 'BUY_EXCHANGE_FORM', info: isActiveOrder});console.log(buyExchange)},[isActiveOrder])
 
  
 
  return (
    <div className="sell_orders_box">
      <div className="all_title title">Ордера на продажу</div>
      <div className="result">
        <table className="sell_orders" width="100%">
          <thead>
            <tr>
              <th width="35%" >
                Цена
              </th>
              <th width="38%">DASH</th>
              <th width="27%">BTC</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="scrolling" id="scrollbar3">
        <SimpleBar style={{ height: 300, width: '100%' }}>
          <div className="viewport">
            <div className="overview">
              <table className="sell_orders" width="100%">
                <tbody className={cl.tableOrderBook} id="sellord_table">
                  <tr
                    className="clRow"
                    a="0.09762344"
                    p="0.07689110"
                    ac="0.09762344"
                    tc="0.00750637"
                    title="Total ETH: 0.09762344, Total BTC: 0.00750637"
                    
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07689110
                      </td>
                      <td className={cl.tdTable} width="38%">0.09762344</td>
                      <td className={cl.tdTable} width="27%">0.00750637</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.13361978"
                    p="0.07709672"
                    ac="0.23124322"
                    tc="0.01780801"
                    title="Total ETH: 0.23124322, Total BTC: 0.01780801"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07709672
                      </td>
                      <td className={cl.tdTable} width="38%">0.13361978</td>
                      <td className={cl.tdTable} width="27%">0.01030164</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.03296348"
                    p="0.07709682"
                    ac="0.2642067"
                    tc="0.02034938"
                    title="Total ETH: 0.2642067, Total BTC: 0.02034938"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07709682
                      </td>
                      <td className={cl.tdTable} width="38%">0.03296348</td>
                      <td className={cl.tdTable} width="27%">0.00254137</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow b"
                    a="12.96298196"
                    p="0.07709904"
                    ac="13.22718866"
                    tc="1.01978284"
                    title="Total ETH: 13.22718866, Total BTC: 1.01978284"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07709904
                      </td>
                      <td className={cl.tdTable} width="38%">12.96298196</td>
                      <td className={cl.tdTable} width="27%">0.99943346</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00847741"
                    p="0.07713463"
                    ac="13.23566607"
                    tc="1.02043674"
                    title="Total ETH: 13.23566607, Total BTC: 1.02043674"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07713463
                      </td>
                      <td className={cl.tdTable} width="38%">0.00847741</td>
                      <td className={cl.tdTable} width="27%">0.00065390</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.02576000"
                    p="0.07713480"
                    ac="13.26142607"
                    tc="1.02242373"
                    title="Total ETH: 13.26142607, Total BTC: 1.02242373"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07713480
                      </td>
                      <td className={cl.tdTable} width="38%">0.02576000</td>
                      <td className={cl.tdTable} width="27%">0.00198699</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00131759"
                    p="0.07721000"
                    ac="13.26274366"
                    tc="1.02252546"
                    title="Total ETH: 13.26274366, Total BTC: 1.02252546"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07721000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00131759</td>
                      <td className={cl.tdTable} width="27%">0.00010173</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.02000000"
                    p="0.07722000"
                    ac="13.28274366"
                    tc="1.02406986"
                    title="Total ETH: 13.28274366, Total BTC: 1.02406986"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07722000
                      </td>
                      <td className={cl.tdTable} width="38%">0.02000000</td>
                      <td className={cl.tdTable} width="27%">0.00154440</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00250541"
                    p="0.07726405"
                    ac="13.28524907"
                    tc="1.02426343"
                    title="Total ETH: 13.28524907, Total BTC: 1.02426343"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07726405
                      </td>
                      <td className={cl.tdTable} width="38%">0.00250541</td>
                      <td className={cl.tdTable} width="27%">0.00019357</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00201707"
                    p="0.07729180"
                    ac="13.28726614"
                    tc="1.02441933"
                    title="Total ETH: 13.28726614, Total BTC: 1.02441933"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07729180
                      </td>
                      <td className={cl.tdTable} width="38%">0.00201707</td>
                      <td className={cl.tdTable} width="27%">0.00015590</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00570095"
                    p="0.07730000"
                    ac="13.29296709"
                    tc="1.02486001"
                    title="Total ETH: 13.29296709, Total BTC: 1.02486001"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07730000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00570095</td>
                      <td className={cl.tdTable} width="27%">0.00044068</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.02000000"
                    p="0.07733000"
                    ac="13.31296709"
                    tc="1.02640661"
                    title="Total ETH: 13.31296709, Total BTC: 1.02640661"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07733000
                      </td>
                      <td className={cl.tdTable} width="38%">0.02000000</td>
                      <td className={cl.tdTable} width="27%">0.00154660</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00200468"
                    p="0.07734000"
                    ac="13.31497177"
                    tc="1.02656165"
                    title="Total ETH: 13.31497177, Total BTC: 1.02656165"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07734000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00200468</td>
                      <td className={cl.tdTable} width="27%">0.00015504</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.70777746"
                    p="0.07739261"
                    ac="14.02274923"
                    tc="1.08133839"
                    title="Total ETH: 14.02274923, Total BTC: 1.08133839"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07739261
                      </td>
                      <td className={cl.tdTable} width="38%">0.70777746</td>
                      <td className={cl.tdTable} width="27%">0.05477674</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00354881"
                    p="0.07739262"
                    ac="14.02629804"
                    tc="1.08161304"
                    title="Total ETH: 14.02629804, Total BTC: 1.08161304"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07739262
                      </td>
                      <td className={cl.tdTable} width="38%">0.00354881</td>
                      <td className={cl.tdTable} width="27%">0.00027465</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00599327"
                    p="0.07740000"
                    ac="14.03229131"
                    tc="1.08207691"
                    title="Total ETH: 14.03229131, Total BTC: 1.08207691"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07740000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00599327</td>
                      <td className={cl.tdTable} width="27%">0.00046387</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.02000000"
                    p="0.07744000"
                    ac="14.05229131"
                    tc="1.08362571"
                    title="Total ETH: 14.05229131, Total BTC: 1.08362571"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07744000
                      </td>
                      <td className={cl.tdTable} width="38%">0.02000000</td>
                      <td className={cl.tdTable} width="27%">0.00154880</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00395621"
                    p="0.07749999"
                    ac="14.05624752"
                    tc="1.08393231"
                    title="Total ETH: 14.05624752, Total BTC: 1.08393231"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07749999
                      </td>
                      <td className={cl.tdTable} width="38%">0.00395621</td>
                      <td className={cl.tdTable} width="27%">0.00030660</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00840396"
                    p="0.07750000"
                    ac="14.06465148"
                    tc="1.08458361"
                    title="Total ETH: 14.06465148, Total BTC: 1.08458361"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07750000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00840396</td>
                      <td className={cl.tdTable} width="27%">0.00065130</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00250000"
                    p="0.07752100"
                    ac="14.06715148"
                    tc="1.08477741"
                    title="Total ETH: 14.06715148, Total BTC: 1.08477741"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07752100
                      </td>
                      <td className={cl.tdTable} width="38%">0.00250000</td>
                      <td className={cl.tdTable} width="27%">0.00019380</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.02011924"
                    p="0.07755000"
                    ac="14.08727072"
                    tc="1.08633765"
                    title="Total ETH: 14.08727072, Total BTC: 1.08633765"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07755000
                      </td>
                      <td className={cl.tdTable} width="38%">0.02011924</td>
                      <td className={cl.tdTable} width="27%">0.00156024</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00131382"
                    p="0.07759000"
                    ac="14.08858454"
                    tc="1.08643958"
                    title="Total ETH: 14.08858454, Total BTC: 1.08643958"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07759000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00131382</td>
                      <td className={cl.tdTable} width="27%">0.00010193</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00792294"
                    p="0.07760000"
                    ac="14.09650748"
                    tc="1.0870544"
                    title="Total ETH: 14.09650748, Total BTC: 1.0870544"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07760000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00792294</td>
                      <td className={cl.tdTable} width="27%">0.00061482</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.01917517"
                    p="0.07766000"
                    ac="14.11568265"
                    tc="1.08854354"
                    title="Total ETH: 14.11568265, Total BTC: 1.08854354"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07766000
                      </td>
                      <td className={cl.tdTable} width="38%">0.01917517</td>
                      <td className={cl.tdTable} width="27%">0.00148914</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00340000"
                    p="0.07770000"
                    ac="14.11908265"
                    tc="1.08880772"
                    title="Total ETH: 14.11908265, Total BTC: 1.08880772"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07770000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00340000</td>
                      <td className={cl.tdTable} width="27%">0.00026418</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00230612"
                    p="0.07770936"
                    ac="14.12138877"
                    tc="1.08898692"
                    title="Total ETH: 14.12138877, Total BTC: 1.08898692"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07770936
                      </td>
                      <td className={cl.tdTable} width="38%">0.00230612</td>
                      <td className={cl.tdTable} width="27%">0.00017920</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00130410"
                    p="0.07775400"
                    ac="14.12269287"
                    tc="1.08908831"
                    title="Total ETH: 14.12269287, Total BTC: 1.08908831"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07775400
                      </td>
                      <td className={cl.tdTable} width="38%">0.00130410</td>
                      <td className={cl.tdTable} width="27%">0.00010139</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00280535"
                    p="0.07778364"
                    ac="14.12549822"
                    tc="1.08930652"
                    title="Total ETH: 14.12549822, Total BTC: 1.08930652"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07778364
                      </td>
                      <td className={cl.tdTable} width="38%">0.00280535</td>
                      <td className={cl.tdTable} width="27%">0.00021821</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00340000"
                    p="0.07780000"
                    ac="14.12889822"
                    tc="1.08957104"
                    title="Total ETH: 14.12889822, Total BTC: 1.08957104"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07780000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00340000</td>
                      <td className={cl.tdTable} width="27%">0.00026452</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00343432"
                    p="0.07785739"
                    ac="14.13233254"
                    tc="1.08983842"
                    title="Total ETH: 14.13233254, Total BTC: 1.08983842"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07785739
                      </td>
                      <td className={cl.tdTable} width="38%">0.00343432</td>
                      <td className={cl.tdTable} width="27%">0.00026738</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.23719237"
                    p="0.07786505"
                    ac="14.36952491"
                    tc="1.10830741"
                    title="Total ETH: 14.36952491, Total BTC: 1.10830741"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07786505
                      </td>
                      <td className={cl.tdTable} width="38%">0.23719237</td>
                      <td className={cl.tdTable} width="27%">0.01846899</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00619149"
                    p="0.07787824"
                    ac="14.3757164"
                    tc="1.10878959"
                    title="Total ETH: 14.3757164, Total BTC: 1.10878959"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07787824
                      </td>
                      <td className={cl.tdTable} width="38%">0.00619149</td>
                      <td className={cl.tdTable} width="27%">0.00048218</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00400000"
                    p="0.07788000"
                    ac="14.3797164"
                    tc="1.10910111"
                    title="Total ETH: 14.3797164, Total BTC: 1.10910111"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07788000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00400000</td>
                      <td className={cl.tdTable} width="27%">0.00031152</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00836600"
                    p="0.07790000"
                    ac="14.3880824"
                    tc="1.10975282"
                    title="Total ETH: 14.3880824, Total BTC: 1.10975282"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07790000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00836600</td>
                      <td className={cl.tdTable} width="27%">0.00065171</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00374194"
                    p="0.07792223"
                    ac="14.39182434"
                    tc="1.1100444"
                    title="Total ETH: 14.39182434, Total BTC: 1.1100444"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07792223
                      </td>
                      <td className={cl.tdTable} width="38%">0.00374194</td>
                      <td className={cl.tdTable} width="27%">0.00029158</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00130000"
                    p="0.07798000"
                    ac="14.39312434"
                    tc="1.11014577"
                    title="Total ETH: 14.39312434, Total BTC: 1.11014577"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07798000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00130000</td>
                      <td className={cl.tdTable} width="27%">0.00010137</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00941823"
                    p="0.07800000"
                    ac="14.40254257"
                    tc="1.11088039"
                    title="Total ETH: 14.40254257, Total BTC: 1.11088039"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07800000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00941823</td>
                      <td className={cl.tdTable} width="27%">0.00073462</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00304133"
                    p="0.07801488"
                    ac="14.4055839"
                    tc="1.11111765"
                    title="Total ETH: 14.4055839, Total BTC: 1.11111765"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07801488
                      </td>
                      <td className={cl.tdTable} width="38%">0.00304133</td>
                      <td className={cl.tdTable} width="27%">0.00023726</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00336600"
                    p="0.07810000"
                    ac="14.4089499"
                    tc="1.11138053"
                    title="Total ETH: 14.4089499, Total BTC: 1.11138053"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07810000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00336600</td>
                      <td className={cl.tdTable} width="27%">0.00026288</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00137161"
                    p="0.07811239"
                    ac="14.41032151"
                    tc="1.11148766"
                    title="Total ETH: 14.41032151, Total BTC: 1.11148766"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07811239
                      </td>
                      <td className={cl.tdTable} width="38%">0.00137161</td>
                      <td className={cl.tdTable} width="27%">0.00010713</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00336600"
                    p="0.07820000"
                    ac="14.41368751"
                    tc="1.11175088"
                    title="Total ETH: 14.41368751, Total BTC: 1.11175088"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07820000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00336600</td>
                      <td className={cl.tdTable} width="27%">0.00026322</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.02500000"
                    p="0.07822000"
                    ac="14.43868751"
                    tc="1.11370638"
                    title="Total ETH: 14.43868751, Total BTC: 1.11370638"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07822000
                      </td>
                      <td className={cl.tdTable} width="38%">0.02500000</td>
                      <td className={cl.tdTable} width="27%">0.00195550</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00336600"
                    p="0.07830000"
                    ac="14.44205351"
                    tc="1.11396993"
                    title="Total ETH: 14.44205351, Total BTC: 1.11396993"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07830000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00336600</td>
                      <td className={cl.tdTable} width="27%">0.00026355</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00268223"
                    p="0.07832323"
                    ac="14.44473574"
                    tc="1.11418001"
                    title="Total ETH: 14.44473574, Total BTC: 1.11418001"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07832323
                      </td>
                      <td className={cl.tdTable} width="38%">0.00268223</td>
                      <td className={cl.tdTable} width="27%">0.00021008</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00129384"
                    p="0.07838000"
                    ac="14.44602958"
                    tc="1.11428142"
                    title="Total ETH: 14.44602958, Total BTC: 1.11428142"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07838000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00129384</td>
                      <td className={cl.tdTable} width="27%">0.00010141</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00336600"
                    p="0.07840000"
                    ac="14.44939558"
                    tc="1.11454531"
                    title="Total ETH: 14.44939558, Total BTC: 1.11454531"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07840000
                      </td>
                      <td className={cl.tdTable} width="38%">0.00336600</td>
                      <td className={cl.tdTable} width="27%">0.00026389</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00129365"
                    p="0.07846500"
                    ac="14.45068923"
                    tc="1.11464681"
                    title="Total ETH: 14.45068923, Total BTC: 1.11464681"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07846500
                      </td>
                      <td className={cl.tdTable} width="38%">0.00129365</td>
                      <td className={cl.tdTable} width="27%">0.00010150</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.01221148"
                    p="0.07850000"
                    ac="14.46290071"
                    tc="1.11560541"
                    title="Total ETH: 14.46290071, Total BTC: 1.11560541"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07850000
                      </td>
                      <td className={cl.tdTable} width="38%">0.01221148</td>
                      <td className={cl.tdTable} width="27%">0.00095860</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.02500000"
                    p="0.07855000"
                    ac="14.48790071"
                    tc="1.11756916"
                    title="Total ETH: 14.48790071, Total BTC: 1.11756916"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07855000
                      </td>
                      <td className={cl.tdTable} width="38%">0.02500000</td>
                      <td className={cl.tdTable} width="27%">0.00196375</td>
                    </div>
                    
                  </tr>
                  <tr
                    className="clRow "
                   
                    a="0.00211451"
                    p="0.07857368"
                    ac="14.49001522"
                    tc="1.1177353"
                    title="Total ETH: 14.49001522, Total BTC: 1.1177353"
                  >
                    <div className={[cl.blockTable, 'clRow'].join` `} onClick={e=>{clickRows(e)}}>
                      <td className={cl.tdTable} width="35%" >
                        0.07857368
                      </td>
                      <td className={cl.tdTable} width="38%">0.00211451</td>
                      <td className={cl.tdTable} width="27%">0.00016614</td>
                    </div>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}
export default OrderBook
