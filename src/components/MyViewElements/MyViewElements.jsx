import React, { useState, useEffect, useMemo } from 'react'
import cl from './MyViewElements.module.css'
import { useInView } from 'react-intersection-observer'

// eslint-disable-next-line react/prop-types
const MyViewElement = ({ element }) => {
  const { ref, inView } = useInView()
  const [isViewElement, setIsViewElement] = useState(true)
  const [classes, setClasses] = useState([cl.disableElement])
  // cl.activeElement
  useEffect(() => {
    window.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        setIsViewElement(false)
      } else if (event.deltaY > 0) {
        setIsViewElement(true)
      }
    })
  }, [isViewElement])

  useMemo(() => {
    if (inView) setClasses([...classes, cl.activeElement])
    // eslint-disable-next-line
  }, [inView])
  return (
    <div ref={ref}>
      <div className={classes.join` `}>{element}</div>
    </div>
  )
}

export default MyViewElement
