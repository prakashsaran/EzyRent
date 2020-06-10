//import {  AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { EzyRent } from '../ezyrent';
import { ezyrentOptions } from '../config/ezyrent';
import { getUserData,updateUserData } from './AsyncData';
import {
  EZYRENT_INIT,
  EZYRENT_INIT_ERROR,
  EZYRENT_BUILDING_LOADING,
  EZYRENT_BUILDING_SET_LIST_VIEW,
  EZYRENT_UPDATE_CUSTOMER_ACCOUNT,
  EZYRENT_ACCOUNT_LOADING,
  EZYRENT_PROPERTIES_AS_LANDLORD_LOADING,
  EZYRENT_PROPERTIES_AS_TENANT_LOADING,
  EZYRENT_BANK_ACCOUNTS_LOADING,
  EZYRENT_GET_BANK_ACCOUNTS,
  EZYRENT_GET_PROPERTIES_AS_LANDLORD,
  EZYRENT_ADD_BANK_ACCOUNTS,
  EZYRENT_GET_PROPERTIES_AS_TENANT,
  EZYRENT_GET_SINGLE_PROPERTY,
  EZYRENT_GET_RENTS_AS_LANDLORD_LOADING,
  EZYRENT_GET_RENTS_AS_LANDLORD,
  EZYRENT_GET_RENTS_AS_TENANT,
  EZYRENT_GET_RENTS_AS_TENANT_LOADING,
  EZYRENT_GET_NOTIFICATION_LOADING,
  EZYRENT_GET_NOTIFICATION,
  EZYRENT_GET_TENANT_PROFILE,
  EZYRENT_TENANT_PROFILE_VIEW_LOADING,
  EZYRENT_SET_CURRENT_TENANT_PROFILE,
  EZYRENT_MY_LANDLORD_LOADING,
  EZYRENT_GET_MY_LANDLORD,
  EZYRENT_GET_MY_TENANT,
  EZYRENT_MY_TENANT_LOADING,
  EZYRENT_UPDATING_FIELD_ACCOUNT,
  EZYRENT_GET_LANDLORD_PROFILE,
  EZYRENT_LANDLORD_PROFILE_VIEW_LOADING,
  EZYRENT_SET_CURRENT_LANDLORD_PROFILE,
} from './types';
import NavigationService from '../navigation/NavigationService';
import {
  NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_VERIFICATION_BANK_ACCOUNT_VIEW_PATH,
  NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH,
} from '../navigation/routes';

export const initEzyRent = () => {
  EzyRent.setOptions(ezyrentOptions);

  return async (dispatch) => {
    try {
      EzyRent.init();
     // dispatch({ type: EZYRENT_CONFIG, payload: storeConfig });
    } catch (error) {
      console.log(error);
      dispatch({ type: EZYRENT_INIT_ERROR, payload: { errorMessage: error.message } });
    }
  };
}

export const getBuildings = () => async (dispatch) => {
  const response = await EzyRent.admin.getBuildings();
  if(response && response.data){
    dispatch({ type: EZYRENT_BUILDING_SET_LIST_VIEW, payload: response.data });
  }
}
const refreshBuildings = async(dispatch) => {
  const response = await EzyRent.admin.getBuildings();
  if(response && response.data){
    dispatch({ type: EZYRENT_BUILDING_SET_LIST_VIEW, payload: response.data });
  }
}
export const addNewBuilding = (data) => async (dispatch) => {
  dispatch({ type: EZYRENT_BUILDING_LOADING, payload: true });
  try {
    const formData = formUrlencodedData(data);
    const response = await EzyRent.admin.addNewBuilding(formData);
    if(response && response.data){
      refreshBuildings(dispatch);
    }
  dispatch({ type: EZYRENT_BUILDING_LOADING, payload: false });
  } catch (e) {
    console.error(e)
  }
}

export const updateUserProfle = (customer,data) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    const formData = formMultipartData("profile_image",data);
    const userId = customer.id;
    const userData = await getUserData();
    const response = await EzyRent.admin.updateUserProfle(userId,formData);
      if(response && response.data){
        customer.profile_pic = response.data.profile_pic;
        userData.user.profile_pic = response.data.profile_pic;
        dispatch({ type: EZYRENT_UPDATE_CUSTOMER_ACCOUNT, payload: customer });
        updateUserData(userData);
      }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}

export const getMyProfile = (user) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    const userId = user.id;
    const userData = await getUserData();
    const response = await EzyRent.admin.getMyProfile(userId);
      if(response && response.data){
        userUpdatedata = {...user, ...response.data};
        userData.user = userUpdatedata;
        console.log("userUpdatedata is now ",userUpdatedata)
        dispatch({ type: EZYRENT_UPDATE_CUSTOMER_ACCOUNT, payload: userUpdatedata });
        updateUserData(userData);
        refreshBanks(dispatch);
      }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}

export const deleteProfileImage = (user) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    // set post params
    const userId = user.id;

    const response = await EzyRent.admin.deleteProfileImage(userId);
      if(response && response.success){
        user.profile_pic = "default.jpg";
        console.log("userUpdatedata is now ",user)
        dispatch({ type: EZYRENT_UPDATE_CUSTOMER_ACCOUNT, payload: user });
      }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}

export const changeProfileName = (user,full_name) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    // set post params
    const userId = user.id;
    const data = {full_name};
    const formData = formUrlencodedData(data);

    const response = await EzyRent.admin.changeProfileName(userId,formData);
      if(response && response.success){
        user.full_name = full_name;
        console.log("userUpdatedata is now ",user)
        dispatch({ type: EZYRENT_UPDATE_CUSTOMER_ACCOUNT, payload: user });
      }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}


export const changeEmailAddress = (user,email) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    // set post params
    const userId = user.id;
    const data = {email};
    const formData = formUrlencodedData(data);
    
    const response = await EzyRent.admin.changeEmailAddress(userId,formData);
      if(response && response.data){
        updatingData = {...data, ...response.data};
        console.log("changeEmailAddress is",updatingData);
        dispatch({ type: EZYRENT_UPDATING_FIELD_ACCOUNT, payload: updatingData });
      }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}

export const changeMobileNumber = (user,data) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    // set post params
    const userId = user.id;
    const formData = formUrlencodedData(data);
    
    const response = await EzyRent.admin.changeMobileNumber(userId,formData);
      if(response && response.data){
        updatingData = {...data, ...response.data};
        console.log("changeMobileNumber is",updatingData);
        dispatch({ type: EZYRENT_UPDATING_FIELD_ACCOUNT, payload: updatingData });
      }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}


export const changeMobilePin = (user,mpin) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    // set post params
    const userId = user.id;
    const data = {mpin};
    const formData = formUrlencodedData(data);
    
    const response = await EzyRent.admin.changeMobilePin(userId,formData);
      if(response && response.data){
        updatingData = {...data, ...response.data};
        console.log("changeMobilePin is",updatingData);
        dispatch({ type: EZYRENT_UPDATING_FIELD_ACCOUNT, payload: updatingData });
      }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}


export const mpinChangeVerify = (updatingData,mobile_otp) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    // set post params
    const UpdateId = updatingData.id;
    const data = {mobile_otp};
    const formData = formUrlencodedData(data);
    //request to server
    const response = await EzyRent.admin.mpinChangeVerify(UpdateId,formData);
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}


export const emailAdressChangeVerify = (user,updatingData,data) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    // set post params
    const UpdateId = updatingData.id;
    const formData = formUrlencodedData(data);
    //request to server
    const response = await EzyRent.admin.emailAdressChangeVerify(UpdateId,formData);
    if(response){
      user.email = updatingData.email
      dispatch({ type: EZYRENT_UPDATE_CUSTOMER_ACCOUNT, payload: user });
    }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}

export const mobileNumberChangeVerify = (user,updatingData,data) => async (dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    // set post params
    const UpdateId = updatingData.id;
    const formData = formUrlencodedData(data);
    //request to server
    const response = await EzyRent.admin.mobileNumberChangeVerify(UpdateId,formData);
    if(response){
      user.mobile = updatingData.mobile
      dispatch({ type: EZYRENT_UPDATE_CUSTOMER_ACCOUNT, payload: user });
    }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}

export const refreshMyProfile  = async (user,dispatch) =>{
  dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: true });
  try {
    const userId = user.id;
    const userData = await getUserData();
    const response = await EzyRent.admin.getMyProfile(userId);
      if(response && response.data){
        userUpdatedata = {...user, ...response.data};
        userData.user = userUpdatedata;
        console.log("userUpdatedata is now ",userUpdatedata)
        dispatch({ type: EZYRENT_UPDATE_CUSTOMER_ACCOUNT, payload: userUpdatedata });
        updateUserData(userData);
        refreshBanks(dispatch);
      }
      dispatch({ type: EZYRENT_ACCOUNT_LOADING, payload: false });
    } catch (e) {
      console.error(e)
    }
}

export const addProperty = (data,media=null,user=null) => async (dispatch) => {
  if(media){
    const formData = formMultipartData("property_image",media,data);
    const response = await EzyRent.admin.addPropertyWithImage(formData);
    console.log("response addProperty",JSON.stringify(response))
    if(response && response.success){
      refreshPropertiesForLandlord(dispatch);
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
      // re render user profile
      if(user){
        console.log("======= refreshMyProfile is exicute now =========");
        refreshMyProfile(user,dispatch);
      }
    }
  } else {
    const formData = formUrlencodedData(data);
    const response = await EzyRent.admin.addPropertyNoneImage(formData);
    console.log("response addProperty",JSON.stringify(response))
    if(response && response.success){
      refreshPropertiesForLandlord(dispatch);
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
      if(user){
        console.log("======= refreshMyProfile is exicute now =========");
        refreshMyProfile(user,dispatch);
      }
    }
  }

}

export const deleteProperty = (propId,data) => async (dispatch) => {
    const formData = formUrlencodedData(data);
    console.log("formData deleteProperty",formData);
    const response = await EzyRent.admin.deleteProperty(propId,formData);
    console.log("deleteProperty is ok",response)
    if(response && response.success){
      refreshPropertiesForLandlord(dispatch)
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
    }
}

export const editProperty = (propId,data,media=null) => async (dispatch) => {
  
  if(media){
    const formData = formMultipartData("property_image",media,data);
    const response = await EzyRent.admin.editPropertyWithImage(propId,formData);
    if(response && response.success){
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
      refreshPropertiesForLandlord(dispatch);
    }
  } else {
    const formData = formUrlencodedData(data);
    const response = await EzyRent.admin.editPropertyNoneImage(propId,formData);
    if(response && response.success){
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
      refreshPropertiesForLandlord(dispatch);
    }
  }

}

/**
 * @name getPropertiesForLandlord
 * @description getPropertiesForLandlord using get list of propertes with keyword,offset,limit
 * @param {*} keyword
 * @param {*} offset
 * @param {*} limit
 */
export const getPropertiesForLandlord = (keyword,offset,limit=10) => async (dispatch) => {

  dispatch({type:EZYRENT_PROPERTIES_AS_LANDLORD_LOADING,payload : true});
  try{
    // set params for filtring
    const params = {offset,limit};
    if(keyword){
      params.keyword = keyword;
    }
    // request to server
    const response = await EzyRent.admin.getPropertiesForLandlord(params);
    if(response && response.data){
      dispatch({type:EZYRENT_GET_PROPERTIES_AS_LANDLORD,payload : response.data});
    } else {
      dispatch({type:EZYRENT_GET_PROPERTIES_AS_LANDLORD,payload : []});
    }
    dispatch({type:EZYRENT_PROPERTIES_AS_LANDLORD_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_PROPERTIES_AS_LANDLORD_LOADING,payload : false});
  }
}


export const refreshPropertiesForLandlord =  async (dispatch) => {
  console.log("refreshPropertiesForLandlord is exicuted");
  
  dispatch({type:EZYRENT_PROPERTIES_AS_LANDLORD_LOADING,payload : true});
  try{
    // set params for filtring
    const params = {offset:0,limit:10};

    // request to server
    const response = await EzyRent.admin.getPropertiesForLandlord(params);
    console.log("response refreshPropertiesForLandlord",JSON.stringify(response));
    
    if(response && response.data){
      dispatch({type:EZYRENT_GET_PROPERTIES_AS_LANDLORD,payload : response.data});
    } else {
      dispatch({type:EZYRENT_GET_PROPERTIES_AS_LANDLORD,payload : []});
    }
    dispatch({type:EZYRENT_PROPERTIES_AS_LANDLORD_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_PROPERTIES_AS_LANDLORD_LOADING,payload : false});
  }
}


/**
 * @name getPropertiesForTenant
 * @description getPropertiesForTenant using get list of propertes they tenant paying rents with keyword,offset,limit
 * @param {*} keyword
 * @param {*} offset
 * @param {*} limit
 */
export const getPropertiesForTenant = (keyword,offset,limit=10) => async (dispatch) => {
  dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : true});
  try{
    // set params for filtring
    const params = {offset,limit};
    if(keyword){
      params.keyword = keyword;
    }
    // request to server
    const response = await EzyRent.admin.getPropertiesForTenant(params);
    console.log("getPropertiesForTenant response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_GET_PROPERTIES_AS_TENANT,payload : response.data});
    } else {
      dispatch({type:EZYRENT_GET_PROPERTIES_AS_TENANT,payload : []});
    }
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
  }
}

/**
 * @name refreshPropertiesForTenant
 * @description not avl
 * @param {*} dispatch
 */
export const refreshPropertiesForTenant  = async (dispatch) => {
  dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : true});
  try{
    // set params for filtring
    const params = {offset:0,limit:10};
    // request to server
    const response = await EzyRent.admin.getPropertiesForTenant(params);
    console.log("getPropertiesForTenant response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_GET_PROPERTIES_AS_TENANT,payload : response.data});
    }
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
  }
}

export const getPropertyById = (propId) => async (dispatch) => {
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : true});
    try{
    const response =  await EzyRent.admin.getPropertyById(propId);
    if(response && response.data){
      dispatch({type:EZYRENT_GET_SINGLE_PROPERTY,payload : response.data[0]});
    }
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
  }catch(e){
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
    console.log(e)
  }
}

export const tenantSubmissionOnProperty = (property,status) => async (dispatch) => {
  try {
    // set form data fromat
    const formdata = formUrlencodedData({status});
    const response = await EzyRent.admin.tenantSubmissionOnProperty(property,formdata);
    if(response){
      refreshPropertiesForTenant(dispatch);
    }
  } catch(e){
    console.log(e)
  }
}
/**
 * @name getBanks
 * @description using getBanks get list of user bank accounts with keyword,offset,limit
 * @param {*} keyword
 * @param {*} offset
 * @param {*} limit
 */
export const getBanks = (keyword,offset,limit=10) => async (dispatch) => {
  dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : true});
  try{
    // set params for filtring
    const params = {keyword,offset,limit};
    // request to server
    const response = await EzyRent.admin.getBanks(params);
    if(response && response.data){
      dispatch({ type: EZYRENT_GET_BANK_ACCOUNTS, payload: response.data });
    } else{
      dispatch({ type: EZYRENT_GET_BANK_ACCOUNTS, payload: [] });
    }
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  }
}

/**
 * @name refreshBanks
 * @description using refreshBanks get list of user bank accounts with keyword,offset,limit
 * @param {*} dispatch
 */
export const refreshBanks = async (dispatch) => {
  dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : true});
  try{
    // set params for filtring
    const params = {offset:0,limit:10};
    // request to server
    const response = await EzyRent.admin.getBanks(params);
    console.log("refreshBanks response ",response);

    if(response && response.data){
      dispatch({ type: EZYRENT_GET_BANK_ACCOUNTS, payload: response.data });
    } else{
      dispatch({ type: EZYRENT_GET_BANK_ACCOUNTS, payload: [] });
    }
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  }
}

export const addBank = (data) => async (dispatch) => {
  dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : true});
  try{
    // set data format
    const formData = formUrlencodedData(data);
    // request to server
    const response = await EzyRent.admin.addBank(formData);
    if(response && response.data){
      const currentBankAccount = response.data;
      currentBankAccount.mode = "A";
      currentBankAccount.type = "BA";
      console.log("currentBankAccount reseted",currentBankAccount)
      dispatch({type:EZYRENT_ADD_BANK_ACCOUNTS,payload : currentBankAccount});
      NavigationService.navigate(NAVIGATION_MORE_VERIFICATION_BANK_ACCOUNT_VIEW_PATH);
    }
    console.log("add bank",response);

    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  }
}

export const editBank = (bankId,data) => async (dispatch) => {
  dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : true});
  try{
    // set data format
    const formData = formUrlencodedData(data);
    // request to server
    const response = await EzyRent.admin.editBank(bankId,formData);
    if(response && response.data){
      const currentBankAccount = response.data;
      currentBankAccount.mode = "E";
      currentBankAccount.type = "BE";
      console.log("currentBankAccount reseted",currentBankAccount)
      dispatch({type:EZYRENT_ADD_BANK_ACCOUNTS,payload : currentBankAccount});
      NavigationService.navigate(NAVIGATION_MORE_VERIFICATION_BANK_ACCOUNT_VIEW_PATH);
    }
    console.log("add bank",response);

    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  }
}

export const deleteBank = (bankid) => async (dispatch) => {
  dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : true});
  try{
    // request to server
    const response = await EzyRent.admin.deleteBank(bankid);
    if(response && response.data){
      const currentBankAccount = response.data;
      currentBankAccount.mode = "D";
      currentBankAccount.type = "BD";
      console.log("currentBankAccount reseted",currentBankAccount)
      dispatch({type:EZYRENT_ADD_BANK_ACCOUNTS,payload : currentBankAccount});
      NavigationService.navigate(NAVIGATION_MORE_VERIFICATION_BANK_ACCOUNT_VIEW_PATH);
    }
    console.log("add bank",response);

    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  }
}
export const bankVerify = (bankdata,data) => async (dispatch) =>{
  //set user id
  const bankid = bankdata.id;
  //set data post format
  const formData = formUrlencodedData(data);
  console.log("bankid bankVerify",bankid,formData)
  //request post to server
  const response = await EzyRent.admin.bankVerify(bankid,formData);
    if(response && response.message){
      refreshBanks(dispatch);
      NavigationService.navigate(NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH);
    }
    console.log("bankVerify response",response);

}

// RENT CONTROLLER LIST START

/**
 * @name getRentsForLandlord
 * @description getRentsForLandlord using get list of propertes they tenant paying rents with keyword,offset,limit
 * @param {*} keyword
 * @param {*} offset
 * @param {*} limit
 */
export const getRentsForLandlord = (user,keyword,offset=0,limit=10) => async (dispatch) => {
  dispatch({type:EZYRENT_GET_RENTS_AS_LANDLORD_LOADING,payload : true});
  try{
    // set params for filtring
    const params = {offset,limit};
    if(keyword){
      params.keyword = keyword;
    }

    // set userId
    const userId = user.id;

    // request to server
    const response = await EzyRent.admin.getRentsForLandlord(userId,params);
    console.log("getRentsForLandlord response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_GET_RENTS_AS_LANDLORD,payload : response.data});
    }
    dispatch({type:EZYRENT_GET_RENTS_AS_LANDLORD_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_GET_RENTS_AS_LANDLORD_LOADING,payload : false});
  }
}

/**
 * @name getRentsForTenant
 * @description getRentsForTenant using get list of propertes they tenant paying rents with keyword,offset,limit
 * @param {JSON} user
 * @param {*} keyword
 * @param {*} offset
 * @param {*} limit
 */
export const getRentsForTenant = (user,keyword,offset,limit=10) => async (dispatch) => {
  dispatch({type:EZYRENT_GET_RENTS_AS_TENANT_LOADING,payload : true});
  try{
    // set params for filtring
    const params = {offset,limit};
    if(keyword){
      params.keyword = keyword;
    }

    // set userId
    const userId = user.id;

    // request to server
    const response = await EzyRent.admin.getRentsForTenant(userId,params);
    console.log("getRentsForTenant response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_GET_RENTS_AS_TENANT,payload : response.data});
    }
    dispatch({type:EZYRENT_GET_RENTS_AS_TENANT_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_GET_RENTS_AS_TENANT_LOADING,payload : false});
  }
}


// RENT CONTROLLER LIST END



// NOTIFICATION CONTROLLER LIST START

/**
 * @name getNotifications
 * @description getNotifications using get list of propertes they tenant paying rents with keyword,offset,limit
 */
export const getNotifications = () => async (dispatch) => {
  dispatch({type:EZYRENT_GET_NOTIFICATION_LOADING,payload : true});
  try{
    // request to server
    const response = await EzyRent.admin.getNotifications();
    console.log("getNotifications response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_GET_NOTIFICATION,payload : response.data});
    }
    dispatch({type:EZYRENT_GET_NOTIFICATION_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_GET_NOTIFICATION_LOADING,payload : false});
  }
}
// NOTIFICATION CONTROLLER LIST END


/**
 * @name getTenantProfileById
 * @description getTenantProfileById using get user profile
 * @param {object} user
 * @param {init} tenantId
 */
export const getTenantProfileById = (user,tenantId) => async (dispatch) => {
  dispatch({type:EZYRENT_TENANT_PROFILE_VIEW_LOADING,payload : true});
  try{
    //set data format
    const userId = user.id;
    // request to server
    const response = await EzyRent.admin.getTenantProfileById(userId,tenantId);
    console.log("getTenantProfileById response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_SET_CURRENT_TENANT_PROFILE,payload : response.data[0]});
    }
    dispatch({type:EZYRENT_TENANT_PROFILE_VIEW_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_TENANT_PROFILE_VIEW_LOADING,payload : false});
  }
}


/**
 * @name getLandlordProfileById
 * @description getTenantProfileById using get user profile
 * @param {object} user
 * @param {init} tenantId
 */
export const getLandlordProfileById = (user,landlordId) => async (dispatch) => {
  dispatch({type:EZYRENT_LANDLORD_PROFILE_VIEW_LOADING,payload : true});
  try{
    //set data format
    const userId = user.id;
    // request to server
    const response = await EzyRent.admin.getTenantProfileById(userId,landlordId);
    console.log("getLandlordProfileById response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_SET_CURRENT_LANDLORD_PROFILE,payload : response.data[0]});
    }
    dispatch({type:EZYRENT_LANDLORD_PROFILE_VIEW_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_LANDLORD_PROFILE_VIEW_LOADING,payload : false});
  }
}

// get my landlords

export const getMyLandlord = (user) => async (dispatch) => {
  dispatch({type:EZYRENT_MY_LANDLORD_LOADING,payload : true});
  try{
    //set data format
    const userId = user.id;
    // request to server
    const response = await EzyRent.admin.getMyLandlord(userId,null);
    console.log("getMyLandlord response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_GET_MY_LANDLORD,payload : response.data});
    }
    dispatch({type:EZYRENT_MY_LANDLORD_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_MY_LANDLORD_LOADING,payload : false});
  }
}
// get my tenants
export const getMyTenant = (user) => async (dispatch) => {
  dispatch({type:EZYRENT_MY_TENANT_LOADING,payload : true});
  try{
    //set data format
    const userId = user.id;
    // request to server
    const response = await EzyRent.admin.getMyTenant(userId,null);
    console.log("getMyTennat response",response)
    if(response && response.data){
      dispatch({type:EZYRENT_GET_MY_TENANT,payload : response.data});
    }
    dispatch({type:EZYRENT_MY_TENANT_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_MY_TENANT_LOADING,payload : false});
  }
}

// FORM DATA SET EXICUTIVE FROMAT
const formMultipartData = (keyValue,photo, extraData=null) => {
  const data = new FormData();
  const imgname = photo.uri.split("/").slice(-1)[0];

  data.append(keyValue, {
    name: imgname,
    type: photo.type,
    uri: photo.uri.replace("file://", "")
  });
  if(extraData){
    for (var item in extraData) {
     data.append(item,extraData[item]);
    }
  }

  return data;
};

const formUrlencodedData = (data)=>{
  var formBody = [];
  for (var item in data) {
    formBody.push(item + "=" + data[item]);
  }
  formBody = formBody.join("&");
  return formBody;
}
