export function storeGoodCommits(branch, commits) {
  return {
    type: "GOOD_COMMITS",
    id: branch,
    commits
  }
}

export function storeBadCommits(branch, commits) {
  return {
    type: "BAD_COMMITS",
    id: branch,
    commits
  }
}