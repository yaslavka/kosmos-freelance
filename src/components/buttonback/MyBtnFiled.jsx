import React from "react";
import cl from './MyBtnFiled.module.css'

const MyBtnFiled = ({children, classes, ...props})=>{
    return (
        <button className={[cl.myBtn, classes].join` `} {...props}>
            {children}
        </button>
    )
}

export default MyBtnFiled