import { find, orderBy } from 'lodash';
let instance = null;

class SampleData {
constructor(){
    this.propertiesData = null;
}
  static getInstance() {
    if (!instance) {
      instance = new SampleData();
    }
    return instance;
  }
  getPropeties(){
    if (!this.properties) {
      this.properties = orderBy(
        this.propertiesData || require('./properties.json'),
        ['name'],
        ['asc'],
      );
    }

    return this.properties;
  }

  getNotifications(){
    if (!this.notifications) {
      this.notifications = orderBy(
        this.notifications || require('./notifications.json'),
        ['name'],
        ['asc'],
      );
    }

    return this.notifications;
  }

  getAccounts(){
    if (!this.acounts) {
      this.acounts = orderBy(
        this.acounts || require('./accounts.json'),
        ['name'],
        ['asc'],
      );
    }

    return this.acounts;
  }

  getFreshAccount(){
    return {
          "name":"Pardeep Rathore",
          "email":"psrathore@gmail.com",
          "contact":"7742771451",
          "location":"jaipur, Rajsthan, India",
          "type":"",
          "status":"under-review"
      };
  }


  getPayingRent(){
      return this.getPropeties();
  }
  getcollectingRent(){
      return this.getPropeties();
  }
}
export default SampleData.getInstance();
