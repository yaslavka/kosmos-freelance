import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChartWrap from './Chart'
import { loadChart } from '../../../../../../../actions/exchenge.action'
import { marketDataSelector, chartDataSelector } from '../../../../selectors'
import { MoonLoader } from 'react-spinners';
import './stockChart.scss'

class Chart extends Component {

  componentWillReceiveProps(nextProps) {
    const { loadChart, pair } = this.props
    if(pair !== nextProps.pair) {loadChart(nextProps.pair)}

  }

  componentDidMount() {
    const { loadChart, pair} = this.props
    loadChart(pair)
  }
  render() {
    const { chartData, marketData, pair, t } = this.props
    if(chartData && chartData.loading) return <div className='trade-page__spinner-wrap'><MoonLoader color={'#1aba1a'}/></div>
    if(chartData && chartData.error) {return <h2>ERROR</h2>}

    if(chartData && chartData.loaded && chartData.data && marketData) {
      var ohlc = chartData.data.map(item => [[item.date*100000], [item.open], [item.high], [item.low], [item.close]])
      var volume = chartData.data.map(item => [[item.date*100000], [item.volume]])
      var groupingUnits = [[
        'week',             // unit name
        [1]               // allowed multiples
      ], [
        'month',
        [1, 2, 3, 4, 6]
      ]]
      const options ={
        credits:{
          enabled: false
        },
        styledMode:{
          enabled: true,
        },
        rangeSelector: {
          enabled: true,
          selected: 1,
        },
        title: {
          text: 'График Цены'
        },
        navigator: {
          enabled: true,
          series: [{
            data: volume
          }]
        },
        legend: { enabled: false },
        yAxis: [{
          dateTimeLabelFormats:{
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b \'%y',
            year: '%Y'
          },
          labels: {
            align: 'right',
            x: -2
          },
          title: {
            text: `${t('private.exchange.trade.pair.price')}`
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'right',
            x: -2
          },
          title: {
            text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],

        tooltip: {
          split: true
        },
        xAxis:{
          type: 'datetime',
          range: 30 * 24 * 3600 * 1000,
          dateTimeLabelFormats: {
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%e. %b',
            week: '%e. %b',
            month: '%b \'%y',
            year: '%Y'
          }
        },
        plotOptions:{
          series:{
            turboThreshold:1000000
          },
          candlestick: {
            color: 'red',
            upColor: 'green'
          }
        },
        series:[{
          type: 'candlestick',
          name: `${marketData.coin}`,
          data: ohlc,

          dataGrouping: {
            units: groupingUnits
          }

        },{
          type: 'column',
          name: `${marketData.coin}`,
          data: volume,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          }

        }
        ]
      }
      console.log(options)
      options.series[0].pointStart = chartData.start*1000
      options.series[0].pointInterval = chartData.period*1000
      options.series[0].data = ohlc
      options.series[1].data = volume
      return (
        <div id='stock-chart'>
          <div className='stock-chart-headers'>
            <h3 className='stock-chart-headers__header'>{marketData.market} / {marketData.coin}</h3>
            <span className='stock-chart-headers__price'>Price: {marketData.last}</span>
            <span className='stock-chart-headers__percent'>{marketData.percentChange} %</span>
            <span className='stock-chart-headers__volume'>Volume: {marketData.baseVolume}BTC</span>
          </div>
          <ChartWrap
            container = {'container'}
            options = {options}
            id = {pair}
          />
        </div>
      );
    }
    return null
  }
}

export default connect((state)=>({
  chartData: chartDataSelector(state),
  marketData: marketDataSelector(state)
}), {loadChart})(Chart);
