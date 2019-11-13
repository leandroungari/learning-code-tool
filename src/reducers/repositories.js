const INITIAL_STATE = {
  listOfRepositories: [],
  current: undefined,
  branches: [],
  commits: []
};

function repositories(state = INITIAL_STATE, action) {

  switch(action.type) {

    case 'CURRENT_REPOSITORY':
      return {
        ...state,
        current: action.name
      }

    case 'LIST_REPOSITORIES':
      return {
        ...state,
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