import { createContext } from 'react';

import SynthEngine from '../../synthEngine/SynthEngine';

const SynthEngineContext = createContext<SynthEngine | null>(null);

export default SynthEngineContext;