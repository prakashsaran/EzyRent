import React, { Component,useContext ,useState,useEffect} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity,KeyboardAvoidingView,StatusBar,Platform,BackHandler,Alert } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { resendMobileOtp,signupMobileOtp,getCountryCodeFormat } from '../../../../actions';
import {NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH,NAVIGATION_SIGN_UP_MAIL_ID_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import { DropDownHolder,Spinner } from '../../../../components';

function SignUpMobileVerify(props) {
  const {mobile} = props;
  const [enablebtn, setEnableButton] = useState(false);
  const [resendEnable, setResendEnable] = useState(true);
  const [resendtimeout, setResendTimeOut] = useState(0);
  const [inputOtp, setInputOtp] = useState(null);
  let keyboardBehavior = null;
  let backHandlerDisable = null;

const theme = useContext(ThemeContext);
  const onCodeFilled = (code) =>{
    setEnableButton(true);
    setInputOtp(code);
  }
  const resendSubmit = (code) =>{
    setEnableButton(false);
    setResendEnable(false);
    setResendTimeOut(120);
    props.resendMobileOtp(mobile,'SU');
  }

  const submitOtp = () =>{
    props.signupMobileOtp(mobile,inputOtp);
  }
  const goToNumberChange = () =>{
    enableBackButtonPressed();
    NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH)
  }

  const enableBackButtonPressed = () =>{
    BackHandler.removeEventListener('hardwareBackPress', () => true)
  }
  useEffect(() => {
    // ComponentDidMount
    StatusBar.setHidden(true)
    if (Platform.OS == 'android') {
        keyboardBehavior = 'height'
    }
    console.log("addEventListener ok")
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);
  
  return (
    <SafeAreaView style={styles.container(theme)}>
      <KeyboardAvoidingView behavior={keyboardBehavior} >
          <ScrollView>

            <Image
              source={require("../../../../assets/images/ezyrent_logo.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>

            <Text style={theme.typography.stepTitle}>Create Your Account</Text>

            <Text style={theme.typography.signstep}>STEP 2 OF 5</Text>
            <View style={styles.preprops(theme)}>
              <Text style={styles.propvalue(theme)}>Validate Your Mobile Number </Text>
              <Text style={theme.typography.stepmessage}>We have sent an OTP to <Text style={styles.propvalue(theme)}>{getCountryCodeFormat(mobile.dialcode)} - {mobile.number}</Text></Text>
            </View>
            <Text style={theme.typography.stepmessage}>Please enter the OTP below</Text>

            <OTPInputView
              pinCount={4}
              style={styles.mobileWrapper(theme)}
              codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
              autoFocusOnLoad
              onCodeFilled = {(code => {onCodeFilled(code)})}
              codeInputFieldStyle={styles.underlineStyleBase(theme)}
            />

            <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled} onPress={()=>submitOtp()}>
              {!props.loading && <Text style={theme.typography.caption}>VALIDATE</Text>}
              {props.loading && <Spinner color={"white"}/>}
            </TouchableOpacity>

            <View style={styles.signIn(theme)}> 
              <Text style={styles.cnfrmSignText(theme)}>Haven`t received OTP?</Text>
              {!resendEnable && <Text style={styles.signLink(theme)}>Resend in </Text>}
              {resendEnable ?
                <TouchableOpacity onPress={()=>resendSubmit()}>
                  <Text style={styles.signLink(theme)}>Resend</Text>
                </TouchableOpacity>
                :
                <CountDown
                  size={12}
                  until={resendtimeout}
                  digitStyle={{backgroundColor: 'transprint',padding:0,height:20,width:25,marginLeft:-3}}
                  digitTxtStyle={styles.signLink(theme)}
                  onFinish={() => {setResendTimeOut(120),setResendEnable(true)}}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: null, s: null}}
                  separatorStyle={{color:theme.colors.secondry}}
                  showSeparator
                />

              }
            </View>

            <TouchableOpacity style={styles.changeMobile(theme)} onPress={()=>{goToNumberChange()}}>
              <Text style={styles.changeMobileText(theme)}>Change mobile number</Text>
            </TouchableOpacity>

            <Text style={theme.typography.copyright}>Copyright &copy; EzyRent 2020. All Rights Reserved.</Text>

          </ScrollView>
        </KeyboardAvoidingView>
        <Image
          source={require("../../../../assets/images/ezyrent-footer-icon.png")}
          resizeMode={'cover'}
          style={styles.footerImage}
        ></Image>

    </SafeAreaView>
  );
}

const mapStateToProps = ({ signup }) => {
  const { error, success, loading,mobile } = signup;

  return { error, success, loading,mobile };
};

SignUpMobileVerify.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  resendMobileOtp: PropTypes.func.isRequired,
  signupMobileOtp: PropTypes.func.isRequired,
};

SignUpMobileVerify.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { resendMobileOtp,signupMobileOtp })(SignUpMobileVerify);
