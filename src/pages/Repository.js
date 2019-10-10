import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Header,
  GlobalStyle,
  RepositoryData
} from '../components';
import HistoryMetrics from '../components/visualization/HistoryMetrics';


export default function Repository() {

  const { name } = useParams();
  
  const dispatch = useDispatch();
  dispatch({
    type: 'SELECT_REPOSITORY', 
    repository: name
  });

  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState({});

  function totalOfCommitsInAllBranches() {

    return Object.entries(commits)
    .reduce((total, [_,listOfCommits]) => total + listOfCommits.length, 0);
  }
  
  useEffect(() => {

    async function obtainBranches() {
      const result = await fetch(`http://localhost:8080/repo/${name}`)
      .then(result => result.json());
      setBranches(result);
    };

    obtainBranches();
  }, [name]);

  useEffect(() => {
    
    async function obtainCommits() {
      const result = await branches
      .reduce(async (result, branch) => {
        (await result)[branch] = await fetch(`http://localhost:8080/repo/${name}/${branch}`)
        .then(result => result.json());
        return result;
      }, {});
      setCommits(result);
    }

    obtainCommits();
  }, [name, branches]);
  

  return (
    <>
      <GlobalStyle />
      <Header 
        title="Learning Code Tool" 
      />
      <main>
        <RepositoryData 
          name={name} 
          numBranches={branches.length}
          numCommits={totalOfCommitsInAllBranches()}
        />
        <HistoryMetrics />
      </main>
    </>
  );
}
