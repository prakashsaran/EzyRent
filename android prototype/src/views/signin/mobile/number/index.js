import React, { Component,useContext ,useState} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import PhoneInput from 'react-native-phone-input'
import {NAVIGATION_SIGN_UP_MOBILE_OTP_PATH,NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH,NAVIGATION_SIGN_IN_MAIL_ID_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinMobile,isValidMobile } from '../../../../actions';
import { RightIconTextbox } from '../../../../components';

function SignInMobile(props) {
  const [dialcode, setDialCode] = useState('+91');
  const [mobilenumber, setMobileNumber] = useState('');
  const [enablebtn, setEnableButton] = useState(false);

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
  return (
    <SafeAreaView style={styles.container(theme)}>
      <ScrollView>

        <Image
          source={require("../../../../assets/images/ezyrent_logo.png")}
          resizeMode="contain"
          style={styles.image}
        ></Image>

        <Text style={theme.typography.stepTitle}>Sign In to Your Account</Text>

        <Text style={theme.typography.stepmessage}>Please enter your mobile number</Text>

        <Text style={theme.typography.mobelTitle}>MOBILE</Text>

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

    </SafeAreaView>
  );
}

const mapStateToProps = ({ signup }) => {
  const { error, success, loading } = signup;

  return { error, success, loading };
};

SignInMobile.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signinMobile: PropTypes.func.isRequired,
};

SignInMobile.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { signinMobile })(SignInMobile);
