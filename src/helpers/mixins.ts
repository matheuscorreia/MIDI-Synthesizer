import { css } from 'styled-components';

import { hex2rgba } from '../helpers/ui';

export const backgroundGridMixin = css`
  background:
  repeating-linear-gradient(90deg, ${props => hex2rgba(props.theme.colors.primary, 0.15)} 0.5px, transparent 0.5px),
  repeating-linear-gradient(0deg, rgba(255,255,255, 0.15) 0.5px, transparent 0.5px);

  background-size: 5px 5px;
`;