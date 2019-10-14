const INITIAL_STATE = {
  listOfRepositories: [],
  branches: [],
  commits: {}
};

function repositories(state = INITIAL_STATE, action) {

  switch(action.type) {

    case 'LIST_REPOSITORIES':
      return {
        state,
        listOfRepositories: action.list
      };
    
    case 'SET_BRANCHES':
      return {
        ...state,
        branches: action.branches
      }

    case 'SET_COMMITS':
      return {
        ...state,
        commits: action.commits
      }
    
    default:
      return state;
  }
} 

export default repositories;