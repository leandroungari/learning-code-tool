const INITIAL_STATE = {
  commits: {},
  header: []
};

function repositories(state = INITIAL_STATE, action) {

  switch(action.type) {

    case 'STORE_METRICS':
      const { commit, metrics } = action;
      return {
        ...state,
        commits: {
          ...state.commits,
          [commit] : metrics
        }
      }

    case 'SET_HEADER':
      const { header } = action;
      return {
        ...state,
        header
      }
    
    default:
      return state;
  }
}

export default repositories;