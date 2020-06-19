import React, { Component,useContext ,useState,useEffect} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity,KeyboardAvoidingView,StatusBar,Platform,BackHandler,Alert } from "react-native";
import styles from './style';
import { ThemeContext, theme } from '../../../../theme';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { resendMobileOtp,signupMobileOtp,getCountryCodeFormat } from '../../../../actions';
import {NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH,NAVIGATION_SIGN_UP_MAIL_ID_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import { DropDownHolder,Spinner } from '../../../../components';

class SignUpMobileVerify extends Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      enablebtn:false,
      resendEnable:true,
      resendtimeout:0,
      inputOtp:"",
    }
    this.keyboardBehavior = null;
  }
  // ===============  ============== ===============
  // =========== BACK BUTTON ACTION  START =========
  // ===============  ============== ===============
    componentDidMount() {
      this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.disableBackButtonPressed);
    }
    disableBackButtonPressed() {
        return true;
    }
    goToChangeMobile() {
      this.backHandler.remove();
      NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH)
    }
  // ===============  ============== ===============
  // =========== BACK BUTTON ACTION  END =========
  // ===============  ============== ===============

    onCodeFilled(code){
      this.setState({
        enablebtn:true,
        inputOtp:code,
      })
    }
    resendSubmit(){
      const {resendMobileOtp} = this.props
      const {mobile} = this.props
      this.setState({
        resendtimeout:120,
        resendEnable:false,
        enablebtn:false,
      });
      resendMobileOtp(mobile,'SU');
    }

    submitOtp(){
      const {signupMobileOtp,mobile} = this.props;
      const { inputOtp} = this.state
      signupMobileOtp(mobile,inputOtp);
    }
    onFinishCountDown(){
      setResendTimeOut(120),
      this.setState({resendEnable:true})
    }
    render(){
      const theme = this.context;
      const {resendEnable,enablebtn,resendtimeout} = this.state
      const {mobile,loading} = this.props
      return (
        <SafeAreaView style={styles.container(theme)}>
          <KeyboardAvoidingView behavior={this.keyboardBehavior} >
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
                  onCodeFilled = {(code => {this.onCodeFilled(code)})}
                  codeInputFieldStyle={styles.underlineStyleBase(theme)}
                />

                <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled} onPress={()=>this.submitOtp()}>
                  {!loading && <Text style={theme.typography.caption}>VALIDATE</Text>}
                  {loading && <Spinner color={"white"}/>}
                </TouchableOpacity>

                <View style={styles.signIn(theme)}> 
                  <Text style={styles.cnfrmSignText(theme)}>Haven`t received OTP?</Text>
                  {!resendEnable && <Text style={styles.signLink(theme)}>Resend in </Text>}
                  {resendEnable ?
                    <TouchableOpacity onPress={()=>this.resendSubmit()}>
                      <Text style={styles.signLink(theme)}>Resend</Text>
                    </TouchableOpacity>
                    :
                    <CountDown
                      size={12}
                      until={resendtimeout}
                      digitStyle={{backgroundColor: 'transprint',padding:0,height:20,width:25,marginLeft:-3}}
                      digitTxtStyle={styles.signLink(theme)}
                      onFinish={() => {this.onFinishCountDown()}}
                      timeToShow={['M', 'S']}
                      timeLabels={{m: null, s: null}}
                      separatorStyle={{color:theme.colors.secondry}}
                      showSeparator
                    />

                  }
                </View>

                <TouchableOpacity style={styles.changeMobile(theme)} onPress={()=>{this.goToChangeMobile()}}>
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
