import React from 'react';

import GlobalStyle from '../components/GlobalStyle';
import Header from '../components/Header';


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
