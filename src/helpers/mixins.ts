import { css } from 'styled-components';

import { hex2rgba } from '../helpers/ui';

export const backgroundGridMixin = css`
  background:
    linear-gradient(90deg, ${props => hex2rgba(props.theme.colors.primary, 0.15)} 0.5px, transparent 0.5px),
    linear-gradient(0deg, ${props => hex2rgba(props.theme.colors.primary, 0.15)} 0.5px, transparent 0.5px);
  background-size: 5px 5px;
`;