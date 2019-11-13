import React, { 
  useState,
  useCallback,
  useMemo
} from 'react';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import {
  useHistory
} from 'react-router-dom';

import {
  Header,
  TitlePage
} from '../../components';

import {
  Button,
  Typography,
  Row,
  Col,
  AutoComplete,
  Slider,
  Form,
  Select
} from 'antd';

import {
  AverageOfMetricsOfFiles,
  SumOfMetricsOfFiles,
  EvolutionOfFilesByMetrics,
  NormalizedAverageOfMetricsOfFiles,
  NormalizedSumOfMetricsOfFiles
} from './plot';

import {
  currentRepository
} from '../../action';


const {
  Title,
} = Typography;

export default function Plot() {

  const history = useHistory();
  const dispatch = useDispatch();
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

  const nameOfRepository = useSelector(
    ({ repositories }) => repositories.current
  );

  console.log(nameOfRepository);

  const commits = useSelector(
    ({ repositories }) => repositories.commits
  );

  const branches = useSelector(
    ({ repositories }) => repositories.branches
  ); 

  const { disabled, min, max } = useMemo(() => {

    function getCurrentBranch() {
      return branches
        .filter(branch => branch.name === currentBranchId)[0];
    }

    if(currentBranchId === '') return { disabled: true }

    const currentBranch = getCurrentBranch();

    if(currentBranch === undefined) return { disabled: true }
    
    return {
      disabled: false,
      min: 0, 
      max: commits[currentBranch.id.name].length-1
    };

  }, [branches, commits, currentBranchId]);

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
          repo={nameOfRepository}
          branch={currentBranchId}
          step={step}
        />;

      case 'normalized-average-metrics-files':   
        return <NormalizedAverageOfMetricsOfFiles  
          min={initialCommit} 
          max={lastCommit}
          repo={nameOfRepository}
          branch={currentBranchId}
          step={step}
        />;
      
      case 'sum-metrics-files':   
        return <SumOfMetricsOfFiles
          min={initialCommit} 
          max={lastCommit}
          repo={nameOfRepository}
          branch={currentBranchId}
          step={step}
        />;

      case 'normalized-sum-metrics-files':
        return <NormalizedSumOfMetricsOfFiles
          min={initialCommit} 
          max={lastCommit}
          repo={nameOfRepository}
          branch={currentBranchId}
          step={step}
        />;

      case 'evolution-files-metrics':   
        return <EvolutionOfFilesByMetrics
          min={initialCommit} 
          max={lastCommit}
          repo={nameOfRepository}
          branch={currentBranchId}
          step={step}
          metric={currentMetric}
        />;

      default:
    }
  }, [nameOfRepository]);

  const handleFilterBranch = useCallback((input, option) => (
    option.props.children.includes(input)
  ), []);

  const handleRangeOfCommits = useCallback(([min,max]) => {
    setInitialCommit(min);
    setLastCommit(max);
  }, []);

  const handleSelectMetric = useCallback((value) => {
    setCurrentMetric(value.toLowerCase());
  }, []);

  const handleStepOfCommits = useCallback((value) => {
    setStep(value);
  }, []);


  return (
    <>
      <Header
        searchOptions={listOfRepositories}
        optionAction={(value) => {
          dispatch(currentRepository(value));
          history.push(`/repository/${value}`);
        }}
        homeAction={() => {
          history.push("/");
        }}
      />
      <Row style={{margin: 50}}>
        <TitlePage name={nameOfRepository} />
        <Row type="flex" style={{marginTop: 20}}>
          <Title level={4} underline>{getNameOfPlot()}</Title>
        </Row>      
        <Row>
          <Form.Item label="Branch">
            <AutoComplete 
              placeholder="Select a branch"
              style={{width: 200}}
              dataSource={branches.map(branch => branch.name)}
              onSelect={value => {
                setCurrentBranchId(value);
              }}
              filterOption={handleFilterBranch}
            />
          </Form.Item>
        </Row>
        <Row style={{
          display: 'flex',
          justifyContent: 'start',
          flexWrap: "wrap"
        }}>
          <Col>
            <Form.Item label="Range of commits">
              <Slider 
                range 
                {...{min, max, disabled}} 
                style={{width: 150}} 
                onAfterChange={handleRangeOfCommits} 
              />
            </Form.Item>
          </Col>
          <Col style={{marginLeft: 20}}>
            <Form.Item label="Step of commits">
              <Slider 
                {...{disabled}} 
                min={1} 
                max={Math.round((lastCommit-initialCommit)/10)} 
                style={{width: 150}} 
                onAfterChange={handleStepOfCommits}
              />
            </Form.Item>
          </Col>
          {
            plotName === 'evolution-files-metrics' &&
            <Col style={{marginLeft: 20}}>
              <Form.Item label="Metric">
                <Select 
                  style={{width: 150}}
                  placeholder="Select a metric"
                  onSelect={handleSelectMetric}
                  {...{disabled}}
                >
                  {
                    ['CBO','DIT','NOSI','RFC','WMC'].map(item => (
                      <Select.Option 
                        key={item}
                        value={item}
                      >
                        {item}
                      </Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          }
        </Row>
        <Row>
          <Button type="primary" onClick={handleExecuteButton}>
            Executar
          </Button>
        </Row>
        <Row style={{ marginTop: 20 }}>
          { plot }
        </Row>
      </Row>
    </>
  );
}
