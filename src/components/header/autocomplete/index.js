import React from 'react';

import styled, { css } from 'styled-components';
import { growToRight, decreaseToLeft } from '../../animation';

const Container = styled.div`
  position: absolute;
  display: ${
    ({status}) => status === 'focus' || status === 'selected' ? 
      'block' : 'none'
  };
  width: ${({status,width}) => width ? width + (status === 'selected' ? 16 : 0) + 'px' : 'inherit'};
  margin-top: ${props => props.marginTop || 0}px;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  padding: ${
    ({status}) => status === 'focus' ? '0 8px' : '0'
  };
  background-color: #fff;
  border: ${({status}) => status === 'focus' ? '0' : '1px solid #ccc'};
  animation: ${({status, width}) => 
    status === 'focus' ? css`${growToRight(width, 1.5*width)} .5s ease` : 
    status === 'blur' ? css`${decreaseToLeft(width, 2*width/3)} .5s ease` :
    ''
  };
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 12px;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  &:last-child {
    border-bottom: 0;
  }
`;

const ContainerText = styled.p`
  font-size: 14px;
  color: #333;
`;

function ContainerItem({value, onClick}) {
  
  
  return (
    <ContainerDiv onClick={(event) => onClick(event)}> 
      <ContainerText>
        {value}
      </ContainerText>
    </ContainerDiv>
  );
}

export default function AutoComplete({
  status, 
  width, 
  items = [], 
  onClick, 
  currentInput = ""
}) {

  console.log(onClick);
  return (
    <Container
      status={status}
      marginLeft={15}
      width={width}
    >
     {
       status === 'selected' ?
        items
          .filter((item) => item.includes(currentInput))
          .filter((_,key) => key < 4)
          .map((item,key) => (
            <ContainerItem
              key={key}
              value={item} 
              onClick={onClick}
            />
          )
        ) :
        null
     } 
    </Container>
  );
}
