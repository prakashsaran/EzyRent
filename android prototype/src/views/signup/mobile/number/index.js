import React, { Component,useContext ,useState,useEffect} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity,KeyboardAvoidingView,Platform,StatusBar } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import PhoneInput from 'react-native-phone-input'
import {NAVIGATION_SIGN_UP_MOBILE_OTP_PATH,NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupMobile,isValidMobile } from '../../../../actions';
import { RightIconTextbox } from '../../../../components';
function SignUpMobile(props) {
  const [dialcode, setDialCode] = useState('+91');
  const [mobilenumber, setMobileNumber] = useState('');
  const [enablebtn, setEnableButton] = useState(false);
  let keyboardBehavior = "padding";
  const theme = useContext(ThemeContext);
  const onChangePhoneNumber = (number) =>{
    setMobileNumber(number);
    setEnableButton(isValidMobile(number));
  }
  const submit = () =>{
    props.signupMobile(mobilenumber,dialcode);
  }
  useEffect(() => {
    // ComponentDidMount
    StatusBar.setHidden(true)
    if (Platform.OS == 'android') {
        keyboardBehavior = 'height'
    }

  }, []);

  return (
      <SafeAreaView style={styles.container(theme)}>
          <KeyboardAvoidingView behavior={keyboardBehavior} >

              <ScrollView  showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>

                <Image
                  source={require("../../../../assets/images/ezyrent_logo.png")}
                  resizeMode="contain"
                  style={styles.image}
                ></Image>

                <Text style={theme.typography.stepTitle}>Create Your Account</Text>

                <Text style={theme.typography.signstep}>STEP 1 OF 5</Text>

                <Text style={theme.typography.stepmessage}>Please Enter Your Mobile Number</Text>

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

                <TouchableOpacity style={styles.signIn(theme)}  onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH)}} >
                  <Text style={styles.cnfrmSignText(theme)}>Already have an account?</Text>
                  <Text style={styles.signLink(theme)}>Sign In</Text>
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
  const { error, success, loading } = signup;

  return { error, success, loading };
};

SignUpMobile.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signupMobile: PropTypes.func.isRequired,
};

SignUpMobile.defaultProps = {
  error: null,
  success: null,
  loading: false,
};

export default connect(mapStateToProps, { signupMobile })(SignUpMobile);
