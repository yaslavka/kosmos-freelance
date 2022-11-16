import React from 'react'
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  CandleSeries,
  Inject,
  DateTime,
  Tooltip,
  Crosshair,
} from '@syncfusion/ej2-react-charts'
import './App.css'
import { chartDatas } from './data'
function Chart() {
  return (
    //Hilo Chart
    <ChartComponent
      title="График торгов"
      primaryXAxis={{
        valueType: 'DateTime',
        minimum: new Date('2016, 12, 31'),
        maximum: new Date('2017, 9, 30'),
        labelFormat: 'yMMM',
        title: 'Время',
        crosshairTooltip: { enable: true },
      }}
      primaryYAxis={{ title: 'Цена' }}
      tooltip={{ enable: true }}
      crosshair={{ enable: true, lineType: 'Vertical' }}
    >
      <Inject services={[CandleSeries, DateTime, Tooltip, Crosshair]}/>
      <SeriesCollectionDirective>
        {/* To create a Hilo Open Close series, import HiloOpenCloseSeries from the chart package and inject it into chart services. Then change the series type to HiloOpenClose*/}
        {/* To create a CandleSeries,import CandleSeries from chart package and inject it into chart series. Then change services type to Candle*/}
        <SeriesDirective
          type="Candle"
          name="Apple INC."
          dataSource={chartDatas}
          xName="date"
          high="high"
          low="low"
          open="open"
          close="close"
        />
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default Chart
