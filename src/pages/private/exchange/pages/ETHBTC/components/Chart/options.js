export const options = {
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
        data: ''
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
    series: [{
      type: 'candlestick',
      name: '',
      data: [],
      id: 'dataseries'
      }, {
      type: 'column',
      name: 'Volume',
      data: [],
      yAxis: 1
    }
  ]
}
