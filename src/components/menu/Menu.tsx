import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import GithubLogo from '../icons/custom/GithubLogo';
import MidiTracklist from './MidiTracklist';

const Link = styled.a`
  position: absolute;
  right: 25px;
  top: 25px;
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  position: relative;
  
  height: 100vh;
  width: 250px;

  padding: 0 10px;

  @media only screen and (max-width: 1085px) {
    display: none;
  }
`;

const Menu = () => {
  const theme = useContext(ThemeContext);

  return (
    <Aside>
      <Link href='https://github.com/matheuscorreia/MIDI-Synthesizer' target='_blank'>
        <GithubLogo color={theme.colors.primary} size={25} />
      </Link>
      <MidiTracklist />
    </Aside>
  )
};

export default Menu;