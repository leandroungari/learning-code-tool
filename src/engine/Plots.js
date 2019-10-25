/**
 * It generates the data to average of metrics plot
 * 
 * @param {Array} listOfCommits List of commits
 * @param {Array} data Metrics of commits in array format
 */
export function averageOfMetricsOfFiles(listOfCommits, data) {

  const result = metricsOfFiles(
    listOfCommits,
    data
  );

  const processedData = result.map(commit => {
    const set = Object.entries(commit);
    return {
      cbo: set.reduce((total, [_,metrics]) => total + metrics.cbo, 0)/(set.length || 1),
      dit: set.reduce((total, [_,metrics]) => total + metrics.dit, 0)/(set.length || 1),
      nosi: set.reduce((total, [_,metrics]) => total + metrics.nosi, 0)/(set.length || 1),
      rfc: set.reduce((total, [_,metrics]) => total + metrics.rfc, 0)/(set.length || 1),
      wmc: set.reduce((total, [_,metrics]) => total + metrics.wmc, 0)/(set.length || 1),
    }
  });
  
  return processedData;
}

/**
 * It generates the data to sum of metrics plot
 * 
 * @param {Array} listOfCommits List of commits
 * @param {Array} data Metrics of commits in array format
 */
export function sumOfMetricsOfFiles(listOfCommits, data) {

  const result = metricsOfFiles(
    listOfCommits,
    data
  );

  const processedData = result.map(commit => {
    const set = Object.entries(commit);
    return {
      cbo: set.reduce((total, [_,metrics]) => total + metrics.cbo, 0),
      dit: set.reduce((total, [_,metrics]) => total + metrics.dit, 0),
      nosi: set.reduce((total, [_,metrics]) => total + metrics.nosi, 0),
      rfc: set.reduce((total, [_,metrics]) => total + metrics.rfc, 0),
      wmc: set.reduce((total, [_,metrics]) => total + metrics.wmc, 0),
    }
  });
  
  return processedData;
}

export function evolutionOfFilesByMetrics(listOfCommits, data) {

  const result = metricsOfFiles(
    listOfCommits,
    data
  );

  const processedData = result.map(commit => {
    const set = Object.entries(commit);
    return {
      cbo: set.reduce((total, [_,metrics]) => total + metrics.cbo, 0),
      dit: set.reduce((total, [_,metrics]) => total + metrics.dit, 0),
      nosi: set.reduce((total, [_,metrics]) => total + metrics.nosi, 0),
      rfc: set.reduce((total, [_,metrics]) => total + metrics.rfc, 0),
      wmc: set.reduce((total, [_,metrics]) => total + metrics.wmc, 0),
    }
  });
  
  return processedData;
}

function metricsOfFiles(
  listOfCommits,
  data
) {

  let pos = 0;
  let result = [];

  for(const commit of listOfCommits.reverse()) {
    
    result = extractMetrics(
      result, 
      commit,
      data[commit.id.name],
      pos++
    );
  }

  return result;
}


function extractMetrics(result, commit, data, position) {

  const namesOfDeletedFiles = (commit.diffFiles || [])
    .filter(diff => diff.type === 'DELETE')
    .map(diff => diff.oldPath);

  if(position === 0) {
    result = [...result, {}];
  }
  else {
    
    const metricsOfPreviousVersion = Object
      .entries(result[position-1])
      .filter(([file]) => !namesOfDeletedFiles.includes(file))
      .reduce((total, [file, metrics]) => {
        return {
          ...total,
          [file]: metrics
        }
      }, {});

    result = [...result, metricsOfPreviousVersion];
  }

  
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