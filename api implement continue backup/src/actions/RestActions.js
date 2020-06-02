//import {  AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { EzyRent } from '../ezyrent';
import { ezyrentOptions } from '../config/ezyrent';
import {
  EZYRENT_INIT,
  EZYRENT_INIT_ERROR,
  EZYRENT_BUILDING_LOADING,
  EZYRENT_BUILDING_SET_LIST_VIEW,
} from './types';

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

export const getProperties = () => async (dispatch) => {
  const response = await EzyRent.admin.getProperties();
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
      getProperties();
    }
  dispatch({ type: EZYRENT_BUILDING_LOADING, payload: false });
  } catch (e) {
    console.error(e)
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

