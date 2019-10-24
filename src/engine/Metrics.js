import {
  server
} from '../services';

export async function metricsOfCommit(type,repo,branch,commit) {
  return fetch(
    `${server.host}/metrics/${type}/${repo}/${branch}/${commit}`
  )
  .then(result => result.json());
}