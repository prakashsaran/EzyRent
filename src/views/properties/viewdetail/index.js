import React, { Component } from "react";
import { TouchableOpacity, View, Image, ImageBackground, Text,SafeAreaView, ScrollView,Alert } from "react-native";
import Svg, { Path } from "react-native-svg";
import NavigationService from '../../../navigation/NavigationService';
import Timeline from 'react-native-timeline-flatlist'
import styles from '../viewtenant/style';
import { ThemeContext, theme } from '../../../theme';
import {
    NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,
    NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH,
  } from '../../../navigation/routes';
import {EzyRent} from '../../../ezyrent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {tenantSubmissionOnProperty } from '../../../actions';

class ViewPropertyTenant extends React.Component {
    static contextType = ThemeContext;
    constructor(props){
      super();
      this.state ={
          property:{},
      }
    }

    UNSAFE_componentWillMount(){
        const {navigation} = this.props
        const property = navigation.getParam("property");
        this.setState({property})
    }

    goToPropertyOwnerDetail(landlord_id){
        NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,{landlord_id})
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
    renderInfoTimeline(value){
        return(
            <Text style={styles.payTime(theme)}>You paid rent of <Text style={{color:theme.colors.primaryTitleColor,fontWeight:'bold'}}>INR 25000</Text> for this property</Text>
        )
    }

    AcceptProperty(item){
        const {tenantSubmissionOnProperty,customer} = this.props
        tenantSubmissionOnProperty(item.id,"A",customer);
        NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH)
      }
    
      RejectProperty(item){
        const {tenantSubmissionOnProperty,customer,} = this.props
        tenantSubmissionOnProperty(item.id,"R",customer);
        NavigationService.navigate(NAVIGATION_PROPERTIES_TENANTS_VIEW_PATH)
      }
      renderFastImage(property_image){
        if(property_image && property_image !=""){
          return {uri:`${EzyRent.getMediaUrl()}${property_image}`}
        }
        return require("../../../assets/images/building_placehoder.jpg");
      }
  
  
    confirmProperty(property_currentItem){
        Alert.alert(
            "Are you sure to Accept?",
          "",
          [
            {
              text: "REJECT",
              onPress: () => this.RejectProperty(property_currentItem),
              style: "cancel"
            },
            { text: "ACCEPT", onPress: () => this.AcceptProperty(property_currentItem) }
          ],
          { cancelable: false }
        );
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
  
    render(){
        const theme = this.context;
        const {property} = this.state
        return (
            <ImageBackground style={{width:'100%',height:'100%'}}
             resizeMode={'cover'} imageStyle={{width:'100%',height:300}} 
             //source={{uri:`${EzyRent.getMediaUrl()}${property.property_image}`}}
             source={this.renderFastImage(property.property_image)}
             >
                <SafeAreaView style={styles.container(theme)}>
                    <View>
                    {this.renderHeader(theme)}
                    <View style={styles.detailContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.infoContainer}>
                                <View style={styles.propertyInfo(theme)}>
                                    <Text style={styles.pagePropertyTitle(theme)}>{property.house_number}</Text>
                                    <Text style={styles.pagePropertyTitle(theme)}>{property.building_name}</Text>
                                    <View style={styles.ownerInfo}>
                                        <Text style={styles.textLabel(theme)}>{property.tenant_text}</Text>
                                        <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail(property.landlord_id)}><Text style={styles.textValue(theme)}>{property.landlord_details[0].landlord_name}</Text></TouchableOpacity>
                                    </View>
                                    <View style={styles.locationWrapp}>
                                        <Image resizeMode={'contain'} style={{width:20,height:20,marginRight:5,marginLeft:-5}} source={require('../../../assets/images/gps_dark.png')}></Image>
                                        <Text style={styles.textLabel(theme)}>
                                            {property.location}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View>
                                        <View style={styles.payamountPeriod}>
                                            <Text style={styles.pageTitle(theme)}>{property.total_amount_display}</Text>
                                            <Text style={[styles.textLabel(theme),styles.textLabel2(theme),{color:'#878787',paddingTop:5,}]}> {this.renderPayPeriod(property.rent_period_id)}</Text>
                                        </View>
                                        <Text style={styles.payTime(theme)}>{property.rent_due_text} {property.rent_date_time}</Text>
                                    </View>
                                    {property.user_role ==2 &&
                                    <TouchableOpacity onPress={()=>{this.confirmProperty(property)}} style={styles.primaryBtn(theme)}>
                                        <Text style={styles.primaryBtnText(theme)}>ACCEPT</Text>
                                    </TouchableOpacity>}
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View style={styles.bankacInfoXl}>
                                        <Text style={styles.banktitle(theme)}>Bank Details</Text>
                                        <Text style={styles.textLabelXl(theme)}>{property.bank_name} ({property.bank_account_number})</Text>
                                        <Text style={styles.textLabelXl(theme)}>{property.bank_additional_details}</Text>
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



const mapStateToProps = ({ account }) => {
    const { customer } = account;
    return {customer };
  };
  
  ViewPropertyTenant.propTypes = {
    customer: PropTypes.object,
    tenantSubmissionOnProperty: PropTypes.func,
};
  
ViewPropertyTenant.defaultProps = {
    customer: {},  
  };
  
  export default connect(mapStateToProps, {tenantSubmissionOnProperty})(ViewPropertyTenant);
  