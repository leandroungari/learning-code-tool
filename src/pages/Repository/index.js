import React, { 
  useEffect, 
  useState,
  useCallback
} from 'react';
import { useHistory } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import { 
  useDispatch, 
  useSelector
} from 'react-redux';

import {
  Container,
  Header,
  GlobalStyle,
} from '../../components';

import RepositoryData from './RepositoryData';
import HistoryMetrics from './HistoryMetrics';
import DataArea from './DataArea'

import {
  server
} from '../../services';
import TextField from '../../components/TextField';

export default function Repository() {

  const { name } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const listOfRepositories = useSelector(
    ({repositories}) => repositories.listOfRepositories
  );

  const [
    branches, 
    setBranches
  ] = useState([]);
  
  const [
    commits, 
    setCommits
  ] = useState({});

  function totalOfCommitsInAllBranches() {

    return Object
    .entries(commits)
    .reduce((total, [_,listOfCommits]) => {
      return total + listOfCommits.length;
    }, 0);
  }

  function rangeOfCommits(start, end) {

    return commits.slice(start, end);
  }
  
  useEffect(() => {
    
    async function obtainBranches() {
      const result = [];
      const branches = await fetch(`${server.host}/repo/${name}`)
      .then(result => result.json());
      for(const branch of branches) {
        if(!result.includes(branch)) {
          result.push(branch);
        }
      }
      setBranches(result);
    };
    obtainBranches();
  }, [name]);

  useEffect(() => {
    
    async function obtainCommits() {
      const result = await branches
      .reduce(async (result, branch) => {
        (await result)[branch] = await fetch(`${server.host}/repo/${name}/${branch}`)
        .then(result => result.json());
        return result;
      }, {});
      setCommits(result);
    }
    obtainCommits();
  }, [name, branches]);

  useCallback(() => dispatch({
    type: 'SET_BRANCHES',
    branches
  }), [branches]);

  useCallback(() => dispatch({
    type: 'SET_COMMITS',
    commits
  }), [commits]);

  
  
  return (
    <>
      <GlobalStyle />
      <Header 
        searchOptions={listOfRepositories}
        optionAction={(_, value) => {
          history.push(`/repository/${value}`);
        }}
      />
      <Container 
        margin="50px"
      >
        <RepositoryData 
          name={name} 
          numBranches={branches.length}
          numCommits={totalOfCommitsInAllBranches()}
        />
        <DataArea title="Average of a Metric">
          <TextField 
            label="Select a branch" 
            marginTop={20}
            width={150}
            options={branches}
            onChange={value => {
              console.log(value);
            }}
          />
          <HistoryMetrics />
        </DataArea>
      </Container>      
    </>
  );
}
