import {
    EZYRENT_PROPERTIES_AS_LANDLORD_LOADING,
    EZYRENT_GET_PROPERTIES_AS_LANDLORD,
    EZYRENT_PROPERTIES_AS_LANDLORD_RESET_LIST,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    items: [],
    refreshing: false,
    error: "",
    success: "",
    loading: false,
    resetListview:null,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_PROPERTIES_AS_LANDLORD: {
        return {...state,items: action.payload,loading:false};
      }
      case EZYRENT_PROPERTIES_AS_LANDLORD_LOADING: {
        return {...state,loading: action.payload,};
      }

      case EZYRENT_PROPERTIES_AS_LANDLORD_RESET_LIST: {
        return {...state,resetListview: action.payload,};
      }
      
      default:
        return state;
    }
  };
  