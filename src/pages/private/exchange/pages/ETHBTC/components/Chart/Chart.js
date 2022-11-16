import React, {Component} from 'react'
import Highcharts from 'highcharts/highstock'
window.Highcharts = Highcharts;
class ChartWrap extends Component {

  // When the DOM is ready, create the chart.
  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.props.container,
      this.props.options
    )
  }


  //Create the div which the chart will be rendered to.
  render() {
    return (
      <div id={this.props.container} className='trade-page__chart' style={{height:550}}>
      </div>
    )
  }
}

export default ChartWrap
