export function averageOfMetricsOfFiles(listOfCommits, data) {

  console.log(data, "preciso arrumar aqui");

  const result = metricsOfFiles(
    data,
    listOfCommits
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

export function metricsOfFiles(
  listOfCommits,
  dataOfCommits
) {

  //let result = extractMetrics(listOfCommits, [], initialCommit, 0);
  let result = [];
  //let [, ...remainingOfCommits] = dataOfCommits.reverse();
  
  //let pos = 1;
  let pos = 0;
  //for(const commit of remainingOfCommits) {
  for(const commit of dataOfCommits) {
    result = extractMetrics(
      listOfCommits,
      result, 
      commit.files, 
      pos++
    );
  }

  return result;
}

function extractMetrics(listOfCommits,result, data, position) {

  const namesOfDeletedFiles = (listOfCommits[position]
    .diffFiles || [])
    .filter(diff => diff.type === 'MODIFY')
    .map(diff => diff.oldPath);

  result = [
    ...result, 
    (
      position === 0 ? 
      {} : 
      Object
      .entries(result[position-1])
      .filter(([file]) => !namesOfDeletedFiles.includes(file))
      .reduce((total, [file, metrics]) => {
        return {
          ...total,
          [file]: metrics
        }
      }, {})
    )
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