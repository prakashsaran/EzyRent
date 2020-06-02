import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
// swiper
import Swiper from 'react-native-swiper';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_EDIT_MY_PROFILE_VIEW_PATH,
  NAVIGATION_MORE_INIT_VIEW_PATH,
} from '../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MyProfile extends React.Component {
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
    console.log("customer =>",customer)
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
  gotToMoreView(){
    NavigationService.navigate(NAVIGATION_MORE_INIT_VIEW_PATH);
  }
  renderQuickState(){
    const {AccountType} = this.state
    if(AccountType=="landlord"){
      return(
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
            </View>
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>12</Text>
                <Text style={styles.box_desc}>Properties I am Collecting Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>80K</Text>
                <Text style={styles.box_desc}>Total Rent I have to Receive</Text>
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
    if(AccountType!="lessee"){
      return(
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
            </View>
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>12</Text>
                <Text style={styles.box_desc}>Properties I am Paying Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>80K</Text>
                <Text style={styles.box_desc}>Total Rent I have to Pay</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>100%</Text>
                <Text style={styles.box_desc}>Consistency in Paying Rent</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
    return(
      <Swiper
        style={styles.slider1}
        height={250}
        dot={<View style={theme.typography.Dots}/>}
        activeDot={<View style={theme.typography.activeDots} />}
        //paginationStyle={theme.typography.pagination}
        loop
        showsPagination={false}
      >
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
              <Image style={styles.paginat} source={require('../../assets/images/paginat.png')}></Image>
            </View>
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent as landlord</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>12</Text>
                <Text style={styles.box_desc}>Properties I am Collecting Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>80K</Text>
                <Text style={styles.box_desc}>Total Rent I have to Receive</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>100%</Text>
                <Text style={styles.box_desc}>Consistency in Collectin Rent</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
              <Image style={styles.paginat} source={require('../../assets/images/paginat-active.png')}></Image>
            </View>
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent as tenant</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>12</Text>
                <Text style={styles.box_desc}>Properties I am Paying Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>80K</Text>
                <Text style={styles.box_desc}>Total Rent I have to Pay</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>100%</Text>
                <Text style={styles.box_desc}>Consistency in Paying Rent</Text>
              </View>
            </View>
          </View>
        </View>
      </Swiper>
    )
  }
  renderConsistency(){
    const {AccountType} = this.state
    if(AccountType!="lessee"){
      return (
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Consistency Score</Text>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.green_box}>
              <Text style={[styles.greenText,styles.greenText100]}>100%</Text>
              <Image style={styles.grenBox} source={require('../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}><Text style={{fontWeight:'bold'}}>Excellent!</Text> Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
      )
    }
    return(
      <Swiper
        style={styles.slider}
        height={220}
        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
        dot={<View style={theme.typography.Dots}/>}
        activeDot={<View style={theme.typography.activeDots} />}
        //paginationStyle={theme.typography.pagination}
        loop
        showsPagination={false}
      >
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Consistency Score</Text>
              <Image style={styles.paginat} source={require('../../assets/images/paginat.png')}></Image>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.green_box}>
              <Text style={[styles.greenText,styles.greenText100]}>100%</Text>
              <Image style={styles.grenBox} source={require('../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}><Text style={{fontWeight:'bold'}}>Excellent!</Text> Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Consistency Score</Text>
              <Image style={styles.paginat} source={require('../../assets/images/paginat-active.png')}></Image>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.green_box}>
              <Text style={[styles.greenText,styles.greenText100]}>100%</Text>
              <Image style={styles.grenBox} source={require('../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}><Text style={{fontWeight:'bold'}}>Excellent!</Text> Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
      </Swiper>
    )
  }
  render(){
    const theme = this.context;
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
          <TouchableOpacity onPress={()=>this.gotToMoreView()}  style={{alignItems:'center',flexDirection:'row'}}>
            <Image style={styles.back_button} source={require('../../assets/images/back-white.png')}></Image>
            <Text style={theme.typography.myDashBoard}> My Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.goToEditProfile()} style={styles.editWrapp}><Image style={styles.editButton} source={require('../../assets/images/edit-white.png')}></Image></TouchableOpacity>
          </View>
            <View>
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <View style={[theme.typography.rectView2,styles.rectviewcustom]}>

                  <View style={styles.profile_wrap}>
                  <ImageBackground style={styles.profilebg} imageStyle={styles.profilePik} resizeMode={'cover'} source={require('../../assets/images/sample/james.png')}></ImageBackground>
                  </View>
                  <Text style={styles.detailHeading(theme)}>TEVER THOMAS</Text>
                  <View style={styles.detail}>
                    <Text style={styles.detail_inner}><Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image> Dubai, UAE</Text>
                    <Text style={styles.detail_inner}><Image style={styles.gps_dark_icon} source={require('../../assets/images/call.png')}></Image> +97 9876543210</Text>
                  </View>
                  <View>
                    {this.renderQuickState()}
                  </View>
                  <View>
                    {this.renderConsistency()}
                  </View>
                  <View style={{width:'100%',height:100}}></View>
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

MyProfile.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

MyProfile.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, {})(MyProfile);
