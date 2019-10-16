
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