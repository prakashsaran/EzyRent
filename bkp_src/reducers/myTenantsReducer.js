import {
    EZYRENT_GET_MY_TENANT,
    EZYRENT_MY_TENANT_LOADING,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    items: [],
    currentItem:{},
    refreshing: false,
    error: "",
    success: "",
    loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_MY_TENANT: {
        return {...state,items: action.payload,loading:false};
      }
      case EZYRENT_MY_TENANT_LOADING: {
        return {...state,loading: action.payload,};
      }
      default:
        return state;
    }
  };
