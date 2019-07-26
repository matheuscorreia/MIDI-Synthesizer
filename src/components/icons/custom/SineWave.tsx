import React, { HTMLAttributes } from 'react';

type Props = {
  size?: number;
  color: string;
} & HTMLAttributes<SVGPathElement>

const SineWave = ({ size = 20, color, ...props }: Props) => {
  return (
    <svg width={size} height={size/2} viewBox='0 0 21 11'>
      <path
        d='M.437 5.634c4.8-8.726 7.657-4.681 10.129 0s6.421 8.069 9.871 0'
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