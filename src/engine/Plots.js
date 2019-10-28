import { normalized } from "./Stats";

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

/////////////////////////////////////////////

export function normalizedAverageOfMetricsOfFiles(listOfCommits, data) {

  const result = averageOfMetricsOfFiles(listOfCommits, data);
  const listOfValues = extractListOfValues(result);

  const normalizedList = normalizeValues(listOfValues);
  return generateResultMetrics(normalizedList);
}

function extractListOfValues(result) {
  return [
    result.map(commit => commit.cbo),
    result.map(commit => commit.dit),
    result.map(commit => commit.nosi),
    result.map(commit => commit.rfc),
    result.map(commit => commit.wmc)
  ]
}

function normalizeValues(list) {
  return list.map(values => normalized(values));
}

function generateResultMetrics(list) {
  const result = [];
  for(let i = 0; i < list[0].length; i++) {
    result.push({
      cbo: list[0][i],
      dit: list[1][i],
      nosi: list[2][i],
      rfc: list[3][i],
      wmc: list[4][i],
    });
  }
  return result;
}

/////////////////////////////////////////////

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

/////////////////////////////////////////////

export function evolutionOfFilesByMetrics(listOfCommits, data, metric) {

  const result = metricsOfFiles(
    listOfCommits,
    data
  );
  
  const allNamesOfFiles = namesOfFilesInARangeOfCommits(result);
  
  const processedData = result.map(commit => {
    return Object
      .entries(commit)
      .reduce((total, [file, metrics]) => {
        return {
          ...total,
          [file]: metrics[metric]
        }
      }, {});
  });

  const resultingMetrics = fillNonExistingFilesInAllCommits(
    allNamesOfFiles, 
    processedData
  );

  return {
    data: resultingMetrics,
    legends: allNamesOfFiles
  }
}

function fillNonExistingFilesInAllCommits(nameOfFiles, commits) {

  return commits.map(commit => fillNonExistingFilesInACommit(nameOfFiles, commit));
}

function fillNonExistingFilesInACommit(nameOfFiles, commit) {
  return {
    ...nameOfFiles.reduce((total,name) => {
      return {
        ...total,
        [name]: 0
      }
    }, {}),
    ...commit
  }
}

function namesOfFilesInARangeOfCommits(listOfCommits) {
  return listOfCommits.reduce((list, commit) => {
    return [ 
      ...list,
      ...namesOfFilesOfACommit(commit).filter(name => !list.includes(name))
    ];
  }, []);
}

function namesOfFilesOfACommit(commit) {
  
  return Object.entries(commit).map(([file,_]) => file);
}

/////////////////////////////////////////////

function metricsOfFiles(listOfCommits,data) {

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