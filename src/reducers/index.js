import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import buildingReducer from './buildingReducer';
import propertiesLandlordReducer from './propertiesLandlordReducer';
import propertiesTenantReducer from './propertiesTenantReducer';
import bankAccountReducer from './bankAccountReducer';

export default combineReducers({
  account: accountReducer,
  signup: signupReducer,
  signin: signinReducer,
  building: buildingReducer,
  propertiesLandlord: propertiesLandlordReducer,
  propertiesTenant: propertiesTenantReducer,
  bankAccount: bankAccountReducer,
});
