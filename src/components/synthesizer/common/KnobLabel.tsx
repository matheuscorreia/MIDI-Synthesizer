import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  margin-top: 5px;
  text-align: center;
  font-size: 8px;
`;

type Props = {
  children: string;
  htmlFor: string;
};

const KnobLabel = ({ children, ...props }: Props) => {
  return (
    <Label {...props}>
      {children}
    </Label>
  )
}

export default KnobLabel;