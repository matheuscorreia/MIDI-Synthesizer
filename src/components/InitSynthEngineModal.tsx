import React from 'react';

import Button from './common/Button';
import Card from './common/Card';

type Props = {
  handleInit: () => void;
}

const InitSynthEngineModal = ({ handleInit }: Props) => {
  return (
    <Card>
      Click to start the Synthesizer!
      <Button onClick={handleInit}>
        Initiate
      </Button>
    </Card>
  );
}

export default InitSynthEngineModal;