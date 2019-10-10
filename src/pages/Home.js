import React from 'react';

import {
  Header,
  GlobalStyle
} from '../components';


document.title = 'Learning Code Tool';


function Home() {
  
  return (
    <>
      <GlobalStyle />
      <Header 
        title="Learning Code Tool" 
      />
    </>
  );
}

export default Home;
