import React, {
  useState,
  useCallback,
  useEffect
} from 'react';

import {
  useSelector
} from 'react-redux';

import {
  HistoryMetrics
} from '../../../components';

import { server } from '../../../services';

export default function NormalizedSumOfMetricsOfFiles({repo,branch,min,max,step,colorScheme}) {
  
  const [data, setData] = useState([]);
  const [commitIds, setCommitIds] = useState([]);

  const {branches, commits} = useSelector(
    ({ repositories }) => repositories.repository
  );

  const branchId = useCallback(() => {
    return branches
      .filter(b => branch === b.name)[0]
      .id.name;
  }, [branch, branches]);

  useEffect(() => {

    let commitIds = commits[branchId()]
      .reduce((total, a) => {
        total = [...total, a];
        return total; 
      }, [])
      .filter((_,index) => min <= index && index <= max);

    if(step !== 1) {
      commitIds = commitIds.filter((_,index) => index % step === 0);
    }

    fetch(`${server.host}/plots/sumMetricsFiles/${repo}/${branchId()}/${min}/${max}/${step}/normalized`)
      .then(result => result.json())
      .then(result => {
        const data = [];
        commitIds.reverse().forEach((id,index) => {
          data.push(result[id]);
        });
      
        setData(data);  
      });

    setCommitIds(commitIds);

  }, [branch, branchId, branches, commits, max, min, repo, step]);

  
  const generatePositions = useCallback((min,max,step) => {
    const result = [];
    for(let i = min; i <= max; i+=step) {
      result.push(i);
    }
    return result;
  },[]);

  return (
    <HistoryMetrics 
      active={data.length !== 0}
      { ...{colorScheme, data}}
      width={window.innerWidth-130}
      legend={{
        rotate: -45,
        labels: commitIds.map(id => id.substring(0,6))
      }}
      positions={generatePositions(min,max,step).reverse()} 
    />
  );
}
