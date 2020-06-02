import {  AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { EzyRent } from '../ezyrent';
import { ezyrentOptions } from '../config/ezyrent';
import {
  EZYRENT_INIT,
  EZYRENT_INIT_ERROR,
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
