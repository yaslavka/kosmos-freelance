import React, { Component } from 'react';
import './ChartOptions.css'
import ChartOptionsMarket from "./ChartOptionsMarket/ChartOptionsMarket";
class ChartOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      market: this.props.market,
      exchange: this.props.exchange,
      timespan: this.props.timespan,
    };

    this.receiveUpdateFromChild = this.receiveUpdateFromChild.bind(this);
  }

  receiveUpdateFromChild(...args) {
    switch (args.length) {
      case 2:
        let [field, value] = [args[0], args[1]];
        this.setState({ [field]: value }, () => {
          this.props.updateParent(field, value);
        });
        break;
      case 4:
        let [field1, value1, field2, value2] = [
          args[0],
          args[1],
          args[2],
          args[3],
        ];
        this.setState({ [field1]: value1, [field2]: value2 }, () => {
          this.props.updateParent(field1, value1, field2, value2);
        });
        break;
      default:
        break;
    }
  }
  render() {
    const { all_markets, market, exchange, timespan } = this.state;
    return(
      <div className="options-list">
        <div className="market-exchange">
          <ChartOptionsMarket
            exchange={exchange}
            updateParent={this.receiveUpdateFromChild}
            market={market}
          />
        </div>
      </div>
    )
  }

}
export default ChartOptions;
