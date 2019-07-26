import styled from 'styled-components';

import { backgroundGridMixin } from '../../../helpers/mixins';

export default styled.div`
  display: flex;
  box-sizing: content-box;

  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 3px;

  width: 100%;
  height: 80px;

  overflow: hidden;

  ${backgroundGridMixin}
`;