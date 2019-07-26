import React, { HTMLAttributes } from 'react';

type Props = {
  size?: number;
  color: string;
} & HTMLAttributes<SVGPathElement>

const SineWave = ({ size = 20, color, ...props }: Props) => {
  return (
    <svg width={size} height={size/2} viewBox='0 0 21 11'>
      <path
        d='M.5 5.524L5.524.5l5.024 5.024 4.976 4.976L20.5 5.524'
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