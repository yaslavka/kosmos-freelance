import React, {Component} from 'react'
import Highcharts from 'highcharts/highstock'

class ChartWrap extends Component {
  // When the DOM is ready, create the chart.
  componentDidMount() {
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.props.container,
      console.log(this.props.container),
      this.props.options,
      console.log(this.props.options),
    )
    console.log(this.chart)
  }


  //Create the div which the chart will be rendered to.
  render() {
    return (
      <div id={this.props.container} >
      </div>
    )
  }
}

export default ChartWrap
