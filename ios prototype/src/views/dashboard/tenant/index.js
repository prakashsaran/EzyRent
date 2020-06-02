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
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,
  NAVIGATION_RENT_INIT_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,
} from '../../../navigation/routes';

class TenantDashboard extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      visiblemodal:true
    }
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
  goToPropertyDetail(){
    this.setState({visiblemodal:false});
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH)
  }
  goToPropertyOwnerDetail(){
    this.setState({visiblemodal:false});
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH)
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
                      <Image style={styles.databg(theme)} resizeMode={'stretch'} source={require('../../../assets/images/dashboard_data_bg.png')}/>
                    </View>
                  </ScrollView>
                  {this.renderModelView()}
                </View>
          </SafeAreaView>
        </ImageBackground>
      );
  }

  rejectConfirm(){
    Alert.alert(
      "",
      "Are you sure to reject?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.setState({visiblemodal:false}) }
      ],
      { cancelable: false }
    );
  }
  descriptionLoopItem(amount,period){
    return(
     <View>
       <Text style={styles.payTime(theme)}>{amount}</Text>
       <Text style={styles.timePeriodExtra(theme)}>{period}</Text>
     </View>
    )
   }
 
  renderModelView()
    {
      return(
        <Modal isVisible={this.state.visiblemodal} style={styles.visiblemodal}>
            <View style={styles.PopupContainer}>
            <Image style={styles.congrats_img(theme)} resizeMode={'stretch'} source={require('../../../assets/images/congrats.png')}/>
              <Text style={styles.congrats_head} adjustsFontSizeToFit>Congrats!</Text>
              <ScrollView style={{height:theme.dimens.popupHeight}}>
                  <View style={styles.congrats_content(theme)}>
                    <Text style={styles.light_color} adjustsFontSizeToFit>You have been added as Tenant of </Text>
                    <TouchableOpacity onPress={()=>this.goToPropertyDetail()}><Text style={{color:'#315add',fontFamily:'Oxygen-Bold',}} adjustsFontSizeToFit> House No. 7A</Text></TouchableOpacity>
                    <Text style={styles.light_color} adjustsFontSizeToFit> in Building SFS Merrie Pink, Kuravankonam by Landlord  </Text>
                    <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail()}><Text adjustsFontSizeToFit style={{color:'#315add',fontFamily:'Oxygen-Bold',}}>Red Rows Properties</Text></TouchableOpacity>
                    <Text adjustsFontSizeToFit style={[styles.light_color,{fontWeight:'bold'}]}> (+91-976242342)</Text>
                  </View>
                  <View style={styles.congrats_content(theme)}>
                    <Text style={styles.alertMsg} adjustsFontSizeToFit>Please confirm the Total Amount Payable monthly</Text>
                  </View>
                  <Image style={styles.dash_bar_img(theme)} resizeMode={'stretch'} source={require('../../../assets/images/dash-bar-line.png')}/>
                  <View style={styles.bankacInfo}>
                      <Text adjustsFontSizeToFit style={styles.banktitle(theme)}>Added Date</Text>
                  </View>
                  <View style={styles.bankacInfo}>
                      <Text adjustsFontSizeToFit style={styles.textLabelXl(theme)}>15 March 2020</Text><Text style={styles.textLabelXl(theme)}>|    05:30PM</Text>
                  </View>
                  <View style={{height:280,width:'100%',paddingHorizontal:20,marginVertical:10}}>
                      <Timeline
                          showTime={false}
                          circleSize={20}
                          circleColor={theme.colors.secondry}
                          innerCircle={'icon'}
                          lineColor={theme.colors.secondry}
                          separatorStyle={{backgroundColor:'transparent',height:5,}}
                          separator={true}
                          style={{width:'100%',marginLeft:-10,}}
                          titleStyle={[styles.banktitle(theme),{marginTop:-14,marginLeft:0}]}
                          descriptionStyle={[styles.payTime(theme),{marginTop:0}]}
                          data={[
                            {time: '05:34', title: 'Rent Amount (Includes Rent, Maintenace etc)', description:this.descriptionLoopItem('INR 30,000',"Per Month"), icon: require('../../../assets/images/step-round.png')},
                            {time: '07:17', title: 'Service Charges', description: this.descriptionLoopItem('INR 450',"15% of the Rent Amount and Maintenance Charge"), icon: require('../../../assets/images/step-round.png')},
                            {time: '07:17', title: 'Service Charge', description: 'INR 28', icon: require('../../../assets/images/step-round.png')},
                        ]}
                      />
                    </View>
                  <View style={styles.total_warp}>
                    <Text style={styles.total_amount} adjustsFontSizeToFit>TOTAL AMOUNT PAYABLE</Text>
                    <Text style={styles.total_amount_light} adjustsFontSizeToFit>Per Month</Text>
                    <Text style={styles.total_amount_price} adjustsFontSizeToFit>INR 35,553</Text>
                    <Text style={styles.total_amount_light} adjustsFontSizeToFit>(Rent Amount + Bank Charges + Service Charge)</Text>
                  </View>
              </ScrollView>
              <View style={styles.PopupbtnWrapper}>
                  <TouchableOpacity onPress={()=>this.rejectConfirm()}>
                    <Text adjustsFontSizeToFit style={styles.reject}>REJECT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.setState({visiblemodal:false})}>
                    <Text adjustsFontSizeToFit style={styles.accept}>ACCEPT</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </Modal>
      )
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
