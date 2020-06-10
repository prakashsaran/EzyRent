import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import {EzyRent} from '../../ezyrent';
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
import {getCountryCodeFormat} from '../../actions';
class MyProfile extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      AccountType:null,
    }
    StatusBar.setBarStyle("light-content");
  }
  //======================================================//
//============ start common function ====================//
//======================================================//

getCollectionRent(DataObj){
  if(DataObj.hasOwnProperty("landlord")){
    return DataObj.landlord.rent_collect;
  }
  return "0";
}

getCollectionTotalRent(DataObj){
  if(DataObj.hasOwnProperty("landlord")){
    return DataObj.landlord.total_rent_collect;
  }
  return "0";
}
getConsistencyRentCollect(DataObj){
  if(DataObj.hasOwnProperty("landlord")){
    return DataObj.landlord.consistency_rent_collect;
  }
  return "0";
}

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

  componentDidMount(){
    const {customer,status}=this.props
    console.log("customer =>",customer)
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
    const {customer} = this.props
    if(AccountType=="U"){
      return(
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
            </View>
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>0</Text>
                <Text style={styles.box_desc}>Properties I am Collecting Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>0K</Text>
                <Text style={styles.box_desc}>Total Rent I have to Receive</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>0%</Text>
                <Text style={styles.box_desc}>Consistency in Collectin Rent</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
    if(AccountType=="L"){
      return(
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
            </View>
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent.</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getCollectionRent(customer)}</Text>
                <Text style={styles.box_desc}>Properties I am Collecting Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getCollectionTotalRent(customer)}</Text>
                <Text style={styles.box_desc}>Total Rent I have to Receive</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getConsistencyRentCollect(customer)}</Text>
                <Text style={styles.box_desc}>Consistency in Collectin Rent</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
    if(AccountType!="B"){
      return(
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
            </View>
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent.</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getRentPay(customer)}</Text>
                <Text style={styles.box_desc}>Properties I am Paying Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getTotalRentPay(customer)}</Text>
                <Text style={styles.box_desc}>Total Rent I have to Pay</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getConsistencyRentPay(customer)}%</Text>
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
        height={220}
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
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent as landlord.</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getCollectionRent(customer)}</Text>
                <Text style={styles.box_desc}>Properties I am Collecting Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getCollectionTotalRent(customer)}</Text>
                <Text style={styles.box_desc}>Total Rent I have to Receive</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getConsistencyRentCollect(customer)}</Text>
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
            <Text style={styles.content(theme)}>A quick summary of your account on EzyRent as tenant.</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getCollectionRent(customer)}</Text>
                <Text style={styles.box_desc}>Properties I am Collecting Rent</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getCollectionTotalRent(customer)}</Text>
                <Text style={styles.box_desc}>Total Rent I have to Receive</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>{this.getConsistencyRentCollect(customer)}</Text>
                <Text style={styles.box_desc}>Consistency in Collectin Rent</Text>
              </View>
            </View>
          </View>
        </View>
      </Swiper>
    )
  }
  renderConsistency(){
    const {AccountType} = this.state
    const {customer} = this.props
    if(AccountType=="L"){
      return (
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Consistency Score</Text>
            </View>
            <Text style={styles.content(theme)}>Your consistency score on EzyRent as landlord.</Text>
            <View style={styles.green_box}>
      <Text style={[styles.greenText,styles.greenText100]}>{this.getConsistencyRentCollect(customer)}</Text>
              <Image style={styles.grenBox} source={require('../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}><Text style={{fontWeight:'bold'}}>Excellent!</Text> Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
      )
    } else if(AccountType=="T"){
      return (
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Consistency Score</Text>
            </View>
            <Text style={styles.content(theme)}>Your consistency score on EzyRent as tenant.</Text>
            <View style={styles.green_box}>
            <Text style={[styles.greenText,styles.greenText100]}>{this.getConsistencyRentPay(customer)}</Text>
              <Image style={styles.grenBox} source={require('../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}><Text style={{fontWeight:'bold'}}>Excellent!</Text> Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
      )

    }
    else if(AccountType=="B"){
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
                <Text style={styles.content(theme)}>Your consistency score on EzyRent as landlord.</Text>
                <View style={styles.green_box}>
                  <Text style={[styles.greenText,styles.greenText100]}>{this.getConsistencyRentCollect(customer)}</Text>
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
                <Text style={styles.content(theme)}>Your consistency score on EzyRent as tenant.</Text>
                <View style={styles.green_box}>
                  <Text style={[styles.greenText,styles.greenText100]}>{this.getConsistencyRentPay(customer)}</Text>
                  <Image style={styles.grenBox} source={require('../../assets/images/green-box.png')}></Image>
                  <Text style={styles.greenText}><Text style={{fontWeight:'bold'}}>Excellent!</Text> Your consistency score is very good.</Text>
                </View>
              </View>
            </View>
          </Swiper>
        )
    } else{
      return(
        <View style={styles.shadow}>
        <View style={styles.quick_stats}>
          <View style={styles.quick_stats_inner}>
            <Text style={styles.quick_stats_heading}>Consistency Score</Text>
          </View>
          <Text style={styles.content(theme)}>Your consistency score on EzyRent as tenant.</Text>
          <View style={styles.green_box}>
          <Text style={[styles.greenText,styles.greenText100]}>0%</Text>
            <Image style={styles.grenBox} source={require('../../assets/images/green-box.png')}></Image>
            <Text style={styles.greenText}><Text style={{fontWeight:'bold'}}>Excellent!</Text> Your consistency score is very good.</Text>
          </View>
        </View>
      </View>
      );
    }
  }
  render(){
    const {customer} = this.props;
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
                  <ImageBackground style={styles.profilebg} imageStyle={styles.profilePik} resizeMode={'cover'} 
                  //source={require('../../assets/images/sample/james.png')}
                  source={{uri:`${EzyRent.getMediaUrl()}${customer.profile_pic}`}}
                  ></ImageBackground>
                  </View>
                  <Text style={styles.detailHeading(theme)}>{customer.full_name}</Text>
                  <View style={styles.detail}>
                    <Text style={styles.detail_inner}><Image style={styles.gps_dark_icon} source={require('../../assets/images/call.png')}></Image> {getCountryCodeFormat(customer.mobile_country_code)}-{customer.mobile}</Text>
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
