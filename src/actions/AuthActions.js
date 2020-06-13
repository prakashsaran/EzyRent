//import {  AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { EzyRent } from '../ezyrent';
import SampleData from '../config/sample-data';
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
  EZYRENT_SIGN_UP_SETUP_COMPLETE_ACCOUNT,
  EZYRENT_SIGN_UP_SUCCESS,
  EZYRENT_AUTHENTICATION_ACCESS_TOKEN,
  EZYRENT_AUTHENTICATION_REFRESH_TOKEN,
  EZYRENT_AUTHENTICATION_TOKEN_TYPE,
  EZYRENT_BUILDING_SET_LIST_VIEW,
  EZYRENT_GET_PROPERTIES_AS_LANDLORD,
  EZYRENT_GET_PROPERTIES_AS_TENANT,
  EZYRENT_GET_SINGLE_PROPERTY,
  EZYRENT_GET_BANK_ACCOUNTS,
  EZYRENT_GET_RENTS_AS_LANDLORD,
  EZYRENT_GET_RENTS_AS_TENANT,
  EZYRENT_GET_NOTIFICATION,
  EZYRENT_SET_CURRENT_TENANT_PROFILE,
} from './types';

import NavigationService from '../navigation/NavigationService';
import {
  NAVIGATION_SIGN_UP_MOBILE_OTP_PATH,
  NAVIGATION_SIGN_UP_MAIL_OTP_PATH,
  SWITCH_NAVIGATION_AUTHORIZED_ACCOUNT_PATH,
  NAVIGATION_SIGN_IN_MOBILE_OTP_PATH,
  NAVIGATION_SIGN_UP_MAIL_ID_PATH,
  NAVIGATION_SIGN_IN_MAIL_OTP_PATH,
  NAVIGATION_SIGN_UP_PROFILE_PATH,
  NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH,
} from '../navigation/routes';

export const signIn = customer => async (dispatch) => {
	dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
	try {
    //signin proccess

    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(customer);

    // send request to server
    const response = await EzyRent.guest.userSignInVerify(formData);

    if(response && response.data){
      const currentAc = response.data.user;
      dispatch({ type: EZYRENT_SIGN_IN_SUCCESS, payload: currentAc });
      dispatch({ type: EZYRENT_SIGN_UP_SETUP_COMPLETE_ACCOUNT, payload: response.data });
      EzyRent.setCurrentAccount(currentAc);
      authSuccess(dispatch,response.data);
    }
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
	} catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};


// setup account at EzyRent
/**
 * @description signUp method : complete account at EzyRent
 * @param mobile string
 * @param dialcode string
 * @returns avoid,
 * @callback NavigationService.navigate();
 **/
export const signUp = (mobiledata,data) => async (dispatch) => {
	dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
	try {
    //signup proccess

    // user id
    const userId = mobiledata.id;

    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(data);


    // send request to server
    const response = await EzyRent.guest.setupAccountComplete(userId,formData);
    if(response && response.data){
      const currentAc = response.data.user;
      dispatch({ type: EZYRENT_SIGN_UP_SUCCESS, payload: currentAc });
      dispatch({ type: EZYRENT_SIGN_UP_SETUP_COMPLETE_ACCOUNT, payload: response.data });
      EzyRent.setCurrentAccount(currentAc);
      authSuccess(dispatch,response.data);
    }
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
	} catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};


/**
 * @description signupMobile method : create a new account at EzyRent
 * @param mobile string
 * @param dialcode string
 * @returns avoid,
 * @callback NavigationService.navigate();
 **/
export const signupMobile = (mobilenumber,dialcode='0091') => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // form data
    const data = {
      "mobile_country_code": dialcode,
      "mobile": mobilenumber,
    }
    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(data);
    // response otp from sms server
    const response = await EzyRent.guest.setupMobile(formData);
    if(response && response.data){
      const dataToProps = {id:response.data.id,status:response.data.status,number:mobilenumber,dialcode:dialcode,otp:null}
       dispatch({ type: EZYRENT_SIGN_UP_MOBILE_NUMBER, payload: dataToProps });
      if(response.data.status=='N'){
        NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_OTP_PATH);  
      } else if(response.data.status=='M'){
        NavigationService.navigate(NAVIGATION_SIGN_UP_MAIL_ID_PATH);  
      } else if(response.data.status=='E'){
        NavigationService.navigate(NAVIGATION_SIGN_UP_PROFILE_PATH);  
      }
  }
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};

/**
 * @description resendMobileOtp method : resend Otp at create account
 * @param user object
 * @param type string
 * @returns avoid
 * @callback NavigationService.navigate();
 **/
export const resendMobileOtp = (user,type) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
      // form data
      const data = {
        "id": user.id,
        "type": type,
      }
      // form data convert to application/x-www-form-urlencoded
      const formData = formUrlencodedData(data);

    // response otp from sms server
    const response = await EzyRent.guest.setupResendMobileOtp(formData);
    
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};

/**
 * @description resendMobileOtp method : resend Otp at create accoutn
 * @param mobile string
 * @param dialcode string
 * @returns avoid
 * @callback NavigationService.navigate();
 **/
export const signupMobileOtp = (mobiledata,mobile_otp) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // user id
    const userId = mobiledata.id;

    // form data
    const data = {mobile_otp}

    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(data);
    const response = await EzyRent.guest.setupMobileOtp(userId,formData);
    if(response){
      mobiledata.status =response.data.status;
      mobiledata.otp =response.data.mobile_otp;
      dispatch({ type: EZYRENT_SIGN_UP_MOBILE_NUMBER, payload: mobiledata });
      NavigationService.navigate(NAVIGATION_SIGN_UP_MAIL_ID_PATH);  
    }

    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }

}

/**
 * @description signupMail method : send mail to verification valid email address
 * @param mobiledata object
 * @param email string
 * @returns avoid
 * @callback NavigationService.navigate();
 **/
export const signupMail = (mobiledata,email) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess

    //form data
    const data = {"id":mobiledata.id,"email":email}

    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(data);

    // response otp from sms server
    const response = await EzyRent.guest.setupEmail(formData);
    if(response){
      dispatch({ type: EZYRENT_SIGN_UP_EMAIL_ID, payload: {email:email} });
     NavigationService.navigate(NAVIGATION_SIGN_UP_MAIL_OTP_PATH);
  }

    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};


/**
 * @description signupMailOtp method :  verification  email otp
 * @param mobiledata object
 * @param email_otp string
 * @returns avoid
 * @callback NavigationService.navigate();
 **/
export const signupMailOtp = (mobiledata,maildata,email_otp) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // user id
    const userId = mobiledata.id;

    // form data
    const data = {email_otp}

    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(data);

    // response otp from sms server
    const response = await EzyRent.guest.setupEmailVerify(userId,formData);
    if(response && response.data){
      mobiledata.status =response.data.status;
      maildata.otp = email_otp;
      dispatch({ type: EZYRENT_SIGN_UP_MOBILE_NUMBER, payload: mobiledata });
      dispatch({ type: EZYRENT_SIGN_UP_EMAIL_ID, payload: maildata });
      NavigationService.navigate(NAVIGATION_SIGN_UP_PROFILE_PATH);
    }
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
}

const formUrlencodedData = (data)=>{
  var formBody = [];
  for (var item in data) {
    formBody.push(item + "=" + data[item]);
  }
  formBody = formBody.join("&");
  return formBody;
}

export const signinMail = (email) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess
    // response otp from sms server
    // form data
    const data = {email}

    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(data);

    // response otp from sms server
    const response = await EzyRent.guest.userSignIn(formData);
    if(response && response.data && response.data.type=="V"){
      const propData = {email,id:response.data.id,type:response.data.type,otp:null};
      dispatch({ type: EZYRENT_SIGN_IN_EMAIL_ID, payload: propData });
      NavigationService.navigate(NAVIGATION_SIGN_IN_MAIL_OTP_PATH);
    }
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};


export const signinMobile = (mobile,mobile_country_code="0091") => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    // send otp proccess

    // form data
    const data = {mobile_country_code,mobile}

    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(data);

    // response otp from sms server
    const response = await EzyRent.guest.userSignIn(formData);
    console.log("response signinMobile",JSON.stringify(response));
    
    if(response && response.data && response.data.type=="V"){
      const propData = {number:mobile,dialcode:mobile_country_code,id:response.data.id,type:response.data.type,otp:null};
      dispatch({ type: EZYRENT_SIGN_IN_MOBILE_NUMBER, payload: propData });
      NavigationService.navigate(NAVIGATION_SIGN_IN_MOBILE_OTP_PATH);
    }
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
  } catch (e) {
    console.error(e)
    authFail(dispatch, e.message);
  }
};





export const resendMailOtp = (userdata,email) => async (dispatch) => {
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: true });
  try {
    //form data
    const data = {"id":userdata.id}


    // form data convert to application/x-www-form-urlencoded
    const formData = formUrlencodedData(data);


    // response otp from sms server
    const response = await EzyRent.guest.setupResendMailOtp(formData);

    /* let responseOtp = 1234;
    dispatch({ type: EZYRENT_SIGN_UP_EMAIL_ID, payload: {email:email,otp:responseOtp} });
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false }); */
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

const authSuccess = async (dispatch, userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
    if(userData.hasOwnProperty("access_token")){
        EzyRent.setAccessToken(userData.access_token);
        EzyRent.setTokenType(userData.token_type);
        dispatch({ type: EZYRENT_AUTHENTICATION_ACCESS_TOKEN, payload: userData.access_token });
      await AsyncStorage.setItem('access_token', userData.access_token);
    }
    if(userData.hasOwnProperty("refresh_token")){
      dispatch({ type: EZYRENT_AUTHENTICATION_REFRESH_TOKEN, payload: userData.refresh_token });
      await AsyncStorage.setItem('refresh_token', userData.refresh_token);
    }
    if(userData.hasOwnProperty("token_type")){
      dispatch({ type: EZYRENT_AUTHENTICATION_TOKEN_TYPE, payload: userData.token_type });
      await AsyncStorage.setItem('token_type', userData.token_type);
    }
    NavigationService.navigate(SWITCH_NAVIGATION_AUTHORIZED_ACCOUNT_PATH);
  } catch (e) {
    authFail(dispatch, 'Something went wrong. Pleas try again later.');
  }
};


export const setCurrentCustomer = (userData) => async (dispatch, getState) => {
  const currentAc = userData.user;
  dispatch({ type: EZYRENT_SIGN_IN_SUCCESS, payload: currentAc });
  dispatch({ type: EZYRENT_SIGN_UP_SETUP_COMPLETE_ACCOUNT, payload: userData });
  EzyRent.setCurrentAccount(currentAc);
  if(userData.hasOwnProperty("access_token")){
    EzyRent.setAccessToken(userData.access_token);
    EzyRent.setTokenType(userData.token_type);
    dispatch({ type: EZYRENT_AUTHENTICATION_ACCESS_TOKEN, payload: userData.access_token });
  }
  if(userData.hasOwnProperty("refresh_token")){
    dispatch({ type: EZYRENT_AUTHENTICATION_REFRESH_TOKEN, payload: userData.refresh_token });
  }
  if(userData.hasOwnProperty("token_type")){
    dispatch({ type: EZYRENT_AUTHENTICATION_TOKEN_TYPE, payload: userData.token_type });
  }
  dispatch({ type: EZYRENT_AUTHENTICATION_LOADING, payload: false });
};


export const isAuth  = (customer,access_token,navigation) => async (dispatch) =>{
  if(customer){
    const ctmrObj = Object.keys(customer).length;
    if(access_token && ctmrObj ){
      navigation.navigate(SWITCH_NAVIGATION_AUTHORIZED_ACCOUNT_PATH);
    }  
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: EZYRENT_BUILDING_SET_LIST_VIEW, payload: [] });
    dispatch({ type: EZYRENT_GET_PROPERTIES_AS_LANDLORD, payload: [] });
    dispatch({ type: EZYRENT_GET_PROPERTIES_AS_TENANT, payload: [] });
    dispatch({ type: EZYRENT_GET_SINGLE_PROPERTY, payload: {} });
    dispatch({ type: EZYRENT_GET_BANK_ACCOUNTS, payload: [] });
    dispatch({ type: EZYRENT_GET_RENTS_AS_LANDLORD, payload: [] });
    dispatch({ type: EZYRENT_GET_RENTS_AS_TENANT, payload: [] });
    dispatch({ type: EZYRENT_GET_NOTIFICATION, payload: [] });
    dispatch({ type: EZYRENT_SET_CURRENT_TENANT_PROFILE, payload: {} });
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    NavigationService.navigate(NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH);
  } catch (error) {
      console.error('Error clearing app data.');
  }
}