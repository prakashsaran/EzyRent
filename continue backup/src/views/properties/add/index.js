import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput,Dimensions,PermissionsAndroid,KeyboardAvoidingView,Platform,Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import Autocomplete from 'react-native-autocomplete-input';
import Modal from 'react-native-modal';
import { selectContactPhone } from 'react-native-select-contact';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import {RightIconTextbox,DropDownHolder} from '../../../components'
import NavigationService from '../../../navigation/NavigationService';
import {NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH,NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH} from '../../../navigation/routes';
import SampleData from '../../../config/sample-data';
class AddPropertyTenant extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      mobileNumber:undefined,
      tenantName:undefined,
      houseNumber:undefined,
      buildingName:undefined,
      rentPeriod:undefined,
      rentDue:undefined,
      bankAccount:undefined,
      collectingAmount:undefined,
      rentduesData:[],
      isvisiblepayinfo:false,
      isModalVisible:false,
      availableBuildings:[],
    }
    StatusBar.setBarStyle('light-content');
    this._mobileNumberEntry = undefined;
    this._tenantNameEntry = undefined;
    this._houseNumberEntry = undefined;
    this._buildingNameEntry = undefined;
    this._rentPeriodEntry = undefined;
    this._rentDueEntry = undefined;
    this._bankAccountEntry = undefined;
    this._collectingAmountEntry = undefined;
    this._PopupBuildingEntry = undefined;
    this._PopupLocationEntry = undefined;
    this.keyboardBehavior = "padding";
  }
  renderHeader(){
    return(
      <View style={styles.headerContainer(theme)}>
        <View style={styles.headerContext}>
          <TouchableOpacity onPress={()=>NavigationService.goBack()} style={styles.backscreen}>
            <Image style={styles.backscreen} resizeMode={'stretch'} source={require('../../../assets/images/back-white.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.pageTitle(theme)}>Add New Property/Tenant</Text>
        </View>
        <View style={styles.headerBanner(theme)}>
          <Image style={styles.headerBannerImage(theme)} source={require('../../../assets/images/add_properties.png')}/>
          <Image style={styles.edit_icon} source={require('../../../assets/images/edit-transparent.png')}/>
          <Image style={[styles.edit_icon,styles.delete_icon]} source={require('../../../assets/images/delete-transparent.png')}/>
        </View>
      </View>
    )
  }
  /* comman using function current page */
  onChangeMobile(mobileNumber){
    this.setState({mobileNumber})
  }
  submitForm(){
    const {mobileNumber,tenantName,houseNumber,buildingName,rentPeriod,rentDue,collectingAmount,bankAccount} = this.state
    const formIsValid =
            this.validateAndSetAttribute(mobileNumber, this._mobileNumberEntry) &
            this.validateAndSetAttribute(rentPeriod, this._rentPeriodEntry) &
            this.validateAndSetAttribute(rentDue, this._rentDueEntry) &
            this.validateAndSetAttribute(buildingName, this._buildingNameEntry) &
            this.validateAndSetAttribute(collectingAmount, this._collectingAmountEntry) &
            this.validateAndSetAttribute(bankAccount, this._bankAccountEntry) &
            this.validateAndSetAttribute(tenantName, this._tenantNameEntry) &
            this.validateAndSetAttribute(houseNumber, this._houseNumberEntry);
    if(formIsValid){
      NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
    }else{
      DropDownHolder.alert('error', '', 'Invalid Form. Please fill valid data!')
    }
  }

  validateInput(input) {
    if (input === undefined)
        return false
    else if (input === '')
        return false
    else if (input.trim() === '')
        return false
    else if (input === 0)
        return false
    else
        return true
}
validateAndSetAttribute(value, attribute) {
    const valid = this.validateInput(value)
    const borderBottomColor = !valid ? 'red' : '#E8E8E8';
    attribute.setNativeProps({
        style: { borderBottomColor }
    });
    return valid
}
getWeekNames(){
  return {1:'Sunday',2:'Monday',3:'Tuesday',4:'Wednesday',5:'Thursday',6:'Friday',7:'Saturday'};
}
getMonthNames(){
  return {1:'January',2:'February',3:'March',4:'April',5:'May',6:'June',7:'July',8:'August',9:'September',10:'October',11:'November',12:'December'};
}
getMonthDates(){
  return {1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:10,11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20,21:21,22:22,23:23,24:24,25:25,26:26,27:27,28:28,29:29,30:30,31:31};
}
componentDidMount(){
  if (Platform.OS == 'android') {
      this.keyboardBehavior = 'height'
  }
  const allProperties = SampleData.getPropeties() || [];
  const availableBuildings = allProperties.map((building,idx)=>{
    return {label:building.name,value:idx+1}
  })
  availableBuildings.push({label:"+ Add New Building",value:100000})
  this.setState({availableBuildings})
}
componentDidUpdate(prevProps,prevState){
  const {bankAccount,collectingAmount} = this.state
  if(prevState.bankAccount !=bankAccount || prevState.collectingAmount !=collectingAmount){
    if(bankAccount && collectingAmount){
      this.setState({isvisiblepayinfo:true})
    }else{
      this.setState({isvisiblepayinfo:false})
    }
  }
}

onChangeRentPeriod(rentPeriod){
  const rentduesData = [];

  if(rentPeriod==1){
    const monthNames = this.getMonthNames();
    Object.keys(monthNames).forEach((key) => {
      const monthItem = { label: monthNames[key], value: key };
      rentduesData.push(monthItem);
    });
  }

  if(rentPeriod==2){
    const monthDates = this.getMonthDates();
    Object.keys(monthDates).forEach((key) => {
      const dateItem = { label: monthDates[key].toString(), value: key };
      rentduesData.push(dateItem);
    });
  }

  if(rentPeriod==3){
    rentduesData.push({label:'15th of the Month',value:1},{label:'End of the Month',value:2});
  }

  if(rentPeriod==4){
    const weekNames = this.getWeekNames()
    Object.keys(weekNames).forEach((key) => {
      const weekItem = { label: weekNames[key], value: key };
      rentduesData.push(weekItem);
    });
  }

  this.setState({rentduesData});
  this.setState({rentDue:null})
  this.setState({rentPeriod})
}

getMoneyFormat(amount, decimalCount = 2, decimal = ".", thousands = ",") {
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
getBankCharge(amount,percentage){
  return amount*(percentage/100);
}
getTotalAmount(amount,percentage){
  const bankcharge = amount*(percentage/100);
  const totalAmount = Number(amount)+Number(bankcharge);
  return this.getMoneyFormat(totalAmount,0)
}
// CHOOSE CONTACT NUMBER FROM CONTACT LIST
	renderContactList(){
	  return selectContactPhone()
	  .then(selection => {
	      if (!selection) {
	          return null;
	      }

	      return selection;
	  });
	}

	async chooseContactNumber(){
	  const contactSelection =  await this.renderContactList();
	  if(contactSelection){
	    const {contact,selectedPhone} = contactSelection

	    const mobileNumber = selectedPhone.number.split(" ").join("");
	    this.setState({mobileNumber:mobileNumber,tenantName:contact.name})
	  }
	}

	requestContactPermission = async () => {
	  try {
	    const granted = await PermissionsAndroid.request(
	      PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
	    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
	      console.log('granted');
	      this.chooseContactNumber();
	    } else {
	      console.log('denied');
	    }
	  } catch (err) {
	    console.warn(err);
	  }
	}

  AddNewBankAc(bankAccount){
    if(bankAccount==4){
      //console.log("bankAccount",bankAccount)
      NavigationService.navigate(NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH)

    }else {
      this.setState({bankAccount})
    }
  }
  onSelectBuilding(buildingName){
    if(buildingName==100000){
      this.setState({isModalVisible:true})
      this.setState({buildingName:null});
    } else {
      this.setState({buildingName})
    }
  }

  /* common using function current page */
  render(){
    const theme = this.context;
    const {mobileNumber,tenantName,houseNumber,buildingName,collectingAmount,rentduesData,rentDue,isvisiblepayinfo,availableBuildings,rentPeriod,bankAccount} = this.state
      return (
        <SafeAreaView style={styles.container(theme)}>
        <KeyboardAvoidingView behavior={this.keyboardBehavior} >
              <View>
                {this.renderHeader()}
                <View style={styles.formcontainer}>
                  <ScrollView showsVerticalScrollIndicator={false} style={{height:Dimensions.get('window').height-200}} >
                    <View style={styles.formColumnWrapp}>

                       <View style={styles.formcolumn}>
                          <Text style={styles.columntitle(theme)}>TENANT INFORMATION</Text>
                          <View style={styles.fieldWrapp} ref={(ref) => this._mobileNumberEntry = ref} >
                             <Text style={theme.typography.tooltip}>Phone Number of Tenant *</Text>
                             <View style={styles.twocolumn}>
                               <View style={mobileNumber?styles.fielcountrylabel(theme):styles.fielcountrylabelSec(theme)}>
                                  <Text style={styles.fieltext(theme)}>+91 (IND)</Text>
                                  <Image style={styles.downarrowicon} source={require('../../../assets/images/arrow_down.png')}></Image>
                               </View>
                               <RightIconTextbox onPressIcon={()=>this.chooseContactNumber()} keyboardType={'number-pad'} style={mobileNumber?styles.contactbook(theme):styles.contactbookSec(theme)} placeholder={"Mobile Number"} textValue={mobileNumber} onChangeText={(mobileNumber)=>this.onChangeMobile(mobileNumber)} image-style={styles.address_icon} source={require('../../../assets/images/address.png')}/>
                             </View>
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Name Of Tenant *</Text>
                              <TextInput ref={(ref) => this._tenantNameEntry = ref} onChangeText={(tenantName) =>{this.setState({tenantName})}} autoCorrect={false} style={tenantName?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} value={tenantName} placeholder={'Name Of Tenant'}/>
                          </View>
                        </View>


                       <View style={styles.formcolumn}>
                          <Text style={styles.columntitle(theme)}>TENANT INFORMATION</Text>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Tenant House Number (Ex: Flat 101, TC 6/1564) *</Text>
                              <TextInput ref={(ref) => this._houseNumberEntry = ref} onChangeText={(houseNumber) =>{this.setState({houseNumber})}} value={houseNumber} autoCorrect={false} style={houseNumber?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} placeholder={'Ex: Flat 101, TC 6/1564'}/>
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Tenant Building Name (Ex: RHS Greenvile, Cordon Address) *</Text>
                             
                             <RNPickerSelect
                                  placeholder={{
                                    label: 'Choose Building',
                                    value: null,
                                    color: '#000000',
                                  }}
                                  value={buildingName}
                                  style={pickerSelectStyles}
                                  onValueChange={(buildingName) => this.onSelectBuilding(buildingName)}
                                  items={availableBuildings}
                                  Icon={() => {
                                    return (
                                      <Image style={{width:13,height:13}} source={require('../../../assets/images/arrowdown_picker.png')}/>
                                    );
                                  }}
                                />
                               <View style={{width:'100%', height:0.5,borderBottomWidth:0.5,backgroundColor:'transparent',borderColor:buildingName?theme.colors.secondry:theme.colors.lightBorder,marginTop:-5}} ref={(ref) => this._buildingNameEntry = ref}></View>
                          </View>


                          <View style={styles.fieldWrappTwoColum}>

                            <View style={styles.pikerwrap}>
                              <Text style={theme.typography.tooltip}>Rent Period *</Text>
                              <RNPickerSelect
                                  placeholder={{
                                    label: 'Choose duration',
                                    value: null,
                                    color: '#000000',
                                  }}
                                  style={pickerSelectStyles}
                                  onValueChange={(rentPeriod) => this.onChangeRentPeriod(rentPeriod)}
                                  items={[
                                      { label: 'Annually', value: '1' },
                                      { label: 'Monthly', value: '2' },
                                      { label: 'Bi Weekly', value: '3' },
                                      { label: 'Weekly', value: '4' },
                                  ]}
                                  Icon={() => {
                                    return (
                                      <Image style={{width:14,height:15}} source={require('../../../assets/images/arrowdown_picker.png')}/>
                                    );
                                  }}
                                />
                                <View style={rentPeriod?styles.borderProvider(theme):styles.borderProviderSec(theme)} ref={(ref) => this._rentPeriodEntry = ref}></View>
                            </View>


                            <View style={styles.pikerwrap}>
                              <Text style={theme.typography.tooltip}>Rent Due *</Text>
                              <RNPickerSelect
                                  placeholder={{
                                    label: 'Choose day/date',
                                    value: null,
                                    color: '#000000',
                                  }}
                                  value={rentDue}
                                  style={pickerSelectStyles}
                                  onValueChange={(rentDue) => this.setState({rentDue})}
                                  items={rentduesData}
                                  Icon={() => {
                                    return (
                                      <Image style={{width:14,height:15}} source={require('../../../assets/images/arrowdown_picker.png')}/>
                                    );
                                  }}
                                />
                                <View style={rentDue?styles.borderProvider(theme):styles.borderProviderSec(theme)}  ref={(ref) => this._rentDueEntry = ref}></View>
                            </View>

                          </View>


                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Total amount to be collected from tenant  *</Text>
                             <Text style={styles.tooltipDsc(theme)}>Includes all charges like rent, maintenance etc </Text>
                              <TextInput ref={(ref) => this._collectingAmountEntry = ref} keyboardType={'numeric'} onChangeText={(collectingAmount) =>{this.setState({collectingAmount})}} value={collectingAmount} autoCorrect={false} style={collectingAmount?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} placeholder={'Ex: 10,000'}/>
                          </View>


                          <View style={styles.fieldWrapp} >
                             <Text style={theme.typography.tooltip}>Recipient Bank Account *</Text>
                             <RNPickerSelect
                                  placeholder={{
                                    label: 'Choose Bank Account',
                                    value: null,
                                    color: '#000000',
                                  }}
                                  style={pickerSelectStyles}
                                  onValueChange={(bankAccount) => this.AddNewBankAc(bankAccount)}
                                  items={[
                                      { label: 'ICICI (Simon Dean - XXXXX67586)', value: '1' },
                                      { label: 'Axis Bank (John Xyz - XXXXX67444)', value: '1' },
                                      { label: 'HDFC (Simon Dean - XXXXX675566)', value: '3' },
                                      { label: '+ Add New Bank Account', value: '4' },
                                  ]}
                                  Icon={() => {
                                    return (
                                      <Image style={{width:13,height:13}} source={require('../../../assets/images/arrowdown_picker.png')}/>
                                    );
                                  }}
                                />
                                <View style={{width:'100%', height:0.5,borderBottomWidth:0.5,backgroundColor:'transparent',borderColor:bankAccount?theme.colors.secondry:theme.colors.lightBorder,marginTop:-5}} ref={(ref) => this._bankAccountEntry = ref}></View>

                          </View>

                       </View>


                       {isvisiblepayinfo && <View style={styles.formcolumn}>
                          <Text style={styles.columntitle(theme)}>PAYMENT INFORMATION</Text>
                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>A. Total Amount to be Collected from Tenant</Text>
                             <Text style={styles.responseValue(theme)}>INR {this.getMoneyFormat(collectingAmount,0)}</Text>
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>B. Bank Charges - 15% Of A</Text>
                             <Text style={styles.responseValue(theme)}>INR {this.getBankCharge(collectingAmount,15)}</Text>
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Total Amount Payable by Tenant Monthly - (A+B+C)</Text>
                             <Text style={styles.responseValue(theme)}>INR {this.getTotalAmount(collectingAmount,15)}</Text>
                          </View>

                        </View>}

                       <View style={styles.spacing}></View>
                    </View>
                  </ScrollView>
                  {this.renderModalView()}
                </View>
                {this.reanderButton()}
              </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
      );
  }

  reanderButton(){
    return (
      <TouchableOpacity onPress={()=>this.submitForm()} style={styles.addBtncontainer(theme)}>
        <Text style={styles.addBtncaption(theme)}>ADD</Text>
      </TouchableOpacity>
    );
  }
  onFocusInput(elementSlected){
    elementSlected.setNativeProps({
      style: { borderColor: theme.colors.secondry }
    })
  }
  onBlurInput(elementSlected){
    elementSlected.setNativeProps({
      style: { borderColor: theme.colors.lightBorder }
    })
  }
  
renderModalView(){
  return(
    <Modal isVisible={this.state.isModalVisible} style={styles.pop_wrap}>
        <View style={styles.popupContainer(theme)}>
          <Text style={styles.columntitle(theme)}>ADD YOUR BUILDING DETAILS</Text>
          <View style={styles.fieldWrapp}>
              <Text style={theme.typography.tooltip}>Name of Building *</Text>
              <TextInput onFocus={()=>this.onFocusInput(this._PopupBuildingEntry)} onBlur={()=>this.onBlurInput(this._PopupBuildingEntry)} ref={(ref) => this._PopupBuildingEntry = ref} onChangeText={(buildingName) =>{this.setState({buildingName})}} autoCorrect={false} style={styles.textInputStyle(theme)} placeholder={'Name Of Building'}/>
          </View>
          <View style={styles.fieldWrapp}>
              <Text style={theme.typography.tooltip}>Location</Text>
              <TextInput onFocus={()=>this.onFocusInput(this._PopupLocationEntry)} onBlur={()=>this.onBlurInput(this._PopupLocationEntry)} ref={(ref) => this._PopupLocationEntry = ref} autoCorrect={false} style={styles.textInputStyle(theme)} placeholder={''}/>
          </View>
          <View style={styles.popupBtms}>
            <TouchableOpacity onPress={()=>this.setState({isModalVisible:false})}>
                <Text style={styles.cancel}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({isModalVisible:false})}>
                <Text style={{color:'#315add'}}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Modal>
  )
  }
}
export default AddPropertyTenant;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.7,
    borderColor: 'red',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 20,
    right: 0,
  },
});
