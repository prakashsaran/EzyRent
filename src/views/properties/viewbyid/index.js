import React, { Component } from "react";
import { TouchableOpacity, View, Image, ImageBackground, Text,SafeAreaView, ScrollView,TextInput,ActivityIndicator,Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
import NavigationService from '../../../navigation/NavigationService';
import Timeline from 'react-native-timeline-flatlist'
import styles from '../viewtenant/style';
import { ThemeContext, theme } from '../../../theme';
import {
    NAVIGATION_TENANT_PROFILE_VIEW_PATH,
    NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
    NAVIGATION_EDIT_PROPERTIES_VIEW_PATH,
    NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,
    NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH,
    NAVIGATION_MORE_TRANSACTION_PAYMENT_CONFIRMATION_VIEW_PATH,
  } from '../../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getPropertyById,getCountryCodeFormat,deleteProperty,getMoneyFormat,tenantSubmissionOnProperty } from '../../../actions';
import Modal from 'react-native-modal';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { EzyRent } from '../../../ezyrent';   
import {isIphoneX} from '../../../components';
import Spinner from 'react-native-loading-spinner-overlay';
const secureTextHidden = '../../../assets/images/securetext_hidden.png';
const secureTextShow = '../../../assets/images/securetext_show.png';

class ViewPropertyById extends React.Component {
    static contextType = ThemeContext;
    constructor(props){
      super();
      this.state={
          isconfirmModalVisible:false,
          isTenantconfirmModalVisible:false,
          mpin:undefined,
          secureTextEntry:true,
          errorMessage:null,
      }
    }

    // ================= ================= =========================
    // ================= TENANT ACTION LIST START===================
    // ================= ================= =========================
    AcceptProperty(item){
        const {tenantSubmissionOnProperty,customer} = this.props
        this.setState({isTenantconfirmModalVisible:false});
        tenantSubmissionOnProperty(item.id,"A",customer);
        NavigationService.goBack();
      }
    
      RejectProperty(item){
        const {tenantSubmissionOnProperty,customer,} = this.props
        this.setState({isTenantconfirmModalVisible:false})
        tenantSubmissionOnProperty(item.id,"R",customer);
        NavigationService.goBack();
      }

    PayRent(property){
         NavigationService.navigate(NAVIGATION_MORE_TRANSACTION_PAYMENT_CONFIRMATION_VIEW_PATH,{property,goBack:NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH})
    }

    // ================= ================= =========================
    // ================= TENANT ACTION LIST END===================
    // ================= ================= =========================

    UNSAFE_componentWillMount(){
        const {navigation,getPropertyById} = this.props
        const propery_id = navigation.getParam("propery_id");
        getPropertyById(propery_id);
    }
    goToPropertyOwnerDetail(landlord_id){
        NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,{landlord_id})
    }

    goToTenantProfile(tenant_id){
        NavigationService.navigate(NAVIGATION_TENANT_PROFILE_VIEW_PATH,{tenant_id})
    }
    goToEditProperty(){
        const {buildingData,property_currentItem,navigation} = this.props
        const currentBuilding = buildingData.find(function(item){
            if(item.building_name==property_currentItem.building_name){
                return item;
            }
            return null;
        });
        let crntBuildin_id = null;
        if(currentBuilding){
            crntBuildin_id = currentBuilding.id;
        }
    
        const item = {
            id:property_currentItem.id,
            rent_amount:property_currentItem.total_amount,
            house_number:property_currentItem.house_number,
            building_id:crntBuildin_id,
            rent_period_id:property_currentItem.rent_period_id,
            rent_day_date:property_currentItem.rent_next_day_date,
            property_status:"A"
        }
        NavigationService.navigate(NAVIGATION_EDIT_PROPERTIES_VIEW_PATH,{property:property_currentItem,item});
    }
    deleteSubmitProperty(){
      const { mpin } = this.state;
      const {deleteProperty,customer,property_currentItem} = this.props
      const formdata = {mpin};
      if(mpin && mpin.length===4){
        this.setState({errorMessage:null});
        deleteProperty(property_currentItem.id,formdata,customer);
        this.setState({isconfirmModalVisible:false,errorMessage:null,mpin:""});          
      } else{
        this.setState({errorMessage:"Sorry, Please specify four digit APP-PIN"});
      }
    }

    goToPrevious(){
        const { navigation } = this.props
        const backscreen = navigation.getParam('goBack');
        if(backscreen){
          NavigationService.goBack()
          NavigationService.navigate(backscreen);
        } else{
            NavigationService.goBack()
        }
    }
    
    renderHeader(theme){
        const {property_currentItem} = this.props;
        return(
          <View style={styles.headerContainer(theme)}>
            <View style={styles.headerContext}>
              <TouchableOpacity onPress={()=>this.goToPrevious()} style={styles.backscreen}>
                <Image style={styles.backscreen} resizeMode={'stretch'} source={require('../../../assets/images/back-white.png')}></Image>
              </TouchableOpacity>
              {(property_currentItem.user_role==1 && property_currentItem.property_status != "D") && <TouchableOpacity onPress={()=>this.goToEditProperty()}>
                <Image style={[styles.backscreen,styles.backscreen2]} resizeMode={'cover'} source={require('../../../assets/images/edit-green.png')}></Image>
              </TouchableOpacity>}
            </View>
          </View>
        )
    }
    renderInfoTimeline(){
        return(
            <Text style={styles.payTime(theme)}>You received rent of <Text style={{color:theme.colors.primaryTitleColor,fontWeight:'bold'}}>INR 25000</Text> for this property</Text>
        )
    }
    renderbuttonsRole(property){
        if(property.user_role==1 && property.property_status !="D"){
            return(
                <TouchableOpacity style={styles.eraseBtn(theme)} onPress={()=>this.setState({isconfirmModalVisible:true})}>
                    <Image resizeMode={'contain'} style={styles.eraseIcon} source={require('../../../assets/images/erase.png')}></Image>
                    <Text style={styles.eraseTitle(theme)}>DELETE PROPERTY</Text>
                </TouchableOpacity>
            )
        } else if(property.user_role==2 && property.property_status=="A"){
            return(
                <TouchableOpacity onPress={()=>this.setState({isTenantconfirmModalVisible:true})} style={styles.primaryBtn(theme)}>
                    <Text style={styles.primaryBtnText(theme)}>ACCEPT</Text>
                </TouchableOpacity>
            )
        } else if(property.user_role==2 && property.property_status=="O"){
            return(
                <TouchableOpacity onPress={()=>this.PayRent(property)} style={styles.primaryBtn(theme)}>
                    <Text style={styles.primaryBtnText(theme)}>PAY NOW</Text>
                </TouchableOpacity>
            )

        }
        return null;
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
        }
      }
      renderFastImage(property_image){
        if(property_image && property_image !=""){
          return {uri:`${EzyRent.getMediaUrl()}${property_image}`}
        }
        return require("../../../assets/images/building_placehoder.jpg");
      }
  
      renderTenantConfirmModal(property_currentItem){
        const {isTenantconfirmModalVisible} = this.state
        return (
          <Modal animationInTiming={600} animationOutTiming={600} onBackdropPress={()=>{this.setState({isTenantconfirmModalVisible:false})}} isVisible={isTenantconfirmModalVisible}>
              <View style={styles.popupContainer(theme)}>
                <Text style={styles.columntitlePop1(theme)}>Are you sure to Accept?</Text>
                <View style={styles.fieldWrapp}>
                </View>
                  <View style={styles.popupBtms}>
                    <TouchableOpacity onPress={()=>this.RejectProperty(property_currentItem)}>
                      <Text style={styles.cancel}>REJECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.AcceptProperty(property_currentItem)}>
                      <Text style={styles.ok}>ACCEPT</Text>
                    </TouchableOpacity>
  
                  </View>
              </View>
          </Modal>
        );
    }


    renderConfirmModalModal(){
        const {secureTextEntry,isconfirmModalVisible,errorMessage} = this.state
        return (
          <Modal animationInTiming={600} animationOutTiming={600} onBackdropPress={()=>{this.setState({isconfirmModalVisible:false})}} isVisible={isconfirmModalVisible}>
              <View style={styles.popupContainer(theme)}>
               <Text style={styles.columntitlePop1(theme)}>Are you sure to delete?</Text>
                <Text style={styles.columntitlePopDesc(theme)}>Please confirm deletion with your MPIN.</Text>
                <Text style={styles.columntitlePop1(theme),{marginTop:30,}}>Enter MPIN</Text>
                <View style={styles.fieldWrapp}>
                <View style={styles.pincontainer(theme)}>
                  <OTPInputView
                    pinCount={4}
                    autoFocusOnLoad={false}
                    style={styles.pininputBox(theme)}
                    secureTextEntry={secureTextEntry}
                    onCodeChanged={(code)=>{this.setState({errorMessage:null,mpin:code})}}
                    codeInputHighlightStyle={errorMessage?styles.errorunderlineStyleHighLighted(theme):styles.underlineStyleHighLighted(theme)}
                    codeInputFieldStyle={errorMessage?styles.errorunderlineStyleBase(theme):styles.underlineStyleBase(theme)}
                  />
                  <TouchableOpacity style={styles.visibilityIconWrapp} onPress={()=>{this.setState({secureTextEntry:!secureTextEntry})}}>
                    <Image style={styles.visibilityIcon} source={secureTextEntry?require(secureTextHidden):require(secureTextShow)}/>
                  </TouchableOpacity>
                </View>
                </View>
                {errorMessage && <Text style={styles.errorMessage(theme)}>{errorMessage}</Text>}
                  <View style={styles.popupBtms}>
                    <TouchableOpacity onPress={()=>this.setState({isconfirmModalVisible:false,errorMessage:null,mpin:""})}>
                      <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
  
                    <TouchableOpacity onPress={()=>this.deleteSubmitProperty()}>
                      <Text style={styles.ok}>Ok</Text>
                    </TouchableOpacity>
  
                  </View>
              </View>
          </Modal>
        );
      }
    renderMyMemeber(){
        const {property_currentItem} = this.props;
        if(property_currentItem.user_role==2){
            return(
                <View style={styles.ownerInfo}>
                    <Text style={styles.textLabel(theme)}>{property_currentItem.tenant_text}</Text>
                    <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail(property_currentItem.landlord_id)}><Text style={styles.textValue(theme)}>{property_currentItem.landlord_details[0].landlord_name}</Text></TouchableOpacity>
                </View>
            )
    
        } else if(property_currentItem.user_role==1) {
            if(property_currentItem.tenant_id){
                return(
                    <View style={styles.ownerInfo}>
                        <Text style={styles.textLabel(theme)}>{property_currentItem.landlord_text}</Text>
                        <TouchableOpacity onPress={()=>this.goToTenantProfile(property_currentItem.tenant_id)}><Text style={styles.textValue(theme)}>{property_currentItem.tenant_details[0].tenant_name}</Text></TouchableOpacity>
                        <Text style={styles.textLabel(theme)}>({getCountryCodeFormat(property_currentItem.tenant_details[0].tenant_ccd)} - {property_currentItem.tenant_details[0].tenant_mobile})</Text>
                    </View>
                )
            }
            return(
                <View style={styles.ownerInfo}>
                    <Text style={styles.textValue(theme)}>Not Available</Text>
                </View>
            )
        } 
        return null;
        
    }
    render(){
        const theme = this.context;
        const {property_loading,property_currentItem} = this.props;
        if(property_loading || !Object.keys(property_currentItem).length){
          return (<SafeAreaView style={styles.container(theme)}><Spinner visible={property_loading} textContent={'Loading...'} textStyle={{color: '#FFF'}}/></SafeAreaView>)
          }

        return (

            <ImageBackground style={{width:'100%',height:'100%'}}
             resizeMode={'cover'} imageStyle={{width:'100%',height:isIphoneX()?350:300}} 
             //source={{uri:`${EzyRent.getMediaUrl()}${property_currentItem.property_image}`}}
             source={this.renderFastImage(property_currentItem.property_image)}
             >
                <SafeAreaView style={styles.container(theme)}>
                    <View>
                    {this.renderHeader(theme)}
                    <View style={styles.detailContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.infoContainer}>
                                <View style={styles.propertyInfo(theme)}>
                                    <Text style={styles.pagePropertyTitle(theme)}>{property_currentItem.house_number}</Text>
                                    <Text style={styles.pagePropertyTitle(theme)}>{property_currentItem.building_name}</Text>
                                    {this.renderMyMemeber()}
                                    <View style={styles.locationWrapp}>
                                        <Image resizeMode={'contain'} style={{width:20,height:20,marginRight:5,marginLeft:-5}} source={require('../../../assets/images/gps_dark.png')}></Image>
                                        <Text style={styles.textLabel(theme)}>
                                            {property_currentItem.location}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View>
                                        <View style={styles.payamountPeriod}>
                                            <Text style={styles.pageTitle(theme)}>{property_currentItem.total_amount_display}</Text>
                                            <Text style={[styles.textLabel(theme),styles.textLabel2(theme),{color:'#878787',paddingTop:5,}]}> {this.renderPayPeriod(property_currentItem.rent_period_id)}</Text>
                                        </View>
                                        {property_currentItem.property_status !="A"? <Text style={styles.payTime(theme)}>{property_currentItem.rent_due_text} {property_currentItem.rent_date_time}</Text>:null}
                                    </View>
                                    {this.renderbuttonsRole(property_currentItem)}
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View style={styles.bankacInfoXl}>
                                        <Text style={styles.banktitle(theme)}>Bank Details</Text>
                                        <Text style={styles.textLabelXl(theme)}>{property_currentItem.bank_name} ({property_currentItem.bank_account_number})</Text>
                                        <Text style={styles.textLabelXl(theme)}>{property_currentItem.bank_additional_details}</Text>
                                    </View>
                                    <View style={styles.bankacInfo}>
                                        <Text style={styles.banktitle(theme)}>Previous Dues</Text>
                                        <Text style={styles.textLabelXl(theme)}> None</Text>
                                        <Text style={styles.banktitle(theme)}>(This Year)</Text>
                                    </View>
                                </View>

                                <View style={{height:30,width:'100%'}}></View>
                                {/*<Timeline
                                    showTime={false}
                                    circleSize={20}
                                    circleColor={theme.colors.secondry}
                                    innerCircle={'icon'}
                                    lineColor={theme.colors.secondry}
                                    separatorStyle={{backgroundColor:'transparent',height:5,}}
                                    separator={true}
                                    style={{width:'100%',marginLeft:-10}}
                                    titleStyle={[styles.banktitle(theme),{marginTop:-14,marginLeft:0}]}
                                    descriptionStyle={[styles.payTime(theme),{marginTop:0}]}
                                    data={[
                                        {time: '05:34', title: '15 January 2020, 05:34 PM ', description: this.renderInfoTimeline('You paid rent of INR 25000 for this property'), icon: require('../../../assets/images/step-round.png')},
                                        {time: '07:17', title: '15 December 2019, 07:17 PM ', description:  this.renderInfoTimeline('You paid rent of INR 25000 for this property'), icon: require('../../../assets/images/step-round.png')},
                                    ]}
                                />*/}
                                <View style={{height:70,width:'100%'}}></View>
                                {this.renderConfirmModalModal()}
                                {this.renderTenantConfirmModal(property_currentItem)}
                            </View>
                        </ScrollView>
                    </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        )
    }
}


const mapStateToProps = ({account, properties,building }) => {
    const { customer } = account;
    const {property_currentItem,property_loading} = properties
    const { buildingData } = building;
    return { property_currentItem,property_loading,customer,buildingData };
  };

  ViewPropertyById.propTypes = {
    customer: PropTypes.object,
    buildingData: PropTypes.object,
    tenantSubmissionOnProperty: PropTypes.func.isRequired,
    getPropertyById: PropTypes.func.isRequired,
    deleteProperty: PropTypes.func.isRequired,
    property_currentItem: PropTypes.object,
    property_loading: PropTypes.bool,
  };


  ViewPropertyById.defaultProps = {
    customer: {},
    buildingData: [],
    property_currentItem: {},
    property_loading: false,

  };

  export default connect(mapStateToProps, {getPropertyById,deleteProperty,tenantSubmissionOnProperty})(ViewPropertyById);
