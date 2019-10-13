const INITIAL_STATE = {
  listOfRepositories: [],
  current: null,
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

    case 'SELECT_REPOSITORY':
      return {
        ...state,
        current: action.repository
      }
    
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