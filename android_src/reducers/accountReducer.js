import {
  EZYRENT_AUTHENTICATION_LOADING,
  EZYRENT_SIGN_UP_SUCCESS,
  EZYRENT_SIGN_IN_SUCCESS,
  EZYRENT_SIGN_UP_SETUP_COMPLETE_ACCOUNT,
  EZYRENT_AUTHENTICATION_ACCESS_TOKEN,
  EZYRENT_AUTHENTICATION_REFRESH_TOKEN,
  EZYRENT_AUTHENTICATION_TOKEN_TYPE,
  EZYRENT_UPDATE_CUSTOMER_ACCOUNT,
  EZYRENT_ACCOUNT_LOADING,
  EZYRENT_UPDATING_FIELD_ACCOUNT,
} from '../actions/types';

const INITIAL_STATE = {
  customer: null,
  status:false,
  data:null,
  updating:{},
  access_token:null,
  refresh_token:null,
  token_type:"Bearer",
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
    case EZYRENT_AUTHENTICATION_ACCESS_TOKEN: {
      return {...state,access_token: action.payload};
    }
    case EZYRENT_AUTHENTICATION_REFRESH_TOKEN: {
      return {...state,refresh_token: action.payload};
    }
    case EZYRENT_AUTHENTICATION_TOKEN_TYPE: {
      return {...state,token_type: action.payload};
    }
    case EZYRENT_SIGN_UP_SETUP_COMPLETE_ACCOUNT: {
      return {...state,data: action.payload};
    }
    case EZYRENT_SIGN_IN_SUCCESS: {
      return {...state,customer: action.payload,status:true};
    }
    case EZYRENT_AUTHENTICATION_LOADING: {
      return {...state,loading: action.payload,};
    }
    case EZYRENT_ACCOUNT_LOADING: {
      return {...state,loading: action.payload,};
    }
    case EZYRENT_UPDATE_CUSTOMER_ACCOUNT:{
      return {...state,customer: action.payload};
    }
    case EZYRENT_UPDATING_FIELD_ACCOUNT: {
      return {...state,updating: action.payload};
    }
    default:
      return state;
  }
};
