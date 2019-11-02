import React, {
  useCallback
} from 'react';

import {
  useSelector
} from 'react-redux';

import {
  HistoryMetrics
} from '../../../components';

import {
  sumOfMetricsOfFiles
} from '../../../engine/Plots';

export default function SumOfMetricsOfFiles({branch,min,max,step}) {
  
  const {
    listOfCommits,
    commits
  } = useSelector(({ metrics }) => metrics);

  const commitsIds = listOfCommits.map(commit => commit.id.name);
  
  const data = sumOfMetricsOfFiles(
    listOfCommits, 
    Object.entries(commits).reduce((total, [id,value]) => {
      if(commitsIds.includes(id)) {
        total = {
          ...total,
          [id]: value
        }
      }
      return total;
    }, {})
  );

  const generatePositions = useCallback((min,max,step) => {
    const result = [];
    for(let i = min; i < max; i+=step) {
      result.push(i);
    }
    return result;
  },[]);

  return (
    <HistoryMetrics 
      active={true}
      data={data}
      legend={{
        rotate: -45,
        labels: commitsIds.map(id => id.substring(0,6)).reverse()
      }}
      width={window.innerWidth-130}
      positions={generatePositions().reverse()} 
    />
  );
}
