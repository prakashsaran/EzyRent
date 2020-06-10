import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from '../style';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH,
} from '../../../navigation/routes';
import {getPropertiesForTenant,getPropertyById,getCountryCodeFormat,tenantSubmissionOnProperty,getMyProfile} from '../../../actions';
import Modal from 'react-native-modal';
import Timeline from 'react-native-timeline-flatlist';

class NewDashboard extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      visiblemodal:false
    }
    StatusBar.setBarStyle("light-content");
    StatusBar.setHidden(false)
  }
  UNSAFE_componentWillMount(){
    const {getPropertiesForTenant} = this.props
    getPropertiesForTenant("",0,10);

    console.log("============================= ============= test request componentWillMount")
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    const {items,getPropertyById} = this.props
    if(nextProps.items != items){
      const slectedProperty = nextProps.items.find(function(item){
        if(item.property_status=="A"){
            return item;
        }
        return null;
      });
      if(slectedProperty){
        getPropertyById(slectedProperty.id);
        this.setState({visiblemodal:true})
      }
    }
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
    const {visiblemodal} = this.state
    const {property_currentItem} = this.props
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
                        <TouchableOpacity onPress={()=>this.addPropertyTenant()} style={styles.intcolums(theme)}>
                          <View style={styles.intcolumsInner}>
                          <Image style={styles.intIcons} source={require('../../../assets/images/dashboard_add_properties.png')}></Image>
                            <Text style={styles.intcTitle(theme)}>Add New Property/Tenant</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.dashboard_img_wrap}>
                        <Image style={styles.dashboard_img} resizeMode={'stretch'} source={require('../../../assets/images/new-user-dashboard.png')}/>
                        <Text style={styles.new_user_text}>For all dashboard features to work Add a Tenant/Property or be Added by a Landlord</Text>
                      </View>

                    </View>
                  </ScrollView>
                </View>
                {(visiblemodal && Object.keys(property_currentItem).length) && this.renderModelView()}
          </SafeAreaView>
        </ImageBackground>
      );
  }
  /// popup model view

  descriptionLoopItem(amount,period){
    return(
     <View>
       <Text style={styles.payTime(theme)}>{amount}</Text>
       <Text style={styles.timePeriodExtra(theme)}>{period}</Text>
     </View>
    )
   }
   rejectConfirm(property_currentItem){
    Alert.alert(
      "",
      "Are you sure to reject?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.RejectProperty(property_currentItem) }
      ],
      { cancelable: false }
    );
  }


  AcceptProperty(item){
    const {tenantSubmissionOnProperty,getMyProfile,customer} = this.props
    tenantSubmissionOnProperty(item.id,"A");
    this.setState({visiblemodal:false})
    setTimeout(() => {
      getMyProfile(customer);
      }, 3000);
  }
  RejectProperty(item){
    const {tenantSubmissionOnProperty} = this.props
    tenantSubmissionOnProperty(item.id,"R");
    this.setState({visiblemodal:false})
  }

  renderModelView()
    {
      const {property_currentItem} = this.props
      return(
        <Modal isVisible={this.state.visiblemodal} style={styles.visiblemodal}>
            <View style={styles.PopupContainer}>
            <Image style={styles.congrats_img(theme)} resizeMode={'stretch'} source={require('../../../assets/images/congrats.png')}/>
              <Text style={styles.congrats_head} adjustsFontSizeToFit>Congrats!</Text>
              <ScrollView style={{height:theme.dimens.popupHeight}}>
                  <View style={styles.congrats_content(theme)}>
                    <Text style={styles.light_color} adjustsFontSizeToFit>You have been added as Tenant of </Text>
                    <TouchableOpacity onPress={()=>this.goToPropertyDetail()}><Text style={{color:'#315add',fontFamily:'Oxygen-Bold',}} adjustsFontSizeToFit> {property_currentItem.house_number}</Text></TouchableOpacity>
                    <Text style={styles.light_color} adjustsFontSizeToFit> in Building {property_currentItem.building_name}, {property_currentItem.location} by Landlord  </Text>
                    <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail()}><Text adjustsFontSizeToFit style={{color:'#315add',fontFamily:'Oxygen-Bold',}}>Red Rows Properties</Text></TouchableOpacity>
                    <Text adjustsFontSizeToFit style={[styles.light_color,{fontWeight:'bold'}]}> ({getCountryCodeFormat(property_currentItem.landlord_details[0].landlord_ccd)}-{property_currentItem.landlord_details[0].landlord_mobile})</Text>
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
                  <View style={styles.timeline}>
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
                            {time: '07:17', title: 'Bank charges', description: this.descriptionLoopItem('INR 450',"1.5% of the Rent Amount and Maintenance Charge"), icon: require('../../../assets/images/step-round.png')},
                            {time: '07:17', title: 'Service Charges', description: 'INR 28', icon: require('../../../assets/images/step-round.png')},
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
                      <TouchableOpacity onPress={()=>this.rejectConfirm(property_currentItem)}>
                        <Text style={styles.reject}>REJECT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.AcceptProperty(property_currentItem)}>
                        <Text style={styles.accept}>ACCEPT</Text>
                      </TouchableOpacity>
                  </View>
            </View>
        </Modal>
      )
    }
}

const mapStateToProps = ({ account,propertiesTenant,properties }) => {
  const { error, success, loading,status,customer } = account;
  const {items} = propertiesTenant;
  const {property_currentItem} = properties;
  return { error, success, loading, status, customer,items,property_currentItem };
};

NewDashboard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
  getPropertiesForTenant: PropTypes.func.isRequired,
  getPropertyById: PropTypes.func.isRequired,
  tenantSubmissionOnProperty: PropTypes.func.isRequired,
  getMyProfile: PropTypes.func.isRequired,
  items:PropTypes.object,
  property_currentItem:PropTypes.object,
};

NewDashboard.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
  items:[],
  property_currentItem:{},
};

export default connect(mapStateToProps, {getPropertiesForTenant,getPropertyById,tenantSubmissionOnProperty,getMyProfile})(NewDashboard);
