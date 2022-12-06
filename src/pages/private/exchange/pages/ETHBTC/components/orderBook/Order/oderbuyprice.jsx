import React, {Component} from "react";
import PropTypes from "prop-types";
import Oderbuypric from "./oderbuypric";

class Oderbuyprice extends Component{
  static propTypes = {
    data: PropTypes.array,
    pair: PropTypes.string,
    type: PropTypes.string
  };

  render() {
    const { pair, type, data, t  } = this.props
    const orders = data ?
      data.map( (order, index) =><Oderbuypric key ={index} order={order} pair={pair} type={type} t={t}/>):null
   return(
     <>
       <div className="sm" id="label_bestbuy">
         {orders}
       </div>
     </>
   )
  }
}
export default Oderbuyprice
