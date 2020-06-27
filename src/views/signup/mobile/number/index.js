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
import { RightIconTextbox,Spinner } from '../../../../components';
function SignUpMobile(props) {
  const [dialcode, setDialCode] = useState('0091');
  const [mobilenumber, setMobileNumber] = useState('');
  const [enablebtn, setEnableButton] = useState(false);
  let keyboardBehavior = null;
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
    setMobileNumber(props.mobile.number)
  }, [props.mobile]);
  goToSignInPage = ()=> {
    NavigationService.navigate(NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH);
    setMobileNumber("");
  }
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

                <Text style={theme.typography.mobelTitle2}>MOBILE</Text>

                <View style={styles.twocolumn}>
                    <View style={styles.fielcountrylabel(theme)}>
                      <Text style={styles.fieltext(theme)}>+91 (IND)</Text>
                    </View>
                  <RightIconTextbox keyboardType={'number-pad'} style={styles.contactbook(theme)} placeholder={"Mobile Number"} textValue={mobilenumber} onChangeText={(mobilenumber)=>onChangePhoneNumber(mobilenumber)} />
                </View>
                <TouchableOpacity disabled={!enablebtn} style={enablebtn?theme.typography.btnProceed:theme.typography.btnProceedDisabled}  onPress={()=>{submit()}}>
                  {!props.loading && <Text style={theme.typography.caption}>PROCEED</Text>}
                  {props.loading && <Spinner color={"white"}/>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.signIn(theme)}  onPress={()=>{goToSignInPage()}} >
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

const mapStateToProps = ({ signup,account }) => {
  const { error, success,mobile } = signup;
  const { loading } = account;
  return { error, success, loading,mobile };
};

SignUpMobile.propTypes = {
  mobile: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signupMobile: PropTypes.func.isRequired,
};

SignUpMobile.defaultProps = {
  error: null,
  success: null,
  loading: false,
  mobile:{},
};

export default connect(mapStateToProps, { signupMobile })(SignUpMobile);
