import React, {
  useState
} from 'react';
import styled from 'styled-components';

import {
  Container
} from '../../components';

import AutoComplete from './AutoComplete';

const Label = styled.p`
  margin-bottom: 4px;
  font-size: 12px;
`;

const Input = styled.input`
  border: 0;
  border-bottom: 1px solid #dedede;
  font-size: 16px;
  padding: 5px 10px;
  ${({width}) => width ? `${width}px;` : ''}
`;


export default function TextField({
  type = 'text',
  placeholder,
  options = [],
  label,
  onChange,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  margin
}) {

  const [text, setText] = useState('');
  
  return (
    <Container  
      {
        ...
        {
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          margin
        }
      }
    >
      <Label>{label}</Label>
      <Container
        position="absolute"
        width={300}
      >
        <Input 
          {
            ...
            {
              type,
              placeholder
            }
          }
          value={text}
          onChange={event => {
            if(onChange) onChange(event);
            setText(event.target.value);
          }}
        /> 
        {
          (
            options.length !== 0 ? 
            <AutoComplete 
              options={options}
              filter={text}
            /> : 
            null
          )
        }
      </Container>
    </Container>
  );
}