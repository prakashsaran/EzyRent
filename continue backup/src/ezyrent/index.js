import _ from 'lodash';
import {TENANT_TYPE,LANDLORD_TYPE,LANDLORD_TENANT_TYPE} from './types';
const defaultOptions = {
  url: null,
  userAgent: 'ios, mobile, apple ',
  authentication: {
    integration: {
      access_token: undefined,
    },
  },
};

class EzyRentClass {
	setOptions(options) {
	    this.configuration = { ...defaultOptions, ...options };
	    this.base_url = this.configuration.url;
	}

	init() {
	  console.log("initially execute function init class Ezy Rent ")
  }
  setCurrentAccount(account){
    this.currentAccount = account;
  }

  getAccountType(){
    if(this.currentAccount && this.currentAccount.type){
      if(this.currentAccount.type=="tenant"){
        return TENANT_TYPE
      } else if(this.currentAccount.type=="landlord"){
        return LANDLORD_TYPE;
      } else if(this.currentAccount.type=="lessee"){
        return LANDLORD_TENANT_TYPE;
      } else{
        return TENANT_TYPE;
      }
    } else{
      return TENANT_TYPE;
    }
  }
  
}
export const EzyRent = new EzyRentClass();
