import {
    EZYRENT_AUTHENTICATION_LOADING,
    EZYRENT_SIGN_IN_SUCCESS,
    EZYRENT_SIGN_IN_MOBILE_NUMBER,
    EZYRENT_SIGN_IN_EMAIL_ID,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    mobile:{number:null,otp:null,dialcode:null},
    mail:{email:null,otp:null},
    refreshing: false,
    error: "",
    success: "",
    loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_SIGN_IN_MOBILE_NUMBER: {
        return {...state,mobile: action.payload,};
      }
      case EZYRENT_SIGN_IN_EMAIL_ID: {
        return {...state,mail: action.payload,};
      }
      case EZYRENT_AUTHENTICATION_LOADING: {
        return {...state,loading: action.payload,};
      }
      default:
        return state;
    }
  };
  