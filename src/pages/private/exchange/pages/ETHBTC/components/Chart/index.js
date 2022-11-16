import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StockChartComponent,
  StockChartSeriesCollectionDirective,
  StockChartSeriesDirective,
  Inject,
  Crosshair,
  DateTime,
  Tooltip,
  RangeTooltip,
  ColumnSeries,
  LineSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
  StockChartRowsDirective,
  StockChartRowDirective,
  StockChartAxesDirective,
  StockChartAxisDirective,
} from '@syncfusion/ej2-react-charts';
import {
  EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
  AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export, Zoom, ScrollBar
} from '@syncfusion/ej2-react-charts';
import { loadChart } from '../../../../../../../actions/exchenge.action'
import { marketDataSelector, chartDataSelector } from '../../../../selectors'
import { MoonLoader } from 'react-spinners';
import './stockChart.scss'
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
  constructor() {
    super(...arguments);
    this.primaryxAxis = {
      valueType: 'DateTime',
      majorGridLines: { width: 0 },
      majorTickLines: { color: 'transparent' },
      crosshairTooltip: { enable: true },
      enableAutoIntervalOnZooming:true,
      title: 'Время',
      crossesAt: 115
    };
    this.primaryyAxis = {
      labelFormat: 'n0',
      lineStyle: { color: 'transparent' },
      majorTickLines: { color: 'transparent', width: 0 },
    };
    this.crosshair = { enable: true };
    this.periodselector = [
      { text: '1H', interval: 1, intervalType: 'Hours', selected: true},
      { text: '12H', interval: 12, intervalType: 'Hours'},
      { text: '1D', interval: 1, intervalType: 'Days' },
      { text: '7D', interval: 6, intervalType: 'Days' },
      { text: '1M', interval: 1, intervalType: 'Months' },
      { text: '3M', interval: 3, intervalType: 'Months' },
      { text: '6M', interval: 6, intervalType: 'Months' }, { text: 'All' }
    ];
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
    const { chartData, marketData, pair } = this.props
    if(chartData && chartData.loading) return <div className='trade-page__spinner-wrap'><MoonLoader color={'#1aba1a'}/></div>
    if(chartData && chartData.error) {return <h2>ERROR</h2>}

    if(chartData && chartData.loaded && chartData.data && marketData) {
      var ohlc = chartData.data.map(item => ({date:new Date(+item.date), open:+item.open, high:+item.high, low:+item.low, close:+item.close, volume:+item.volume}))
      var volume = chartData.data.map(item => ({date:new Date(+item.date), volume:+item.volume}))
      console.log(ohlc)
      return (
        <div id='stock-chart'>
          <div className='stock-chart-headers'>
            <h3 className='stock-chart-headers__header'>{marketData.market} / {marketData.coin}</h3>
            <span className='stock-chart-headers__price'>Price: {marketData.last}</span>
            <span className='stock-chart-headers__percent'>{marketData.percentChange} %</span>
            <span className='stock-chart-headers__volume'>Volume: {marketData.baseVolume}BTC</span>
          </div>
          <div className='control-pane'>
            <style>
              {SAMPLE_CSS}
            </style>
            <div className='control-section'>
              <StockChartComponent
                                   primaryYAxis={this.primaryyAxis}
                                   primaryXAxis={this.primaryxAxis}
                                   periods={this.periodselector}
                                   zoomSettings={{
                                     enableSelectionZooming:true, enablePan:true, enableScrollBar:true, mode:"x", toolbarItems:["ZoomIn", "ZoomOut", "Reset", "Pan"],
                                   }}
                                   chartArea={{ border: { width: 0 } }}
                                   tooltip={{ enable: true}}
                                   tooltipRender={tooltipRender}
                                   axisLabelRender={this.axisLabelRender.bind(this)}
                                   crosshair={{ enable: true,lineType: 'Vertical' }}
                                   load={this.load.bind(this)}
                                   title={`${marketData.market} / ${marketData.coin}`}
                                   height='550'
              >
                <Inject services={[DateTime, Crosshair, Tooltip, RangeTooltip, ColumnSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
                  EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
                  AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Zoom, ScrollBar]}/>
                  <StockChartRowsDirective>
                    <StockChartRowDirective height={'30%'}/>
                    <StockChartRowDirective height={'70%'}/>
                  </StockChartRowsDirective>
                <StockChartAxesDirective>
                  <StockChartAxisDirective name='yAxis1' rowIndex={1} labelPosition={'Inside'} tickPosition={'Inside'} opposedPosition={true} lineStyle={{ color: 'transparent' }} majorTickLines={{ color: 'transparent' }}/>
                </StockChartAxesDirective>
                <StockChartSeriesCollectionDirective>
                  <StockChartSeriesDirective dataSource={ohlc} xName='date' yName='close' type='Candle' yAxisName='yAxis1' id={pair}/>
                  <StockChartSeriesDirective dataSource={volume} xName='date' yName='volume' type='Column' enableTooltip={false} id={pair}/>
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
  load(args) {

    let selectedTheme = window.location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1))
      .replace(/-dark/i, "Dark");
  }
}

export default connect((state)=>({
  chartData: chartDataSelector(state),
  marketData: marketDataSelector(state)
}), {loadChart})(Chart);
