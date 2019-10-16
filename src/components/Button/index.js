import React from 'react';
import styled from 'styled-components';

import {
  Container
} from '../../components';

const Text = styled.h1`
  ${({color}) => color && `color: ${color}`}
  font-weight: bold;
  font-size: 16px;
`;

function Button({
  children, 
  color, 
  backgroundColor,
  margin,
  onClick,
  disabled
}) {


  return (
    <Container
      padding="10px 12px"
      cursor={(disabled ? 'not-allowed' : 'pointer')}
      onClick={(disabled ? () => {} : onClick)}
      {
        ...
        {
          margin,
          backgroundColor,
          
        }
      }
    >
      <Text {...{color}}>
        {children}
      </Text>
    </Container>
  );
}


export default Button;