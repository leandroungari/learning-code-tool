export function averageOfMetricsOfFiles(
  {initialCommit,dataOfCommits}
) {

  const result = metricsOfFiles({initialCommit,dataOfCommits});
  console.log(result)
  const processedData = result.map(commit => {
    const set = Object.entries(commit);
    return {
      cbo: set.reduce((total, [_,metrics]) => total + metrics.cbo, 0)/set.length,
      dit: set.reduce((total, [_,metrics]) => total + metrics.dit, 0)/set.length,
      nosi: set.reduce((total, [_,metrics]) => total + metrics.nosi, 0)/set.length,
      rfc: set.reduce((total, [_,metrics]) => total + metrics.rfc, 0)/set.length,
      wmc: set.reduce((total, [_,metrics]) => total + metrics.wmc, 0)/set.length,
    }
  });
  console.log(processedData);
  return processedData;
}

export function metricsOfFiles(
  {initialCommit, dataOfCommits}
) {

  let result = extractMetrics([], initialCommit, 0);
  let [, ...remainingOfCommits] = dataOfCommits;

  let pos = 1;
  for(const commit of remainingOfCommits.reverse()) {
    result = extractMetrics(
      result, 
      commit.files, 
      pos++
    );
  }

  return result;
}

function extractMetrics(result, data, position) {

  result = [
    ...result, 
    (position === 0 ? {} : result[position-1])
  ];

  const transformedMetrics = Object
  .entries(data)
  .reduce((total, [file,metrics]) => {
    return {
      ...total,
      [file]: {
        cbo: metrics[0],
        dit: metrics[1],
        nosi: metrics[4],
        rfc: metrics[5],
        wmc: metrics[6]
      }
    }
  }, {});

  result[position] = {
    ...result[position],
    ...transformedMetrics
  }

  return result;
}