import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router'
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

import GlobalStyle from '../components/GlobalStyle';
import Header from '../components/Header';
import RepositoryData from '../components/RepositoryData';
import HistoryMetrics from '../components/visualization/HistoryMetrics';
import TextField from '../components/form/TextField';

function Repository() {

  const router = useRouter();
  const { name } = router.query;

  const [ branches, setBranches ] = useState([]);
  const [ commits, setCommits ] = useState([]);
  
  const getBranches = async() => {

    fetch(`http://localhost:8080/repo/${name}`)
    .then(result => result.json())
    .then(result => {
      let set = [];
      for(const branch of result) {
        if(!set.includes(branch)) {
          set = [...set, branch];
        }
      }
      setBranches(set);
    });
  }

  const getCommits = async() => {

    let set = {};
    for(const branch of branches) {
      const data = await fetch(
        `http://localhost:8080/repo/${name}/${branch}`
      )      
      .then(result => result.json());
      set[branch] = data;
    }
    setCommits(set);
  }

  useEffect(() => {
    getBranches();
  },[]);
  

  useEffect(() => {
    getCommits();
  }, [branches]);
  
  

  
  return (
    <>
      <Head>
        <title>Learning Code Tool - Repository</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyle />
      <Header 
        title="Learning Code Tool" 
      />
      <main>
        <RepositoryData 
          name={name} 
          numCommits={
            Object
            .entries(commits)
            .reduce((total, [_,value]) =>
              total + value.length
            , 0)
          }
          numBranches={branches.length}
        />
        <br/>
        <br/>
        <br/>
        <h2>Somatória da Métrica por Versão</h2>
        <TextField 
          label="Branches"
          onChangeText={() => console.log('mudou')}
          autocompleteOptions={branches}
        />
        <div style={{ width:800, height: 400}}>
          <HistoryMetrics />
        </div>
      </main>
    </>
  );
}

export default Repository;