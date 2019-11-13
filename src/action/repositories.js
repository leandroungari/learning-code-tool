export function storeRepository(name, branches, commits) {
  return {
    type: 'SET_REPOSITORY_DATA',
    name,
    branches,
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