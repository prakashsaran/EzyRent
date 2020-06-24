import {
    EZYRENT_BUILDING_LOADING,
    EZYRENT_BUILDING_ADD_NEW,
    EZYRENT_BUILDING_GET_LIST_VIEW,
    EZYRENT_BUILDING_SET_LIST_VIEW,
    EZYRENT_BUILDING_SET_SELECTED,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    buildingData: [],
    selectedBuilding:null,
    refreshing: false,
    error: "",
    success: "",
    loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_BUILDING_SET_LIST_VIEW: {
        return {...state,buildingData: action.payload,loading:false};
      }
      case EZYRENT_BUILDING_GET_LIST_VIEW: {
        return {...state,buildingData: action.payload,loading:false};
      }
      case EZYRENT_BUILDING_ADD_NEW: {
        return {...state,buildingData: action.payload,loading:false};
      }
      case EZYRENT_BUILDING_SET_SELECTED: {
        return {...state,selectedBuilding: action.payload};
      }
      case EZYRENT_BUILDING_LOADING: {
        return {...state,loading: action.payload,};
      }
      default:
        return state;
    }
  };
  