const INITIAL_STATE = {
  listOfRepositories: [],
  current: undefined,
  repository: {
    name: undefined,
    branches: [],
    commits: {}
  }
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
    
    case 'SET_REPOSITORY_DATA':
      return {
        ...state,
        repository: {
          name: action.name,
          branches: action.branches,
          commits: action.commits
        }
        
      }

    default:
      return state;
  }
} 

export default repositories;