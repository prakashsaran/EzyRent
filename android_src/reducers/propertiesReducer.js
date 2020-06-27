import {
    EZYRENT_GET_SINGLE_PROPERTY,
    EZYRENT_SINGLE_PROPERTY_LOADING,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    property_items: [],
    property_currentItem:{},
    property_refreshing: false,
    property_error: "",
    property_success: "",
    property_loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_SINGLE_PROPERTY: {
        return {...state,property_currentItem: action.payload,property_loading:false};
      }
      case EZYRENT_SINGLE_PROPERTY_LOADING: {
        return {...state,property_loading: action.payload,};
      }
      default:
        return state;
    }
  };
