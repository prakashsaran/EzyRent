import React, { Component } from "react";
import { TouchableOpacity, View, Image, ImageBackground, Text,SafeAreaView, ScrollView,TextInput,ActivityIndicator } from "react-native";
import Svg, { Path } from "react-native-svg";
import NavigationService from '../../../navigation/NavigationService';
import Timeline from 'react-native-timeline-flatlist'
import styles from './style';
import { ThemeContext, theme } from '../../../theme';
import {
    NAVIGATION_TENANT_PROFILE_VIEW_PATH,
    NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
    NAVIGATION_EDIT_PROPERTIES_VIEW_PATH,
  } from '../../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getPropertyById,getCountryCodeFormat,deleteProperty,getMoneyFormat } from '../../../actions';
import Modal from 'react-native-modal';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { EzyRent } from '../../../ezyrent';   
const secureTextHidden = '../../../assets/images/securetext_hidden.png';
const secureTextShow = '../../../assets/images/securetext_show.png';

class ViewPropertyTenant extends React.Component {
    static contextType = ThemeContext;
    constructor(props){
      super();
      this.state={
          isconfirmModalVisible:false,
          mpin:undefined,
          secureTextEntry:true,
          errorMessage:null,
      }
    }

    UNSAFE_componentWillMount(){
        const {navigation,getPropertyById} = this.props
        const currentProperty = navigation.getParam("property");
        getPropertyById(currentProperty.id);
    }

    goToTenantProfile(tenant_id){
        NavigationService.navigate(NAVIGATION_TENANT_PROFILE_VIEW_PATH,{tenant_id})
    }
    goToEditProperty(){
        const {property_currentItem,navigation} = this.props
        const item = navigation.getParam("property");
        NavigationService.navigate(NAVIGATION_EDIT_PROPERTIES_VIEW_PATH,{property:property_currentItem,item});
    }
    deleteSubmitProperty(){
      const { mpin } = this.state;
      const {deleteProperty,customer,property_currentItem} = this.props
      const formdata = {mpin};
      if(mpin && mpin.length===4){
        this.setState({errorMessage:null});
        deleteProperty(property_currentItem.id,formdata);
        this.setState({isconfirmModalVisible:false,errorMessage:null,mpin:""});          
      } else{
        this.setState({errorMessage:"Sorry, Please specify four digit APP-PIN"});
      }
    }
    renderHeader(theme){
        return(
          <View style={styles.headerContainer(theme)}>
            <View style={styles.headerContext}>
              <TouchableOpacity onPress={()=>NavigationService.goBack()} style={styles.backscreen}>
                <Image style={styles.backscreen} resizeMode={'stretch'} source={require('../../../assets/images/back-white.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.goToEditProperty()}>
                <Image style={[styles.backscreen,styles.backscreen2]} resizeMode={'cover'} source={require('../../../assets/images/edit-green.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        )
    }
    renderInfoTimeline(){
        return(
            <Text style={styles.payTime(theme)}>You received rent of <Text style={{color:theme.colors.primaryTitleColor,fontWeight:'bold'}}>INR 25000</Text> for this property</Text>
        )
    }
    renderConfirmModalModal(){
      const {secureTextEntry,isconfirmModalVisible,errorMessage} = this.state
      return (
        <Modal onBackdropPress={()=>{this.setState({isconfirmModalVisible:false})}} isVisible={isconfirmModalVisible}>
            <View style={{ width:'95%',height:errorMessage?160:140,backgroundColor:'#fff',borderRadius:5,alignSelf:'center' }}>
              <Text style={styles.confirmBoxTitle(theme)}>Confirm your App Pin</Text>
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
              {errorMessage && <Text style={styles.errorMessage(theme)}>{errorMessage}</Text>}
                <View style={{flexDirection:'row',justifyContent:'space-between',width:"90%",paddingTop:10,alignSelf:'center',paddingHorizontal:20}}>
                  <TouchableOpacity onPress={()=>this.setState({isconfirmModalVisible:false,errorMessage:null,mpin:""})}>
                    <Text style={styles.eraseTitle(theme)}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=>this.deleteSubmitProperty()}>
                    <Text>Ok</Text>
                  </TouchableOpacity>

                </View>
            </View>
        </Modal>
      );
    }
    render(){
        const theme = this.context;
        const {property_loading,property_currentItem} = this.props;
        if(property_loading || !Object.keys(property_currentItem).length){
            return (<View style={{alignSelf:'center',justifyContent:'center',width:'100%',height:'100%'}}><ActivityIndicator color={theme.colors.secondry} size={'large'} /></View>)
          }
          
        return (
            <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} imageStyle={{width:'100%'}} source={{uri:`${EzyRent.getMediaUrl()}${property_currentItem.property_image}`}}>
                <SafeAreaView style={styles.container(theme)}>
                    <View>
                    {this.renderHeader(theme)}
                    <View style={styles.detailContainer}>
                        
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.infoContainer}>
                                <View style={styles.propertyInfo(theme)}>
                                    <Text style={styles.pageTitle(theme)}>{property_currentItem.house_number}</Text>
                                    <Text style={styles.pageTitle(theme)}>{property_currentItem.building_name}</Text>
                                    <View style={styles.ownerInfo}>
                                        <Text style={styles.textLabel(theme)}>{property_currentItem.landlord_text}</Text>
                                        {property_currentItem.tenant_id &&<TouchableOpacity onPress={()=>this.goToTenantProfile(property_currentItem.tenant_id)}><Text style={styles.textValue(theme)}>{property_currentItem.tenant_details[0].tenant_name}</Text></TouchableOpacity>}
                                        {property_currentItem.tenant_id &&<Text style={styles.textLabel(theme)}>({getCountryCodeFormat(property_currentItem.tenant_details[0].tenant_ccd)} - {property_currentItem.tenant_details[0].tenant_mobile})</Text>}
                                        {!property_currentItem.tenant_id && <Text style={styles.textValue(theme)}>Not Available</Text>}
                                    </View>
                                    <View style={styles.locationWrapp}>
                                        <Image resizeMode={'contain'} style={{width:20,height:20,marginRight:5,marginLeft:-5}} source={require('../../../assets/images/gps_dark.png')}></Image>
                                        <Text style={styles.textLabel(theme)}>
                                            {property_currentItem.location}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View style={{paddingTop:10,}}>
                                        <View style={styles.payamountPeriod}>
                                            <Text style={styles.pageTitle(theme)}>{property_currentItem.rent_split_up.rent_amount}</Text>
                                            <Text style={styles.textLabel(theme),{color:'#878787',paddingTop:5,}}> Per month</Text>
                                        </View>
                                     <Text style={styles.payTimeBld(theme)}>{property_currentItem.rent_due_text} {/*01 March 2020*/} {property_currentItem.rent_next_day_date}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.eraseBtn(theme)} onPress={()=>this.setState({isconfirmModalVisible:true})}>
                                       <Image resizeMode={'contain'} style={styles.eraseIcon} source={require('../../../assets/images/erase.png')}></Image>
                                       <Text style={styles.eraseTitle(theme)}>DELETE PROPERTY</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View style={styles.bankacInfoXl}>
                                        <Text style={styles.banktitle(theme)}>Bank Details</Text>
                                        <Text style={styles.textLabelXl(theme)}>{property_currentItem.bank_name} ({property_currentItem.bank_account_number})</Text>
                                        {(property_currentItem.bank_additional_details && property_currentItem.bank_additional_details !="undefined") && <Text style={styles.textLabelXl(theme)}>{property_currentItem.bank_additional_details}</Text>}
                                    </View>
                                    <View style={styles.bankacInfo}>
                                        <Text style={styles.banktitle(theme)}>Previous Dues</Text>
                                        <Text style={styles.textLabelXl(theme)}>None</Text>
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
                                    titleStyle={[styles.banktitle(theme),{marginTop:-14}]}
                                    descriptionStyle={[styles.payTime(theme),{marginTop:-5}]}
                                    data={[
                                        {time: '05:34', title: '15 January 2020, 05:34 PM ', description: this.renderInfoTimeline('You paid rent of INR 25000 for this property'), icon: require('../../../assets/images/step-round.png')},
                                        {time: '07:17', title: '15 December 2019, 07:17 PM ', description: this.renderInfoTimeline('You paid rent of INR 25000 for this property'), icon: require('../../../assets/images/step-round.png')},
                                    ]}
                                  />*/}
                                <View style={{height:140,width:'100%'}}></View>
                            </View>
                            {this.renderConfirmModalModal()}
                        </ScrollView>
                    </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        )
    }
}


const mapStateToProps = ({ properties }) => {
    const {property_currentItem,property_loading} = properties
    return { property_currentItem,property_loading };
  };

  ViewPropertyTenant.propTypes = {
    getPropertyById: PropTypes.func.isRequired,
    deleteProperty: PropTypes.func.isRequired,
    property_currentItem: PropTypes.object,
    property_loading: PropTypes.bool,
  };


  ViewPropertyTenant.defaultProps = {
    property_currentItem: {},
    property_loading: false,

  };

  export default connect(mapStateToProps, {getPropertyById,deleteProperty})(ViewPropertyTenant);
