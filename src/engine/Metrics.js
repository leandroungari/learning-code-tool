import {
  server
} from '../services';

/**
 * It retrieves the metrics from a specified commit
 * 
 * @param {String} type All metrics or only from diff files ('all' || 'diff') 
 * @param {String} repo Name of repository
 * @param {String} branch Branch id 
 * @param {String} commit Commit id
 * 
 * @returns All metrics from commit
 */
export async function metricsOfCommit(type,repo,branch,commit) {
  return fetch(
    `${server.host}/metrics/${type}/${repo}/${branch}/${commit}`
  )
  .then(result => result.json());
}

export async function metricsOfARangeOfCommits(type,repo,branch,listOfCommits) {

  return new Promise((resolve) => {

    const list = listOfCommits.map(async(commitId) => {
      
      return await metricsOfCommit(
        type,
        repo,
        branch,
        commitId  
      );
    });

    resolve(Promise.all(list));
  });
}