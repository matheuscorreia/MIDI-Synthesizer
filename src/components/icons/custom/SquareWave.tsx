import React, { HTMLAttributes } from 'react';

type Props = {
  size?: number;
  color: string;
} & HTMLAttributes<SVGPathElement>

const SineWave = ({ size = 20, color, ...props }: Props) => {
  return (
    <svg width={size} height={size/2} viewBox='0 0 21 11'>
      <path
        d='M.5 5.635V.504h10.091v10H20.5V5.635'
        fill='none'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
        {...props}
      />
    </svg>
  )
};

export default SineWave;