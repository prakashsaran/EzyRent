import _ from 'lodash';
import {TENANT_TYPE,LANDLORD_TYPE,LANDLORD_TENANT_TYPE} from '../ezyrent/types';
import {EzyRent} from '../ezyrent';
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
const mobileRegex = '^([0|+[0-9]{1,5})?([7-9][0-9]{9})$';

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