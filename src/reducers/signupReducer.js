import {
  EZYRENT_SIGN_UP_SUCCESS,
  EZYRENT_SIGN_UP_MOBILE_NUMBER,
  EZYRENT_SIGN_UP_EMAIL_ID,
} from '../actions/types';

const INITIAL_STATE = {
  mobile:{id:null,number:null,otp:null,dialcode:null,status:null},
  mail:{email:null,otp:null},
  refreshing: false,
  error: "",
  success: "",
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EZYRENT_SIGN_UP_MOBILE_NUMBER: {
      return {...state,mobile: action.payload,};
    }
    case EZYRENT_SIGN_UP_EMAIL_ID: {
      return {...state,mail: action.payload,};
    }
    default:
      return state;
  }
};
