import {  AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import { EzyRent } from '../ezyrent';
import { initEzyRent } from '../actions';


export const onAppStart = async (store) => {
  store.dispatch(initEzyRent());
};
