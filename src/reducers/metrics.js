const INITIAL_STATE = {
  commits: {},
  header: [],
  listOfCommits: []
};

function repositories(state = INITIAL_STATE, action) {

  switch(action.type) {

    case 'STORE_METRICS':
      const { commit, metrics } = action;

      return {
        ...state,
        commits: {
          ...state.commits,
          [commit]: {
            ...state.commits[commit],
            ...metrics
          }
        }
      }

    case 'SET_HEADER':
      const { header } = action;
      return {
        ...state,
        header
      }

    case 'SET_LIST_COMMITS':
      const { listOfCommits } = action;
      return {
        ...state,
        listOfCommits
      }
    
    default:
      return state;
  }
}

export default repositories;