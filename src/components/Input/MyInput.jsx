import React, {useMemo, useState, useRef} from "react";
import cl from './MyInput.module.css';

const MyInput = (props)=>{
    const [inputItem, setInputItem] = useState('')
 
    const {classesInput, classesPlace,type, place, setInput, input, valueInput, setCheckInputSite} = props
    return (
        <label className={cl.inputBlock} htmlFor="inp">
            <input type={type} required id="inp" className={[cl.myInput, classesInput].join` `} value={valueInput} onChange={e=>{e.preventDefault(); setInput ? setInput({...input, namePerson: e.target.value}) : setCheckInputSite(e.target.value)}}/>
            <span className={[cl.inputPlace, classesPlace].join` `}>{place}</span>
        </label>
       
    )
}

export default MyInput