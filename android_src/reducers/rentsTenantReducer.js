import {
    EZYRENT_GET_RENTS_AS_TENANT_LOADING,
    EZYRENT_GET_RENTS_AS_TENANT,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    tenant_items: [],
    tenant_refreshing: false,
    tenant_error: "",
    tenant_success: "",
    tenant_loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_RENTS_AS_TENANT: {
        return {...state,tenant_items: action.payload,tenant_loading:false};
      }
      case EZYRENT_GET_RENTS_AS_TENANT_LOADING: {
        return {...state,tenant_loading: action.payload,};
      }
      default:
        return state;
    }
  };
  