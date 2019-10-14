import React, {
  useEffect,
  useState,
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
  Button
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
    ({ repositories }) => repositories.listOfRepositories
  );

  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState({});
  const [currentBranch, setCurrentBranch] = useState('');
  const [initialCommit, setInitialCommit] = useState(1);
  const [lastCommit, setLastCommit] = useState(1);

  function totalOfCommitsInAllBranches() {

    return Object
      .entries(commits)
      .reduce((total, [_, listOfCommits]) => {
        return total + listOfCommits.length;
      }, 0);
  }

  function rangeOfCommits(branch, start, end) {

    return commits[branch].slice(start, end);
  }

  useEffect(() => {

    function storeBranches(branches) {
      dispatch({
        type: 'SET_BRANCHES',
        branches
      });
    }

    async function obtainBranches() {
      const result = [];
      const branches = await fetch(`${server.host}/repo/${name}`)
        .then(result => result.json());
      for (const branch of branches) {
        if (!result.includes(branch)) {
          result.push(branch);
        }
      }
      setBranches(result);
      storeBranches(result);
    };
    obtainBranches();
  }, [dispatch, name]);

  useEffect(() => {

    function storeCommits(commits) {
      dispatch({
        type: 'SET_COMMITS',
        commits
      })
    }

    async function obtainCommits() {
      
      const result = await branches
        .reduce(async (result, branch) => {
          (await result)[branch] = await fetch(`${server.host}/repo/${name}/${branch}`)
            .then(result => result.json());
          return result;
        }, {});
      setCommits(result);
      storeCommits(result);
    }
    obtainCommits();
  }, [name, branches, dispatch]);

  function calculateRange() {
    return (
      currentBranch === '' ||
      commits[currentBranch] === undefined ?
        {disabled: true} :
        {min: 0, max: commits[currentBranch].length-1}
    );
  }

  function storeMetrics(commit, data) {
    dispatch({
      type: 'STORE_METRICS',
      metrics: data,
      commit
    });
  }

  function executePlot() {

    const listOfCommits = rangeOfCommits(currentBranch, initialCommit, lastCommit);
    //get commits with saved metrics and filter it
    
    listOfCommits.forEach(commit => {

      fetch(`${server.host}/repo/${currentBranch}/${commit}`)
      .then(result => result.json())
      .then(result => {
        storeMetrics(commit, result);
      });
    });
  }

  
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
            width={200}
            options={branches}
            onChange={value => {
              setCurrentBranch(value);
            }}
          />
          <Container 
            flexDirection="row"
            justifyContent="center"
          >
            <TextField
              label="Select the initial commit"
              marginTop={20}
              marginRight={30}
              width={100}
              {...calculateRange()}
              type="range"
              onChange={value => {
                setInitialCommit(Number.parseInt(value));
              }}
            />
            <TextField
              label="Select the last commit"
              marginTop={20}
              width={100}
              type="range"
              {...calculateRange()}
              onChange={value => {
                setLastCommit(Number.parseInt(value));
              }}
            />
            <Button 
              color="#fff"
              backgroundColor="green"
              margin="30px 0 0 20px"
              onClick={executePlot}
            >
              Executar
            </Button>
          </Container>
          <HistoryMetrics />
        </DataArea>
      </Container>
    </>
  );
}
