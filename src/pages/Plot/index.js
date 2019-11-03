import React, { 
  useState,
  useCallback
} from 'react';

import {
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
  AverageOfMetricsOfFiles,
  SumOfMetricsOfFiles,
  EvolutionOfFilesByMetrics,
  NormalizedAverageOfMetricsOfFiles,
  NormalizedSumOfMetricsOfFiles
} from './plot';


export default function Plot() {

  const { name } = useParams();
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
    setPlot(renderPlot({
      plotName, 
      currentBranchId,
      initialCommit, 
      lastCommit, 
      step, 
      currentMetric
    }));
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

  const renderPlot = useCallback(({
    plotName, 
    currentBranchId,
    initialCommit, 
    lastCommit, 
    step, 
    currentMetric
  }) => {

    switch(plotName) {

      case 'average-metrics-files':   
        return <AverageOfMetricsOfFiles 
          min={initialCommit} 
          max={lastCommit}
          repo={name}
          branch={currentBranchId}
          step={step}
        />;

      case 'normalized-average-metrics-files':   
        return <NormalizedAverageOfMetricsOfFiles  
          min={initialCommit} 
          max={lastCommit}
          repo={name}
          branch={currentBranchId}
          step={step}
        />;
      
      case 'sum-metrics-files':   
        return <SumOfMetricsOfFiles
          min={initialCommit} 
          max={lastCommit}
          repo={name}
          branch={currentBranchId}
          step={step}
        />;

      case 'normalized-sum-metrics-files':
        return <NormalizedSumOfMetricsOfFiles
          min={initialCommit} 
          max={lastCommit}
          repo={name}
          branch={currentBranchId}
          step={step}
        />;

      case 'evolution-files-metrics':   
        return <EvolutionOfFilesByMetrics
          min={initialCommit} 
          max={lastCommit}
          repo={name}
          branch={currentBranchId}
          step={step}
          metric={currentMetric}
        />;

      default:
    }
  }, [name]);

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
