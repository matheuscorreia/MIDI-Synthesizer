import React from 'react';

type Props = {
  children: string;
  className: string;
}

const Icon = ({ children, className, ...props }:Props) => {
  return (
    <i className={`material-icons ${className}`} >{children}</i>
  )
}

export default Icon;