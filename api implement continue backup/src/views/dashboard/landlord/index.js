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
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH
} from '../../../navigation/routes';
import {getPropertiesForTenant,getPropertyById,getCountryCodeFormat,tenantSubmissionOnProperty,getMyProfile} from '../../../actions';
import Modal from 'react-native-modal';
import Timeline from 'react-native-timeline-flatlist';

class LandlordDashboard extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state ={
      visiblemodal:false
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
  UNSAFE_componentWillMount(){
    const {getPropertiesForTenant} = this.props
    getPropertiesForTenant("",0,10);

    console.log("============================= ============= test request componentWillMount",this.props.customer)
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



//======================================================//
//============ end common function ====================//
//======================================================//

  render(){
    const theme = this.context;
    const {visiblemodal} = this.state;
    const {property_currentItem,customer} = this.props
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
                      <View style={styles.accountstats(theme)}>
                        <Text style={styles.quickLinks(theme)}>Quick Stats</Text>
                        <Text style={styles.statsDesc(theme)}>A quick summary of your account on EzyRent. </Text>
                        <View style={styles.statsdata(theme)}>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>{this.getCollectionRent(customer)}</Text>
                            <Text style={styles.itemInfo(theme)}>Properties I am Collecting Rent</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                          <Text style={styles.itemValue(theme)}>{this.getCollectionTotalRent(customer)}</Text>
                            <Text style={styles.itemInfo(theme)}>Total Rent I have to Receive</Text>
                          </View>
                          <View style={styles.dataItem(theme)}>
                            <Text style={styles.itemValue(theme)}>{this.getConsistencyRentCollect(customer)}</Text>
                            <Text style={styles.itemInfo(theme)}>Consistency in Collecting Rent</Text>
                          </View>
                        </View>
                      </View>
                      <Image style={styles.databg(theme)} resizeMode={'stretch'} source={require('../../../assets/images/dashboard_data_bg.png')}/>
                    </View>
                  </ScrollView>
                </View>
                {(visiblemodal && Object.keys(property_currentItem).length) && this.renderModelView()}
          </SafeAreaView>
        </ImageBackground>
      );
  }
  descriptionBankCharge(bankCharges){
    return(
     <View>
       <Text style={styles.payTime(theme)}>{bankCharges.net_banking.amount}</Text>
       <Text style={styles.timePeriodExtra(theme)}>INR {bankCharges.net_banking.rate} on using Net Banking/UPI</Text>
       <Text style={styles.payTime(theme)}>{bankCharges.debit_card.amount}</Text>
       <Text style={styles.timePeriodExtra(theme)}>{bankCharges.debit_card.rate}% on using Debit Card (1.25% of A includes 18% GST)</Text>
       <Text style={styles.payTime(theme)}>{bankCharges.credit_card.amount}</Text>
       <Text style={styles.timePeriodExtra(theme)}>{bankCharges.credit_card.rate}% on using Credit Card (1.95% of A, includes 18% GST)</Text>
     </View>
    )
   }

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
      const {property_currentItem,property_loading} = this.props
      if(!property_loading && !Object.keys(property_currentItem).length){
        return null;
      }
      console.log("=========property_currentItem property_currentItem property_currentItem=========",JSON.stringify(property_currentItem));
      
      return(
        <Modal isVisible={this.state.visiblemodal} style={styles.visiblemodal}>

            {property_loading ?
            <View style={[styles.PopupContainer,{minHeight:theme.dimens.popupHeight}]}>
              <ActivityIndicator style={{marginTop:40}} size={'large'} color={'red'}/>
              </View>
              :
              <View style={styles.PopupContainer}>
                <Image style={styles.congrats_img(theme)} resizeMode={'stretch'} source={require('../../../assets/images/congrats.png')}/>
                  <Text style={styles.congrats_head}>Congrats!</Text>
                  <ScrollView style={{height:theme.dimens.popupHeight}}>
                    <View style={styles.congrats_content(theme)}>
                      <Text style={styles.light_color}>You have been added as Tenant of </Text>
                      <TouchableOpacity onPress={()=>this.goToPropertyDetail()}><Text style={{color:'#315add',fontFamily:'Oxygen-Bold',}}> {property_currentItem.house_number}</Text></TouchableOpacity>
                      <Text style={styles.light_color}> in Building {property_currentItem.building_name} by Landlord  </Text>
                      <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail()}><Text style={{color:'#315add',fontFamily:'Oxygen-Bold',}}>{property_currentItem.landlord_details[0].landlord_name} Properties</Text></TouchableOpacity>
                      <Text style={[styles.light_color,{fontWeight:'bold'}]}> ({getCountryCodeFormat(property_currentItem.landlord_details[0].landlord_ccd)}-{property_currentItem.landlord_details[0].landlord_mobile})</Text>
                    </View>
                    <View style={styles.congrats_content(theme)}>
                      <Text style={styles.light_color}>Please confirm the Total Amount Payable monthly</Text>
                    </View>
                  <Image style={styles.dash_bar_img(theme)} resizeMode={'stretch'} source={require('../../../assets/images/dash-bar-line.png')}/>
                    <View style={styles.bankacInfo}>
                        <Text style={styles.banktitle(theme)}>Added Date</Text>
                    </View>
                    <View style={styles.bankacInfo}>
                        <Text style={styles.textLabelXl(theme)}>15 March 2020</Text><Text style={styles.textLabelXl(theme)}>|    05:30PM</Text>
                    </View>
                    <View style={styles.timeline}>
                        <Timeline
                            showTime={false}
                            circleSize={20}
                            circleColor={theme.colors.secondry}
                            innerCircle={'icon'}
                            lineColor={theme.colors.secondry}
                            separatorStyle={{backgroundColor:'transparent',height:1,}}
                            separator={true}
                            style={{width:'100%',marginLeft:-10,}}
                            titleStyle={[styles.banktitle(theme),{marginTop:-14,marginLeft:0}]}
                            descriptionStyle={[styles.payTime(theme),{marginTop:0}]}
                            data={[
                                {time: '05:34', title: 'Rent Amount (Includes Rent, Maintenace etc)', description:this.descriptionLoopItem(property_currentItem.rent_split_up.rent_amount,"Per Month"), icon: require('../../../assets/images/step-round.png')},
                                {time: '07:17', title: 'Bank charges', description: this.descriptionBankCharge(property_currentItem.rent_split_up.bank_charges), icon: require('../../../assets/images/step-round.png')},
                                {time: '07:17', title: 'Service Charges', description: property_currentItem.rent_split_up.service_charge, icon: require('../../../assets/images/step-round.png')},
                            ]}
                        />
                      </View>
                    <View style={styles.total_warp}>
                      <Text style={styles.total_amount}>TOTAL AMOUNT PAYABLE</Text>
                      <Text style={styles.total_amount_light}>Per Month</Text>
                      <Text style={styles.total_amount_price}>{property_currentItem.rent_split_up.total_amount.net_banking.amount}</Text>
                      <Text style={styles.paymType}>on using Net Banking/UPI </Text>
                      <Text style={styles.total_amount_price}>{property_currentItem.rent_split_up.total_amount.debit_card.amount}</Text>
                      <Text style={styles.paymType}>on using Debit Card </Text>
                      <Text style={styles.total_amount_price}>{property_currentItem.rent_split_up.total_amount.credit_card.amount}</Text>
                      <Text style={styles.paymType}>on using Credit Card </Text>
                      <Text style={styles.total_amount_light}>(Rent Amount + Bank charge + Service Charge)</Text>
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
              }
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

LandlordDashboard.propTypes = {
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

LandlordDashboard.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
  items:[],
  property_currentItem:{},
};

export default connect(mapStateToProps, {getPropertiesForTenant,getPropertyById,tenantSubmissionOnProperty,getMyProfile})(LandlordDashboard);
