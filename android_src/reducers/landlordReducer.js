import {
    EZYRENT_LANDLORD_PROFILE_VIEW_LOADING,
    EZYRENT_GET_LANDLORD_PROFILE,
    EZYRENT_SET_CURRENT_LANDLORD_PROFILE,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    items: [],
    current_landlord:{},
    refreshing: false,
    error: "",
    success: "",
    loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_LANDLORD_PROFILE: {
        return {...state,items: action.payload,loading:false};
      }
      case EZYRENT_SET_CURRENT_LANDLORD_PROFILE: {
        return {...state,current_landlord: action.payload,loading:false};
      }
      case EZYRENT_LANDLORD_PROFILE_VIEW_LOADING: {
        return {...state,loading: action.payload,};
      }
      default:
        return state;
    }
  };
  