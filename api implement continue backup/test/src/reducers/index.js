import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import buildingReducer from './buildingReducer';

export default combineReducers({
  account: accountReducer,
  signup: signupReducer,
  signin: signinReducer,
  building: buildingReducer,
});
