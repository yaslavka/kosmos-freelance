import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChartWrap from './Chart'
import { loadChart } from '../../../../../../../actions/exchenge.action'
import { options } from './options'
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
