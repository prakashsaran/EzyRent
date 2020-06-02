//import {  AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { EzyRent } from '../ezyrent';
import { initEzyRent,setCurrentCustomer } from '../actions';


export const onAppStart = async (store) => {
  const asyncuserData = await AsyncStorage.getItem('userData');
  const userData = JSON.parse(asyncuserData);
  if(userData !=undefined && userData !=null){
    store.dispatch(setCurrentCustomer(userData));
  }
  store.dispatch(initEzyRent());
};
