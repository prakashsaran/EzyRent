import React, { Component,useContext ,useState} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity,TextInput } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../theme';
import {NAVIGATION_SIGN_UP_MOBILE_OTP_PATH} from '../../../navigation/routes';
import NavigationService from '../../../navigation/NavigationService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUp,isValidName } from '../../../actions';
import OTPInputView from '@twotalltotems/react-native-otp-input'
const secureTextHidden = '../../../assets/images/securetext_hidden.png';
const secureTextShow = '../../../assets/images/securetext_show.png';
function SignUpProfile(props) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [profilename, setProfileName] = useState('');
  const [appin, setAppPin] = useState('');
  const [enablebtn, setEnableButton] = useState(false);

  const theme = useContext(ThemeContext);
  const onChangeName = (name) =>{
    setProfileName(name);
    if(appin.length===4 && isValidName(name)){
      setEnableButton(true);
    }
  }
  const onCodeFilled = (code) =>{
    setAppPin(code);
    if(isValidName(profilename)){
      setEnableButton(true);
    }
  }
  const onCodeChanged = (code) =>{
    if(code.length < 4){
      setEnableButton(false);
    }
  }

  const submit = () =>{
    const {mobile,mail} = props
    const userdata = {mobile:mobile.number,email:mail.email,name:profilename,password:appin};
    props.signUp(userdata);
  }
  return (
    <SafeAreaView style={styles.container(theme)}>
      <ScrollView>

        <Image
          source={require("../../../assets/images/ezyrent_logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>

        <Text style={theme.typography.stepTitle}>Create Your Account</Text>

        <Text style={theme.typography.signstep}>STEP 5 OF 5</Text>

        <Text style={theme.typography.stepmessage}>Enter your full name and set a 4 digit app pin of your choice</Text>

        <Text style={theme.typography.mobelTitle}>YOUR FULL NAME</Text>

        <View style={styles.mobileWrapper(theme)}>
          <TextInput
            placeholder="Your Name"
            style={styles.mobileInput(theme)}
            value={profilename}
            autoCorrect={false}
            autoCapitalize={true}
            allowFontScaling={false}
            onChangeText={(name) =>onChangeName(name)}
          />
        </View>
        <View style={styles.pinwrapper(theme)}>
          <Text style={styles.pintitle(theme)}>SET YOUR 4 DEGIT APP PIN</Text>
          <View style={styles.pincontainer(theme)}>
            <OTPInputView
              pinCount={4}
              style={styles.pininputBox(theme)}
              secureTextEntry={secureTextEntry}
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

        <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled}  onPress={()=>{submit()}}>
          <Text style={theme.typography.caption}>FINISH ACCOUNT CREATION</Text>
        </TouchableOpacity>

        <Text style={theme.typography.copyright}>Copyright &copy; EzyRent 2020. All Rights Reserved.</Text>

      </ScrollView>

        <Image
          source={require("../../../assets/images/ezyrent-footer-icon.png")}
          resizeMode="repeat"
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
