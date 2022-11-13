import React, { Component } from 'react';
import { getMarketData } from '../utils';
import { FadingCircle } from 'better-react-spinkit';
import Select from "react-select/base";

class ChartOptionsMarket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marketsList: [],
      market: this.props.market,
      loading: true,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    // const { exchange } = this.state;
    // this.refs[exchange].classList.add('active');

    //Grab markets from default exchange.
    getMarketData(this.props.exchange).then(markets => {
      this.setState({ marketsList: [...markets], loading: false });
    });
  }

  handleSelect(selectedOption) {
    let field = selectedOption.key;
    let value = selectedOption.value;

    //update select fields
    this.setState({ [field]: value }, () => {
      //update parent container with new timespan or market.

      this.props.updateParent(field, value);
    });
  }

  render() {
    const { market, marketsList } = this.state;
    if (this.state.loading) {
      return (
        <div className="chart-spinner">
          {' '}
          <FadingCircle size={40} color="gray" />
        </div>
      );
    }
    return(
      <></>
    )
  }
}
export default ChartOptionsMarket;
