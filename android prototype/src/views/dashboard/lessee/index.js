import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from '../style';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,
  NAVIGATION_RENT_INIT_VIEW_PATH
} from '../../../navigation/routes';

class LesseeDashboard extends React.Component {
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
  payRent(){
    NavigationService.navigate(NAVIGATION_RENT_INIT_VIEW_PATH);
  }

  render(){
    const theme = this.context;
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
                        <TouchableOpacity onPress={()=>this.gotToProfile()} style={[styles.intcolums(theme),styles.intcolums3(theme)]}>
                          <View style={styles.intcolumsInner}>
                            <Image style={styles.intIcons} source={require('../../../assets/images/my-profile.png')}></Image>
                            <Text style={styles.intcTitle(theme)}>View My Profile</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.addPropertyTenant()} style={[styles.intcolums(theme),styles.intcolums3(theme)]}>
                          <View style={styles.intcolumsInner}>
                          <Image style={styles.intIcons} source={require('../../../assets/images/dashboard_add_properties.png')}></Image>
                            <Text style={styles.intcTitle(theme)}>Add New {'\n'}Property/Tenant</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.payRent()} style={[styles.intcolums(theme),styles.intcolums3(theme)]}>
                          <View style={styles.intcolumsInner}>
                          <Image style={styles.intIcons} source={require('../../../assets/images/pay-rent.png')}></Image>
                            <Text style={styles.intcTitle(theme)}>Pay Rent</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <Swiper
                        style={styles.slider}
                        height={240}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={theme.typography.Dots}/>}
                        activeDot={<View style={theme.typography.activeDots} />}
                        //paginationStyle={theme.typography.pagination}
                        loop
                        showsPagination={false}
                      >
                      <View style={styles.accountstats(theme)}>
                        <View style={styles.quick_stats_inner}>
                          <Text style={styles.quick_stats_heading(theme)}>Quick Stats</Text>
                          <Image style={styles.paginat} source={require('../../../assets/images/paginat.png')}></Image>
                        </View>
                        <Text style={styles.statsDesc(theme)}>A quick summary of your account on EzyRent as landlord</Text>
                        <View style={styles.statsdata(theme)}>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>12</Text>
                            <Text style={styles.itemInfo(theme)}>Properties I am Collecting Rent</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>80K</Text>
                            <Text style={styles.itemInfo(theme)}>Total Rent I have to Receive</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>100%</Text>
                            <Text style={styles.itemInfo(theme)}>Consistency in Collecting Rent</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.accountstats(theme)}>
                      <View style={styles.quick_stats_inner}>
                        <Text style={styles.quick_stats_heading(theme)}>Quick Stats</Text>
                        <Image style={styles.paginat} source={require('../../../assets/images/paginat-active.png')}></Image>
                      </View>
                        <Text style={styles.statsDesc(theme)}>A quick summary of your account on EzyRent as tenant</Text>
                        <View style={styles.statsdata(theme)}>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>12</Text>
                            <Text style={styles.itemInfo(theme)}>Properties I am Paying Rent</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>80K</Text>
                            <Text style={styles.itemInfo(theme)}>Total Rent I have to Pay</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>100%</Text>
                            <Text style={styles.itemInfo(theme)}>Consistency in Paying Rent</Text>
                          </View>
                        </View>
                      </View>
                      </Swiper>
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

LesseeDashboard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

LesseeDashboard.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, {})(LesseeDashboard);
