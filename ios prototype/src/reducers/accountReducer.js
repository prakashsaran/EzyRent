import {
  EZYRENT_AUTHENTICATION_LOADING,
  EZYRENT_SIGN_UP_SUCCESS,
  EZYRENT_SIGN_IN_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  customer: null,
  status:false,
  refreshing: false,
  error: "",
  success: "",
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EZYRENT_SIGN_UP_SUCCESS: {
      return {...state,customer: action.payload,status:true};
    }
    case EZYRENT_SIGN_IN_SUCCESS: {
      return {...state,customer: action.payload,status:true};
    }
    case EZYRENT_AUTHENTICATION_LOADING: {
      return {...state,loading: action.payload,};
    }
    default:
      return state;
  }
};
