import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,Dimensions,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_MY_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_MY_LANDLOADS_VIEW_PATH,
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,
  NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH,
  NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH
} from '../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout,getCountryCodeFormat} from '../../actions';
import {EzyRent} from '../../ezyrent';

class MoreInit extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      AccountType:null,
    }
    StatusBar.setBarStyle("light-content");
  }

  componentDidMount(){
    const {customer,status}=this.props
    if(status){
      if(customer.hasOwnProperty("user_type")){
        if(customer.user_type){
          this.setState({AccountType:customer.user_type});
        } else{
          this.setState({AccountType:'U'});
        }
      } else{
        this.setState({AccountType:"U"});
      }
    } else{
      this.setState({AccountType:"U"});
    }
  }
 

  goToAddNewProperty(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  goToMyTenants(){
    NavigationService.navigate(NAVIGATION_MORE_MY_TENANTS_VIEW_PATH);
  }
  goToMyLandloads(){
    NavigationService.navigate(NAVIGATION_MORE_MY_LANDLOADS_VIEW_PATH);
  }
  goToMyBankaccount(){
    NavigationService.navigate(NAVIGATION_MORE_MY_BANKACCOUNT_VIEW_PATH);
  }
  goToMyProfile(){
    NavigationService.navigate(NAVIGATION_MORE_MY_PROFILE_VIEW_PATH);
  }
  goToLogout(){
    const {logout} = this.props;
    Alert.alert(
      "",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => logout() }
      ],
      { cancelable: false }
    );
  }
  isLessMarshmallow(){
    const dvcHeight = Dimensions.get('window').height;
    if(dvcHeight < 600){
      return 40;
    }
    return 0;
  }

  render(){
    const {customer} = this.props
    const theme = this.context;
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
                <View style={styles.titleWrapper}>
                  <Text style={theme.typography.myDashBoard}>More</Text>
                </View>
                <View style={styles.view_Wrap}>
                   <View style={[theme.typography.rectView2,styles.rectView2]}>
                      <View style={styles.ImageWrap}>
                        <View style={styles.ImageLeftWrap}>
                          {/* <Image style={styles.imageLeft} source={{uri:`${EzyRent.getMediaUrl()}${customer.profile_pic}`}}></Image> */}
                          <ImageBackground style={styles.profilebg} imageStyle={styles.profilePik} resizeMode={'cover'} 
                          //source={require('../../assets/images/sample/james.png')}
                          source={{uri:`${EzyRent.getMediaUrl()}${customer.profile_pic}`}}
                          ></ImageBackground>
                        </View>
                        <View style={styles.ImageWrapRight}>
                          <Text style={styles.textHeading(theme)}>{customer.full_name}</Text>
                          <Text style={styles.textSub(theme)}>
                            <Image style={styles.gps_dark_icon} source={require('../../assets/images/call.png')}></Image> {getCountryCodeFormat(customer.mobile_country_code)}-{customer.mobile}
                          </Text>
                          <Text style={styles.textSub(theme)} numberOfLines={2}>
                            <Image style={styles.gps_dark_icon} source={require('../../assets/images/email.png')}></Image> {customer.email}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.hr_line}></Text>
                      {/* comming======= */}
                        <View style={{flex:1,paddingBottom:0,}}>
                          <ScrollView
                            showsVerticalScrollIndicator={false}
                            >

                            <View style={styles.MoreLinkswrap}>
                              <Image style={styles.More_icon} source={require('../../assets/images/dashboard_add_properties.png')}></Image>
                              <TouchableOpacity style={styles.MoreLinks} onPress={()=>this.goToAddNewProperty()}>
                                <Text style={styles.MoreLinksItem(theme)}>Add a New Property/Tenant</Text>
                                <Text style={styles.MoreLinksItemSub(theme)}>Add a new property/tenant</Text>
                              </TouchableOpacity>
                            </View>
                          
                            {this.renderMyTenant()}

                            {this.renderMyLandlord()}
                            <View style={styles.MoreLinkswrap}>
                              <Image style={styles.More_icon} source={require('../../assets/images/my-bank.png')}></Image>
                              <TouchableOpacity style={styles.MoreLinks} onPress={()=>this.goToMyBankaccount()}>
                                <Text style={styles.MoreLinksItem(theme)}>My Bank Accounts</Text>
                                <Text style={styles.MoreLinksItemSub(theme)}>Manage your bank accounts</Text>
                              </TouchableOpacity>
                            </View>
                            <Text style={styles.hr_line}></Text>

                            <View style={styles.MoreLinkswrap}>
                              <Image style={styles.More_icon} source={require('../../assets/images/my-profile.png')}></Image>
                              <TouchableOpacity onPress={()=>this.goToMyProfile()} style={styles.MoreLinks}>
                                <Text style={styles.MoreLinksItem(theme)}>My Profile</Text>
                                <Text style={styles.MoreLinksItemSub(theme)}>Manage your profile details</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.MoreLinkswrap}>
                              <Image style={styles.More_icon} source={require('../../assets/images/log-out.png')}></Image>
                              <TouchableOpacity style={styles.MoreLinks}  onPress={()=>this.goToLogout()}>
                                <Text style={styles.MoreLinksItem(theme)}>Logout</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={{width:'100%',height:this.isLessMarshmallow()}}></View>
                          </ScrollView>
                        </View>
                      {/* commming==== */}
                    </View>
                </View>
          </SafeAreaView>
        </ImageBackground>
      );
  }

  renderMyTenant(){
    const {AccountType} = this.state
    if(AccountType=="B" || AccountType=="L"){
      return(
        <View style={styles.MoreLinkswrap}>
          <Image style={styles.More_icon} source={require('../../assets/images/my-tenants.png')}></Image>
          <TouchableOpacity style={styles.MoreLinks} onPress={()=>this.goToMyTenants()}>
            <Text style={styles.MoreLinksItem(theme)}>My Tenants</Text>
            <Text style={styles.MoreLinksItemSub(theme)}>View and manage all your tenants here</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return null;
  }

  renderMyLandlord(){
    const {AccountType} = this.state
    if(AccountType=="B" || AccountType=="T"){
      return(
        <View style={styles.MoreLinkswrap}>
          <Image style={styles.More_icon} source={require('../../assets/images/my-leaderboard.png')}></Image>
          <TouchableOpacity style={styles.MoreLinks} onPress={()=>this.goToMyLandloads()}>
            <Text style={styles.MoreLinksItem(theme)}>My Landlords</Text>
            <Text style={styles.MoreLinksItemSub(theme)}>View and manage all your landlord</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return null;
  }


}


const mapStateToProps = ({ account }) => {
  const { error, success, loading,status,customer } = account;

  return { error, success, loading, status, customer };
};

MoreInit.propTypes = {
  logout:PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

MoreInit.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, {logout})(MoreInit);