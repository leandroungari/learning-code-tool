export function storeBranches(branches) {
  return {
    type: 'SET_BRANCHES',
    branches
  }
}

export function storeCommits(commits) {
  return {
    type: 'SET_COMMITS',
    commits
  }
}

export function currentRepository(name) {
  return {
    name,
    type: 'CURRENT_REPOSITORY'
  }
}

export function listRepositories(result) {
  return {
    type: 'LIST_REPOSITORIES',
    list: result
  }
}