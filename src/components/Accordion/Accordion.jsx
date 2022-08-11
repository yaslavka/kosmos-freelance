import React from 'react';
import AccItem from './AccItem';
import cl from './Accordion.module.css';

const Accordion = ({infoData})=>{
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    return (
        <div className={cl.accordion}>
            {infoData.map((e,i)=><AccItem title={e.title} handleChange={handleChange} expanded={expanded} linkBtn={e.linkBtn} nameBtn={e.nameBtn} inputsArr={e.inputsArr} check={'panel'+(i+1)}/>)}
        </div>
    )
}

export default Accordion