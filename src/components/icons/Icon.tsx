import React from 'react';

type Props = {
  children: string;
}

const Icon = ({ children }:Props) => {
  return (
    <i className='material-icons'>{children}</i>
  )
}

export default Icon;