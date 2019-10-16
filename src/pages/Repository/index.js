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
import { 
  storeBranches, 
  storeCommits 
} from '../../action/repositories';
import { storeMetrics, storeHeader } from '../../action/metrics';

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
      dispatch(storeBranches(result));
    };
    obtainBranches();
  }, [dispatch, name]);

  useEffect(() => {


    async function obtainCommits() {
      
      const result = await branches
        .reduce(async (result, branch) => {
          (await result)[branch] = await fetch(`${server.host}/repo/${name}/${branch}`)
            .then(result => result.json());
          return result;
        }, {});
      setCommits(result);
      dispatch(storeCommits(result));
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


  const commitsIds = Object.keys(
    useSelector(({metrics}) => metrics)
  );

  const metricsOfCommits = useSelector(({metrics}) => metrics);
  
  async function extractMetrics(listOfCommits) {

    return new Promise((resolve) => {

      let counter = 0;
      listOfCommits.forEach(commit => {

        fetch(`${server.host}/metrics/${name}/${currentBranch}/${commit}`)
        .then(result => result.json())
        .then(result => {
          const {files, metrics} = result;
          dispatch(storeMetrics(commit, files));
          dispatch(storeHeader(metrics));
          counter++;
          if(counter === listOfCommits.length) {
            resolve();
          }
        });
      });
    });
  }

  function executePlot() {

    const listOfCommits = rangeOfCommits(currentBranch, initialCommit, lastCommit);
      
    const filteredListOfCommits = listOfCommits
    .filter(commit => !commitsIds.includes(commit))
    
    extractMetrics(filteredListOfCommits)
    .then(() => {
      console.log('terminei');
      console.log(metricsOfCommits)
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
        <DataArea title="Average of Metrics">
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
