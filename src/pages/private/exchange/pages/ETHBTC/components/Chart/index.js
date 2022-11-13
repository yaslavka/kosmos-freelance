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
    const { loadChart, pair } = this.props
    loadChart(pair)
  }
  render() {
    const { chartData, marketData, pair } = this.props
    if(chartData && chartData.loading) return <div className='trade-page__spinner-wrap'><MoonLoader color={'#1aba1a'}/></div>
    if(chartData && chartData.error) {return <h2>ERROR</h2>}

    if(chartData && chartData.loaded && chartData.data && marketData) {
      var ohlc = chartData.data.map(item => [item.date*1000, item.open, item.high, item.low, item.close])
      var volume = chartData.data.map(item => [item.date*1000, item.volume])

      const options ={
        rangeSelector: {
          allButtonsEnabled: true,
          enabled: true,
          buttons:[{
            type: 'month',
            count: 1,
            text: '1m'
          }, {
            type: 'month',
            count: 3,
            text: '3m'
          }, {
            type: 'month',
            count: 6,
            text: '6m'
          }, {
            type: 'ytd',
            text: 'YTD'
          }, {
            type: 'year',
            count: 1,
            text: '1y'
          }, {
            type: 'all',
            text: 'All'
          }]
        },
        title: {
          text: ''
        },
        navigator: {
          enabled: true,
          series: {
            data: []
          }
        },
        tooltip: {split: true},
        legend: { enabled: false },
        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],
        xAxis:{
          type: 'datetime',
          range: 30 * 24 * 3600 * 1000,
          dateTimeLabelFormats: {
            day: '%e. %b'
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
          name: 'AAPL',
          data: ohlc,
          id: 'dataseries',
          yAxis: 0,
        },{
          type: 'column',
          name: 'Volume',
          data: volume,
          yAxis: 1,
          id: 'dataseries',
        }
        ]
      }
      console.log(options)
      options.series[0].pointStart = chartData.start*1000
      options.series[0].pointInterval = chartData.period*1000
      options.series[0].data = ohlc
      options.series[1].data = volume
      return (
        <div id='stock-chart' className='trade-page__chart'>
          <div className='stock-chart-headers'>
            <h3 className='stock-chart-headers__header'>{marketData.market} / {marketData.coin}</h3>
            <span className='stock-chart-headers__price'>Price: {marketData.last}</span>
            <span className='stock-chart-headers__percent'>{marketData.percentChange} %</span>
            <span className='stock-chart-headers__volume'>Volume: {marketData.baseVolume}BTC</span>
          </div>
          <ChartWrap
            container = {'stock'}
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
