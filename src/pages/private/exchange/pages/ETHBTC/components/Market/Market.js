import React, {Component} from 'react'
import 'simplebar/dist/simplebar.min.css'
import { connect } from 'react-redux'
import {loadAllMarkets,  sortMarkets} from '../../../../../../../actions/exchenge.action'
import {
  chartsByMarketSelector,
  marketSelector,
  sortBySelector,
  sortOrderSelector,
} from '../../../../selectors'
import PropTypes from 'prop-types'
import Markets from "./Marcets";
import MarketsToggle from "./MarketsToggle";
import MarketsTable from "./MarketsTable";

class Market extends Component{
  static propTypes = {
    marketsData: PropTypes.array.isRequired,
    market: PropTypes.string,
    sortBy: PropTypes.string,
    sortOrder: PropTypes.bool,
    pair: PropTypes.string
  };
  componentDidMount() {
    const { loadAllMarkets } = this.props
    loadAllMarkets()
  }

  render() {
    const { marketsData, market, pair, t } = this.props
    const markets = marketsData ?
      marketsData.map( (market) => <Markets key={market.id} market={market} pair={pair} t={t}/> ) : null
    return (
      <div className="left_bar">
        <MarketsToggle market={market} t={t}/>
        <MarketsTable
          getClassName = { this.getClassName }
          handleClick = { this.handleClick }
          markets = { markets }
          pair = { pair }
          t={t}
        />
      </div>
    )
  }


handleClick = (ev) => {
  const { sortMarkets, sortBy, sortOrder } = this.props
  const column = ev.target.getAttribute('data-column')
  column === sortBy ? sortMarkets(column, !sortOrder) : sortMarkets(column, false)
}
getClassName = (value) => {
  const { sortBy, sortOrder } = this.props
  if(value === sortBy) {
    return sortOrder ? ('markets-list__table-header markets-list__table-header--sorted-up') :
      ('markets-list__table-header markets-list__table-header--sorted-down')
  }
  return 'markets-list__table-header'
}
}

export default connect(
  (state) => ({
    marketsData: chartsByMarketSelector(state),
    market: marketSelector(state),
    sortBy: sortBySelector(state),
    sortOrder: sortOrderSelector(state)
  }),
  { loadAllMarkets, sortMarkets })(Market);
