import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  color: #FFF;
`;

type Props = {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: Props) => {
  return (
    <Wrapper {...props}>
      {children}
    </Wrapper>
  );
}

export default Button;