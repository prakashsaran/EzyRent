import _ from 'lodash';
import guest from './lib/guest';
import admin from './lib/admin';
import { DropDownHolder } from '../components';
import { ADMIN_TYPE,GUEST_TYPE} from './types';
import {TENANT_TYPE,LANDLORD_TYPE,LANDLORD_TENANT_TYPE} from './types';
import NavigationService from '../navigation/NavigationService';
import {
  SWITCH_NAVIGATION_AUTHORIZED_ACCOUNT_PATH,
} from '../navigation/routes';

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
      NavigationService.navigate(SWITCH_NAVIGATION_AUTHORIZED_ACCOUNT_PATH);
      //console.log(" uuuu",this.currentAccount);
    }
  }
  getMediaUrl(){
    return this.configuration.media_path;
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
    return `${this.getTokenType()} ${this.getAccessToken()}`;
  }

  requestGet(url, params, authentication=null,type){
    let authorization = authentication;
    if(ADMIN_TYPE==type && authentication==null){
      authorization = this.getAuthorization();
    }

    let uri = `${this.base_url}${url}`;
    if (params) {
      let separator = '?';
      Object.keys(params).forEach((key) => {
        uri += `${separator}${key}=${params[key]}`;
        separator = '&';
      });
    }

    const headers = {
      "Authorization": authorization,
      'Accept': 'application/json',
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    }
    console.log("requestGet uri",uri,headers)
    return new Promise((resolve, reject) => {
      fetch(uri, { "method": "GET", headers,})
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

  requestGetSingleResponse(url, params, authentication=null,type){
    let authorization = authentication;
    if(ADMIN_TYPE==type && authentication==null){
      authorization = this.getAuthorization();
    }

    let uri = `${this.base_url}${url}`;
    if (params) {
      let separator = '?';
      Object.keys(params).forEach((key) => {
        uri += `${separator}${key}=${params[key]}`;
        separator = '&';
      });
    }

    const headers = {
      "Authorization": authorization,
      'Accept': 'application/json',
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    }
    console.log("requestGet uri",uri,headers)
    return new Promise((resolve, reject) => {
      fetch(uri, { "method": "GET", headers,})
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
       resolve(null)
      });

    })
      
  }


  /**
   * @name requestPost
   * @description requestPost is return value with extra UI activity ex. screen warning or alerts
   * @param {*} url 
   * @param {*} data 
   * @param {*} authentication 
   * @param {*} type 
   */
  requestPost(url, data, authentication=null,type) {
    let authorization = authentication;
    if(ADMIN_TYPE==type && authentication==null){
      authorization = this.getAuthorization();
    }

    let uri = `${this.base_url}${url}`;
    const headers = {
      "Authorization": authorization,
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

  /**
   * @name requestPatch
   * @description requestPatch is return value with extra UI activity ex. screen warning or alerts
   * @param {*} url 
   * @param {*} data 
   * @param {*} authentication 
   * @param {*} type 
   */
  requestPatch(url, data, authentication=null,type) {
    let authorization = authentication;
    if(ADMIN_TYPE==type && authentication==null){
      authorization = this.getAuthorization();
    }

    let uri = `${this.base_url}${url}`;
    const headers = {
      "Authorization": authorization,
      'Accept': 'application/json',
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    }

    return new Promise((resolve, reject) => {
      fetch(uri, { "method": "PATCH", headers, body: data})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Possible 401 or other network error
        return response.json().then(errorResponse => Promise.reject(errorResponse));
      })
      .then((responseData) => {
        console.log("requestPatch responseData",responseData)
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


  /**
   * @name requestPut
   * @description requestPut is return value with extra UI activity ex. screen warning or alerts
   * @param {*} url 
   * @param {*} data 
   * @param {*} authentication 
   * @param {*} type 
   */
  requestPut(url, data, authentication=null,type) {
    let authorization = authentication;
    if(ADMIN_TYPE==type && authentication==null){
      authorization = this.getAuthorization();
    }

    let uri = `${this.base_url}${url}`;
    const headers = {
      "Authorization": authorization,
      'Accept': 'application/json',
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    }

    return new Promise((resolve, reject) => {
      fetch(uri, { "method": "PUT", headers, body: data})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Possible 401 or other network error
        return response.json().then(errorResponse => Promise.reject(errorResponse));
      })
      .then((responseData) => {
        console.log("requestPatch responseData",responseData)
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


  /**
   * @name requestDelete
   * @description requestDelete is return value with extra UI activity ex. screen warning or alerts
   * @param {*} url 
   * @param {*} data 
   * @param {*} authentication 
   * @param {*} type 
   */
  requestDelete(url, data, authentication=null,type) {
    let authorization = authentication;
    if(ADMIN_TYPE==type && authentication==null){
      authorization = this.getAuthorization();
    }

    let uri = `${this.base_url}${url}`;
    const headers = {
      "Authorization": authorization,
      'Accept': 'application/json',
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    }

    return new Promise((resolve, reject) => {
      fetch(uri, { "method": "DELETE", headers, body: data})
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        // Possible 401 or other network error
        return response.json().then(errorResponse => Promise.reject(errorResponse));
      })
      .then((responseData) => {
        console.log("requestPatch responseData",responseData)
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

//============delete--------
  /**
   * @name requestPostSingleResponse
   * @description requestPostSingleResponse is return only value and avaid do extra UI activity
   * @param {*} url 
   * @param {*} data 
   * @param {*} authentication 
   * @param {*} type 
   */
  requestPostSingleResponse(url, data, authentication=null,type) {
    let authorization = authentication;
    if(ADMIN_TYPE==type && authentication==null){
      authorization = this.getAuthorization();
    }

    let uri = `${this.base_url}${url}`;
    const headers = {
      "Authorization": authorization,
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
       resolve(null)
      });

    })
  }

  /**
   * @name requestMultipartPost
   * @description post Multipart form data ex. image,file,content
   * @param {*} url 
   * @param {*} data 
   * @param {*} authentication 
   * @param {string} type 
   * @param {string} requestMethod 
   */
  requestMultipartPost(url, data, authentication=null,type,requestMethod="POST") {
    let authorization = authentication;
    if(ADMIN_TYPE==type && authentication==null){
      authorization = this.getAuthorization();
    }

    let uri = `${this.base_url}${url}`;
    const headers = {
      "Authorization": authorization,
      'Accept': 'application/json',
      "Content-Type": "multipart/form-data",
      "cache-control": "no-cache",
    }

    return new Promise((resolve, reject) => {
      fetch(uri, { "method": requestMethod, headers, body: data})
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
    let { error_message,error } = data;
    if (typeof data !== 'undefined') {
      if(error_message){
        return error_message;
      }
      if(error){
        return error;
      }
    }
    return "Something went wrong. Please try again!";
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
