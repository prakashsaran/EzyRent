import {
    EZYRENT_GET_NOTIFICATION_LOADING,
    EZYRENT_GET_NOTIFICATION,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    items: [],
    refreshing: false,
    error: "",
    success: "",
    loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_NOTIFICATION: {
        return {...state,items: action.payload,loading:false};
      }
      case EZYRENT_GET_NOTIFICATION_LOADING: {
        return {...state,loading: action.payload,};
      }
      default:
        return state;
    }
  };
  