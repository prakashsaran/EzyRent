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

class EditBankAccount extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      nameofBank:"Dubai Finance Bank",
      accountNumber:"25768XXXX3457XX",
      crmAcNumber:"25768XXXX3457XX",
      acHolderName:"John Peter",
      typeOfAc:1,
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

  submitForm(){
    NavigationService.navigate(NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH);
  }
  renderHeader(){
    return(
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={()=>NavigationService.goBack()} style={styles.backscreen}>
          <Image style={styles.backscreen} source={require('../../../assets/images/back-blue.png')}></Image>
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

                          <Text style={styles.columntitle(theme)}>EDIT YOUR BANK ACCOUNT DETAILS</Text>

                          <View style={styles.fieldWrapp(theme)}>
                             <Text style={theme.typography.tooltip}>Name of Bank *</Text>
                              <TextInput ref={(ref) => this._nameofBankEntry = ref} onChangeText={(nameofBank) =>{this.setState({nameofBank})}} autoCorrect={false} style={nameofBank?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} value={nameofBank} placeholder={'Name Of Bank Account'}/>
                          </View>

                          <View style={styles.fieldWrapp(theme)}>
                             <Text style={theme.typography.tooltip}>Account Number *</Text>
                              <TextInput secureTextEntry={true} ref={(ref) => this._accountNumberEntry = ref} onChangeText={(accountNumber) =>{this.setState({accountNumber})}} autoCorrect={false} style={accountNumber?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} value={accountNumber} placeholder={'Account Number'}/>
                          </View>

                          <View style={styles.fieldWrapp(theme)}>
                             <Text style={theme.typography.tooltip}>Confirm Account Number *</Text>
                              <TextInput ref={(ref) => this._crmAcNumberEntry = ref} onChangeText={(crmAcNumber) =>{this.setState({crmAcNumber})}} autoCorrect={false} style={crmAcNumber?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} value={crmAcNumber} placeholder={'Account Number'}/>
                          </View>

                          <View style={styles.fieldWrapp(theme)}>
                             <Text style={theme.typography.tooltip}>Account Holder Name *</Text>
                              <TextInput ref={(ref) => this._acHolderNameEntry = ref} onChangeText={(acHolderName) =>{this.setState({acHolderName})}} autoCorrect={false} style={acHolderName?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} value={acHolderName} placeholder={'Account Holder Name'}/>
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
                                      { label: 'Savings Account', value: '1' },
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
                              <TextInput ref={(ref) => this._ifscCodeEntry = ref} onChangeText={(ifscCode) =>{this.setState({ifscCode})}} autoCorrect={false} style={ifscCode?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} value={ifscCode} placeholder={'IFSC Code/Sort Code'}/>
                          </View>


                          <View style={styles.fieldWrapp(theme)}>
                              <TextInput ref={(ref) => this._additionalDetailsEntry = ref} onChangeText={(additionalDetails) =>{this.setState({additionalDetails})}} autoCorrect={false} style={additionalDetails?styles.textInputStyle(theme):styles.textInputStyleSec(theme)} value={additionalDetails} placeholder={'Additional Details'}/>
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
export default EditBankAccount;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 20,
    right: 0,
  },
});
