import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  height: 60px;
  width: 100%;

  position: fixed;
  bottom: 0;

  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};

  &::selection {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
  }
`;

const PlayBar = () => {
  return (
    <Bar>
      a
    </Bar>
  );
}

export default PlayBar;