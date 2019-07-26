import React, { HTMLAttributes } from 'react';

type Props = {
  size?: number;
  color: string;
} & HTMLAttributes<SVGPathElement>

const SawtoothWave = ({ size = 20, color, ...props }: Props) => {
  return (
    <svg width={size} height={size/2} viewBox='0 0 21 11'>
      <path
        d='M.5 5.566L10.621.501v10L20.5 5.566'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      />
    </svg>
  )
};

export default SawtoothWave;