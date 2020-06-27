import {
    EZYRENT_NETWORK_CONNECTION_INFO,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    isnetConnection:true,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_NETWORK_CONNECTION_INFO: {
        return {...state,isnetConnection: action.payload};
      }
      default:
        return state;
    }
  };
  