import React from "react";

const Inputs = ({label, type, value, onChange, ...rest})=>{
  return <div {...rest}><label>{label}</label><input value={value} type={type} onChange={onChange}/></div>
}
export default Inputs
