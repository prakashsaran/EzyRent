import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
//import {  AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import reducers from '../reducers';

const accountBlacklistFilter = createBlacklistFilter(
  'account',
  ['refreshing','error','success',"message","customer","data","access_token","refresh_token","token_type"],
);

const signInBlacklistFilter = createBlacklistFilter(
  'signin',
  ['loading','refreshing','error','success','warndata'],
);


const buildingBlacklistFilter = createBlacklistFilter(
  'building',
  ['selectedBuilding'],
);


const persistConfig = {
  key: 'root',
  transforms: [
    accountBlacklistFilter,
    signInBlacklistFilter,
    buildingBlacklistFilter,
  ],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);

// persistor.purge();
