import React from 'react';
import styled from 'styled-components';

import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import Button from '../common/Button';
import Icon from '../icons/Icon';

const StyledSectionHeader = styled(SectionHeader)`
  display: flex;
  align-items: center;
  font-size: 18px;
`;

const Tracklist = styled.ul`
  display: flex;

  height: 300px;
  width: 100%;

  list-style-type: none;
  flex-direction: column;

  margin: 0;
  padding: 15px 0 0 0;
`;

const TracklistItem = styled.li`
  display: flex;
  width: 100%;
  height: 40px;

  margin-top: 5px;
`;

const DefaultMidiList = () => {
  return (
    <Section>
      <StyledSectionHeader fullWidth>
        <Icon>music_note</Icon> Tracks
      </StyledSectionHeader>
      <Tracklist>
        <TracklistItem>
          <Button fullWidth>
            Castlevania - Bloody Tears
          </Button>
        </TracklistItem>
        <TracklistItem>
          <Button fullWidth>
            Tetris Main Theme
          </Button>
        </TracklistItem>
      </Tracklist>
    </Section>
  );
}

export default DefaultMidiList;