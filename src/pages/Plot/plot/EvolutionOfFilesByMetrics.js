import React, {
  useState,
  useCallback,
  useEffect,
  useMemo
} from 'react';

import {
  useSelector
} from 'react-redux';

import {
  HistoryMetrics
} from '../../../components';

import { server } from '../../../services';

export default function EvolutionOfFilesByMetrics({repo,branch,min,max,step,metric}) {
  
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);

  const {branches, commits} = useSelector(
    ({ repositories }) => repositories
  );

  const branchId = useMemo(() => {
    return branches
      .filter(b => branch === b.name)[0]
      .id.name;
  }, [branch, branches]);

  const keys = useMemo(() => {

    const values = result.reduce((total, commit) => {
      return {
        ...total,
        ...Object.keys(commit)
      }
    }, {});
    return (Object.values(values));
  }, [result]);

  const commitIds = useMemo(() => {

    let commitIds = commits[branchId]
      .reduce((total, a) => {
        return [...total, a];
      }, [])
      .filter((_,index) => min <= index && index <= max);

    if(step !== 1) {
      commitIds = commitIds.filter((_,index) => index % step === 0);
    }

    return commitIds;

  }, [branchId, commits, max, min, step]);

  const generatePositions = useCallback((min,max,step) => {
    const result = [];
    for(let i = min; i <= max; i+=step) {
      result.push(i);
    }
    return result;
  },[]);

  useEffect(() => {
    fetch(`${server.host}/plots/evolution/${repo}/${branchId}/${min}/${max}/${step}/${metric}`)
      .then(result => result.json())
      .then(result => {
        const data = [];
        commitIds.reverse().forEach(id => {
          data.push(result[id]);
        });
        setResult(data);
      });
  }, [branchId, commitIds, max, metric, min, repo, step]);


  useEffect(() => {

    const response = result.map(commit => {
      return {
        ...keys.reduce((total,file) => ({...total, [file]: 0}), {}),
        ...commit
      }
    });  
    setData(response);

  }, [keys, result]);

  return (
    <HistoryMetrics 
      active={data.length !== 0 && keys.length !== 0}
      data={data}
      legendWidth={0}
      width={window.innerWidth-130}
      legend={{
        rotate: -45,
        labels: commitIds.map(id => id.substring(0,6))
      }}
      keys={keys}
      positions={generatePositions(min,max,step).reverse()} 
    />
  );
}
