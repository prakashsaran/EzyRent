import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput,Dimensions,PermissionsAndroid,KeyboardAvoidingView,Platform,Button,Keyboard,Animated} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import Autocomplete from 'react-native-autocomplete-input';
import Modal from 'react-native-modal';
import { selectContactPhone } from 'react-native-select-contact';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import {RightIconTextbox,DropDownHolder,PickerSelect,Spinner,DateMonthPicker,normalize} from '../../../components'
import NavigationService from '../../../navigation/NavigationService';
import {NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH,NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH} from '../../../navigation/routes';
import SampleData from '../../../config/sample-data';
import { getBuildings,addNewBuilding,editProperty } from '../../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import {EzyRent} from '../../../ezyrent';

class EditPropertyTenant extends React.Component {
  static contextType = ThemeContext;

  /**
   * @description start constructor
   * @param {*} props
   */
  constructor(props){
    super();
    this.state={
      propertyId:undefined,
      tenant_ccd:'0091',
      mobileNumber:undefined,
      tenantName:undefined,
      houseNumber:undefined,
      buildingName:undefined,
      rentPeriod:undefined,
      rentDue:undefined,
      bankAccount:undefined,
      collectingAmount:undefined,
      property_status:"A",
      rentduesData:[],
      isvisiblepayinfo:false,
      isModalVisible:false,
      availableBuildings:[],
      rentDueDisable:true,
      rentduesLabel:'Choose day/date',
      add_building_name:undefined,
      add_building_location:undefined,
      availableBankAccounts:[],
      propertyImage:null,
      serverPropertiesImg:null,
      inputFocused:false,
    }
    StatusBar.setBarStyle('light-content');
    this._mobileNumberEntry = undefined;
    this._countrylabelEntry = undefined;
    this._tenantNameEntry = undefined;
    this._houseNumberEntry = undefined;
    this._buildingNameEntry = undefined;
    this._rentPeriodEntry = undefined;
    this._rentDueEntry = undefined;
    this._bankAccountEntry = undefined;
    this._collectingAmountEntry = undefined;
    this._PopupBuildingEntry = undefined;
    this._PopupLocationEntry = undefined;
    this.keyboardBehavior = null;
  }

/* =========================================================  */
/* ================== START UI ACTIONS =======================  */
/* =========================================================  */

  /* comman using function current page */

  renderEditData(){
          const {navigation,bankData} = this.props
          const currentProperty = navigation.getParam("property");
          const listItem = navigation.getParam("item");
          
          this.setState({
            propertyId:currentProperty.id,
            houseNumber:currentProperty.house_number,
            collectingAmount:listItem.rent_amount?listItem.rent_amount:"",
            houseNumber:listItem.house_number,
            buildingName:listItem.building_id,
            rentPeriod:listItem.rent_period_id,
            rentDue:listItem.rent_day_date,
            property_status:listItem.property_status,
            serverPropertiesImg:listItem.property_image,
            tenantName:currentProperty.tenant_name,
            mobileNumber:currentProperty.tenant_mobile,
            isvisiblepayinfo:true,
          });
          if (currentProperty.tenant_id && Object.keys(currentProperty).length > 0) {
            this.setState({
              tenantName:currentProperty.tenant_details[0].tenant_name,
              mobileNumber:currentProperty.tenant_details[0].tenant_mobile,
            });
          }
          if(currentProperty.rent_split_up){
            this.setState({
              collectingAmount:currentProperty.rent_split_up.rent_amount,
            });
          }
      
          const slectedbank = bankData.find(function(item){
              if(item.account_no==currentProperty.bank_account_number){
                  return item;
              }
              return null;
          });
          if(slectedbank){
            this.setState({bankAccount:slectedbank.id})
          }
          this.renderRentDayDate(listItem.rent_period_id);
    }
    renderRentDayDate(rentPeriod){
      const rentduesData = [];
      if(rentPeriod==4){
        const monthNames = this.getMonthNames();
        Object.keys(monthNames).forEach((key) => {
          const monthItem = { label: monthNames[key], value: key };
          rentduesData.push(monthItem);
        });
        this.setState({rentduesLabel:"Choose month"})
      }
    
      if(rentPeriod==3){
        const monthDates = this.getMonthDates();
        Object.keys(monthDates).forEach((key) => {
          const dateItem = { label: monthDates[key].toString(), value: key };
          rentduesData.push(dateItem);
        });
        this.setState({rentduesLabel:"Choose day/date"})
      }
    
      if(rentPeriod==2){
        rentduesData.push({label:'15th & End of the Month',value:1});
        this.setState({rentduesLabel:"Choose day/date"})
      }
    
      if(rentPeriod==1){
        const weekNames = this.getWeekNames()
        Object.keys(weekNames).forEach((key) => {
          const weekItem = { label: weekNames[key], value: key };
          rentduesData.push(weekItem);
        });
        this.setState({rentduesLabel:"Choose day/date"})
      }
      this.setState({rentduesData});
      this.setState({rentDueDisable:false});
      //this.setState({rentDue:4});
    
    }
    UNSAFE_componentWillMount(){
    const {getBuildings} = this.props
    getBuildings();
  }
  onChangeMobile(mobileNumber){
    this.setState({mobileNumber})
  }
  getRealValueOfRentDay(rentDue){
    const {rentPeriod} = this.state;
    if(rentPeriod==3){
      return 31;
    }
    return rentDue;
  }

  submitForm(){
    const { editProperty } = this.props
    const {propertyId,tenant_ccd,mobileNumber,tenantName,houseNumber,buildingName,rentPeriod,rentDue,collectingAmount,bankAccount,propertyImage,property_status} = this.state
    const formIsValid =
            this.validateAndSetAttribute(mobileNumber, this._mobileNumberEntry) &
            this.validateAndSetAttribute(mobileNumber, this._countrylabelEntry) &
            this.validateAndSetAttribute(rentPeriod, this._rentPeriodEntry) &
            this.validateAndSetAttribute(rentDue, this._rentDueEntry) &
            this.validateAndSetAttribute(buildingName, this._buildingNameEntry) &
            this.validateAndSetAttribute(collectingAmount, this._collectingAmountEntry) &
            this.validateAndSetAttribute(bankAccount, this._bankAccountEntry) &
           // this.validateAndSetAttribute(tenantName, this._tenantNameEntry) &
            this.validateAndSetAttribute(houseNumber, this._houseNumberEntry);
    if(formIsValid){
     const formData = {tenant_ccd:tenant_ccd,tenant_mobile:mobileNumber,tenant_name:tenantName,house_number:houseNumber,building_id:buildingName,bank_id:bankAccount,rent_amount:collectingAmount.replace(",",""),rent_period_id:rentPeriod,rent_day_date:this.getRealValueOfRentDay(rentDue),status:property_status}
     editProperty(propertyId,formData,propertyImage);
     // NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH);
    }else{
      DropDownHolder.alert('error', '', 'Invalid Form. Please fill valid data!')
    }
  }

  validateInput(input) {
    if (input === undefined)
        return false
    else if (input === '')
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
  return {0:'Sunday',1:'Monday',2:'Tuesday',3:'Wednesday',4:'Thursday',5:'Friday',6:'Saturday'};
}
getMonthNames(){
  return {1:'January',2:'February',3:'March',4:'April',5:'May',6:'June',7:'July',8:'August',9:'September',10:'October',11:'November',12:'December'};
}
getMonthDates(){
  return {0:'End of Month',1:'1st of Month',2:'2nd of Month',3:'3rd of Month',4:'4th of Month',5:'5th of Month',6:'6th of Month',7:'7th of Month',8:'8th of Month',9:'9th of Month',10:'10th of Month',11:'11th of Month',12:'12th of Month',13:'13th of Month',14:'14th of Month',15:'15th of Month',16:'16th of Month',17:'17th of Month',18:'18th of Month',19:'19th of Month',20:'20th of Month',21:'21st of Month',22:'22nd of Month',23:'23rd of Month',24:'24th of Month',25:'25th of Month',26:'26th of Month',27:'27th of Month',28:'28th of Month',29:'29th of Month',30:'30th of Month',31:'31st of Month'};
}
componentDidMount(){
  const {buildingData,bankData} = this.props
  if (Platform.OS == 'android') {
      this.keyboardBehavior = 'height'
  }

  const allBuildings = buildingData || [];
  const availableBuildings = allBuildings.map((building,idx)=>{
    return {label:building.building_name,value:building.id}
  });

  const availableBankAccounts = bankData.map((bank,idx)=>{
    return {label:bank.name,value:bank.id}
  });

  availableBuildings.push({label:"+ Add New Building",value:"add_new"})

  availableBankAccounts.push({label:"+ Add New Bank Account",value:"add_new"})
  
  this.setState({availableBuildings,availableBankAccounts})
  this.renderEditData();

  this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
  this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
  this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
  this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)

}

/* =================================== */
/* ======== KEYBOARD FUNCTION ======== */
/* =================================== */
  keyboardDidShow = () => {
    this.setState({ inputFocused: true })
  }
  keyboardWillShow = () => {
    this.setState({ inputFocused: true })
  }
  keyboardWillHide = () => {
    this.setState({ inputFocused: false })
  }
  keyboardDidHide = () => {
    this.setState({ inputFocused: false })
  }
/* =================================== */
/* ======== KEYBOARD FUNCTION ======== */
/* =================================== */


UNSAFE_componentWillReceiveProps(nextProps){
  const {buildingData,selectedBuilding} = this.props
  if(nextProps.buildingData!==buildingData){
    const allBuildings = nextProps.buildingData || [];
    const availableBuildings = allBuildings.map((building,idx)=>{
      return {label:building.building_name,value:building.id}
    })
    availableBuildings.push({label:"+ Add New Building",value:"add_new"})
    this.setState({availableBuildings})
  }

  if(nextProps.selectedBuilding != selectedBuilding && nextProps.selectedBuilding){
    this,this.setState({buildingName:nextProps.selectedBuilding});
  }

}
componentDidUpdate(prevProps,prevState){
  const {bankAccount,collectingAmount,rentPeriod,rentDue} = this.state
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
  if(rentPeriod==4){
    const monthNames = this.getMonthNames();
    Object.keys(monthNames).forEach((key) => {
      const monthItem = { label: monthNames[key], value: key };
      rentduesData.push(monthItem);
    });
    this.setState({rentduesLabel:"Choose rent date"})
    this.setState({rentDue:null})
    this.setState({rentDueDisable:false});
  }

  if(rentPeriod==3){
    const monthDates = this.getMonthDates();
    Object.keys(monthDates).forEach((key) => {
      const dateItem = { label: monthDates[key].toString(), value: key };
      rentduesData.push(dateItem);
    });
    this.setState({rentduesLabel:"Rent due day"})
    this.setState({rentDue:null})
    this.setState({rentDueDisable:false});
  }

  if(rentPeriod==2){
    rentduesData.push({label:'15th & End of the Month',value:1});
    this.setState({rentduesLabel:"Rent due day"})
    this.setState({rentDue:1})
    this.setState({rentDueDisable:true});
  }

  if(rentPeriod==1){
    const weekNames = this.getWeekNames()
    Object.keys(weekNames).forEach((key) => {
      const weekItem = { label: weekNames[key], value: key };
      rentduesData.push(weekItem);
    });
    this.setState({rentduesLabel:"Rent due day"})
    this.setState({rentDue:null})
    this.setState({rentDueDisable:false});
  }

  this.setState({rentduesData});
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
  ///return  Math.round(amountClt+(amountClt*18/100));
}
getBankChargeMoneyFormat(amount,percentage){
  const totalBnkCharge = this.getBankCharge(amount,percentage);
  return this.getMoneyFormat(totalBnkCharge,0);
}
getTotalAmount(amount,type){
  const serviceCharge = 28;
  const Netbankingcharge = 10;
  switch(type){
    case 1: 
    const totalAmountInc1c =  Math.round(parseInt(amount)+parseInt(serviceCharge)+parseInt(Netbankingcharge));
    return this.getMoneyFormat(totalAmountInc1c,0);
    break;
    case 2: 
    const b2getBankCharge = this.getBankCharge(amount,1.25);
    const totalAmountInc2c =  Math.round(parseInt(amount)+parseInt(serviceCharge)+parseInt(b2getBankCharge));
    return this.getMoneyFormat(totalAmountInc2c,0);
    break;
    case 3: 
    const b3getBankCharge = this.getBankCharge(amount,1.95);
    const totalAmountInc3c =  Math.round(parseInt(amount)+parseInt(serviceCharge)+parseInt(b3getBankCharge));
    return this.getMoneyFormat(totalAmountInc3c,0);
    break;
  }
}

// CHOOSE CONTACT NUMBER FROM CONTACT LIST
getTenDigitFormat(phone) {
  phone = phone.replace(/[^\d]/g, "");
  if(phone > 10){
  return phone.substr(phone.length - 10);
  }
  return phone;
}
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

	    const mobileNumber = this.getTenDigitFormat(selectedPhone.number);
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

  onDonePressBank(){
    const {bankAccount} = this.state
    if(bankAccount=="add_new"){
      NavigationService.navigate(NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH)
      this.setState({bankAccount:null});
    }else {
      this.setState({bankAccount})
    }
  }

  onChooseBankAc(selectItem){
    const bankAccount = selectItem.value;
    if(bankAccount=="add_new"){
      NavigationService.navigate(NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH)
      this.setState({bankAccount:null});
    }else {
      this.setState({bankAccount})
    }
  }
  onDonePressBuilding(){
    const {buildingName} = this.state
    if(buildingName=="add_new"){
      this.setState({isModalVisible:true})
      this.setState({buildingName:null});
    }
  }
  onChooseBuilding(buildingName){
    if(buildingName=="add_new"){
      this.setState({isModalVisible:true})
      this.setState({buildingName:null});
    } else{
      this.setState({buildingName});
    }
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

  addBuildingSubmit(){
    const {addNewBuilding} = this.props;
    const {add_building_name,add_building_location} = this.state;
    const latitude = "26."+ new Date().toLocaleTimeString().replace(":", "").replace(":", "");
    const longitude = "26."+ new Date().toLocaleTimeString().replace(":", "").replace(":", "");
    const fromdata = {building_name:add_building_name,location:add_building_location,latitude,longitude};
    const formIsValid =
    this.validateAndSetAttribute(add_building_name, this._PopupBuildingEntry) &
    this.validateAndSetAttribute(add_building_location, this._PopupLocationEntry);
    if(formIsValid){
      this.setState({isModalVisible:false});
      addNewBuilding(fromdata)
      this.setState({add_building_name:"",add_building_location:""});
    }
  }
  /* comman using function current page */
  browseImage(){
    const options = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 700,
      maxHeight: 700,
      quality: 0.9
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        DropDownHolder.alert('error', '', response.error);
      } else {
        this.setState({propertyImage:response});
        //updateUserProfle(customer,response);
      }
    });
  }
/* =========================================================  */
/* ================== END UI ACTIONS =======================  */
/* =========================================================  */



/* =========================================================  */
/* ================== START UI VIEW =======================  */
/* =========================================================  */

renderPropertyMainImage(){
  const { propertyImage,serverPropertiesImg } = this.state
  if(propertyImage){
    return( <Image style={styles.headerBannerImage(theme)} source={{uri:propertyImage.uri}}/>);
  }
  if(serverPropertiesImg && serverPropertiesImg !="building_placehoder.jpg"){
    return(<Image style={styles.headerBannerImage(theme)} source={{uri:`${EzyRent.getMediaUrl()}${serverPropertiesImg}`}}/>);
  }
  return(<Image style={styles.headerBannerImage(theme)} source={require('../../../assets/images/building_placehoder.jpg')}/>);
}
renderHeader(){
    return(
      <Animated.View style={styles.headerContainer(theme)}>
        <View style={styles.headerContext}>
          <TouchableOpacity onPress={()=>NavigationService.goBack()} style={theme.typography.backbtmcontainer}>
            <Image style={styles.backscreen} resizeMode={'stretch'} source={require('../../../assets/images/back-white.png')}></Image>
            <Text style={styles.pageTitle(theme)}>Edit Property/Tenant</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }
  /* common using function current page */
  renderRentDuePicker(){
    const { rentDueDisable,rentduesData,rentDue,rentduesLabel,rentPeriod } = this.state
    if(rentPeriod==4){
      return(
        <DateMonthPicker
          placeholder={rentduesLabel}
          defaultValue={rentDue}
          ref={ref => { this._rentDueEntry = ref;}}
          pickerStyle={rentDue?styles.pickerSelected(theme):styles.pickerUnSelected(theme)}
          onSeleteItem={(rentDue) =>this.setState({rentDue})}
          />
      )
    }
    return(
      <PickerSelect
        // placeholder='Choose day/date'
        placeholder={rentduesLabel}
        placeholderStyle={styles.font_16}
        items={rentduesData}
        defaultValue={rentDue}
        isdisabled={rentDueDisable}
        selectedLabelStyle={styles.font_16}
        ref={ref => { this._rentDueEntry = ref;}}
        pickerStyle={rentDue?styles.pickerSelected(theme):styles.pickerUnSelected(theme)}
        onChooseItem={({label,value}) => this.setState({rentDue:value})}
        itemLabelStyle={styles.font_16}
      />
    )
  }

  render(){
    const theme = this.context;
    const {loading} = this.props
    const {
      mobileNumber,
      tenantName,
      houseNumber,
      buildingName,
      collectingAmount,
      rentduesData,
      rentDue,
      isvisiblepayinfo,
      availableBuildings,
      availableBankAccounts,
      rentPeriod,
      bankAccount,
      rentDueDisable,
      rentduesLabel,
      inputFocused
    } = this.state
      return (
        <SafeAreaView style={styles.container(theme)}>
        <KeyboardAvoidingView style={{flex: 1,backgroundColor:inputFocused?'transparent':'transparent'}} behavior={this.keyboardBehavior} >
              <View>
                {this.renderHeader()}
                <View style={styles.formcontainer}>
                <View style={styles.popOver}></View>
                  <ScrollView showsVerticalScrollIndicator={false} style={{height:Dimensions.get('window').height-140}} >
                    <View style={styles.formColumnWrapp}>

                      <View style={styles.headerBanner(theme)}>
                          {this.renderPropertyMainImage()}
                          <TouchableOpacity style={styles.edit_icon} onPress={()=>this.browseImage()}>
                            <Image style={{width:30,height:30}} source={require('../../../assets/images/edit-transparent.png')}/>
                          </TouchableOpacity>
                          <TouchableOpacity style={[styles.edit_icon,styles.delete_icon]}  onPress={()=>this.setState({propertyImage:null})}>
                           <Image style={{width:30,height:30}} source={require('../../../assets/images/delete-transparent.png')}/>
                          </TouchableOpacity>
                      </View>

                       <View style={styles.formcolumn}>
                          <Text style={styles.columntitle(theme)}>TENANT INFORMATION</Text>
                          <View style={styles.fieldWrapp} >
                             <Text style={theme.typography.tooltip}>Phone Number of Tenant *</Text>
                             <View style={styles.twocolumn}>
                               <View style={mobileNumber?styles.fielcountrylabel(theme):styles.fielcountrylabelSec(theme)} ref={(ref) => this._countrylabelEntry = ref}>
                                  <Text style={styles.fieltext(theme)}>+91 (IND)</Text>
                               </View>
                               <RightIconTextbox
                                ref={(ref) => this._mobileNumberEntry = ref}
                                //onFocus={()=>this.onFocusInput(this._mobileNumberEntry)}
                                onPressIcon={()=>this.requestContactPermission()}
                                keyboardType={'number-pad'}
                                returnKeyLabel={"next"}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this._tenantNameEntry.focus() }}
                                style={mobileNumber?styles.contactbook(theme):styles.contactbookSec(theme)}
                                placeholder={"Mobile Number"} textValue={mobileNumber}
                                onChangeText={(mobileNumber)=>this.onChangeMobile(mobileNumber)}
                                image-style={styles.address_icon}
                                InputStyle={styles.font_16}
                                blurOnSubmit={false}
                                source={require('../../../assets/images/address.png')}/>
                             </View>
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Name of Tenant</Text>
                              <TextInput
                               ref={(ref) => this._tenantNameEntry = ref} 
                               onChangeText={(tenantName) =>{this.setState({tenantName})}} 
                               autoCorrect={false} style={tenantName?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} 
                               value={tenantName} 
                               placeholder={'Name of Tenant'}
                               returnKeyLabel={"next"}
                               returnKeyType={"next"}
                               blurOnSubmit={false}
                               onSubmitEditing={() => { this._houseNumberEntry.focus() }}
                                />
                          </View>
                        </View>


                       <View style={styles.formcolumn}>
                          <Text style={styles.columntitle(theme)}>PROPERTY INFORMATION</Text>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Tenant House Number (Ex: Flat 101, TC 6/1564) *</Text>
                              <TextInput 
                              ref={(ref) => this._houseNumberEntry = ref} 
                              onChangeText={(houseNumber) =>{this.setState({houseNumber})}} 
                              value={houseNumber} autoCorrect={false} 
                              style={houseNumber?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} 
                              placeholder={'Ex: Flat 101, TC 6/1564'}
                              returnKeyLabel={"next"}
                               returnKeyType={"next"}
                               blurOnSubmit={false}
                              onSubmitEditing={() => { this._collectingAmountEntry.focus() }}
                            />
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Tenant Building Name (Ex: RHS Greenvile) *</Text>
                            <PickerSelect
                                    placeholder='Name of Building'
                                    //onDonePress={()=>this.onDonePressBuilding()}
                                    defaultValue={buildingName}
                                    selectedLabelStyle={styles.font_16}
                                    ref={ref => { this._buildingNameEntry = ref;}}
                                    pickerStyle={buildingName?styles.pickerSelected(theme):styles.pickerUnSelected(theme)}
                                    onChooseItem={({label,value}) => this.onChooseBuilding(value)}
                                    placeholderStyle={styles.font_16}
                                    items={availableBuildings}
                                    itemLabelStyle={styles.font_16}
                                  />
                          </View>


                          <View style={styles.fieldWrappTwoColum}>

                            <View style={styles.pikerwrap}>
                              <Text style={theme.typography.tooltip}>Rent Period *</Text>
                                <PickerSelect
                                    placeholder='Choose duration'
                                    ref={ref => { this._rentPeriodEntry = ref;}}
                                    //onValueChange={(rentPeriod) => this.onChangeRentPeriod(rentPeriod)}
                                    placeholderStyle={styles.font_16}
                                    onChooseItem={({value}) => this.onChangeRentPeriod(value)}
                                    selectedLabelStyle={styles.font_16}
                                    defaultValue={rentPeriod}
                                    pickerStyle={rentPeriod?styles.pickerSelected(theme):styles.pickerUnSelected(theme)}
                                    items={[
                                        { label: 'Monthly', value: '3' },
                                        { label: 'Bi Weekly', value: '2' },
                                        { label: 'Weekly', value: '1' },                                       
                                        { label: 'Annually', value: '4' },
                                    ]}
                                    itemLabelStyle={styles.font_16}
                                  />
                            </View>


                            <View style={styles.pikerwrap}>
                              <Text style={theme.typography.tooltip}>Rent Due *</Text>
                                {this.renderRentDuePicker()}
                            </View>

                          </View>


                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Total amount to be collected from tenant  *</Text>
                             <Text style={styles.tooltipDsc(theme)}>Includes all charges like rent, maintenance etc </Text>
                             <View style={styles.currencyLabel}>
                              <Text style={styles.currencySymbl(theme)}>INR -</Text>
                              <TextInput ref={(ref) => this._collectingAmountEntry = ref} keyboardType={'numeric'} onChangeText={(collectingAmount) =>{this.setState({collectingAmount})}} value={collectingAmount} autoCorrect={false} style={[collectingAmount?styles.textInputStyle2(theme):styles.textInputStyleSec2(theme),{paddingLeft:normalize(40),marginLeft:normalize(-30)}]} placeholder={'Ex: 10000'}/>
                              </View>
                          </View>


                          <View style={styles.fieldWrapp} >
                             <Text style={theme.typography.tooltip}>Your (Recipient) Bank Account *</Text>
                            <PickerSelect
                                    ref={ref => { this._bankAccountEntry = ref;}}
                                    defaultValue={bankAccount}
                                    onChooseItem={(item)=>this.onChooseBankAc(item)}
                                    pickerStyle={bankAccount?styles.pickerSelected(theme):styles.pickerUnSelected(theme)}
                                    items={availableBankAccounts}
                                    placeholderStyle={styles.font_16}
                                    itemLabelStyle={styles.font_16}
                                    selectedLabelStyle={styles.font_16}
                                   placeholder="Choose Bank Account"/>
                          </View>

                       </View>


                       {isvisiblepayinfo && <View style={styles.formcolumn}>
                          <Text style={styles.columntitle(theme)}>PAYMENT INFORMATION</Text>
                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>A. Total Amount to be Collected from Tenant</Text>
                             <Text style={styles.responseValue(theme)}>INR {this.getMoneyFormat(collectingAmount.replace(",",""),0)}</Text>
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>B. Bank Charges</Text>
                             <View style={styles.SubresponseValue}>
                               <Text style={[styles.responseValue(theme),styles.responseValue2]}><Text style={[styles.responseValue(theme),styles.responseValue1]}>B.1) INR 10</Text> on using Net Banking/UPI</Text>
                               <Text style={[styles.responseValue(theme),styles.responseValue2]}><Text style={[styles.responseValue(theme),styles.responseValue1]}>B.2) INR {this.getBankChargeMoneyFormat(collectingAmount.replace(",",""),1.25)}</Text> on using Debit Card (1.25% of A includes 18% GST)</Text>
                                <Text style={[styles.responseValue(theme),styles.responseValue2]}><Text style={[styles.responseValue(theme),styles.responseValue1]}>B.3) INR {this.getBankChargeMoneyFormat(collectingAmount.replace(",",""),1.95)}</Text> on using Credit Card (1.95% of A, includes 18% GST)</Text>
                              </View>
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>C. Service Charges</Text>
                             <Text style={styles.responseValue(theme)}>INR 28</Text>
                          </View>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Total Amount Payable by Tenant Monthly</Text>
                             <View style={styles.SubresponseValue}>
                               <Text style={[styles.responseValue(theme),styles.responseValue2]}><Text style={[styles.responseValue(theme),styles.responseValue1]}>INR {this.getTotalAmount(collectingAmount.replace(",",""),1)}</Text> on using Net Banking/UPI (A + B.1 + C)</Text>
                               <Text style={[styles.responseValue(theme),styles.responseValue2]}><Text style={[styles.responseValue(theme),styles.responseValue1]}>INR {this.getTotalAmount(collectingAmount.replace(",",""),2)}</Text> on using Debit Card (A + B.2 + C)</Text>
                                <Text style={[styles.responseValue(theme),styles.responseValue2]}><Text style={[styles.responseValue(theme),styles.responseValue1]}>INR {this.getTotalAmount(collectingAmount.replace(",",""),3)}</Text> on using Credit Card (A + B.3 + C)</Text>
                              </View>
                          </View>

                        </View>}

                       <View style={styles.spacing}></View>
                    </View>
                  </ScrollView>
                  {loading && <Spinner style={{position:"absolute",alignSelf:'center',bottom:"50%"}}/>}
                  {this.renderModalView()}
                </View>
              </View>
            </KeyboardAvoidingView>
            {this.reanderButton()}
        </SafeAreaView>
      );
  }

  reanderButton(){
    return (
      <TouchableOpacity onPress={()=>this.submitForm()} style={styles.addBtncontainer(theme)}>
        <Text style={styles.addBtncaption(theme)}>SAVE</Text>
      </TouchableOpacity>
    );
  }

renderModalView(){
  const {add_building_name,add_building_location} = this.state;
  return(
    <Modal isVisible={this.state.isModalVisible} style={styles.pop_wrap}>
        <View style={styles.popupContainer(theme)}>
          <Text style={styles.columntitle(theme)}>ADD YOUR BUILDING DETAILS</Text>
          <View style={styles.fieldWrapp}>
              <Text style={theme.typography.tooltip}>Name of Building *</Text>
              <TextInput
              onFocus={()=>this.onFocusInput(this._PopupBuildingEntry)}
              onBlur={()=>this.onBlurInput(this._PopupBuildingEntry)}
              ref={(ref) => this._PopupBuildingEntry = ref}
              onChangeText={(add_building_name) =>{this.setState({add_building_name})}}
              autoCorrect={false}
              value={add_building_name}
              style={styles.textInputStyle(theme)}
              //placeholder={'Name of Building'}
              returnKeyLabel={"next"}
              returnKeyType={"next"}
              onSubmitEditing={() => { this._PopupLocationEntry.focus() }}
              />
          </View>
          <View style={styles.fieldWrapp}>
              <Text style={theme.typography.tooltip}>Location *</Text>
              <TextInput
                onFocus={()=>this.onFocusInput(this._PopupLocationEntry)}
                onBlur={()=>this.onBlurInput(this._PopupLocationEntry)}
                ref={(ref) => this._PopupLocationEntry = ref}
                autoCorrect={true}
                value={add_building_location}
                onChangeText={(add_building_location) =>{this.setState({add_building_location})}}
                style={styles.textInputStyle(theme)}
                placeholder={''}/>
          </View>
          <View style={styles.popupBtms}>
            <TouchableOpacity onPress={()=>this.setState({isModalVisible:false})}>
                <Text style={styles.cancel}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.addBuildingSubmit()}>
                <Text style={{color:'#315add'}}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
    </Modal>
  )
  }

/* =========================================================  */
/* ================== END UI VIEW =======================  */
/* =========================================================  */

}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width:'100%',
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
  },
  inputAndroid: {
    width:'100%',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.7,
    borderColor: 'red',
    borderRadius: 8,
    color: 'black',
    marginLeft:-8,
  },
  iconContainer: {
    top: 20,
    right: 0,
  },
});




const mapStateToProps = ({ building,bankAccount,propertiesLandlord }) => {
  const { error, success, refreshing,buildingData,selectedBuilding } = building;
  const { bankData } = bankAccount;
  const { loading } = propertiesLandlord;

  return { error, success, loading, refreshing,buildingData,bankData,selectedBuilding  };
};

EditPropertyTenant.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  refreshing:PropTypes.bool,
  buildingData:PropTypes.oneOfType(PropTypes.object,null),
  bankData:PropTypes.oneOfType(PropTypes.object,null),
  getBuildings: PropTypes.func,
  addNewBuilding: PropTypes.func,
  editProperty: PropTypes.func,
  selectedBuilding: PropTypes.string,
};

EditPropertyTenant.defaultProps = {
  error: null,
  success: null,
  loading: false,
  refreshing:false,
  buildingData:[],
  bankData:[],
  selectedBuilding:null,
};

export default connect(mapStateToProps, {getBuildings,addNewBuilding,editProperty})(EditPropertyTenant);
