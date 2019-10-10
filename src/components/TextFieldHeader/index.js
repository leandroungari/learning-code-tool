import React, { useState } from 'react';

import styled, { css } from 'styled-components';
import AutoComplete from './autocomplete';

import growToRight from './animation/GrowToRight';
import decreaseToLeft from './animation/DecreaseToLeft';



const Input = styled.input`
  background-color: ${({ status }) => status === 'notSelected' ? 'rgba(255,255,255,0.125)' : '#fff'};
  border: 0;
  padding: 6px 9px;
  color: #999;
  border-radius: ${({ status }) => (status === 'notSelected' || status === 'blur') ? '2px' : '2px 2px 0 0'};
  outline: 2px rgba(255,0,0,0.125);
  margin-top: ${props => props.marginTop || 0}px;
  margin-left: ${props => props.marginLeft || 0}px;
  margin-right: ${props => props.marginRight || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
  width: ${props => props.width || 168}px;
  font-size: 14px;
  animation: ${({ status, width }) =>
    status === 'focus' ? css`${growToRight(width, 1.5 * width)} .5s ease` :
      status === 'blur' ? css`${decreaseToLeft(width, 2 * width / 3)} .5s ease` :
        ''
  };
  `;

export default function TextFieldHeader(props) {

  const { 
    placeholder, 
    onClickItem, 
    list 
  } = props;

  const [status, setStatus] = useState('notSelected');
  const [width, setWidth] = useState(150);
  const [text, setText] = useState("");

  function onHandleEnable() {
    setStatus('focus');
    setTimeout(function () {
      setWidth(width * 1.5);
      setStatus('selected');
    }, 500);
  }

  function onHandleDisable() {
    setStatus('blur');
    setTimeout(function () {
      setWidth(2 * (width) / 3);
      setStatus('notSelected');
    }, 500);
  }

  function onClick() {
    if(status === 'notSelected') {
      onHandleEnable();
    }
    else {
      onHandleDisable();
    }
  }

  function onChange(event) {
    const { value } = event.target;
    setText(value);
  }

  return (
    <div
      style={{ position: 'relative' }}
    >
      <Input
        status={status}
        type="text"
        placeholder={placeholder}
        marginLeft={15}
        marginRight={15}
        width={width}
        onChange={onChange}
        onClick={onClick}
      />
      <AutoComplete
        status={status}
        width={width}
        items={list}
        onClick={onClickItem}
        currentInput={text}
      />
    </div>
  );
}
