import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import signupReducer from './signupReducer';
import signinReducer from './signinReducer';
import buildingReducer from './buildingReducer';
import propertiesLandlordReducer from './propertiesLandlordReducer';
import propertiesTenantReducer from './propertiesTenantReducer';
import bankAccountReducer from './bankAccountReducer';
import propertiesReducer from './propertiesReducer';
import rentsTenantReducer from './rentsTenantReducer';
import rentsLandlordReducer from './rentsLandlordReducer';
import notificationsReducer from './notificationsReducer';
import tenantsReducer from './tenantsReducer';
import myTenantsReducer from './myTenantsReducer';
import myLandlordsReducer from './myLandlordsReducer';
import landlordReducer from './landlordReducer';

export default combineReducers({
  account: accountReducer,
  signup: signupReducer,
  signin: signinReducer,
  building: buildingReducer,
  propertiesLandlord: propertiesLandlordReducer,
  propertiesTenant: propertiesTenantReducer,
  bankAccount: bankAccountReducer,
  properties: propertiesReducer,
  rentTenant: rentsTenantReducer,
  rentLandlord: rentsLandlordReducer,
  notification: notificationsReducer,
  tenants: tenantsReducer,
  landlord: landlordReducer,
  mytenant: myTenantsReducer,
  mylandlord: myLandlordsReducer,
});
