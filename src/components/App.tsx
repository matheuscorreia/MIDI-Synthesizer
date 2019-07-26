import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { hex2rgba } from '../helpers/ui';

import SynthEngineContext from './contexts/SynthEngineContext';

import AudioContext from '../synthEngine/AudioContext';
import SynthEngine from '../synthEngine/SynthEngine';

import AppTemplate from './AppTemplate';
import AudioContextSupportModal from './AudioContextSupportModal';
import InitSynthEngineModal from './InitSynthEngineModal';
import theme from '../theme'

const GlobalStyle = createGlobalStyle`
  ::selection {
    background-color: ${props => hex2rgba(props.theme.colors.primary, 0.99)};
    color: ${props => props.theme.colors.secondary};
  }

  html, body {
    background-color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.font.family}, Arial;
    color: ${props => props.theme.colors.primary};
  }
`;

const App: React.FC = () => {
  const [ synthEngine, setSynthEngine ] = useState<SynthEngine | null>(null);

  const hasAudioContext = Boolean(AudioContext);

  const initSynthEngine = () => {
    const Ctx = AudioContext as any;

    const ctx = new Ctx();

    setSynthEngine(new SynthEngine(ctx));
  }

  const renderAppTemplate = () => {
    if(!hasAudioContext) {
      return <AudioContextSupportModal />;
    }

    if(!synthEngine) {
      return <InitSynthEngineModal handleInit={initSynthEngine} />
    }

    return <AppTemplate />
  };
  
  return (    
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <SynthEngineContext.Provider value={synthEngine}>
          {renderAppTemplate()}
        </SynthEngineContext.Provider>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
