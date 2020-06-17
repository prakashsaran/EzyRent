import React, { Component,useContext ,useState,useEffect} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import PhoneInput from 'react-native-phone-input'
import {NAVIGATION_SIGN_UP_MOBILE_OTP_PATH,
  NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH,
  NAVIGATION_SIGN_IN_MAIL_ID_PATH,
  NAVIGATION_SIGN_UP_MAIL_ID_PATH,
  NAVIGATION_SIGN_UP_PROFILE_PATH,
} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinMobile,isValidMobile,resetSingWarn } from '../../../../actions';
import { RightIconTextbox } from '../../../../components';
import Modal from 'react-native-modal';
function SignInMobile(props) {
  const [dialcode, setDialCode] = useState('0091');
  const [mobilenumber, setMobileNumber] = useState('');
  const [enablebtn, setEnableButton] = useState(false);
  const [isconfirmModalVisible, setConfirmModalVisible] = useState(false);

const theme = useContext(ThemeContext);
const onChangePhoneNumber = (number) =>{
  setMobileNumber(number);
  setEnableButton(isValidMobile(number));
}
  const onSelectCountry = () =>{
    setEnableButton(phone.isValidNumber());
    setDialCode(phone.getDialCode());
  }
  const submit = () =>{
    props.signinMobile(mobilenumber,dialcode);
  }
  useEffect(() => {
    if(Object.keys(props.warndata).length){
      if(props.warndata.hasOwnProperty("type") && props.warndata.popuptype=="mobile"){
        setConfirmModalVisible(true);
      }
    }
  }, [props.warndata]);

  reStartSignUp = () =>{
    setConfirmModalVisible(false);
    if(props.warndata.type=="N"){
      NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH,{mobilenumber})
    } else if(props.warndata.type=="M"){
      NavigationService.navigate(NAVIGATION_SIGN_UP_MAIL_ID_PATH); 
    } else if(props.warndata.type=='E'){
      NavigationService.navigate(NAVIGATION_SIGN_UP_PROFILE_PATH);  
    }
    props.resetSingWarn();
  }
  renderConfirmModal =() =>{
    return (
      <Modal onBackdropPress={()=>{setConfirmModalVisible(false)}} isVisible={isconfirmModalVisible}>
            <View style={{ width:'95%',height:100,backgroundColor:'#fff',borderRadius:5,alignSelf:'center' }}>
              <Text style={styles.confirmBoxTitle(theme)}>Your Account Setup is pending. Do you wish to complete?</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:"90%",paddingTop:10,alignSelf:'center',paddingHorizontal:20}}>
                  <TouchableOpacity onPress={()=>setConfirmModalVisible(false)}>
                    <Text style={styles.eraseTitle(theme)}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>reStartSignUp()}>
                    <Text>Ok</Text>
                  </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
  }
  return (
    <SafeAreaView style={styles.container(theme)}>
      <ScrollView>

        <Image
          source={require("../../../../assets/images/ezyrent_logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>

        <Text style={theme.typography.stepTitle}>Sign In to Your Account</Text>

        <Text style={theme.typography.stepmessage}>Please Enter Your Mobile Number</Text>

        <Text style={theme.typography.mobelTitle2}>MOBILE</Text>

        <View style={styles.twocolumn}>
            <View style={styles.fielcountrylabel(theme)}>
              <Text style={styles.fieltext(theme)}>+91 (IND)</Text>
            </View>
          <RightIconTextbox keyboardType={'number-pad'} style={styles.contactbook(theme)} placeholder={"Mobile Number"} textValue={mobilenumber} onChangeText={(mobilenumber)=>onChangePhoneNumber(mobilenumber)} />
        </View>

        <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled}  onPress={()=>{submit()}}>
          <Text style={theme.typography.caption}>PROCEED</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signIn(theme)}  onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH)}} >
          <Text style={styles.cnfrmSignText(theme)}>Don't have an account?</Text>
          <Text style={styles.signLink(theme)}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changesigninmethod(theme)} onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_IN_MAIL_ID_PATH)}}>
          <Text style={styles.changeMethodText(theme)}>Sign In with email id</Text>
        </TouchableOpacity>

        <Text style={theme.typography.copyright}>Copyright &copy; EzyRent 2020. All Rights Reserved.</Text>

      </ScrollView>

        <Image
          source={require("../../../../assets/images/ezyrent-footer-icon.png")}
          resizeMode={'cover'}
          style={styles.footerImage}
        ></Image>
        {renderConfirmModal()}
    </SafeAreaView>
  );
}

const mapStateToProps = ({ signin }) => {
  const {warndata, error, success, loading } = signin;

  return { warndata,error, success, loading };
};

SignInMobile.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signinMobile: PropTypes.func.isRequired,
  resetSingWarn: PropTypes.func,
  warndata: PropTypes.object,
};

SignInMobile.defaultProps = {
  error: null,
  success: null,
  loading: false,
  warndata:{},
};

export default connect(mapStateToProps, { signinMobile,resetSingWarn })(SignInMobile);
