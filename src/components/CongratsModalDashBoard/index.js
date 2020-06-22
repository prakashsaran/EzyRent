import React, { PureComponent } from "react";
import Modal from 'react-native-modal';
import { ScrollView,TouchableOpacity, View,Image, Text,Alert } from "react-native";
import Timeline from 'react-native-timeline-flatlist';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,
    NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,
    NAVIGATION_DASHBOARD_INIT_VIEW_PATH,
  } from '../../navigation/routes';
import moment from 'moment';
import {getCountryCodeFormat,getPropertiesForTenant,getPropertyById,tenantSubmissionOnProperty,getMyProfile,getActiveRoute} from '../../actions';
import styles from './style';
import { ThemeContext, theme } from '../../theme';
import NavigationService from '../../navigation/NavigationService';

class CongratsModalDashBoard extends PureComponent {
  static contextType = ThemeContext;
    constructor(props){
        super();
        this.state ={
          visiblemodal:false
        }
      }
    
    UNSAFE_componentWillMount(){
        const {getPropertiesForTenant} = this.props
        getPropertiesForTenant("",0,10);
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
          const activeRoute = getActiveRoute();
          if(slectedProperty && activeRoute==NAVIGATION_DASHBOARD_INIT_VIEW_PATH){
            getPropertyById(slectedProperty.id);
            this.setState({visiblemodal:true})
          }
        }
        
      }

      getPopupDateFormat(datestring){
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
    
        const dateFull = new Date(datestring);
        return dateFull.getDate()+" "+ monthNames[dateFull.getMonth()]+" "+dateFull.getFullYear();
      }
    
      getPopupTimeFormat(datestring){
        return moment(datestring).format("hh:mm A");
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
        tenantSubmissionOnProperty(item.id,"A",customer);
        this.setState({visiblemodal:false})
        setTimeout(() => {
          getMyProfile(customer);
          }, 3000);
      }
      RejectProperty(item){
        const {tenantSubmissionOnProperty,customer} = this.props
        tenantSubmissionOnProperty(item.id,"R",customer);
        this.setState({visiblemodal:false})
      }
      goToPropertyDetail(property){
        this.setState({visiblemodal:false});
        NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,{property})
      }
      goToPropertyOwnerDetail(landlord_id){
        this.setState({visiblemodal:false});
        NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,{landlord_id})
      }
    
      descriptionLoopItem(amount,period){
        return(
         <View>
           <Text style={styles.payTime(theme)}>{amount}</Text>
           <Text style={styles.timePeriodExtra(theme)}>{this.renderPayPeriod(period)}</Text>
         </View>
        )
       }
       renderPayPeriod(period){
        switch(period){
          case "1":
            return "Per Week";
            break;
          case "2":
            return "Bi Weekly";
            break;
          case "3":
            return "Per Month";
            break;
          case "4":
            return "Per Year";
            break;
          default:
            return null;
        }
      }
      
      renderPayPeriodHead(period){
        switch(period){
          case "1":
            return "Weekly";
            break;
          case "2":
            return "Bi Weekly";
            break;
          case "3":
            return "Monthly";
            break;
          case "4":
            return "Annually";
            break;
          default:
            return null;
        }
      }
    
       descriptionBankCharge(bankCharges){
        return(
         <View>
           <Text style={styles.payTime(theme)}>{bankCharges.net_banking.amount}</Text>
           <Text style={styles.timePeriodExtra(theme)}>On using Net Banking/UPI</Text>
           <Text style={styles.payTime(theme)}>{bankCharges.debit_card.amount}</Text>
           <Text style={styles.timePeriodExtra(theme)}>On using Debit Card (1.25% of A includes 18% GST)</Text>
           <Text style={styles.payTime(theme)}>{bankCharges.credit_card.amount}</Text>
           <Text style={styles.timePeriodExtra(theme)}>On using Credit Card (1.95% of A, includes 18% GST)</Text>
         </View>
        )
       }
    
    render(){
      const theme = this.context;
      const {property_currentItem,property_loading,customer} = this.props
      if(property_loading || !Object.keys(property_currentItem).length){
        return null;
      }
      return(
            <Modal  onBackdropPress={()=>{this.setState({visiblemodal:false})}} isVisible={this.state.visiblemodal} style={styles.visiblemodal}>
    
                {property_loading ?
                <View style={[styles.PopupContainer,{minHeight:theme.dimens.popupHeight}]}>
                  <ActivityIndicator style={{marginTop:40}} size={'large'} color={'red'}/>
                  </View>
                  :
                  <View style={styles.PopupContainer}>
                    <Image style={styles.congrats_img(theme)} resizeMode={'stretch'} source={require('../../assets/images/congrats.png')}/>
                      <Text style={styles.congrats_head}>Congrats!</Text>
                      <ScrollView style={{height:theme.dimens.popupHeight}}>
                        <View style={styles.congrats_content(theme)}>
                          <Text style={styles.light_color}>You have been added as Tenant of </Text>
                          <TouchableOpacity style={styles.selfCenter}  onPress={()=>this.goToPropertyDetail(property_currentItem)}><Text style={styles.landDetail}> {property_currentItem.house_number}</Text></TouchableOpacity>
                          <Text style={styles.light_color}> in Building {property_currentItem.building_name} by Landlord  </Text>
                          <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail(property_currentItem.landlord_id)}><Text style={styles.landDetail}>{property_currentItem.landlord_details[0].landlord_name}</Text></TouchableOpacity>
                          <Text style={[styles.light_color,{fontWeight:'bold'}]}> ({getCountryCodeFormat(property_currentItem.landlord_details[0].landlord_ccd)}-{property_currentItem.landlord_details[0].landlord_mobile})</Text>
                        </View>
                        <View style={styles.congrats_content(theme)}>
                          <Text style={styles.light_color}>Please confirm the Total Amount Payable {this.renderPayPeriodHead(property_currentItem.rent_period_id)}</Text>
                        </View>
                      <Image style={styles.dash_bar_img(theme)} resizeMode={'stretch'} source={require('../../assets/images/dash-bar-line.png')}/>
                        <View style={styles.bankacInfo}>
                            <Text style={styles.banktitle(theme)}>Added Date</Text>
                        </View>
                        <View style={styles.bankacInfo}>
                            <Text style={styles.textLabelXl(theme)}>{this.getPopupDateFormat(property_currentItem.added_date)}</Text><Text style={styles.textLabelXl(theme)}>|   {this.getPopupTimeFormat(property_currentItem.added_date)}</Text>
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
                                    {time: '05:34', title: 'Amount (Includes Rent, Maintenace etc)', description:this.descriptionLoopItem(property_currentItem.total_amount_display,property_currentItem.rent_period_id), icon: require('../../assets/images/step-round.png')},
                                    {time: '07:17', title: 'Bank charges', description: this.descriptionBankCharge(property_currentItem.rent_split_up.bank_charges), icon: require('../../assets/images/step-round.png')},
                                    {time: '07:17', title: 'Service Charges', description: property_currentItem.rent_split_up.service_charge, icon: require('../../assets/images/step-round.png')},
                                ]}
                            />
                          </View>
                        <View style={styles.total_warp}>
                          <Text style={styles.total_amount}>TOTAL AMOUNT PAYABLE</Text>
                          <Text style={styles.total_amount_light}>{this.renderPayPeriod(property_currentItem.rent_period_id)}</Text>
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
    const {property_currentItem,property_loading} = properties;
    return { error, success, loading, status, customer,items,property_currentItem,property_loading };
  };

  
CongratsModalDashBoard.propTypes = {
    property: PropTypes.object.isRequired,
    getPropertiesForTenant: PropTypes.func.isRequired,
    property_currentItem:PropTypes.object,
    getPropertyById: PropTypes.func.isRequired,
    tenantSubmissionOnProperty: PropTypes.func.isRequired,
    getMyProfile: PropTypes.func.isRequired,
    property_loading:PropTypes.bool,
};
  
CongratsModalDashBoard.defaultProps = {
    property_currentItem:{},
    property_loading:false,
};

export default connect(mapStateToProps, {getPropertiesForTenant,getPropertyById,tenantSubmissionOnProperty,getMyProfile})(CongratsModalDashBoard);
