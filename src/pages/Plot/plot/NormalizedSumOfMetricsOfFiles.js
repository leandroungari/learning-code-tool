import React from 'react';

import {
  useSelector
} from 'react-redux';

import {
  HistoryMetrics
} from '../../../components';

import {
  normalizedSumOfMetricsOfFiles
} from '../../../engine/Plots';

export default function NormalizedSumOfMetricsOfFiles({positions}) {
  
  const {
    listOfCommits,
    commits
  } = useSelector(({ metrics }) => metrics);

  const commitsIds = listOfCommits.map(commit => commit.id.name);
  
  const data = normalizedSumOfMetricsOfFiles(
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

  return (
    <HistoryMetrics 
      active={true}
      data={data}
      legend={{
        rotate: -45,
        labels: commitsIds.map(id => id.substring(0,6)).reverse()
      }}
      width={window.innerWidth-130}
      positions={positions.reverse()} 
    />
  );
}
