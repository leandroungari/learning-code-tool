
export function storeMetrics(commit, data) {
  return {
    type: 'STORE_METRICS',
    metrics: data,
    commit
  };
}

export function storeHeader(header) {
  return {
    type: 'SET_HEADER',
    header
  };
}