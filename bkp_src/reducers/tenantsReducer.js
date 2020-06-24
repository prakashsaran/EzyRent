import {
    EZYRENT_TENANT_PROFILE_VIEW_LOADING,
    EZYRENT_GET_TENANT_PROFILE,
    EZYRENT_SET_CURRENT_TENANT_PROFILE,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    items: [],
    current_tenant:{},
    refreshing: false,
    error: "",
    success: "",
    loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_TENANT_PROFILE: {
        return {...state,items: action.payload,loading:false};
      }
      case EZYRENT_SET_CURRENT_TENANT_PROFILE: {
        return {...state,current_tenant: action.payload,loading:false};
      }
      case EZYRENT_TENANT_PROFILE_VIEW_LOADING: {
        return {...state,loading: action.payload,};
      }
      default:
        return state;
    }
  };
  