import React, { Component,useContext ,useState} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../theme';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { bankVerify,resendMobileOtp } from '../../../actions';
import {NAVIGATION_SIGN_UP_MAIL_ID_PATH,NAVIGATION_SIGN_UP_PROFILE_PATH} from '../../../navigation/routes';
import NavigationService from '../../../navigation/NavigationService';
import { DropDownHolder } from '../../../components';
const secureTextHidden = '../../../assets/images/securetext_hidden.png';
const secureTextShow = '../../../assets/images/securetext_show.png';

function BankVerification(props) {
  const [enablebtn, setEnableButton] = useState(false);
  const [inputOtp, setInputOtp] = useState(null);
  const [appPin, setAppPin] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [resendEnable, setResendEnable] = useState(false);
  const [resendtimeout, setResendTimeOut] = useState(0);
  const {currentAccount} = props

  const theme = useContext(ThemeContext);
    const onOtpFilled = (code) =>{
    if(appPin){
        setEnableButton(true);
    }
    setInputOtp(code);
  }
      const onAppPinFilled = (code) =>{
        if(inputOtp){
            setEnableButton(true);
        }
          setAppPin(code);
    }
    const resendSubmit = (code) =>{
        setEnableButton(false);
        setResendEnable(false);
        setResendTimeOut(10);
        props.resendMobileOtp(props.customer,currentAccount.type);
      }
    
    
    const submitVerification = () =>{
        const formdat = {mpin:appPin,mobile_otp:inputOtp,mode:currentAccount.mode}
      props.bankVerify(currentAccount,formdat);
    }
  
  return (
    <SafeAreaView style={styles.container(theme)}>
      <ScrollView>
      <Image
          source={require("../../../assets/images/ezyrent_logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>

        <Text style={theme.typography.stepTitle}>Verify Bank Account</Text>
        <View style={styles.rectWrapp}>
            <View style={styles.formcolumn}>
                <View style={styles.pinwrapper(theme)}>
                    <Text style={theme.typography.tooltip}>App Pin</Text>
                    <View style={styles.pincontainer(theme)}>
                        <OTPInputView
                          pinCount={4}
                          autoFocusOnLoad={false}
                          style={styles.pininputBox(theme)}
                          secureTextEntry={secureTextEntry}
                          codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                          onCodeFilled = {(code => {onAppPinFilled(code)})}
                          codeInputFieldStyle={styles.underlineStyleBase(theme)}
                          />
                        <TouchableOpacity style={styles.visibilityIconWrapp} onPress={()=>{setSecureTextEntry(!secureTextEntry)}}>
                          <Image style={styles.visibilityIcon} source={secureTextEntry?require(secureTextHidden):require(secureTextShow)}/>
                          </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{width:'100%',height:30}}></View>
            <View style={styles.formcolumn}>
                <View style={styles.pinwrapper(theme)}>
                    <Text style={theme.typography.tooltip}>OTP</Text>
                    <View style={styles.pincontainer(theme)}>
                        <OTPInputView
                        pinCount={4}
                        autoFocusOnLoad={false}
                        style={styles.pininputBox(theme)}
                        secureTextEntry={false}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                        onCodeFilled = {(code => {onOtpFilled(code)})}
                        codeInputFieldStyle={styles.underlineStyleBase(theme)}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled} onPress={()=>submitVerification()}>
                <Text style={theme.typography.caption}>VALIDATE</Text>
            </TouchableOpacity>

            <View style={styles.verifyBank(theme)}>
              <Text style={styles.cnfrmVerifyText(theme)}>Haven`t received OTP?</Text>
              {!resendEnable && <Text style={styles.verifyLink(theme)}>Resend in </Text>}
              {resendEnable ?
                <TouchableOpacity onPress={()=>resendSubmit()}>
                  <Text style={styles.verifyLink(theme)}>Resend</Text>
                </TouchableOpacity>
                :
                <CountDown
                  size={12}
                  until={resendtimeout}
                  digitStyle={{backgroundColor: 'transprint',padding:0,height:20,width:25,marginLeft:-3}}
                  digitTxtStyle={styles.verifyLink(theme)}
                  onFinish={() => {setResendTimeOut(120),setResendEnable(true)}}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: null, s: null}}
                  separatorStyle={{color:theme.colors.secondry}}
                  showSeparator
                />

              }
            </View>
        </View>


      </ScrollView>

       
    </SafeAreaView>
  );
}

const mapStateToProps = ({ bankAccount,account }) => {
  const { error, success, loading,currentAccount } = bankAccount;
  const {customer} = account;
  return { error, success, loading,currentAccount,customer };
};

BankVerification.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  customer: PropTypes.object,
  currentAccount: PropTypes.object,
  bankVerify: PropTypes.func.isRequired,
  resendMobileOtp: PropTypes.func.isRequired,
};

BankVerification.defaultProps = {
  error: null,
  success: null,
  loading: false,
  customer:{},
  currentAccount:{}
};

export default connect(mapStateToProps, { bankVerify,resendMobileOtp })(BankVerification);
