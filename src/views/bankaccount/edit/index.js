import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import {
  NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH,
} from '../../../navigation/routes';
import { PickerSelect,DropDownHolder } from '../../../components';

class EditBankAccount extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      nameofBank:"Dubai Finance Bank",
      accountNumber:"25768XXXX3457XX",
      crmAcNumber:"25768XXXX3457XX",
      acHolderName:"John Peter",
      typeOfAc:null,
      ifscCode:"UBIN0555380",
      additionalDetails:undefined,
    }
    StatusBar.setBarStyle("light-content");
    this._nameofBankEntry = undefined;
    this._accountNumberEntry = undefined;
    this._crmAcNumberEntry = undefined;
    this._acHolderNameEntry = undefined;
    this._typeOfAcEntry = undefined;
    this._ifscCodeEntry = undefined;
    this._additionalDetailsEntry = undefined;
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
  componentDidMount(){
    this.setState({typeOfAc:'2'})
  }
  submitForm(){
    const {nameofBank,accountNumber,crmAcNumber,acHolderName,typeOfAc,ifscCode} = this.state
    const formIsValid =
            this.validateAndSetAttribute(nameofBank, this._nameofBankEntry) &
            this.validateAndSetAttribute(accountNumber, this._accountNumberEntry) &
            this.validateAndSetAttribute(crmAcNumber, this._crmAcNumberEntry) &
            this.validateAndSetAttribute(acHolderName, this._acHolderNameEntry) &
            this.validateAndSetAttribute(typeOfAc, this._typeOfAcEntry) &
            this.validateAndSetAttribute(ifscCode, this._ifscCodeEntry);
    if(formIsValid){
      NavigationService.navigate(NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH);
    }else{
      DropDownHolder.alert('error', '', 'Invalid Form. Please fill valid data!')
    }
  }
  
  renderHeader(){
    return(
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={()=>NavigationService.goBack()} style={theme.typography.backbtmcontainer}>
          <Image style={styles.backscreen} source={require('../../../assets/images/back-blue.png')}></Image>
          <Text style={theme.typography.myDashBoard}>Edit Bank Account</Text>
        </TouchableOpacity>
      </View>
    )
  }

  /* Common Functions*/
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
  /* Common Functions*/
  render(){
    const {nameofBank,accountNumber,crmAcNumber,acHolderName,typeOfAc,ifscCode,additionalDetails} = this.state
    const theme = this.context;
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
            {this.renderHeader()}
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <View style={styles.rectWrapp}>
                  <View style={theme.typography.rectView}>

                          <Text style={styles.columntitle(theme)}>EDIT BANK ACCOUNT DETAILS</Text>

                          <View style={styles.fieldWrapp(theme)}>
                             <Text style={theme.typography.tooltip}>Name of Bank *</Text>
                              <TextInput onFocus={()=>this.onFocusInput(this._nameofBankEntry)} onBlur={()=>this.onBlurInput(this._nameofBankEntry)} ref={(ref) => this._nameofBankEntry = ref} onChangeText={(nameofBank) =>{this.setState({nameofBank})}} autoCorrect={false} style={styles.textInputStyleSec(theme)} value={nameofBank} placeholder={'Name of Bank'}/>
                          </View>

                          <View style={styles.fieldWrapp(theme)}>
                             <Text style={theme.typography.tooltip}>Account Number *</Text>
                              <TextInput onFocus={()=>this.onFocusInput(this._accountNumberEntry)} onBlur={()=>this.onBlurInput(this._accountNumberEntry)} secureTextEntry={true} ref={(ref) => this._accountNumberEntry = ref} onChangeText={(accountNumber) =>{this.setState({accountNumber})}} autoCorrect={false} style={styles.textInputStyleSec(theme)} value={accountNumber} placeholder={'Account Number'}/>
                          </View>

                          <View style={styles.fieldWrapp(theme)}>
                             <Text style={theme.typography.tooltip}>Confirm Account Number *</Text>
                              <TextInput onFocus={()=>this.onFocusInput(this._crmAcNumberEntry)} onBlur={()=>this.onBlurInput(this._crmAcNumberEntry)} ref={(ref) => this._crmAcNumberEntry = ref} onChangeText={(crmAcNumber) =>{this.setState({crmAcNumber})}} autoCorrect={false} style={styles.textInputStyleSec(theme)} value={crmAcNumber} placeholder={'Confirm Account Number'}/>
                          </View>

                          <View style={styles.fieldWrapp(theme)}>
                             <Text style={theme.typography.tooltip}>Account Holder Name *</Text>
                              <TextInput onFocus={()=>this.onFocusInput(this._acHolderNameEntry)} onBlur={()=>this.onBlurInput(this._acHolderNameEntry)} ref={(ref) => this._acHolderNameEntry = ref} onChangeText={(acHolderName) =>{this.setState({acHolderName})}} autoCorrect={false} style={styles.textInputStyleSec(theme)} value={acHolderName} placeholder={'Account Holder Name'}/>
                          </View>

                          <View style={[styles.fieldWrapp(theme),styles.fieldWrappAccount(theme)]} ref={(ref) => this._typeOfAcEntry = ref} >
                              <RNPickerSelect
                                  placeholder={{
                                    label: 'Type of Account',
                                    value: null,
                                    color: '#000000',
                                  }}
                                  value={typeOfAc}
                                  style={pickerSelectStyles}
                                  onValueChange={(typeOfAc) => this.setState({typeOfAc})}
                                  items={[
                                      { label: 'Current Account', value: '1' },
                                      { label: 'Savings Account', value: '2' },
                                      { label: 'Recurring Deposit Account', value: '3' },
                                      { label: 'Fixed Deposit Account', value: '4' },
                                  ]}
                                  Icon={() => {
                                    return (
                                      <Image style={{width:14,height:15}} source={require('../../../assets/images/arrowdown_picker.png')}/>
                                    );
                                  }}
                                />
                          </View>


                          <View style={styles.fieldWrapp(theme)}>
                              <TextInput onFocus={()=>this.onFocusInput(this._ifscCodeEntry)} onBlur={()=>this.onBlurInput(this._ifscCodeEntry)}  ref={(ref) => this._ifscCodeEntry = ref} onChangeText={(ifscCode) =>{this.setState({ifscCode})}} autoCorrect={false} style={styles.textInputStyleSec(theme)} value={ifscCode} placeholder={'IFSC Code/Sort Code'}/>
                          </View>


                          <View style={styles.fieldWrapp(theme)}>
                              <TextInput onFocus={()=>this.onFocusInput(this._additionalDetailsEntry)} onBlur={()=>this.onBlurInput(this._additionalDetailsEntry)} ref={(ref) => this._additionalDetailsEntry = ref} onChangeText={(additionalDetails) =>{this.setState({additionalDetails})}} autoCorrect={false} style={styles.textInputStyleSec(theme)} value={additionalDetails} placeholder={'Additional Details'}/>
                          </View>
                          <View style={styles.spacing}></View>


                  </View>
                </View>
              </ScrollView>
              {this.reanderButton()}
          </SafeAreaView>
        </ImageBackground>
      );
  }
  reanderButton(){
    return (
      <TouchableOpacity onPress={()=>this.submitForm()} style={styles.addBtncontainer(theme)}>
        <Text style={styles.addBtncaption(theme)}>SAVE</Text>
      </TouchableOpacity>
    );
  }

}
export default EditBankAccount;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 10,
    borderColor: theme.colors.descriptionColor,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 0,
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: theme.colors.descriptionColor,
    borderRadius: 8,
    color: 'black',
    marginLeft:-3,

  },
  iconContainer: {
    top: 20,
    right: 0,
  },
});
