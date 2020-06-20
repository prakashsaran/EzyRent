import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,TextInput, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,
} from '../../navigation/routes';
import {RightIconTextbox,DropDownHolder,Spinner} from '../../components'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {EzyRent} from '../../ezyrent';
import ImagePicker from 'react-native-image-picker';
import {updateUserProfle,changeProfileName,changeEmailAddress,changeMobileNumber,changeMobilePin,mpinChangeVerify,emailAdressChangeVerify,mobileNumberChangeVerify,deleteProfileImage} from '../../actions';
import Modal from 'react-native-modal';

const secureTextHidden = '../../assets/images/securetext_hidden.png';
const secureTextShow = '../../assets/images/securetext_show.png';

class EditMyProfile extends React.Component {
  static contextType = ThemeContext;

  /**
   * @name constructor
   * @description initially execute constructor
   * @param {*} props 
   */
  constructor(props){
    super();
    this.state ={
      mobile_country_code:"0091",
      default_full_name:undefined,
      default_mobileNumber:undefined,
      default_acEmail:undefined,
      full_name:undefined,
      appPin:undefined,
      mobileNumber:undefined,
      acEmail:undefined,
      secureTextEntry:true,
      mpinPopup:false,
      emailPopup:false,
      mobilePopup:false,
      errorValue:null,
      verifyMpin:undefined,
      profileloader:false,
      mobile_otp:"",
      email_otp:"",
    }
    StatusBar.setBarStyle("light-content");
    this._fullNameEntry = undefined;
    this._tenantNameEntry = undefined;
    this._tenantEmailEntry = undefined;
  }

  /**
   * @name UNSAFE_componentWillReceiveProps
   * @param {*} nextProps 
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { customer,updating } = this.props
    if(nextProps.updating!==updating){
      currentData = nextProps.updating || {}
      if(currentData.hasOwnProperty("email")){
        this.setState({emailPopup:true});
      }
      if(currentData.hasOwnProperty("mpin")){
        this.setState({mpinPopup:true});
      }
      if(currentData.hasOwnProperty("mobile")){
        this.setState({mobilePopup:true});
      }
    }
  }

  /* ===================================================== */
  /* ================== START COMMON FUNCTIONS ============ */
  /* ===================================================== */

  componentDidMount(){
    const {customer} = this.props;
    this.setState({
      default_full_name:customer.full_name,
      default_mobileNumber:customer.mobile,
      default_acEmail:customer.email,
      full_name:customer.full_name,
      mobileNumber:customer.mobile,
      acEmail:customer.email,
    })
  }
  submitForm(){
    NavigationService.navigate(NAVIGATION_MORE_MY_PROFILE_VIEW_PATH);
  }

  /**
   * @name pickupImage
   * @description pickupImage function choose image from mobile gallery
   */
  pickupImage(){
    const {updateUserProfle,customer} = this.props
    const options = {
      title: 'Profile Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.9
    };
    
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      } else if (response.error) {
        DropDownHolder.alert('error', '', response.error);
      } else {
        updateUserProfle(customer,response);
      }
    });
  }

  removeProfileImage(){
   const {customer,deleteProfileImage} = this.props
   deleteProfileImage(customer)
  }
  
  /**
   * @name onFocusInput
   * @description onFocusInput function set native props to pass as param elemnts 
   * @param {*} elementSlected 
   */
  onFocusInput(elementSlected){
    elementSlected.setNativeProps({
      style: { borderColor: theme.colors.secondry }
    })
  }

  /**
   * @name onBlurInput
   * @description onBlurInput function set native props to pass as param elemnts 
   * @param {*} elementSlected 
   */

  onBlurInput(elementSlected){
    elementSlected.setNativeProps({
      style: { borderColor: theme.colors.lightBorder }
    })
  }
  
  /* ===================================================== */
  /* ================== END COMMON FUNCTIONS ============ */
  /* ===================================================== */

  /* ===================================================== */
  /* ==================== START UI VIEW ================== */
  /* ===================================================== */

  renderHeader(){
    return(
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={()=>NavigationService.goBack()} style={theme.typography.backbtmcontainer}>
          <Image style={styles.backscreen} resizeMode={'stretch'} source={require('../../assets/images/back-white.png')}></Image>
          <Text style={theme.typography.myDashBoard}>Edit Your Profile</Text>
        </TouchableOpacity>
      </View>
    )
  }

  isUserNameChanged(){
    const {changeProfileName,customer} = this.props
    const {default_full_name,full_name} = this.state
    if(default_full_name !=full_name){
      changeProfileName(customer,full_name);

    }
  }

  isEmailAddressChanged(){
    const {changeEmailAddress,customer} = this.props
    const {default_acEmail,acEmail} = this.state
    if(default_acEmail !=acEmail && acEmail !=""){
      changeEmailAddress(customer,acEmail);
    }
  }

  
  isMobileNumberChanged(){
    const {changeMobileNumber,customer} = this.props
    const {default_mobileNumber,mobileNumber,mobile_country_code} = this.state
    if(default_mobileNumber !=mobileNumber && mobileNumber !=""){
      const formdata = {mobile_country_code,mobile:mobileNumber}
      changeMobileNumber(customer,formdata);
    }
  }

  
  isMpinChanged(code){
    const {changeMobilePin,customer} = this.props
    const {appPin} = this.state
    if(appPin !=code && code !=""){
      changeMobilePin(customer,code);
    }
  }

  mpinVerify(){
    const {mobile_otp} = this.state
    const {mpinChangeVerify,updating} = this.props
    if(!mobile_otp){
      this.setState({errorValue:"Please Enter Valid OTP"});
      return false;
    }
    this.setState({appPin:""})
    mpinChangeVerify(updating,mobile_otp);
    this.setState({mpinPopup:false,errorValue:null})
    this.setState({mobile_otp:null})
  }

  emailAddressVerify(){
    const {mobile_otp,verifyMpin} = this.state
    const {emailAdressChangeVerify,updating,customer} = this.props
    if(!mobile_otp || !verifyMpin){
      this.setState({errorValue:"Please Enter Valid OTP & MPIN"});
      return false;
    }
    const formdata = {mobile_otp,mpin:verifyMpin}
    
    emailAdressChangeVerify(customer,updating,formdata);
    this.setState({emailPopup:false,errorValue:null,mobile_otp:null,verifyMpin:null})
  }

  mobileNumberVerify(){
    const {mobile_otp,email_otp,verifyMpin} = this.state
    const {mobileNumberChangeVerify,updating,customer} = this.props
    if(!mobile_otp || !verifyMpin || !email_otp){
      this.setState({errorValue:"Please Enter Valid OTP & MPIN"});
      return false;
    }
    const formdata = {mobile_otp,email_otp,mpin:verifyMpin}    
    mobileNumberChangeVerify(customer,updating,formdata);
    this.setState({mobilePopup:false,errorValue:null,mobile_otp:null,email_otp:null,verifyMpin:null})
  }
  renderFastImage(customer){
    if(customer.profile_pic && customer.profile_pic !=""){
      return {uri:`${EzyRent.getMediaUrl()}${customer.profile_pic}`}
    }
    return require("../../assets/images/default.jpg");
  }
  renderPopupMpinChange(){
    const {mpinPopup,mobile_otp,errorValue} = this.state
    if(!mpinPopup){
      return null;
    }
    return(
      <Modal isVisible={this.state.mpinPopup} style={styles.pop_wrap}>
        <View style={styles.popupContainer(theme)}>
          <Text style={styles.columntitlePop1(theme)}>CONFIRM YOUR MOBILE OTP</Text>
          {errorValue && <Text style={{color:'red'}}>{errorValue}</Text>}
          <View style={styles.fieldWrapp}>
              <OTPInputView
                pinCount={4}
                autoFocusOnLoad={false}
                style={styles.pininputBoxPop(theme)}
                codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                onCodeFilled = {(code => {this.setState({mobile_otp:code})})}
                codeInputFieldStyle={styles.underlineStyleBase(theme)}
              />
          </View>
          <View style={styles.popupBtms}>
            <TouchableOpacity onPress={()=>this.setState({mpinPopup:false,appPin:""})}>
                <Text style={styles.cancel}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.mpinVerify()}>
                <Text style={{color:'#315add'}}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderPopupEmailPopupChange(){
    const {emailPopup,secureTextEntry,verifyMpin,errorValue} = this.state
    if(!emailPopup && verifyMpin){ 
      return null;
    }
    return(
      <Modal isVisible={this.state.emailPopup} style={styles.pop_wrap}>
        <View style={styles.popupContainer(theme)}>
          <Text style={styles.columntitlePop1(theme)}>CONFIRM YOUR MPIN</Text>
          {errorValue && <Text style={{color:'red'}}>{errorValue}</Text>}
          <View style={styles.fieldWrapp}>
             <View style={styles.pincontainer(theme)}>
                <OTPInputView
                  pinCount={4}
                  autoFocusOnLoad={false}
                  style={styles.pininputBoxPop(theme)}
                  secureTextEntry={secureTextEntry}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                  onCodeFilled = {(code => {this.setState({verifyMpin:code})})}
                  codeInputFieldStyle={styles.underlineStyleBase(theme)}
                />
                <TouchableOpacity style={styles.visibilityIconWrapp} onPress={()=>{this.setState({secureTextEntry:!secureTextEntry})}}>
                  <Image style={styles.visibilityIcon} source={secureTextEntry?require(secureTextHidden):require(secureTextShow)}/>
                </TouchableOpacity>
              </View>
          </View>
          <Text style={styles.columntitlePop1(theme),{marginTop:30,}}>CONFIRM YOUR MOBILE OTP</Text>
          <View style={styles.fieldWrapp}>
              <OTPInputView
                pinCount={4}
                autoFocusOnLoad={false}
                style={styles.pininputBoxPop(theme)}
                codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                onCodeFilled = {(code => {this.setState({mobile_otp:code})})}
                codeInputFieldStyle={styles.underlineStyleBase(theme)}
              />
          </View>
          <View style={styles.popupBtms}>
            <TouchableOpacity onPress={()=>this.setState({emailPopup:false})}>
                <Text style={styles.cancel}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.emailAddressVerify()}>
                <Text style={{color:'#315add'}}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  renderPopupMobilePopupChange(){
    const {mobilePopup,secureTextEntry,errorValue} = this.state
    if(!mobilePopup){
      return null;
    }
    return(
      <Modal isVisible={this.state.mobilePopup} style={styles.pop_wrap}>
        <View style={styles.popupContainer(theme)}>
          <Text style={styles.columntitlePop1(theme)}>CONFIRM YOUR MPIN</Text>
          {errorValue && <Text style={{color:'red'}}>{errorValue}</Text>}
          <View style={styles.fieldWrapp}>
             <View style={styles.pincontainer(theme)}>
                <OTPInputView
                  pinCount={4}
                  autoFocusOnLoad={false}
                  style={styles.pininputBoxPop(theme)}
                  secureTextEntry={secureTextEntry}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                  onCodeFilled = {(code => {this.setState({verifyMpin:code})})}
                  codeInputFieldStyle={styles.underlineStyleBase(theme)}
                />
                <TouchableOpacity style={styles.visibilityIconWrapp} onPress={()=>{this.setState({secureTextEntry:!secureTextEntry})}}>
                  <Image style={styles.visibilityIcon} source={secureTextEntry?require(secureTextHidden):require(secureTextShow)}/>
                </TouchableOpacity>
              </View>
          </View>
          <Text style={styles.columntitlePop1(theme),{marginTop:30,}}>CONFIRM YOUR MOBILE OTP</Text>
          <View style={styles.fieldWrapp}>
              <OTPInputView
                pinCount={4}
                autoFocusOnLoad={false}
                style={styles.pininputBoxPop(theme)}
                codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                onCodeFilled = {(code => {this.setState({mobile_otp:code})})}
                codeInputFieldStyle={styles.underlineStyleBase(theme)}
              />
          </View>
          <Text style={styles.columntitlePop1(theme),{marginTop:30,}}>CONFIRM YOUR EMAIL OTP</Text>
          <View style={styles.fieldWrapp}>
              <OTPInputView
                pinCount={4}
                autoFocusOnLoad={false}
                style={styles.pininputBoxPop(theme)}
                codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                onCodeFilled = {(code => {this.setState({email_otp:code})})}
                codeInputFieldStyle={styles.underlineStyleBase(theme)}
              />
          </View>
          <View style={styles.popupBtms}>
            <TouchableOpacity onPress={()=>this.setState({mobilePopup:false})}>
                <Text style={styles.cancel}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.mobileNumberVerify()}>
                <Text style={{color:'#315add'}}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
  
  render(){
    const {full_name,secureTextEntry,appPin,mobileNumber,acEmail,profileloader} = this.state
    const {customer,loading} = this.props
    const theme = this.context;    
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} 
        source={require('../../assets/images/dashboard_bg.png')}
        >
          <SafeAreaView style={styles.container}>
            {this.renderHeader()}
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <View style={styles.rectWrapp}>
                  <View style={theme.typography.rectView}>
                     <Text style={styles.columntitle(theme)}>EDIT YOUR PROFILE</Text>
                    <ImageBackground style={[styles.profilebg,{position:'relative'}]} imageStyle={styles.profilePik} resizeMode={'cover'} 
                    //source={require('../../assets/images/sample/james.png')}
                    onLoadEnd={()=>this.setState({profileloader:false})}
                    onLoadStart={(e) => this.setState({profileloader:true})}
                    //source={{uri:`${EzyRent.getMediaUrl()}${customer.profile_pic}`}}
                    source={this.renderFastImage(customer)}
                    >
                        <ActivityIndicator animating={profileloader} size={"large"} color={theme.colors.secondry} style={{position:'absolute',top:"35%"}}/>
                          <TouchableOpacity disabled={profileloader} onPress={()=>this.pickupImage()} style={styles.profileEdit}>
                            <Image style={styles.editIcon}
                            source={require('../../assets/images/edit-transparent.png')}></Image>
                          </TouchableOpacity>
                          <TouchableOpacity  disabled={profileloader} onPress={()=>this.removeProfileImage()} style={styles.profileRemove}>
                            <Image style={styles.removeIcon}
                            source={require('../../assets/images/delete-transparent.png')}></Image>
                          </TouchableOpacity>
                    </ImageBackground>
                    <View style={styles.formcolumn}>

                          <View style={styles.fieldWrapp}>
                             <Text style={theme.typography.tooltip}>Your Full Name *</Text>
                              <TextInput onFocus={()=>this.onFocusInput(this._fullNameEntry)} onBlur={()=>{this.onBlurInput(this._fullNameEntry),this.isUserNameChanged()}} ref={(ref) => this._fullNameEntry = ref} onChangeText={(full_name) =>{this.setState({full_name})}} autoCorrect={false} style={styles.textInputStyleSec(theme)} value={full_name} placeholder={'Name Of Tenant'}/>
                          </View>

                          <View style={styles.fieldWrapp}>

                              <View style={styles.pinwrapper(theme)}>
                                <Text style={theme.typography.tooltip}>Reset App Pin</Text>
                                <Text style={styles.dscribe(theme)}>Leave blank to keep the current PIN. OTP Validation required to change App PIN.</Text>
                                <View style={styles.pincontainer(theme)}>
                                  <OTPInputView
                                    pinCount={4}
                                    autoFocusOnLoad={false}
                                    style={styles.pininputBox(theme)}
                                    secureTextEntry={secureTextEntry}
                                    code={appPin}
                                    onCodeChanged={(code)=>this.setState({appPin:code})}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                                    onCodeFilled = {(code => {this.isMpinChanged(code)})}
                                    codeInputFieldStyle={styles.underlineStyleBase(theme)}
                                  />
                                  <TouchableOpacity style={styles.visibilityIconWrapp} onPress={()=>{this.setState({secureTextEntry:!secureTextEntry})}}>
                                    <Image style={styles.visibilityIcon} source={secureTextEntry?require(secureTextHidden):require(secureTextShow)}/>
                                  </TouchableOpacity>
                                </View>
                              </View>
                          </View>

                          <View style={styles.fieldWrapp} ref={(ref) => this._mobileNumberEntry = ref} >
                             <Text style={theme.typography.tooltip}>Your Mobile Number *</Text>
                             <Text style={styles.dscribe(theme)}>App Pin & OTP Email validation is required for changing the Mobile Number.</Text>
                             <View style={styles.twocolumn}>
                               <View style={styles.fielcountrylabel(theme)}>
                                  <Text style={styles.fieltext(theme)}>+91 (IND)</Text>
                               </View>
                               <RightIconTextbox onBlur={()=>{this.isMobileNumberChanged()}} keyboardType={'number-pad'} InputStyle={{paddingBottom:2,paddingTop:2}} style={styles.contactbook(theme)} placeholder={"Mobile Number"} textValue={mobileNumber} onChangeText={(mobileNumber)=>this.setState({mobileNumber})} />
                             </View>
                          </View>

                          <View style={[styles.fieldWrapp,styles.fieldWrappLast]}>
                             <Text style={theme.typography.tooltip}>Your Email Address *</Text>
                             <Text style={styles.dscribe(theme)}>App Pin & OTP SMS Validation is required for changing the Email Address.</Text>
                              <TextInput onFocus={()=>this.onFocusInput(this._tenantEmailEntry)} onBlur={()=>{this.onBlurInput(this._tenantEmailEntry),this.isEmailAddressChanged()}} ref={(ref) => this._tenantEmailEntry = ref} onChangeText={(acEmail) =>{this.setState({acEmail})}} autoCorrect={false} autoCapitalize={'none'} style={styles.textInputStyleSec(theme)} value={acEmail} placeholder={'Your Email Address'}/>
                          </View>

                    </View>
                  </View>
                </View>
                {this.renderPopupMpinChange()}
                {this.renderPopupEmailPopupChange()}
                {this.renderPopupMobilePopupChange()}
              </ScrollView>
              {loading && <Spinner style={theme.typography.spinnerStyle}/>}
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


  /* ===================================================== */
  /* ==================== END UI VIEW ================== */
  /* ===================================================== */

}
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

const mapStateToProps = ({ account }) => {
  const { error, success, loading,status,customer,updating } = account;

  return { error, success, loading, status, customer,updating };
};

EditMyProfile.propTypes = {
  updateUserProfle: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
  updating:PropTypes.object,
  changeProfileName: PropTypes.func,
  changeEmailAddress: PropTypes.func,
  changeMobileNumber: PropTypes.func,
  changeMobilePin: PropTypes.func,
  mpinChangeVerify: PropTypes.func,
  emailAdressChangeVerify: PropTypes.func,
  mobileNumberChangeVerify: PropTypes.func,
  deleteProfileImage: PropTypes.func,
};

EditMyProfile.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
  updating:{},
};

export default connect(mapStateToProps, {updateUserProfle,changeProfileName,changeEmailAddress,changeMobileNumber,changeMobilePin,mpinChangeVerify,emailAdressChangeVerify,mobileNumberChangeVerify,deleteProfileImage})(EditMyProfile);
