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
import { averageOfMetricsOfFiles } from '../../engine/Metrics';

export default function Repository() {

  const { name } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const listOfRepositories = useSelector(
    ({ repositories }) => repositories.listOfRepositories
  );

  const [branches, setBranches] = useState([]);
  const [commits, setCommits] = useState([]);
  const [currentBranchId, setCurrentBranchId] = useState('');
  const [initialCommit, setInitialCommit] = useState(0);
  const [lastCommit, setLastCommit] = useState(0);
  const [averageOfMetricsOfFilesActive, activeAverageOfMetricsOfFiles] = useState(0);
  const [plotData, setPlotData] = useState({});

  function totalOfCommitsInAllBranches() {

    return Object
      .entries(commits)
      .reduce((total, [_, listOfCommits]) => {
        return total + listOfCommits.length;
      }, 0);
  }

  function rangeOfCommits(branch, start, end) {

    const currentBranch = branches.filter(
      b => b.name === branch
    )[0];
    return commits[currentBranch.id.name].slice(start, end+1);
  }

  useEffect(() => {

    async function obtainBranches() {
      const result = [];
      const branches = await fetch(`${server.host}/repo/${name}/branches`)
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
          (await result)[branch.id.name] = await fetch(`${server.host}/repo/${name}/${branch.id.name}/commits`)
            .then(result => result.json());
          return result;
        }, {});

      setCommits(result);
      dispatch(storeCommits(result));
    }
    obtainCommits();
  }, [name, branches, dispatch]);


  function getCurrentBranch() {
    return branches.filter(
      branch => branch.name === currentBranchId
    )[0];
  }

  function calculateRange() {

    if(currentBranchId === '') return { disabled: true }

    const currentBranch = getCurrentBranch();

    if(currentBranch === undefined) return { disabled: true }
    
    return {
      min: 0, 
      max: commits[currentBranch.id.name].length-1
    };
  }
  
  async function extractMetrics(listOfCommits) {

    return new Promise((resolve) => {

      const currentBranch = getCurrentBranch();
      const list = listOfCommits.map(async({id}) => {
      
        return await metricsOfCommit(
          'diff',
          currentBranch.id.name,
          id.name
        );
      });

      resolve(Promise.all(list));
    });
  }

  async function metricsOfCommit(type,branch, commit) {
    return fetch(
      `${server.host}/metrics/${type}/${name}/${branch}/${commit}`
    )
    .then(result => result.json())
  }

  function executePlot() {

    const listOfCommits = rangeOfCommits(currentBranchId, initialCommit, lastCommit);
    const currentBranch = getCurrentBranch();

    extractMetrics(listOfCommits)
    .then(result => {
      
      //diff metrics
      dispatch(storeHeader(result[0].metrics)); 
      result.forEach(({files}, index) => {
        dispatch(storeMetrics(listOfCommits[index].id.name, files));
      });

      //entire commit
      metricsOfCommit(
        'all', 
        currentBranch.id.name, listOfCommits[listOfCommits.length-1].id.name
      )
      .then(({files}) => {
        dispatch(storeMetrics(listOfCommits[listOfCommits.length-1].id.name, files));
        const resultPlot = averageOfMetricsOfFiles( 
          {
            initialCommit: files,
            dataOfCommits: result
          },
          listOfCommits
        );

        setPlotData(resultPlot);
        activeAverageOfMetricsOfFiles(averageOfMetricsOfFilesActive + 1);
      });

    });   
  }

  //está dando erro pelo excesso de requisições, então dá erro 
  //de json por timeout
  //logo somente fazer requisição dos commits que realmente precisa

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
        <DataArea title="Average of Metrics Of Files">
          <TextField
            label="Select a branch"
            marginTop={20}
            width={200}
            options={
              branches.map(branch => branch.name)
            }
            onChange={value => {
              setCurrentBranchId(value);
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
          <HistoryMetrics 
            active={averageOfMetricsOfFilesActive}
            data={plotData}
          />
        </DataArea>
      </Container>
    </>
  );
}
