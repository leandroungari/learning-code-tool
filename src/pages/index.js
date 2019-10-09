import React from 'react';
import GlobalStyle from '../components/GlobalStyle';
import Header from '../components/Header';

import Head from 'next/head';


function Home() {
  
  return (
    <>
      <Head>
        <title>Learning Code Tool</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyle />
      <Header 
        title="Learning Code Tool" 
      />
    </>
  );
}

export default Home;
