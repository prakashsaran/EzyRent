import {
    EZYRENT_GET_RENTS_AS_LANDLORD_LOADING,
    EZYRENT_GET_RENTS_AS_LANDLORD,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    landlord_items: [],
    landlord_refreshing: false,
    landlord_error: "",
    landlord_success: "",
    landlord_loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_RENTS_AS_LANDLORD: {
        return {...state,landlord_items: action.payload,landlord_loading:false};
      }
      case EZYRENT_GET_RENTS_AS_LANDLORD_LOADING: {
        return {...state,landlord_loading: action.payload,};
      }
      default:
        return state;
    }
  };
  