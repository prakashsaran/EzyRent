import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,
} from '../../navigation/routes';
import {RightIconTextbox,DropDownHolder} from '../../components'

const secureTextHidden = '../../assets/images/securetext_hidden.png';
const secureTextShow = '../../assets/images/securetext_show.png';

class EditMyProfile extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      acName:"Trevor johnson",
      appPin:undefined,
      mobileNumber:"9847385345",
      secureTextEntry:true
    }
    StatusBar.setBarStyle("light-content");
    this._acNameEntry = undefined;
  }

  submitForm(){
    NavigationService.navigate(NAVIGATION_MORE_MY_PROFILE_VIEW_PATH);
  }
  renderHeader(){
    return(
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={()=>NavigationService.goBack()} style={styles.backscreen}>
          <Image style={styles.backscreen} resizeMode={'stretch'} source={require('../../assets/images/back-white.png')}></Image>
        </TouchableOpacity>
        <Text style={theme.typography.myDashBoard}>Edit My Profile</Text>
      </View>
    )
  }
  render(){
    const {acName,secureTextEntry,appPin,mobileNumber} = this.state
    const theme = this.context;
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
            {this.renderHeader()}
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <View style={styles.rectWrapp}>
                  <View style={theme.typography.rectView}>
                     <Text style={styles.columntitle(theme)}>EDIT YOUR PROFILE</Text>
                    <ImageBackground style={styles.profilebg} imageStyle={styles.profilePik} resizeMode={'cover'} source={require('../../assets/images/sample/james.png')}>
                          <TouchableOpacity style={styles.profileEdit}>
                            <Image style={styles.editIcon}
                            source={require('../../assets/images/edit-transparent.png')}></Image>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.profileRemove}>
                            <Image style={styles.removeIcon}
                            source={require('../../assets/images/delete-transparent.png')}></Image>
                          </TouchableOpacity>
                    </ImageBackground>
                    <View style={styles.formcolumn}>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Your Full Name *</Text>
                              <TextInput ref={(ref) => this._tenantNameEntry = ref} onChangeText={(acName) =>{this.setState({acName})}} autoCorrect={false} style={styles.textInputStyle(theme)} value={acName} placeholder={'Name Of Tenant'}/>
                          </View>

                          <View style={styles.fieldWrapp}>

                              <View style={styles.pinwrapper(theme)}>
                                <Text style={theme.typography.tooltip}>Reset App Pin</Text>
                                <Text style={styles.dscribe(theme)}>Leave blank to keep the cuurent PIN. Current App PIN and OTP Validation required to change App PIN.</Text>
                                <View style={styles.pincontainer(theme)}>
                                  <OTPInputView
                                    pinCount={4}
                                    autoFocusOnLoad={false}
                                    style={styles.pininputBox(theme)}
                                    secureTextEntry={secureTextEntry}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                                    onCodeFilled = {(code => {this.setState({appPin:code})})}
                                    codeInputFieldStyle={styles.underlineStyleBase(theme)}
                                  />
                                  <TouchableOpacity style={styles.visibilityIconWrapp} onPress={()=>{this.setState({secureTextEntry:!secureTextEntry})}}>
                                    <Image style={styles.visibilityIcon} source={secureTextEntry?require(secureTextHidden):require(secureTextShow)}/>
                                  </TouchableOpacity>
                                </View>
                              </View>
                          </View>

                          <View style={styles.fieldWrapp} ref={(ref) => this._mobileNumberEntry = ref} >
                             <Text style={theme.typography.tooltip}>Phone Number of Tenant *</Text>
                             <View style={styles.twocolumn}>
                               <View style={styles.fielcountrylabel(theme)}>
                                  <Text style={styles.fieltext(theme)}>+91  (IND)</Text>
                                  <Image style={styles.downarrowicon} source={require('../../assets/images/arrow_down.png')}></Image>
                               </View>
                               <RightIconTextbox keyboardType={'number-pad'} style={styles.contactbook(theme)} placeholder={"Mobile Number"} textValue={mobileNumber} onChangeText={(mobileNumber)=>this.setState({mobileNumber})} />
                             </View>
                          </View>

                          <View style={[styles.fieldWrapp,styles.fieldWrappLast]}>
                             <Text style={theme.typography.tooltip}>Your Email Address *</Text>
                             <Text style={styles.dscribe(theme)}>App PIN and Email OTP Validation required to change</Text>
                              <TextInput ref={(ref) => this._tenantNameEntry = ref} onChangeText={(acName) =>{this.setState({acName})}} autoCorrect={false} style={styles.textInputStyle(theme)} value={acName} placeholder={'Name Of Tenant'}/>
                          </View>

                    </View>
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
        <Text style={styles.addBtncaption(theme)}>Save</Text>
      </TouchableOpacity>
    );
  }
}
export default EditMyProfile;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.descriptionColor,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: theme.colors.descriptionColor,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 20,
    right: 0,
  },
});
