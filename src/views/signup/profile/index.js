import React, { Component,useContext ,useState,useEffect} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity,TextInput,KeyboardAvoidingView,Platform,StatusBar,Linking,BackHandler  } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../theme';
import {NAVIGATION_SIGN_UP_MOBILE_OTP_PATH} from '../../../navigation/routes';
import NavigationService from '../../../navigation/NavigationService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CheckBox } from 'react-native-elements'
import { signUp,isValidName } from '../../../actions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import DeviceInfo from 'react-native-device-info';
import {Spinner} from '../../../components';
const secureTextHidden = '../../../assets/images/securetext_hidden.png';
const secureTextShow = '../../../assets/images/securetext_show.png';
function SignUpProfile(props) {
  const device_token = DeviceInfo.getUniqueId();
  const device_type = DeviceInfo.getDeviceId();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [profilename, setProfileName] = useState('');
  const [appin, setAppPin] = useState('');
  const [enablebtn, setEnableButton] = useState(false);
  const [isSelectTerms, setSelectTerms] = useState(false);
  let keyboardBehavior = null;
  let fullNameEntry = undefined;
  const theme = useContext(ThemeContext);
  const onChangeName = (name) =>{
    setProfileName(name);
    if(appin.length===4 && isValidName(name) && isSelectTerms){
      setEnableButton(true);
    } else{
      setEnableButton(false);
    }
  }
  const onCodeFilled = (code) =>{
    setAppPin(code);
    if(isValidName(profilename) && isSelectTerms){
      setEnableButton(true);
    }
  }
  const onChangeCheckBox = () =>{
    setSelectTerms(!isSelectTerms);
    if(isValidName(profilename) && appin && !isSelectTerms){
      setEnableButton(true);
    } else{
      setEnableButton(false);
    }
  }
  const onCodeChanged = (code) =>{
    setAppPin(code);
    if(code.length < 4){
      setEnableButton(false);
    }
  }
  useEffect(() => {
    // ComponentDidMount
    StatusBar.setHidden(true)
    if (Platform.OS == 'android') {
        keyboardBehavior = 'height'
    }
    BackHandler.addEventListener('hardwareBackPress', function() {return true})
  }, []);

  const submit = () =>{
    const {mobile,mail} = props
    const userdata = {full_name:profilename,mpin:appin,device_token,device_type};
    props.signUp(mobile,userdata);
  }
  onFocusInput = (elementSlected)=>{
    elementSlected.setNativeProps({
      style: { borderColor: theme.colors.secondry }
    })
  }
  onBlurInput = (elementSlected)=>{
    elementSlected.setNativeProps({
      style: { borderColor: theme.colors.lightBorder }
    })
  }
  return (
    <SafeAreaView style={styles.container(theme)}>
      <KeyboardAvoidingView behavior={keyboardBehavior} >
          <ScrollView>

            <Image
              source={require("../../../assets/images/ezyrent_logo.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>

            <Text style={theme.typography.stepTitle}>Create Your Account</Text>

            <Text style={theme.typography.signstep}>STEP 5 OF 5</Text>

            <Text style={theme.typography.stepmessage}>Enter your full name and set a 4 digit app pin of your choice</Text>

            <Text style={theme.typography.mobelTitle2}>YOUR FULL NAME</Text>

            <View style={styles.mobileWrapper(theme)}>
              <TextInput
                placeholder="Your Name"
                style={styles.mobileInput(theme)}
                value={profilename}
                //autoFocus={true}
                autoCorrect={false}
                autoCapitalize={true}
                ref={(ref) => fullNameEntry = ref}
               // onFocus={()=>onFocusInput(fullNameEntry)}
                onBlur={()=>onBlurInput(fullNameEntry)}
                allowFontScaling={false}
                onChangeText={(name) =>onChangeName(name)}
              />
            </View>
            <View style={styles.pinwrapper(theme)}>
              <Text style={appin?styles.active_pintitle(theme):styles.pintitle(theme)}>SET YOUR 4 DIGIT APP PIN</Text>
              <View style={styles.pincontainer(theme)}>
                <OTPInputView
                  pinCount={4}
                  style={styles.pininputBox(theme)}
                  secureTextEntry={secureTextEntry}
                  autoFocusOnLoad={false}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted(theme)}
                  onCodeFilled = {(code => {onCodeFilled(code)})}
                  onCodeChanged = {(code => {onCodeChanged(code)})}
                  codeInputFieldStyle={styles.underlineStyleBase(theme)}
                />
                <TouchableOpacity style={styles.visibilityIconWrapp} onPress={()=>{setSecureTextEntry(!secureTextEntry)}}>
                  <Image style={styles.visibilityIcon} source={secureTextEntry?require(secureTextHidden):require(secureTextShow)}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.termsWrapp}>
               <CheckBox 
                 center
                 containerStyle={{width:30,height:25,paddingLeft:10,paddingTop:10,paddingBottom:10,margin:0}}
                 size={20}
                checkedIcon={<Image style={{width:20,height:20,marginTop:-10}} source={require('../../../assets/images/checkbox_active.png')} />}
                uncheckedIcon={<Image style={{width:20,height:20,marginTop:-10}} source={require('../../../assets/images/checkbox_inactive.png')} />}
                checked={isSelectTerms} 
                onPress={()=>onChangeCheckBox()} />
                <TouchableOpacity onPress={()=>Linking.openURL("https://www.google.com/")}>
                  <Text style={styles.termTitle(theme)}>I have read & agree to Terms of Use</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled}  onPress={()=>{submit()}}>
                {!props.loading && <Text style={styles.caption(theme)}>FINISH ACCOUNT CREATION</Text>}
                {props.loading && <Spinner color={"white"}/>}
            </TouchableOpacity>


            <Text style={theme.typography.copyright}>Copyright &copy; EzyRent 2020. All Rights Reserved.</Text>

          </ScrollView>
        </KeyboardAvoidingView>
        <Image
          source={require("../../../assets/images/ezyrent-footer-icon.png")}
          resizeMode={'cover'}
          style={styles.footerImage}
        ></Image>

    </SafeAreaView>
  );
}

const mapStateToProps = ({ signup }) => {
  const { error, success, loading,mobile,mail } = signup;

  return { error, success, loading,mobile,mail };
};

SignUpProfile.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signUp: PropTypes.func.isRequired,
  isValidEmail: PropTypes.func.isRequired,
};

SignUpProfile.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { signUp })(SignUpProfile);
