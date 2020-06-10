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
import {getLandlordProfileById,getCountryCodeFormat} from '../../../actions';

class PropertyOwner extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      AccountType:null,
    }
    StatusBar.setBarStyle("light-content");
  }

  UNSAFE_componentWillMount(){
    const {navigation,getLandlordProfileById,customer} = this.props
    const landlord_id = navigation.getParam("landlord_id");
    console.log("========ok =>",landlord_id)
    getLandlordProfileById(customer,landlord_id);
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
 
  goToMyTenants(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  goToEditProfile(){
    NavigationService.navigate(NAVIGATION_MORE_EDIT_MY_PROFILE_VIEW_PATH);
  }
  renderQuickState(){
      return(
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
            </View>
            <Text style={styles.content(theme)}>A quick summary of owner account on EzyRent.</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>12</Text>
                <Text style={styles.box_desc}>Properties Rented</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>7K</Text>
                <Text style={styles.box_desc}>Rent Payable</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>100%</Text>
                <Text style={styles.box_desc}>Consistency in Collectin Rent</Text>
              </View>
            </View>
          </View>
        </View>
      )
  }
  renderConsistency(){
    const {AccountType} = this.state
      return (
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Consistency Score</Text>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.green_box}>
              <Text style={[styles.greenText,styles.greenText100]}>100%</Text>
              <Image style={styles.grenBox} source={require('../../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}>Excellent! Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
      )
  }
  render(){
    const theme = this.context;
    const {current_landlord} = this.props
    if(!Object.keys(current_landlord).length > 0){
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
            <Text style={theme.typography.myDashBoard}>Property Owner</Text>
            </TouchableOpacity>
          </View>
          <View>
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <View style={[theme.typography.rectView2,styles.rectviewcustom]}>

                  <View style={styles.profile_wrap}>
                    <Image style={styles.profile} source={require('../../../assets/images/tever-thomas.png')}></Image>
                  </View>
                  <Text style={styles.detailHeading(theme)}>TEVER THOMAS</Text>
                  <View style={styles.detail}>
                    <Text style={styles.detail_inner}><Image style={styles.gps_dark_icon} source={require('../../../assets/images/gps_dark.png')}></Image> Dubai, UAE</Text>
                    <Text style={styles.detail_inner}><Image style={styles.gps_dark_icon} source={require('../../../assets/images/call.png')}></Image> +97 9876543210</Text>
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
const mapStateToProps = ({ account,landlord }) => {
  const { error, success, loading,status,customer } = account;
const {current_landlord} = landlord;
  return { error, success, loading, status, customer,current_landlord };
};

PropertyOwner.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
  getLandlordProfileById: PropTypes.func,
  current_landlord: PropTypes.object,
};

PropertyOwner.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
  current_landlord:{},
};

export default connect(mapStateToProps, {getLandlordProfileById})(PropertyOwner);
