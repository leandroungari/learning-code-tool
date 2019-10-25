import React from 'react';
import styled from 'styled-components';

import {
  Container
} from '../../components';

const Box = styled(Container)`
  border-top: 1px solid #dedede;

`;

const Title = styled.h2`
  font-size: 20px;
  cursor: ${({onClick}) => onClick ? 'pointer' : 'auto'};
  &:hover {
    text-decoration: ${({onClick}) => onClick ? 'underline' : 'none'};
  }
`;

export default function DataArea({
  children, 
  title,
  width,
  onClick = undefined
}) {
  return (
    <Box
      padding="20px 20px"
      {
        ...
        {
          width
        }
      }
    >
      <Title
        onClick={onClick}
      >
        {title}
      </Title>
      {children}
    </Box>
  );
}
