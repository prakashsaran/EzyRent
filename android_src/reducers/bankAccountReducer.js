import {
    EZYRENT_BANK_ACCOUNTS_LOADING,
    EZYRENT_GET_BANK_ACCOUNTS,
    EZYRENT_ADD_BANK_ACCOUNTS,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    currentAccount:{},
    bankData: [],
    refreshing: false,
    error: "",
    success: "",
    loading: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case EZYRENT_GET_BANK_ACCOUNTS: {
        return {...state,bankData: action.payload,loading:false};
      }
      case EZYRENT_ADD_BANK_ACCOUNTS: {
        return {...state,currentAccount: action.payload,loading:false};
      }
      case EZYRENT_BANK_ACCOUNTS_LOADING: {
        return {...state,loading: action.payload,};
      }
      default:
        return state;
    }
  };
  