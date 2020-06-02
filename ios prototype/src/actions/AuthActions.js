import {  AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { EzyRent } from '../ezyrent';
import SampleData from '../config/sample-data'
import {
  EZYRENT_SIGN_UP_ACCOUNT,
  EZYRENT_SIGN_IN_ACCOUNT,
  EZYRENT_AUTHENTICATION_LOADING,
  EZYRENT_AUTHENTICATION_ERROR,
  EZYRENT_SIGN_UP_MOBILE_NUMBER,
  EZYRENT_SIGN_UP_EMAIL_ID,
  EZYRENT_SIGN_IN_MOBILE_NUMBER,
  EZYRENT_SIGN_IN_EMAIL_ID,
  EZYRENT_SIGN_IN_SUCCESS,
} from './types';
import NavigationService from '../navigation/NavigationService';
import {
  NAVIGATION_SIGN_UP_MOBILE_OTP_PATH,
  NAVIGATION_SIGN_UP_MAIL_OTP_PATH,
  SWITCH_NAVIGATION_AUTHORIZED_ACCOUNT_PATH,
  NAVIGATION_SIGN_IN_MOBILE_OTP_PATH,
  NAVIGATION_SIGN_IN_MAIL_OTP_PATH,
} from '../navigation/routes';

export const signIn = customer => async (dispatch) => {
	dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
	try {
    //signin proccess
    const allAccounts = SampleData.getAccounts() || [];
    let currentAc = undefined;
    if(customer.hasOwnProperty("number")){
      currentAc = allAccounts.find(objct => objct.contact==customer.number);
    } else if(customer.hasOwnProperty("email")){
      currentAc = allAccounts.find(objct => objct.email==customer.email);
    }
    if(!currentAc){
      currentAc = SampleData.getFreshAccount();
    }
    EzyRent.setCurrentAccount(currentAc);
    NavigationService.navigate(SWITCH_NAVIGATION_AUTHORIZED_ACCOUNT_PATH);
		dispatch({ type: EZYRENT_SIGN_IN_SUCCESS, payload: currentAc });
	} catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};


export const signUp = customer => async (dispatch) => {
	dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
	try {
    //signup proccess
    NavigationService.navigate(SWITCH_NAVIGATION_AUTHORIZED_ACCOUNT_PATH);
    let currentAc = SampleData.getFreshAccount();
    EzyRent.setCurrentAccount(currentAc);
		dispatch({ type: EZYRENT_SIGN_UP_ACCOUNT, payload: currentAc });
	} catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};



export const signupMobile = (mobilenumber,dialcode=null) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // response otp from sms server
    let responseOtp = 1234;
    dispatch({ type: EZYRENT_SIGN_UP_MOBILE_NUMBER, payload: {number:mobilenumber,dialcode:dialcode,otp:responseOtp} });
    NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_OTP_PATH);
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};


export const signinMail = (email) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // response otp from sms server
    let otp = 1234;
    dispatch({ type: EZYRENT_SIGN_IN_EMAIL_ID, payload: {email:email,otp:otp} });
    NavigationService.navigate(NAVIGATION_SIGN_IN_MAIL_OTP_PATH);
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};


export const signinMobile = (mobilenumber,dialcode=null) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // response otp from sms server
    let responseOtp = 1234;
    dispatch({ type: EZYRENT_SIGN_IN_MOBILE_NUMBER, payload: {number:mobilenumber,dialcode:dialcode,otp:responseOtp} });
    NavigationService.navigate(NAVIGATION_SIGN_IN_MOBILE_OTP_PATH);
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};



export const signupMail = (email) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // response otp from sms server
    let responseOtp = 1234;
    dispatch({ type: EZYRENT_SIGN_UP_EMAIL_ID, payload: {email:email,otp:responseOtp} });
    NavigationService.navigate(NAVIGATION_SIGN_UP_MAIL_OTP_PATH);
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};


export const resendMobileOtp = (mobilenumber,dialcode=null) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // response otp from sms server
    let responseOtp = 1234;
    dispatch({ type: EZYRENT_SIGN_UP_MOBILE_NUMBER, payload: {number:mobilenumber,dialcode:dialcode,otp:responseOtp} });
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};

export const resendMailOtp = (email) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // response otp from sms server
    let responseOtp = 1234;
    dispatch({ type: EZYRENT_SIGN_UP_EMAIL_ID, payload: {email:email,otp:responseOtp} });
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};

const authFail = (dispatch, message) => {
  dispatch(errorMessage(message));
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
};
export const errorMessage = error => ({ type: EZYRENT_AUTHENTICATION_ERROR, payload: error });
