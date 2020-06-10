import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import { PickerSelect } from '../../../components';
import {
  NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH,
} from '../../../navigation/routes';

class AddBankAccount extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      nameofBank:undefined,
      accountNumber:undefined,
      crmAcNumber:undefined,
      acHolderName:undefined,
      typeOfAc:undefined,
      ifscCode:undefined,
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
  submitForm(){
    NavigationService.navigate(NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH);
  }
  renderHeader(){
    return(
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={()=>NavigationService.goBack()} style={styles.backscreen}>
          <Image style={styles.backscreen}  source={require('../../../assets/images/back-blue.png')}></Image>
        </TouchableOpacity>
        <Text style={theme.typography.myDashBoard}>Add New Bank Account</Text>
      </View>
    )
  }
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
                          <Text style={styles.columntitle(theme)}>ADD YOUR BANK ACCOUNT DETAILS</Text>
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
                             <PickerSelect
                                  placeholder='Type of Account'
                                  onChooseItem={({label,value}) => this.setState({typeOfAc:value})}
                                  pickerStyle={{width:'100%',borderBottomWidth:1,borderColor:theme.colors.lightBorder,paddingVertical:5,}}
                                  items={[
                                      { label: 'Current Account', value: '1' },
                                      { label: 'Savings Account', value: '1' },
                                      { label: 'Recurring Deposit Account', value: '3' },
                                      { label: 'Fixed Deposit Account', value: '4' },
                                  ]}
                                />
                          </View>
                          <View style={styles.fieldWrapp(theme)}>
                              <TextInput onFocus={()=>this.onFocusInput(this._ifscCodeEntry)} onBlur={()=>this.onBlurInput(this._ifscCodeEntry)} ref={(ref) => this._ifscCodeEntry = ref} onChangeText={(ifscCode) =>{this.setState({ifscCode})}} autoCorrect={false} style={styles.textInputStyleSec(theme)} value={ifscCode} placeholder={'IFSC Code/Sort Code'}/>
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
        <Text style={styles.addBtncaption(theme)}>ADD</Text>
      </TouchableOpacity>
    );
  }

}
export default AddBankAccount;
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
    marginLeft:-9,

  },
  iconContainer: {
    top: 20,
    right: 0,
  },
});
