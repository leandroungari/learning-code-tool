const INITIAL_STATE = {
  current: null,
  branches: [],
  commits: {}
};

function repositories(state = INITIAL_STATE, action) {

  switch(action.type) {

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
    
    default:
      return state;
  }
} 

export default repositories;