//import {  AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { EzyRent } from '../ezyrent';
import { initEzyRent,setCurrentCustomer } from '../actions';


export const onAppStart = async (store) => {
  const asyncUserData = await AsyncStorage.getItem('userData');
  const userData = JSON.parse(asyncUserData);
  if(userData !=undefined && userData !=null){
    store.dispatch(setCurrentCustomer(userData));
  }
  store.dispatch(initEzyRent());
};
