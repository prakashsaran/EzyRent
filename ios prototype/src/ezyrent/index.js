import _ from 'lodash';
import guest from './lib/guest';
import { DropDownHolder } from '../components';
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
      this.guest = guest(this);
	}

	init() {
	  console.log("initially execute function init class EzyRent ")
  }
  setCurrentAccount(account){
    this.currentAccount = account;
  }
  requestPost(url, data, authentication=null,type) {

    let uri = `${this.base_url}${url}`;
    const headers = {
      "authentication": authentication,
      'Accept': 'application/json',
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    }

    return new Promise((resolve, reject) => {
      fetch(uri, { "method": "POST", headers, body: data})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Possible 401 or other network error
        return response.json().then(errorResponse => Promise.reject(errorResponse));
      })
      .then((responseData) => {
        // debugger;
        resolve(responseData);
      })
      .catch((error) => {
       const customError = this.getErrorMessageForResponce(error);
       DropDownHolder.alert('error', '', customError.toString())
       //reject(customError);
       resolve(null)
      });

    })
  }

  getErrorMessageForResponce(data) {
    const params = data.parameters;
    let { message } = data;
    if (typeof params !== 'undefined') {
      if (Array.isArray(params) && params.length > 0) {
        data.parameters.forEach((item, index) => {
          message = message.replace(`%${index + 1}`, item);
        });
        return message;
      }
      _.forEach(params, (value, name) => {
        message = message.replace(`%${name}`, value);
      });
    }
    return message;
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
