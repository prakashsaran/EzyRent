import React, { Component,useContext ,useState,useEffect} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity,TextInput,KeyboardAvoidingView,Platform } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import {NAVIGATION_SIGN_UP_MOBILE_OTP_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupMail,isValidEmail } from '../../../../actions';

function SignUpMail(props) {
  const {mobile} = props;
  const [emailaddress, setEmailAddress] = useState('');
  const [enablebtn, setEnableButton] = useState(false);
  let keyboardBehavior = "padding";

  const theme = useContext(ThemeContext);
  const onChangeEmailAdress = (email) =>{
    setEmailAddress(email);
    //console.log("current mail status",isValidEmail(email))
    setEnableButton(isValidEmail(email));
  }
  const submit = () =>{
    props.signupMail(mobile,emailaddress);
  }
  useEffect(() => {
    // ComponentDidMount
    if (Platform.OS == 'android') {
        keyboardBehavior = 'height'
    }

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

              <Text style={theme.typography.signstep}>STEP 3 OF 5</Text>

              <Text style={theme.typography.stepmessage}>Please enter your email address</Text>

              <Text style={theme.typography.mobelTitle}>EMAIL ID</Text>

              <View style={styles.mobileWrapper(theme)}>
                <TextInput
                  placeholder="example@domain.com"
                  keyboardType={'email-address'}
                  style={styles.mobileInput(theme)}
                  value={emailaddress}
                  autoCorrect={false}
                  autoCapitalize={false}
                  allowFontScaling={false}
                  onChangeText={(email) =>onChangeEmailAdress(email)}
                />
              </View>
              <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled}  onPress={()=>{submit()}}>
                <Text style={theme.typography.caption}>PROCEED</Text>
              </TouchableOpacity>

              <Text style={theme.typography.copyright}>Copyright &copy; Ezy Rent 2020. All Rights Reserved</Text>

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

SignUpMail.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signupMail: PropTypes.func.isRequired,
  isValidEmail: PropTypes.func.isRequired,
};

SignUpMail.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { signupMail })(SignUpMail);
