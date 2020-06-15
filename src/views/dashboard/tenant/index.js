import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from 'react-native-modal';
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from '../style';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timeline from 'react-native-timeline-flatlist';
import {
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,
  NAVIGATION_RENT_INIT_VIEW_PATH,
  NAVIGATION_DASHBOARD_INIT_VIEW_PATH,
} from '../../../navigation/routes';
import CongratsModalDashBoard from '../../../components/CongratsModalDashBoard';

class TenantDashboard extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    StatusBar.setBarStyle("light-content");
    StatusBar.setHidden(false)
  }
  gotToProfile(){
    NavigationService.navigate(NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,{goBack:NAVIGATION_DASHBOARD_INIT_VIEW_PATH});
  }
  payRent(){
    NavigationService.navigate(NAVIGATION_RENT_INIT_VIEW_PATH);
  }

  //======================================================//
//============ start common function ====================//
//======================================================//

getTotalRentPay(DataObj){
  if(DataObj.hasOwnProperty("tenant")){
    return DataObj.tenant.total_rent_pay;
  }
  return "0";
}


getRentPay(DataObj){
  if(DataObj.hasOwnProperty("tenant")){
    return DataObj.tenant.rent_pay;
  }
  return "0";
}

getConsistencyRentPay(DataObj){
  if(DataObj.hasOwnProperty("tenant")){
    return DataObj.tenant.rent_pay;
  }
  return "0";
}


//======================================================//
//============ end common function ====================//
//======================================================//

  render(){
    const theme = this.context;
    const {customer} = this.props
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
              <View style={styles.titleWrapper}>
                  <Text style={theme.typography.myDashBoard}>My Dashboard</Text>
                </View>

                <View style={[theme.typography.rectView2,styles.rectView2]}>
                <ScrollView
                //style={{backgroundColor:'red'}}
                showsVerticalScrollIndicator={false}
                >
                  <View style={{width:'100%',paddingBottom:30,}}>
                    <Text style={styles.quickLinksLeft(theme)}>Quick Links</Text>
                      <View style={styles.userinteraction}>
                        <TouchableOpacity onPress={()=>this.gotToProfile()} style={styles.intcolums(theme)}>
                          <View style={styles.intcolumsInner}>
                            <Image style={styles.intIcons} source={require('../../../assets/images/my-profile.png')}></Image>
                            <Text style={styles.intcTitle(theme)}>View My Profile</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.payRent()} style={styles.intcolums(theme)}>
                          <View style={styles.intcolumsInner}>
                          <Image style={styles.intIcons} source={require('../../../assets/images/pay-rent.png')}></Image>
                            <Text style={styles.intcTitle(theme)}>Pay Rent</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.accountstats(theme)}>
                        <Text style={styles.quickLinks(theme)}>Quick Stats</Text>
                        <Text style={styles.statsDesc(theme)}>A quick summary of your account on EzyRent. </Text>
                        <View style={styles.statsdata(theme)}>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>{this.getRentPay(customer)}</Text>
                            <Text style={styles.itemInfo(theme)}>Properties I am Paying Rent</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>{this.getTotalRentPay(customer)}</Text>
                            <Text style={styles.itemInfo(theme)}>Total Rent I have to Pay</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>{this.getConsistencyRentPay(customer)}</Text>
                            <Text style={styles.itemInfo(theme)}>Consistency in Paying Rent</Text>
                          </View>
                        </View>
                      </View>
                      <Image style={styles.databg(theme)} resizeMode={'stretch'} source={require('../../../assets/images/dashboard_data_bg.png')}/>
                    </View>
                  </ScrollView>
                  <CongratsModalDashBoard/>
                </View>
          </SafeAreaView>
        </ImageBackground>
      );
  }

}

const mapStateToProps = ({ account }) => {
  const { error, success, loading,status,customer } = account;
  return { error, success, loading, status, customer };
};

TenantDashboard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

TenantDashboard.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, {})(TenantDashboard);
