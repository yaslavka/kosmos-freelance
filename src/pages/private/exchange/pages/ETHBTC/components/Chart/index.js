import React, { Component } from 'react'
import { connect } from 'react-redux'
//import ChartWrap from './Chart'
import { loadChart } from '../../../../../../../actions/exchenge.action'
import { marketDataSelector, chartDataSelector } from '../../../../selectors'
import { MoonLoader } from 'react-spinners';
import './stockChart.scss'
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import './App.css'
import {chartDatas} from "../../Chart/data";

//import {chartData} from "../../Chart/data";
class Chart extends Component {
  constructor() {
    super(...arguments);
    this.primaryxAxis = {
      valueType: 'DateTime',
      majorGridLines: { width: 0 },
      majorTickLines: { color: 'transparent' }
    };
    this.primaryyAxis = {
      labelFormat: 'n0',
      majorTickLines: { width: 0 }
    };
  }
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
      var ohlc = chartData.data.map(item => [{date:new Date(item.date*1000),open:item.open,high:item.high,low:item.low,close:item.close,volume:item.volume}])
      console.log(ohlc)
      // var volume = chartData.data.map(item => [item.date * 1000, item.volume])
      // var groupingUnits = [[
      //   'week',             // unit name
      //   [1]               // allowed multiples
      // ], [
      //   'month',
      //   [1, 2, 3, 4, 6]
      // ]]
      // const options ={
      //   credits:{
      //     enabled: false
      //   },
      //   styledMode:{
      //     enabled: true,
      //   },
      //   rangeSelector: {
      //     allButtonsEnabled: true,
      //     enabled: true,
      //     selected: 1,
      //   },
      //   title: {
      //     text: 'График Цены'
      //   },
      //   navigator: {
      //     enabled: true,
      //     series: [{
      //       data: volume
      //     }]
      //   },
      //   legend: { enabled: false },
      //   yAxis: [{
      //     type: 'datetime',
      //     dateTimeLabelFormats:{
      //       millisecond: '%H:%M:%S.%L',
      //       second: '%H:%M:%S',
      //       minute: '%H:%M',
      //       hour: '%H:%M',
      //       day: '%e. %b',
      //       week: '%e. %b',
      //       month: '%b \'%y',
      //       year: '%Y'
      //     },
      //     labels: {
      //       align: 'right',
      //       x: -2
      //     },
      //     title: {
      //       text: `${t('private.exchange.trade.pair.price')}`
      //     },
      //     height: '60%',
      //     lineWidth: 2,
      //     resize: {
      //       enabled: true
      //     }
      //   }, {
      //     labels: {
      //       align: 'right',
      //       x: -2
      //     },
      //     title: {
      //       text: 'Volume'
      //     },
      //     top: '65%',
      //     height: '35%',
      //     offset: 0,
      //     lineWidth: 2
      //   }],
      //
      //   tooltip: {
      //     split: true
      //   },
      //   xAxis:{
      //     type: 'datetime',
      //     dateTimeLabelFormats: {
      //       millisecond: '%H:%M:%S.%L',
      //       second: '%H:%M:%S',
      //       minute: '%H:%M',
      //       hour: '%H:%M',
      //       day: '%e. %b',
      //       week: '%e. %b',
      //       month: '%b \'%y',
      //       year: '%Y'
      //     }
      //   },
      //   plotOptions:{
      //     series:{
      //       turboThreshold:1000000
      //     },
      //     candlestick: {
      //       color: 'red',
      //       upColor: 'green'
      //     }
      //   },
      //   series:[{
      //     type: 'candlestick',
      //     name: `${marketData.coin}`,
      //     data: ohlc,
      //
      //     dataGrouping: {
      //       units: groupingUnits
      //     }
      //
      //   },{
      //     type: 'column',
      //     name: `${marketData.coin}`,
      //     data: volume,
      //     yAxis: 1,
      //     dataGrouping: {
      //       units: groupingUnits
      //     }
      //
      //   }
      //   ]
      // }
      // console.log(options)
      // options.series[0].pointStart = chartData.start*1000
      // options.series[0].pointInterval = chartData.period*1000
      // options.series[0].data = ohlc
      // options.series[1].data = volume
      return (
        <div id='stock-chart'>
          <div className='stock-chart-headers'>
            <h3 className='stock-chart-headers__header'>{marketData.market} / {marketData.coin}</h3>
            <span className='stock-chart-headers__price'>Price: {marketData.last}</span>
            <span className='stock-chart-headers__percent'>{marketData.percentChange} %</span>
            <span className='stock-chart-headers__volume'>Volume: {marketData.baseVolume}BTC</span>
          </div>
          <StockChartComponent
            id='stockcharts' primaryXAxis={this.primaryxAxis} primaryYAxis={this.primaryyAxis} height='350' title='AAPL Stock Price'
          >
            <Inject services={[DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
            <StockChartSeriesCollectionDirective>
              {/* To create a Hilo Open Close series, import HiloOpenCloseSeries from the chart package and inject it into chart services. Then change the series type to HiloOpenClose*/}
              {/* To create a CandleSeries,import CandleSeries from chart package and inject it into chart series. Then change services type to Candle*/}
              <StockChartSeriesDirective dataSource={chartDatas} type='Candle' animation={{ enable: true }} id={pair}/>
            </StockChartSeriesCollectionDirective>
          </StockChartComponent>
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
