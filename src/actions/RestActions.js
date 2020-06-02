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
} from './types';
import NavigationService from '../navigation/NavigationService';
import {
  NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH
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

export const addProperty = (data,media=null) => async (dispatch) => {
  if(media){
    console.log("media is ok",media)
    /* formData = formMultipartData("property_image",media,data);
    const response = await EzyRent.admin.addPropertyWithImage(formData);
    if(response && response.data){
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
    } */
  } else {
    formData = formUrlencodedData(data);
    const response = await EzyRent.admin.addPropertyNoneImage(formData);
    if(response && response.data){
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
    }

  }

}

export const editProperty = (data,media=null) => async (dispatch) => {
  if(media){
    console.log("media is ok",media)
    /* formData = formMultipartData("property_image",media,data);
    const response = await EzyRent.admin.addPropertyWithImage(formData);
    if(response && response.data){
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
    } */
  } else {
    formData = formUrlencodedData(data);
    const response = await EzyRent.admin.addPropertyNoneImage(formData);
    if(response && response.data){
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
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
    const params = {keyword,offset,limit};
    console.log("getPropertiesForLandlord params",params)
    // request to server
    const response = await EzyRent.admin.getPropertiesForLandlord(params);
    console.log("getPropertiesForLandlord response",response)
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
  dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
  try{
    // set params for filtring
    const params = {keyword,offset,limit};
    // request to server
    const response = await EzyRent.admin.getPropertiesForTenant(params);
    console.log("getPropertiesForTenant response",response)
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_PROPERTIES_AS_TENANT_LOADING,payload : false});
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
    }
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
  } catch(e){
    console.error(e)
    dispatch({type:EZYRENT_BANK_ACCOUNTS_LOADING,payload : false});
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

