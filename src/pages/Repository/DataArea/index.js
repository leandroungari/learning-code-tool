import React from 'react';
import styled from 'styled-components';

import {
  Container
} from '../../../components';

const Box = styled(Container)`
  border-top: 1px solid #dedede;
`;

const Title = styled.h2`
  font-size: 20px;
`;

export default function DataArea({
  children, 
  title
}) {
  return (
    <Box
      padding="20px 20px"
    >
      <Title>{title}</Title>
      {children}
    </Box>
  );
}
