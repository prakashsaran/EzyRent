import React, { Component,useContext ,useState} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity,TextInput } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import {NAVIGATION_SIGN_UP_MOBILE_OTP_PATH,NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH,NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinMail,isValidEmail } from '../../../../actions';

function SignInMail(props) {
  const [emailaddress, setEmailAddress] = useState('');
  const [enablebtn, setEnableButton] = useState(false);

  const theme = useContext(ThemeContext);
  const onChangeEmailAdress = (email) =>{
    setEmailAddress(email);
    //console.log("current mail status",isValidEmail(email))
    setEnableButton(isValidEmail(email));
  }
  const submit = () =>{
    props.signinMail(emailaddress);
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

        <Text style={theme.typography.stepmessage}>Please enter your email address</Text>

        <Text style={theme.typography.mobelTitle}>EMAIL ID</Text>

        <View style={styles.mobileWrapper(theme)}>
          <TextInput
            placeholder="example@domain.com"
            style={styles.mobileInput(theme)}
            value={emailaddress}
            autoCorrect={false}
            keyboardType={'email-address'}
            autoCapitalize={false}
            allowFontScaling={false}
            onChangeText={(email) =>onChangeEmailAdress(email)}
          />
        </View>
        <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled}  onPress={()=>{submit()}}>
          <Text style={theme.typography.caption}>PROCEED</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signIn(theme)}  onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH)}} >
          <Text style={styles.cnfrmSignText(theme)}>Don't have an account?</Text>
          <Text style={styles.signLink(theme)}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.changesigninmethod(theme)} onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH)}}>
          <Text style={styles.changeMethodText(theme)}>Sign In with mobile number</Text>
        </TouchableOpacity>

        <Text style={theme.typography.copyright}>Copyright &copy; EzyRent 2020. All Rights Reserved</Text>

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
  const { error, success, loading } = signin;

  return { error, success, loading };
};

SignInMail.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signinMail: PropTypes.func.isRequired,
  isValidEmail: PropTypes.func.isRequired,
};

SignInMail.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { signinMail })(SignInMail);
