import React from 'react';
import styled from 'styled-components';

import { hex2rgba } from '../../helpers/ui';

import { useCurrentTime } from '../../hooks/useMidiReader';

const ProggressBarWrapper = styled.div`
  display: flex;
  flex: 1;

  padding: 0 15px
  align-items: center;
`

const ProggressBarWhole = styled.div`
  display: flex;
  flex: 1;
  height: 5px;
  border-radius: 5px;
  background-color: ${props => hex2rgba(props.theme.colors.secondary, 0.3)};
  overflow: hidden;
`

const Proggress = styled.div`
  transition: transform 0.1s ease;
  height: 100%;
  border-radius: 5px;
  flex: 1;
  background-color: ${props => props.theme.colors.secondary};
`;

const ProggressBar = () => {
  const { remainingPercentage } = useCurrentTime();
  console.log(remainingPercentage);
  return (
    <ProggressBarWrapper>
      <ProggressBarWhole>
        <Proggress style={{ transform: `translateX(-${remainingPercentage}%)` }}/>
      </ProggressBarWhole>
    </ProggressBarWrapper>
  )
}

export default ProggressBar;