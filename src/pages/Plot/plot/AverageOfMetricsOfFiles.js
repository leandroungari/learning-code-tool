import React from 'react';

import {
  useSelector
} from 'react-redux';

import {
  HistoryMetrics
} from '../../../components';

import {
  averageOfMetricsOfFiles
} from '../../../engine/Plots';

export default function AverageOfMetricsOfFiles() {
  
  const {
    listOfCommits,
    commits
  } = useSelector(({ metrics }) => metrics);

  const commitsIds = listOfCommits.map(commit => commit.id.name);
  
  const data = averageOfMetricsOfFiles(
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
      width={window.innerWidth-130}
    />
  );
}
