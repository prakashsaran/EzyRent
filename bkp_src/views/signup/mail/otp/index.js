import React, { Component,useContext ,useState} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { resendMailOtp,signupMailOtp } from '../../../../actions';
import {NAVIGATION_SIGN_UP_MAIL_ID_PATH,NAVIGATION_SIGN_UP_PROFILE_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import { DropDownHolder,Spinner } from '../../../../components';

function SignUpMailVerify(props) {
  const {mobile,mail} = props;
  const [enablebtn, setEnableButton] = useState(false);
  const [resendEnable, setResendEnable] = useState(true);
  const [resendtimeout, setResendTimeOut] = useState(0);
  const [inputOtp, setInputOtp] = useState(null);
  
  const theme = useContext(ThemeContext);
    const onCodeFilled = (code) =>{
      setEnableButton(true);
      setInputOtp(code);
    }
    const resendSubmit = (code) =>{
      setEnableButton(false);
      setResendEnable(false);
      setResendTimeOut(120);
      props.resendMailOtp(mobile,mail.email);
  
    }
  
    const submitOtp = () =>{
      props.signupMailOtp(mobile,mail,inputOtp);
    }
  
  return (
    <SafeAreaView style={styles.container(theme)}>
      <ScrollView>

        <Image
          source={require("../../../../assets/images/ezyrent_logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>

        <Text style={theme.typography.stepTitle}>Create Your Account</Text>

        <Text style={theme.typography.signstep}>STEP 4 OF 5</Text>
        <Text style={styles.propvalue(theme)}>Validate Your Email Address</Text>
        <Text style={[styles.stepmessage(theme),{marginTop:5}]}>We have sent an OTP to your email <Text style={theme.typography.stepmessage}>{mail.email}</Text></Text>
        <Text style={[styles.stepmessage(theme),{marginTop:5}]}>Please enter the OTP below</Text>

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
              digitStyle={{backgroundColor: 'transprint',padding:0,height:20,width:24,marginLeft:-4}}
              digitTxtStyle={styles.signLink(theme)}
              onFinish={() => {setResendTimeOut(120),setResendEnable(true)}}
              separatorStyle={{color:theme.colors.secondry}}
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
              showSeparator
            />

          }
        </View>

        <TouchableOpacity style={styles.changeMobile(theme)} onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_UP_MAIL_ID_PATH)}}>
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

const mapStateToProps = ({ signup }) => {
  const { error, success, loading,mail,mobile } = signup;
  return { error, success, loading,mail,mobile };
};

SignUpMailVerify.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  resendMailOtp: PropTypes.func.isRequired,
  signupMailOtp: PropTypes.func.isRequired,
};

SignUpMailVerify.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { resendMailOtp,signupMailOtp })(SignUpMailVerify);
