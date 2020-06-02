import _ from 'lodash';
import guest from './lib/guest';
import admin from './lib/admin';
import { DropDownHolder } from '../components';
import { ADMIN_TYPE,GUEST_TYPE} from './types';
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
      this.admin = admin(this);
	}

	init() {
    console.log("initially execute function init class EzyRent ")
    if(this.currentAccount && this.accessToken){
      console.log(" uuuu",this.currentAccount);
    }
  }
  setCurrentAccount(account){
    this.currentAccount = account;
  }
  setAccessToken(token){
    this.accessToken = token;
  }
  setTokenType(tokentype){
    this.tokenType = tokentype;
  }

  getTokenType(tokentype){
    if(this.tokenType){
      return this.tokenType;
    }
    return null;
  }

  getAccessToken(token){
    if(this.accessToken){
      return this.accessToken;
    }
    return null;
  }
  getAuthorization(){
    return `${this.tokenType}`;
  }
  requestGet(url, data, authentication=null,type){
    if(ADMIN_TYPE==type && authentication==null){
      authorization = '';
    }
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
        console.log("requestPost responseData",responseData)
        // debugger;
        resolve(responseData);
      })
      .catch((error) => {
        console.log("requestPost error",error)
       const customError = this.getErrorMessageForResponce(error);
       console.log("customError response",customError)
       DropDownHolder.alert('error', '', customError.toString())
       //reject(customError);
       resolve(null)
      });

    })
  }

  getErrorMessageForResponce(data) {
    let { error_message } = data;
    if (typeof data !== 'undefined') {
      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item, index) => {
          error_message = error_message.replace(`%${index + 1}`, item);
        });
        return error_message;
      }
      _.forEach(data, (value, name) => {
        error_message = error_message.replace(`%${name}`, value);
      });
    }
    return error_message;
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
