import styled, { css } from 'styled-components';

const fullWidthMixin = css`
  width: 100%;
`;

type SectionHeaderProps = {
  fullWidth?: boolean;
}

export default styled.h3<SectionHeaderProps>`
  ${props => props.fullWidth ? fullWidthMixin : ''}
  letter-spacing: 1px;
  line-height: 1.5;
  font-weight: ${props => props.theme.font.weight.regular};
  font-size: 12px;
  text-align: left;
  margin: 0;
`;