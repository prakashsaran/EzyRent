import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from '../style';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH
} from '../../../navigation/routes';

class LandlordDashboard extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    StatusBar.setBarStyle("light-content");
    StatusBar.setHidden(false)
  }
  componentDidMount(){
    const {customer,status}=this.props
  }
  addPropertyTenant(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  gotToProfile(){
    NavigationService.navigate(NAVIGATION_MORE_MY_PROFILE_VIEW_PATH);
  }
  render(){
    const theme = this.context;
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
              <View style={styles.titleWrapper}>
                  <Text style={theme.typography.myDashBoard}>My DashBoard</Text>
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
                            <Image style={styles.intIcons} source={require('../../../assets/images/dashboard_my_profile.png')}></Image>
                            <Text style={styles.intcTitle(theme)}>My Profile</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.addPropertyTenant()} style={styles.intcolums(theme)}>
                          <View style={styles.intcolumsInner}>
                          <Image style={styles.intIcons} source={require('../../../assets/images/dashboard_add_properties.png')}></Image>
                            <Text style={styles.intcTitle(theme)}>Add New Property/Tenant</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.accountstats(theme)}>
                        <Text style={styles.quickLinks(theme)}>Quick Stats</Text>
                        <Text style={styles.statsDesc(theme)}>A quick summary of your account on Ezy Rent </Text>
                        <View style={styles.statsdata(theme)}>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>12</Text>
                            <Text style={styles.itemInfo(theme)}>Properties I am Collecting Rent</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>₹80K</Text>
                            <Text style={styles.itemInfo(theme)}>Total Rent I have to Receive</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>100%</Text>
                            <Text style={styles.itemInfo(theme)}>Consistency in Collecting Rent</Text>
                          </View>
                        </View>
                      </View>
                      <Image style={styles.databg(theme)} resizeMode={'stretch'} source={require('../../../assets/images/dashboard_data_bg.png')}/>
                    </View>
                  </ScrollView>
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

LandlordDashboard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

LandlordDashboard.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, {})(LandlordDashboard);
