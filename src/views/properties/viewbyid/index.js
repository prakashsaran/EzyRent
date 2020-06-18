import React, { Component } from "react";
import { TouchableOpacity, View, Image, ImageBackground, Text,SafeAreaView, ScrollView,TextInput,ActivityIndicator } from "react-native";
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
  } from '../../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getPropertyById,getCountryCodeFormat,deleteProperty,getMoneyFormat } from '../../../actions';
import Modal from 'react-native-modal';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { EzyRent } from '../../../ezyrent';   
const secureTextHidden = '../../../assets/images/securetext_hidden.png';
const secureTextShow = '../../../assets/images/securetext_show.png';

class ViewPropertyById extends React.Component {
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

    goToPrevious(){
        const { navigation } = this.props
        const backscreen = navigation.getParam('goBack');
        if(backscreen){
          NavigationService.navigate(backscreen);
        } else{
            NavigationService.goBack()
        }
    }
    
    renderHeader(theme){

        return(
          <View style={styles.headerContainer(theme)}>
            <View style={styles.headerContext}>
              <TouchableOpacity onPress={()=>this.goToPrevious()} style={styles.backscreen}>
                <Image style={styles.backscreen} resizeMode={'stretch'} source={require('../../../assets/images/back-white.png')}></Image>
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
    render(){
        const theme = this.context;
        const {property_loading,property_currentItem} = this.props;
        if(property_loading || !Object.keys(property_currentItem).length){
            return (<View style={{alignSelf:'center',justifyContent:'center',width:'100%',height:'100%'}}><ActivityIndicator color={theme.colors.secondry} size={'large'} /></View>)
          }
          
        return (

            <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} imageStyle={{width:'100%',}} source={{uri:`${EzyRent.getMediaUrl()}${property_currentItem.property_image}`}}>
                <SafeAreaView style={styles.container(theme)}>
                    <View>
                    {this.renderHeader(theme)}
                    <View style={styles.detailContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.infoContainer}>
                                <View style={styles.propertyInfo(theme)}>
                                    <Text style={styles.pagePropertyTitle(theme)}>{property_currentItem.house_number}</Text>
                                    <Text style={styles.pagePropertyTitle(theme)}>{property_currentItem.building_name}</Text>
                                    <View style={styles.ownerInfo}>
                                        <Text style={styles.textLabel(theme)}>{property_currentItem.tenant_text}</Text>
                                        <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail(property_currentItem.landlord_id)}><Text style={styles.textValue(theme)}>{property_currentItem.landlord_details[0].landlord_name}</Text></TouchableOpacity>
                                    </View>
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
                                            <Text style={[styles.textLabel(theme),styles.textLabel2(theme),{color:'#878787',paddingTop:5,}]}> Per month</Text>
                                        </View>
                                        <Text style={styles.payTime(theme)}>{property_currentItem.rent_due_text} {property_currentItem.rent_next_day_date} {/*01 March 2020*/}</Text>
                                    </View>
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View style={styles.bankacInfoXl}>
                                        <Text style={styles.banktitle(theme)}>Bank Details</Text>
                                        <Text style={styles.textLabelXl(theme)}>{property_currentItem.bank_name} ({property_currentItem.bank_account_number})</Text>
                                        {(property_currentItem.bank_additional_details && property_currentItem.bank_additional_details !="undefined") && <Text style={styles.textLabelXl(theme)}>{property_currentItem.bank_additional_details}</Text>}
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
                            </View>
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

  ViewPropertyById.propTypes = {
    getPropertyById: PropTypes.func.isRequired,
    deleteProperty: PropTypes.func.isRequired,
    property_currentItem: PropTypes.object,
    property_loading: PropTypes.bool,
  };


  ViewPropertyById.defaultProps = {
    property_currentItem: {},
    property_loading: false,

  };

  export default connect(mapStateToProps, {getPropertyById,deleteProperty})(ViewPropertyById);
