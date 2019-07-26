import React from 'react';
import styled from 'styled-components';
import {
  useTooltipState,
  Tooltip as _ReakitTooltip,
  TooltipReference
} from 'reakit/Tooltip';

const ReakitTooltip = styled(_ReakitTooltip)`
  background-color: #FFF;
  font-size: 12px;
  padding: 5px;
  border-radius: 2px;
`;

type Props = {
  children: React.ReactElement;
  title: string;
}

const Tooltip = ({ children, title, ...props }: Props) => {
  const tooltip = useTooltipState();
  return (
    <>
      <TooltipReference {...tooltip}>
        {referenceProps =>
          React.cloneElement(React.Children.only(children), referenceProps)
        }
      </TooltipReference>
      <ReakitTooltip {...tooltip} {...props}>
        {title}
      </ReakitTooltip>
    </>
  );
}

export default Tooltip;