import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';

import IconButton from '../common/IconButton'
import Icon from '../icons/Icon';

import { useCurrentTime, useIsPlaying, useMidiControls, useTrackInfo } from '../../hooks/useMidiReader';

import ProggressBar from './ProggressBar';

const StyledIconButton = styled(IconButton)`
  width: 60px;
`;

const Bar = styled.div`
  display: flex;

  height: 60px;
  width: 100%;

  position: absolute;
  bottom: 0;

  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};

  &::selection {
    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.primary};
  }
`;

const Time = styled.span`
  width: 65px;
  display: flex;
  align-items: center;

  margin-left: 10px;
  font-size: 12px;
`;


const PlayBar = () => {
  const theme = useContext(ThemeContext);
  
  const padSeconds = (seconds: number) => String(seconds).padStart(2, '0')

  const secondsToPlaybackTimestamp = (seconds?: number) => {
    if(seconds === undefined || Number.isNaN(seconds)) {
      return `--:--`;
    } 

    const leftSide = Math.floor(seconds/60);
    const rightSide = Math.floor(seconds - leftSide*60);

    return `${padSeconds(leftSide)}:${padSeconds(rightSide)}`;
  }

  const { totalTrackDuration } = useTrackInfo();
  const isPlaying = useIsPlaying();
  const { currentTime } = useCurrentTime();
  const { pause, play } = useMidiControls();

  return (
    <Bar>
      <StyledIconButton onClick={isPlaying ? pause : play} backgroundColor={theme.colors.secondary}>
        <Icon>{isPlaying ? 'pause' : 'play_arrow'}</Icon>
      </StyledIconButton>
      <Time>
        {`${secondsToPlaybackTimestamp(currentTime)}/${secondsToPlaybackTimestamp(totalTrackDuration)}`}
      </Time>
      <ProggressBar />
    </Bar>
  );
}

export default PlayBar;