import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
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

class PropertyOwner extends React.Component {
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
  renderQuickState(){
    const {AccountType} = this.state
    if(AccountType!="lessee"){
      return(
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>12</Text>
                <Text style={styles.box_desc}>Properties Rented</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>₹7K+</Text>
                <Text style={styles.box_desc}>Rent Payble</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
    return(
      <Swiper
        style={styles.slider1}
        height={190}
        dot={<View style={theme.typography.Dots}/>}
        activeDot={<View style={theme.typography.activeDots} />}
        //paginationStyle={theme.typography.pagination}
        showsPagination={false}
      >
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats</Text>
              <Image style={styles.paginat} source={require('../../../assets/images/paginat.png')}></Image>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>12</Text>
                <Text style={styles.box_desc}>Properties Rented</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>₹7K+</Text>
                <Text style={styles.box_desc}>Rent Payble</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Quick Stats2</Text>
              <Image style={styles.paginat} source={require('../../../assets/images/paginat-active.png')}></Image>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.two_box}>
              <View style={styles.box}>
                <Text style={styles.box_heading}>12</Text>
                <Text style={styles.box_desc}>Properties Rented</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.box_heading}>₹7K+</Text>
                <Text style={styles.box_desc}>Rent Payble</Text>
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
              <Image style={styles.grenBox} source={require('../../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}>Excellent! Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
      )
    }
    return(
      <Swiper
        style={styles.slider}
        height={180}
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
              <Image style={styles.paginat} source={require('../../../assets/images/paginat.png')}></Image>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.green_box}>
              <Text style={[styles.greenText,styles.greenText100]}>100%</Text>
              <Image style={styles.grenBox} source={require('../../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}>Excellent! Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
        <View style={styles.shadow}>
          <View style={styles.quick_stats}>
            <View style={styles.quick_stats_inner}>
              <Text style={styles.quick_stats_heading}>Consistency Score 2</Text>
              <Image style={styles.paginat} source={require('../../../assets/images/paginat-active.png')}></Image>
            </View>
            <Text style={styles.content(theme)}>Lorem ipsum dolor sit amet, consectetur adipiscing elit enim</Text>
            <View style={styles.green_box}>
              <Text style={[styles.greenText,styles.greenText100]}>100%</Text>
              <Image style={styles.grenBox} source={require('../../../assets/images/green-box.png')}></Image>
              <Text style={styles.greenText}>Excellent! Your consistency score is very good.</Text>
            </View>
          </View>
        </View>
      </Swiper>
    )
  }
  render(){
    const theme = this.context;
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
          <TouchableOpacity onPress={()=>NavigationService.goBack()}  style={{alignItems:'center',flexDirection:'row'}}>
            <Image style={styles.back_button} source={require('../../../assets/images/back-white.png')}></Image>
            <Text style={theme.typography.myDashBoard}>Property Owner</Text>
            </TouchableOpacity>
          </View>
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
          </SafeAreaView>
        </ImageBackground>
      );
  }
}
const mapStateToProps = ({ account }) => {
  const { error, success, loading,status,customer } = account;

  return { error, success, loading, status, customer };
};

PropertyOwner.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

PropertyOwner.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, {})(PropertyOwner);
