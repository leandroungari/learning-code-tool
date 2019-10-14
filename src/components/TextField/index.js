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
  border-bottom: 1px solid ${({ focused }) => focused ? 'green' : '#dedede'};
  font-size: 16px;
  padding: 5px 10px;
  outline: 0;
  ${props => props.margin ? `margin: ${props.margin};` : ''}
  ${props => props.marginTop ? `margin-top: ${props.marginTop}px;` : ''}
  ${props => props.marginRight ? `margin-right: ${props.marginRight}px;` : ''}
  ${props => props.marginBottom ? `margin-bottom: ${props.marginBottom}px;` : ''}
  ${props => props.marginLeft ? `margin-left: ${props.marginLeft}px;` : ''}
  ${props => props.padding ? `padding: ${props.padding}` : ''};
  ${({ width }) => width ? `width: ${width}px;` : ''}
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
  margin,
  width,
  min,
  max,
  disabled
}) {

  const [text, setText] = useState('');
  const [isFocused, setFocus] = useState(false);

  function handleTextChange(event) {
    
    if (onChange) onChange(event.target.value);
    setText(event.target.value);
  }

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
      >
        <Container
          flexDirection="row"
        >
          <Input
            {
            ...
            {
              type,
              placeholder,
              width,
              min,
              max,
              disabled
            }
            }
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={text}
            focused={isFocused}
            onChange={handleTextChange}
          />

          {
            type === 'range' &&
            <Input
              margin="0 10px"
              value={text}
              width={40}
              onChange={handleTextChange}
              {
                ...
                {
                  disabled
                }
              }
            />
          }
        </Container>
        {
          (
            options.length !== 0 &&
            <AutoComplete
              options={options}
              optionsEvent={text => {
                setText(text);
              }}
              onChange={onChange}
              filter={text}
              width="auto"
            />
          )
        }
      </Container>
    </Container>
  );
}