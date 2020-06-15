import React, { Component,useContext ,useState,useEffect} from "react";
import {View, Image, Text,ScrollView,SafeAreaView,TouchableOpacity,TextInput } from "react-native";
import styles from './style';
import { ThemeContext } from '../../../../theme';
import {NAVIGATION_SIGN_UP_MOBILE_OTP_PATH,NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH,NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH} from '../../../../navigation/routes';
import NavigationService from '../../../../navigation/NavigationService';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinMail,isValidEmail,resetSingWarn } from '../../../../actions';
import Modal from 'react-native-modal';

function SignInMail(props) {
  const [emailaddress, setEmailAddress] = useState('');
  const [enablebtn, setEnableButton] = useState(false);
  const [isconfirmModalVisible, setConfirmModalVisible] = useState(false);

  const theme = useContext(ThemeContext);
  const onChangeEmailAdress = (email) =>{
    setEmailAddress(email);
    setEnableButton(isValidEmail(email));
  }
  const submit = () =>{
    props.signinMail(emailaddress);
  }
  useEffect(() => {
    if(Object.keys(props.warndata).length){
      if(props.warndata.hasOwnProperty("type")){
        setConfirmModalVisible(true);
      }
    }
  }, [props.warndata]);

  reStartSignUp = () =>{
    setConfirmModalVisible(false);
    props.resetSingWarn();
    NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH)
  }

  renderConfirmModal =() =>{
    return (
      <Modal onBackdropPress={()=>{setConfirmModalVisible(false)}} isVisible={isconfirmModalVisible}>
            <View style={{ width:'95%',height:140,backgroundColor:'#fff',borderRadius:5,alignSelf:'center' }}>
              <Text style={styles.confirmBoxTitle(theme)}>Your account creation is pending. Please complete your account.</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',width:"90%",paddingTop:10,alignSelf:'center',paddingHorizontal:20}}>
                  <TouchableOpacity onPress={()=>setConfirmModalVisible(false)}>
                    <Text style={styles.eraseTitle(theme)}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>reStartSignUp()}>
                    <Text>Ok</Text>
                  </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
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

        <Text style={theme.typography.stepmessage}>Please Enter Your Email Address</Text>

        <Text style={theme.typography.mobelTitle2}>EMAIL ID</Text>

        <View style={styles.mobileWrapper(theme)}>
          <TextInput
            placeholder="example@domain.com"
            style={styles.mobileInput(theme)}
            value={emailaddress}
            autoCorrect={false}
            underlineColorAndroid='white'
            keyboardType={'email-address'}
            underlineColorAndroid={"transparent"}
            autoCapitalize={'none'}
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

        <Text style={theme.typography.copyright}>Copyright &copy; EzyRent 2020. All Rights Reserved.</Text>

      </ScrollView>

        <Image
          source={require("../../../../assets/images/ezyrent-footer-icon.png")}
          resizeMode={'cover'}
          style={styles.footerImage}
        ></Image>
        {renderConfirmModal()}
    </SafeAreaView>
  );
}

const mapStateToProps = ({ signin }) => {
  const {warndata, error, success, loading } = signin;

  return {warndata, error, success, loading };
};

SignInMail.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  signinMail: PropTypes.func.isRequired,
  isValidEmail: PropTypes.func.isRequired,
  resetSingWarn: PropTypes.func,
  warndata: PropTypes.object,
};

SignInMail.defaultProps = {
  error: null,
  success: null,
  loading: false,
  warndata:{},
};

export default connect(mapStateToProps, { signinMail,resetSingWarn })(SignInMail);
