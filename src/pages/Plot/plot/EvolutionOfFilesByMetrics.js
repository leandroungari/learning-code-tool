import React from 'react';

import {
  useSelector
} from 'react-redux';

import {
  HistoryMetrics
} from '../../../components';

import {
  evolutionOfFilesByMetrics
} from '../../../engine/Plots';

export default function EvolutionOfFilesByMetrics() {
  
  const {
    listOfCommits,
    commits
  } = useSelector(({ metrics }) => metrics);

  const commitsIds = listOfCommits.map(commit => commit.id.name);
  
  const {
    data,
    legends
  } = evolutionOfFilesByMetrics(
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
      legendWidth={0}
      data={data}
      keys={legends}
      width={window.innerWidth-130}
    />
  );
}
