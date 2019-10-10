const INITIAL_STATE = {
  current: null
};

function repositories(state = INITIAL_STATE, action) {

  switch(action.type) {

    case 'SELECT_REPOSITORY':
      return {
        ...state,
        current: action.repository
      }
    
    default:
      return state;
  }
} 

export default repositories;