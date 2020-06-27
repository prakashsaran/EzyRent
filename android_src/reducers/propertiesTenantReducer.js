import {
    EZYRENT_PROPERTIES_AS_TENANT_LOADING,
    EZYRENT_GET_PROPERTIES_AS_TENANT,
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
      case EZYRENT_GET_PROPERTIES_AS_TENANT: {
        return {...state,items: action.payload,loading:false};
      }
      case EZYRENT_PROPERTIES_AS_TENANT_LOADING: {
        return {...state,loading: action.payload,};
      }
      default:
        return state;
    }
  };
