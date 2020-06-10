import React, { Component,useContext ,useState} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { resendMailOtp,signIn } from '../../../../actions';
import {NAVIGATION_SIGN_UP_MAIL_ID_PATH,NAVIGATION_SIGN_IN_MAIL_ID_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import { DropDownHolder } from '../../../../components';
import DeviceInfo from 'react-native-device-info';

function SignUpMobile(props) {
  const device_token = DeviceInfo.getUniqueId();
  const device_type = DeviceInfo.getDeviceId();
    
  const {email,otp} = props.mail;
  const [enablebtn, setEnableButton] = useState(false);
  const [resendEnable, setResendEnable] = useState(false);
  const [resendtimeout, setResendTimeOut] = useState(0);
  const [inputOtp, setInputOtp] = useState(null);
  
  const theme = useContext(ThemeContext);
    const onCodeFilled = (code) =>{
      setEnableButton(true);
      setInputOtp(code);
    }
    const resendSubmit = () =>{
      const {mail} = props
      console.log("mail  --",mail)
      setEnableButton(false);
      setResendEnable(false);
      setResendTimeOut(20);
      props.resendMailOtp(mail,email);
    }
  
    const submitOtp = () =>{
      const {mail} = props
      const userdata = {id:mail.id,otp:inputOtp,device_token,device_type};
      props.signIn(userdata);
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

        <View style={styles.preprops(theme)}>
          <Text style={styles.proplabel(theme)}>We have sent an email to </Text>
          <Text style={styles.propvalue(theme)}>{email}</Text>
        </View>
        <Text style={theme.typography.stepmessage}>Validate your email id by entering the OTP below.</Text>

        <OTPInputView
          pinCount={4}
          style={styles.mobileWrapper(theme)}
          codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
          autoFocusOnLoad
          onCodeFilled = {(code => {onCodeFilled(code)})}
          codeInputFieldStyle={styles.underlineStyleBase(theme)}
        />

        <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled} onPress={()=>submitOtp()}>
          <Text style={theme.typography.caption}>VALIDATE</Text>
        </TouchableOpacity>

        <View style={styles.signIn(theme)}>
          <Text style={styles.cnfrmSignText(theme)}>Haven`t received OTP?</Text>
          {!resendEnable && <Text style={styles.signLink(theme)}>Resend in</Text>}
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

        <TouchableOpacity style={styles.changeMobile(theme)} onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_IN_MAIL_ID_PATH)}}>
          <Text style={styles.changeMobileText(theme)}>Change email id</Text>
        </TouchableOpacity>

        <Text style={theme.typography.copyright}>Copyright &copy; EzyRent 2020. All Rights Reserved.</Text>

      </ScrollView>

        <Image
          source={require("../../../../assets/images/ezyrent-footer-icon.png")}
          resizeMode={'cover'}
          style={styles.footerImage}
        ></Image>

    </SafeAreaView>
  );
}

const mapStateToProps = ({ signin }) => {
  const { error, success, loading,mail } = signin;

  return { error, success, loading,mail };
};

SignUpMobile.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  resendMailOtp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

SignUpMobile.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { resendMailOtp,signIn })(SignUpMobile);