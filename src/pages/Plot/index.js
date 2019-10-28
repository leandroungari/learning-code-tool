import React, { 
  useState,
  useCallback
} from 'react';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import {
  useParams,
  useHistory
} from 'react-router-dom';


import {
  GlobalStyle,
  Header,
  Container,
  DataArea,
  TextField,
  Button,
  RepositoryData,
} from '../../components';

import { 
  storeMetrics, 
  storeListOfCommits 
} from '../../action/metrics';

import {
  AverageOfMetricsOfFiles,
  SumOfMetricsOfFiles,
  EvolutionOfFilesByMetrics,
  NormalizedAverageOfMetricsOfFiles,
  NormalizedSumOfMetricsOfFiles
} from './plot';

import {
  metricsOfCommit,
  metricsOfARangeOfCommits,
} from '../../engine/Metrics';

export default function Plot() {

  const { name } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { plotName } = history.location.state;

  const [currentBranchId, setCurrentBranchId] = useState('');
  const [initialCommit, setInitialCommit] = useState(0);
  const [lastCommit, setLastCommit] = useState(0);
  const [ plot, setPlot ] = useState(null);
  const [currentMetric, setCurrentMetric] = useState(null);
  const [ step, setStep] = useState(1);

  const listOfRepositories = useSelector(
    ({ repositories }) => repositories.listOfRepositories
  );

  const commits = useSelector(
    ({ repositories }) => repositories.commits
  );

  const branches = useSelector(
    ({ repositories }) => repositories.branches
  );

  const totalOfCommitsInAllBranches = useCallback(() => {

    return Object
      .entries(commits)
      .reduce((total, [_, listOfCommits]) => (
        total + listOfCommits.length
      ), 0);
  }, [commits]);

  function rangeOfCommits(branch, start, end, step = 1) {

    const currentBranch = branches
      .filter(b => b.name === branch)[0];

    let result = commits[currentBranch.id.name]
    .slice(start, end+1);

    if(step !== -1) {
      result = result.filter((_,index) => index % step === 0);
    }

    return result;
  }

  function getCurrentBranch() {
    return branches
      .filter(branch => branch.name === currentBranchId)[0];
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

  function handleExecuteButton() {
    
    const currentBranch = getCurrentBranch();
    const listOfCommits = rangeOfCommits(
      currentBranchId, 
      initialCommit, 
      lastCommit,
      step
    );

    dispatch(storeListOfCommits(listOfCommits));
    
    setPlot(null);
    
    metricsOfARangeOfCommits(
      'diff',
      name,
      currentBranch.id.name,
      listOfCommits.map(commit => commit.id.name)
    )
    //extractMetrics(listOfCommits)
    .then(result => {  
      //diff metrics
      //dispatch(storeHeader(result[0].metrics)); 
      result.forEach(({files}, index) => {
        dispatch(storeMetrics(listOfCommits[index].id.name, files));
      });
      //entire commit
      metricsOfCommit(
        'all', 
        name,
        currentBranch.id.name, 
        listOfCommits[listOfCommits.length-1].id.name
      )
      .then(({files}) => {
        dispatch(storeMetrics(
          listOfCommits[listOfCommits.length-1].id.name, 
          files
        ));
        setPlot(renderPlot());
      });
    });
  }

  const getNameOfPlot = useCallback(() => {

    switch(plotName) {
      case 'average-metrics-files':
        return 'Average of Metrics of Files';

      case 'normalized-average-metrics-files':   
        return 'Average of Metrics of Files (Normalized)';

      case 'sum-metrics-files':
        return 'Sum of Metrics of Files';

      case 'normalized-sum-metrics-files':
        return 'Sum of Metrics of Files (Normalized)';

      case 'evolution-files-metrics': 
        return 'Evolution of Files by Metrics';

      default:
    }
  }, [plotName]);

  const renderPlot = useCallback(() => {

    switch(plotName) {

      case 'average-metrics-files':   
        return <AverageOfMetricsOfFiles />;

      case 'normalized-average-metrics-files':   
        return <NormalizedAverageOfMetricsOfFiles />;
      
      case 'sum-metrics-files':   
        return <SumOfMetricsOfFiles />;

      case 'normalized-sum-metrics-files':
        return <NormalizedSumOfMetricsOfFiles />;

      case 'evolution-files-metrics':   
        return <EvolutionOfFilesByMetrics metric={currentMetric}/>;

      default:
    }

  }, [plotName, currentMetric]);

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
        {
          
        }
        <DataArea title={getNameOfPlot()}>
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
              marginRight={20}
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
          </Container>
          <Container 
            flexDirection="row"
            justifyContent="center"
          >
            <TextField
              label="Define the step"
              marginTop={20}
              width={100}
              type="range"
              disabled={getCurrentBranch() === undefined}
              value={step}
              min={1}
              max={Math.round((lastCommit-initialCommit)/10)}
              onChange={value => {
                setStep(Number.parseInt(value));
              }}
            />
            {
              plotName === 'evolution-files-metrics' &&
              <TextField
                label="Select a metric"
                marginLeft={20}
                marginTop={20}
                disabled={getCurrentBranch() === undefined}
                width={100}
                options={['CBO','DIT','NOSI','RFC','WMC']}
                onChange={value => {
                  setCurrentMetric(value.toLowerCase());
                }}
              />
            }
            <Button
              color="#fff"
              backgroundColor="green"
              margin="30px 0 0 20px"
              onClick={handleExecuteButton}
            >
              Executar
            </Button>
          </Container>
          { plot }    
        </DataArea>
      </Container>
    </>
  );
}
