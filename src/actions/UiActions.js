import _ from 'lodash';
import {TENANT_TYPE,LANDLORD_TYPE,LANDLORD_TENANT_TYPE} from '../ezyrent/types';
import {EzyRent} from '../ezyrent';
import NavigationService from '../navigation/NavigationService';
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const mobileRegex = /^\d{10}$/;
const ContactContryCode = [{label:"+91",value:"0091"}];
export const isValidEmail = (email) => {
    return emailRegex.test(email);
}
export const isValidName = (name) => {
    return nameRegex.test(name);
}
export const isValidMobile = (mobilenumber) =>{   
    const regmob = new RegExp(mobileRegex);
    if(regmob.test(mobilenumber)){
        return true;
    } else {
        return false;
    }    
}
export const getSecondTabTitile = () =>{  
    switch(EzyRent.getAccountType()){
        case TENANT_TYPE:
            return "Tenant";
            break;
        case LANDLORD_TYPE:
            return "Properties";
            break;
        case LANDLORD_TENANT_TYPE:
            return "Properties/Tenant";
            break;
        default:
            return "Tenant";
    }
}

export const getCountryCodeFormat = (code)=>{
  const codeLabel = ContactContryCode.find(function(item){
        if(item.value==code){
            return item.label;
        }
        return null;
    });
    if(codeLabel){
        return codeLabel.label;
    }
    return null;
}
const getCurrentRoute = (nav) => {
    if(Array.isArray(nav.routes)&&nav.routes.length>0){
        return getCurrentRoute(nav.routes[nav.index])
    }else {
        return nav.routeName
    }
  }
export const getActiveRoute = () =>{
    return getCurrentRoute(NavigationService.getRoute().state.nav);
}


export const getMoneyFormat = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
};
