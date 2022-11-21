import React, {Component} from "react";
import PropTypes from "prop-types";

class Oderbuypric extends Component{
  static propTypes = {
    data: PropTypes.array,
    pair: PropTypes.string,
    type: PropTypes.string
  };

  render() {
    const { order } = this.props
    console.log(order)
   return(
     <>
       <div className="sm" id="label_bestbuy">

       </div>
     </>
   )
  }
}
export default Oderbuypric
