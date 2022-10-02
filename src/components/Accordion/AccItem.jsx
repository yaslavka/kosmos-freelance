import React, {useState} from 'react';
import cl from './Accordion.module.css';
import MyViewElement from '../MyViewElements/MyViewElements';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FormGroup } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik'

import Input from '../Input';
import InputMultiline from '../InputMultiline';

const AccItem = ({title, inputsArr, nameBtn, linkBtn,handleChange, expanded, check,initialValues,validationSchema,handleOnSubmit })=>{
    const [isActive, setIsActive] = useState(false)
    return (
            <MyViewElement element={
                <Accordion expanded={isActive ? expanded === check : false} onClick={e=>setIsActive(true)} defaultExpanded={false} onChange={handleChange(check)} className={cl.Accordion}>
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" className={cl.accSummary}>
          <Typography className={cl.accordionTitle}>
               {title} 
          </Typography>
            <div className={'accordionSignBlock'}> 
                <span className={'accordionLineV'}/>
                <span className={'accordionLineH'}/>
            </div>
          </AccordionSummary>
          <AccordionDetails>
          <Typography>
            <div className={cl.accordionCard}>
                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleOnSubmit}
                    > 
                    <Form className={cl.card}>
                    {inputsArr.textArea !== undefined ? 
                        <FormGroup>
                            <Field
                            type="text"
                            name={inputsArr.name}
                            placeholder={inputsArr.place}
                            component={InputMultiline}
                            />
                    </FormGroup>
                    :
                    <div className={cl.cardBody}>
                        {inputsArr.map(e=>
                            <FormGroup>
                                <Field
                                type="password"
                                name={e.name}
                                placeholder={e.place}
                                component={Input}
                                />
                            </FormGroup>
                        )}
                    </div>
                    }
                </Form>
                </Formik>
            </div>
          </Typography>
          </AccordionDetails>
      </Accordion>
            }/>
          
        
    )
}

export default AccItem