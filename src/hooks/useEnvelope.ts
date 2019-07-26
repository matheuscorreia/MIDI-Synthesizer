import { useState } from 'react';

import EnvelopeGenerator from '../synthEngine/modules/envelope/EnvelopeGenerator';

type UseEnvelopeReturn = [
  [number, (a: number) => void],
  [number, (d: number) => void],
  [number, (s: number) => void],
  [number, (r: number) => void],
]

const useEnvelope = (generator: EnvelopeGenerator): UseEnvelopeReturn => {
  const [ attack, attackSetter ] = useState(generator.getAttack()); 
  const [ decay, decaySetter ] = useState(generator.getDecay()); 
  const [ sustain, sustainSetter ] = useState(generator.getSustain()); 
  const [ release, releaseSetter ] = useState(generator.getRelease());

  const setAttack = (a: number) => {
    attackSetter(a);
    generator.setAttack(a);
  }
  const setDecay = (d: number) => {
    decaySetter(d);
    generator.setDecay(d);
  }
  const setSustain = (s: number) => {
    sustainSetter(s)
    generator.setSustain(s);
  }
  const setRelease = (r: number) => {
    releaseSetter(r)
    generator.setRelease(r);
  }

  return [
    [attack, setAttack],
    [decay, setDecay],
    [sustain, setSustain],
    [release, setRelease],
  ]
};

export default useEnvelope;