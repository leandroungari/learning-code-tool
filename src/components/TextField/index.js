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
  border-bottom: 1px solid ${({focused}) => focused ? 'green' : '#dedede'};
  font-size: 16px;
  padding: 5px 10px;
  outline: 0;
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
  const [isFocused, setFocus] = useState(false);
  
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
        position="relative"
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
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={text}
          focused={isFocused}
          onChange={event => {
            if(onChange) onChange(event.target.value);
            setText(event.target.value);
          }}
        /> 
        {
          (
            options.length !== 0 ? 
            <AutoComplete 
              options={options}
              optionsEvent={text => {
                setText(text);
              }}
              onChange={onChange}
              filter={text}
              width="auto"
            /> : 
            null
          )
        }
      </Container>
    </Container>
  );
}