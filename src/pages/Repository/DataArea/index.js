import React from 'react';
import styled from 'styled-components';

import {
  Container
} from '../../../components';

const Box = styled(Container)`
  border-top: 1px solid #dedede;
`;

export default function DataArea({children}) {
  return (
    <Box
      padding="10px 20px"
    >
      {children}
    </Box>
  );
}
