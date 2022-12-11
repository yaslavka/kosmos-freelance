import React from 'react'
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
  StockChartAxisDirective
} from '@syncfusion/ej2-react-charts';
import {
  EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator,
  AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator ,Export
} from '@syncfusion/ej2-react-charts';
import './App.css'
import { chartDatas } from './data'

function Chart() {

  return (
    //Hilo Chart
    <div className='control-pane'>
      <div className='control-section'>
        <StockChartComponent
          primaryYAxis={{
            valueType: 'DateTime',
            majorGridLines: { width: 0 },
            majorTickLines: { color: 'transparent'},
            crosshairTooltip: { enable: true },
            intervalType: 'Hours',
          }}
          primaryXAxis={{labelFormat: 'n0',
            lineStyle: { color: 'transparent' },
            majorTickLines: { color: 'transparent', width: 0 },}}
          periods={[
            { text: '12ч', interval: 13, intervalType: 'Hours', selected: true},
            { text: '24ч', interval: 24, intervalType: 'Hours'},
            { text: '7д', interval: 6, intervalType: 'Days' },
            { text: '1M', interval: 1, intervalType: 'Months' },
            { text: '3M', interval: 3, intervalType: 'Months' },
            { text: '6M', interval: 6, intervalType: 'Months' }, { text: 'All' }
          ]}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true}}
          crosshair={{ enable: true,lineType: 'Vertical' }}
          height='550'
        >
          <Inject services={[DateTime, Crosshair, Tooltip, RangeTooltip, ColumnSeries, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines,
            EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export,
            AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
          <StockChartRowsDirective>
            <StockChartRowDirective height={'30%'}/>
            <StockChartRowDirective height={'70%'}/>
          </StockChartRowsDirective>
          <StockChartAxesDirective>
            <StockChartAxisDirective name='yAxis1' rowIndex={1}  tickPosition={'Inside'} opposedPosition={false} lineStyle={{ color: 'transparent' }} majorTickLines={{ color: 'transparent' }}/>
          </StockChartAxesDirective>
          <StockChartSeriesCollectionDirective>
            <StockChartSeriesDirective dataSource={chartDatas} xName='date' yName='close' type='Candle' yAxisName='yAxis1' />
            <StockChartSeriesDirective dataSource={chartDatas} xName='date' yName='volume' type='Column' enableTooltip={false} />
          </StockChartSeriesCollectionDirective>
        </StockChartComponent>
      </div>
    </div>
  )
}

export default Chart
