import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
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
      if(customer.hasOwnProperty("type")){
        if(customer.type){
          this.setState({AccountType:customer.type});
        } else{
          this.setState({AccountType:'new'});
        }
      } else{
        this.setState({AccountType:"new"});
      }
    } else{
      this.setState({AccountType:"new"});
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
    NavigationService.navigate(NAVIGATION_SIGN_IN_MOBILE_NUMBER_PATH);
  }
  render(){
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
                      <Image style={styles.imageLeft} source={require('../../assets/images/tever-thomas.png')}></Image>
                    </View>
                    <View style={styles.ImageWrapRight}>
                      <Text style={styles.textHeading(theme)}>Tever Thomas</Text>
                      <Text style={styles.textSub(theme)}>
                        <Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image> Dubai, UAE
                      </Text>
                      <Text style={styles.textSub(theme)}>
                        <Image style={styles.gps_dark_icon} source={require('../../assets/images/call.png')}></Image> +97 79234762234
                      </Text>
                      <Text style={styles.textSub(theme)}>
                        <Image style={styles.gps_dark_icon} source={require('../../assets/images/email.png')}></Image> trevor.thomas@yahoo.com
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.hr_line}></Text>
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
                      <Text style={styles.MoreLinksItemSub(theme)}>Manage your Profile Details</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.MoreLinkswrap}>
                    <Image style={styles.More_icon} source={require('../../assets/images/log-out.png')}></Image>
                    <TouchableOpacity style={styles.MoreLinks}  onPress={()=>this.goToLogout()}>
                      <Text style={styles.MoreLinksItem(theme)}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width:'100%',height:400}}></View>
                  </ScrollView>
                </View>
                </View>
          </SafeAreaView>
        </ImageBackground>
      );
  }

  renderMyTenant(){
    const {AccountType} = this.state
    if(AccountType=="lessee" || AccountType=="landlord"){
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
    if(AccountType=="lessee" || AccountType=="tenant"){
      return(
        <View style={styles.MoreLinkswrap}>
          <Image style={styles.More_icon} source={require('../../assets/images/my-leaderboard.png')}></Image>
          <TouchableOpacity style={styles.MoreLinks} onPress={()=>this.goToMyLandloads()}>
            <Text style={styles.MoreLinksItem(theme)}>My Landboards</Text>
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

export default connect(mapStateToProps, {})(MoreInit);
