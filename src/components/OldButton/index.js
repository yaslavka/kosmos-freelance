import React from 'react'

export default function Button({
  // eslint-disable-next-line react/prop-types
  children,
  // eslint-disable-next-line react/prop-types
  size,
  // eslint-disable-next-line react/prop-types
  color,
  // eslint-disable-next-line react/prop-types
  className = '',
  ...props
}) {
  return (
    <button className={` ${className}`} {...props}>
      {children}
    </button>
  )
}
