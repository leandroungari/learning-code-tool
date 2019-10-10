import React from 'react';
import { useSelector } from 'react-redux';

import {
  Header,
  GlobalStyle
} from '../components';

export default function Repository() {
  
  const repository = useSelector(({repositories}) => repositories.current);

  console.log(repository);

  return (
    <>
      <GlobalStyle />
      <Header 
        title="Learning Code Tool" 
      />
    </>
  );
}
