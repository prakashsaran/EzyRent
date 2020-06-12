import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
// swiper
import Swiper from 'react-native-swiper';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_EDIT_MY_PROFILE_VIEW_PATH,
} from '../../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getTenantProfileById,getCountryCodeFormat} from '../../../actions';
import { EzyRent } from '../../../ezyrent';

class TenantProfile extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      AccountType:null,
      tenant_name:undefined,
      mobile_country_code:"0091",
      profile_pic:"default.jpg",
      tenant_mobile:undefined,
      consistency_rent_pay:0,
      rent_pay:0,
      total_rent_pay:0,
    }
    StatusBar.setBarStyle("light-content");
  }
  UNSAFE_componentWillMount(){
    const {navigation,getTenantProfileById,customer} = this.props
    const tenant_id = navigation.getParam("tenant_id");
    getTenantProfileById(customer,tenant_id);
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

  componentWillReceiveProps(nextProps){
    const {current_tenant} = this.props
    if(nextProps.current_tenant != current_tenant){
      const {current_tenant} = nextProps
      this.setState({
        tenant_name:current_tenant.full_name,
        tenant_mobile:current_tenant.mobile,
        mobile_country_code:current_tenant.mobile_country_code,
        profile_pic:current_tenant.profile_pic,
        consistency_rent_pay:current_tenant.quick_stat.consistency_rent_pay,
        rent_pay:current_tenant.quick_stat.rent_pay,
        total_rent_pay:current_tenant.quick_stat.total_rent_pay,
      })
    }
  }
 
  goToMyTenants(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  goToEditProfile(){
    NavigationService.navigate(NAVIGATION_MORE_EDIT_MY_PROFILE_VIEW_PATH);
  }
  renderQuickState(){
    const {consistency_rent_pay,total_rent_pay,rent_pay} = this.state
      return(
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
            </View>
            <Text style={styles.content(theme)}>A quick summary of Tenant account on EzyRent.</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{rent_pay}</Text>
                <Text style={styles.box_desc}>Properties Paying</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{total_rent_pay}K</Text>
                <Text style={styles.box_desc}>Total Paid</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{consistency_rent_pay}</Text>
                <Text style={styles.box_desc}>Consistency in Paying Rent</Text>
              </View>
            </View>
          </View>
        </View>
      )
  }
  renderConsistency(){
    const {AccountType,tenant_name,consistency_rent_pay} = this.state
      return (
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Consistency Score</Text>
            </View>
            <Text style={styles.content(theme)}>{tenant_name} consistency score on EzyRent as tenant.</Text>
            <View style={styles.green_box}>
              <Text style={[styles.greenText,styles.greenText100]}>{consistency_rent_pay}</Text>
              <Image style={styles.grenBox} source={require('../../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}>Excellent! Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
      )
  }
  render(){
    const {tenant_name,mobile_country_code,profile_pic,tenant_mobile} = this.state
    const {current_tenant} = this.props
    const theme = this.context;
    if(!Object.keys(current_tenant).length > 0){
      return(
        <View style={{width:"100%",height:"100%",alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator style={{marginTop:40}} size={'large'} color={'red'}/>
        </View>
      );
     }
       return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
          <TouchableOpacity onPress={()=>NavigationService.goBack()}  style={{alignItems:'center',flexDirection:'row'}}>
            <Image style={styles.back_button} source={require('../../../assets/images/back-white.png')}></Image>
            <Text style={theme.typography.myDashBoard}>Tenant Profile</Text>
            </TouchableOpacity>
          </View>
          <View>
              <ScrollView 
              showsVerticalScrollIndicator={false}
              >
                <View style={[theme.typography.rectView2,styles.rectviewcustom]}>

                  <View style={styles.profile_wrap}>
                    <Image style={styles.profilebg} source={{uri:`${EzyRent.getMediaUrl()}${this.state.profile_pic}`}}></Image>
                  </View>
                  <Text style={styles.detailHeading(theme)}>{tenant_name}</Text>
                  <View style={styles.detail}>
                    <Text style={styles.detail_inner}><Image style={styles.gps_dark_icon} source={require('../../../assets/images/call.png')}></Image> {getCountryCodeFormat(mobile_country_code)} {tenant_mobile}</Text>
                  </View>
                  <View>
                  {this.renderQuickState()}
                  </View>
                  {this.renderConsistency()}
                  
                  
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </ImageBackground>
      );
  }
}
const mapStateToProps = ({ account,tenants }) => {
  const { customer } = account;
  const { current_tenant,loading } = tenants;

  return { current_tenant,loading, customer };
};

TenantProfile.propTypes = {
  loading: PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
  current_tenant:PropTypes.oneOfType(PropTypes.object,null),
  getTenantProfileById: PropTypes.func.isRequired,
};

TenantProfile.defaultProps = {
  loading: false,
  customer:null,
  current_tenant:{}
};

export default connect(mapStateToProps, {getTenantProfileById})(TenantProfile);
