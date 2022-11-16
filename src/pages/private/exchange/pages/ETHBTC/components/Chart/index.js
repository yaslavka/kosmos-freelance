import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject,ITooltipRenderEventArgs,Crosshair,IAxisLabelRenderEventArgs,
  DateTime, Tooltip, RangeTooltip, ColumnSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
  StockChartRowsDirective, StockChartRowDirective, StockChartAxesDirective, StockChartAxisDirective, IStockChartEventArgs, ChartTheme
} from '@syncfusion/ej2-react-charts';
import {
  EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
  AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export
} from '@syncfusion/ej2-react-charts';
import { loadChart } from '../../../../../../../actions/exchenge.action'
import { marketDataSelector, chartDataSelector } from '../../../../selectors'
import { MoonLoader } from 'react-spinners';
import './stockChart.scss'
import {chartDatas} from "../../Chart/data";
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
        .charts {
            align :center
        }`;
export let tooltipRender = (args) => {
  if (args.text.split('<br/>')[4]) {
    let target = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
    let value = (target / 100000000).toFixed(1) + 'B';
    args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
  }
};
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
      var ohlc = chartData.data.map(item => ({date:new Date(item.date*1), open:item.open, high:item.high, low:item.low, close:item.close, volume:item.volume}))
      var volume = chartData.data.map(item => [ +item.volume])
      console.log(ohlc)
      return (
        <div id='stock-chart'>
          <div className='stock-chart-headers'>
            <h3 className='stock-chart-headers__header'>{marketData.market} / {marketData.coin}</h3>
            <span className='stock-chart-headers__price'>Price: {marketData.last}</span>
            <span className='stock-chart-headers__percent'>{marketData.percentChange} %</span>
            <span className='stock-chart-headers__volume'>Volume: {marketData.baseVolume}BTC</span>
          </div>
          <div className='control-pane' style={{height:"500"}}>
            <style>
              {SAMPLE_CSS}
            </style>
            <div className='control-section'>
              <StockChartComponent id='stockchartpane'
                                   primaryYAxis={{
                                     lineStyle: { color: 'transparent' },
                                     majorTickLines: { color: 'transparent', width: 0 }
                                   }}
                                   primaryXAxis={{
                                     crosshairTooltip: { enable: true },
                                     majorGridLines: { width: 0 },
                                     valueType: 'DateTime',
                                   }}
                                   chartArea={{ border: { width: 0 } }}
                                   tooltip={{ enable: true, animation: { enable: true }}}
                                   animation={{ enable: true }}
                                   tooltipRender={tooltipRender}
                                   axisLabelRender={this.axisLabelRender.bind(this)}
                                   crosshair={{ enable: true }}
                                   title='AAPL Historical'
              >
                <Inject services={[DateTime, Crosshair, Tooltip, RangeTooltip, ColumnSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
                  EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                  AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                  <StockChartRowsDirective>
                    <StockChartRowDirective height={'30%'}/>
                    <StockChartRowDirective height={'70%'}/>
                  </StockChartRowsDirective>
                <StockChartAxesDirective>
                  <StockChartAxisDirective name='yAxis1' rowIndex={1} labelPosition={'Inside'} tickPosition={'Inside'} opposedPosition={true} lineStyle={{ color: 'transparent' }} majorTickLines={{ color: 'transparent' }}/>
                </StockChartAxesDirective>
                <StockChartSeriesCollectionDirective>
                  <StockChartSeriesDirective dataSource={ohlc} xName='date' yName='close' type='Candle' yAxisName='yAxis1' animation={{ enable: true }}/>
                  <StockChartSeriesDirective dataSource={ohlc} xName='date' yName='volume' type='Column' enableTooltip={false} animation={{ enable: true }}/>
                  {console.log(chartDatas)}
                </StockChartSeriesCollectionDirective>
              </StockChartComponent>
            </div>
          </div>
        </div>
      );
    }

    return null
  }
  axisLabelRender(args) {
    let text = parseInt(args.text);
    if (args.axis.name === "primaryYAxis") {
      args.text = text / 100000000 + 'B';
    }
  }
}

export default connect((state)=>({
  chartData: chartDataSelector(state),
  marketData: marketDataSelector(state)
}), {loadChart})(Chart);
