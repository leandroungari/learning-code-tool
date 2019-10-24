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
  storeHeader, 
  storeListOfCommits 
} from '../../action/metrics';

import {
  AverageOfMetricsOfFiles
} from './plot';

import {
  metricsOfCommit,
  metricsOfARangeOfCommits
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

  function rangeOfCommits(branch, start, end) {

    const currentBranch = branches
      .filter(b => b.name === branch)[0];

    return commits[currentBranch.id.name]
      .slice(start, end+1);
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
  
  /*async function extractMetrics(listOfCommits) {

    return new Promise((resolve) => {

      const currentBranch = getCurrentBranch();
      const list = listOfCommits.map(async({id}) => {
        
        return await metricsOfCommit(
          'diff',
          name,
          currentBranch.id.name,
          id.name
        );
      });

      resolve(Promise.all(list));
    });
  }*/

  

  function handleExecuteButton() {
    
    const currentBranch = getCurrentBranch();
    const listOfCommits = rangeOfCommits(
      currentBranchId, 
      initialCommit, 
      lastCommit
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
      dispatch(storeHeader(result[0].metrics)); 
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

      default:
    }
  }, [plotName]);

  const renderPlot = useCallback(() => {

    switch(plotName) {

      case 'average-metrics-files':   
        return <AverageOfMetricsOfFiles />;

      default:
    }

  }, [plotName]);

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
