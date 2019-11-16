const INITIAL_STATE = {
  listCommits: {
    good: {
      branchId: undefined,
      list: []
    },
    bad: {
      branchId: undefined,
      list: []
    }
  }
};

function metrics(state = INITIAL_STATE, action) {

  switch(action.type) {
    case "GOOD_COMMITS":
      return {
        ...state,
        listCommits: {
          ...state.listCommits,
          good: {
            branchId: action.id,
            list: action.commits
          }
        }
      }
    
    case "BAD_COMMITS":
      return {
        ...state,
        listCommits: {
          ...state.listCommits,
          bad: {
            branchId: action.id,
            list: action.commits
          }
        }
      }
    
    default:
      return state;
  }
}

export default metrics;