import React, { Component } from "react";
import { TouchableOpacity, View, Image, ImageBackground, Text,SafeAreaView, ScrollView } from "react-native";
import Svg, { Path } from "react-native-svg";
import NavigationService from '../../../navigation/NavigationService';
import Timeline from 'react-native-timeline-flatlist'
import styles from './style';
import { ThemeContext, theme } from '../../../theme';
import {
    NAVIGATION_TENANT_PROFILE_VIEW_PATH,
    NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  } from '../../../navigation/routes';

class ViewPropertyTenant extends React.Component {
    static contextType = ThemeContext;
    constructor(props){
      super();
    }
    goToTenantProfile(){
        NavigationService.navigate(NAVIGATION_TENANT_PROFILE_VIEW_PATH)
    }
    goToEditProperty(){
        NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
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
    render(){
        const theme = this.context;
        return (
            <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'repeat'} imageStyle={{width:'100%',}} source={require('../../../assets/images/property_view_bg.png')}>
                <SafeAreaView style={styles.container(theme)}>
                    <View>
                    {this.renderHeader(theme)}
                    <View style={styles.detailContainer}>
                        <View style={styles.gpsWrapp}>
                            <TouchableOpacity style={styles.gpscontainer(theme)}><Image style={styles.gpsIcon} resizeMode={'contain'} source={require('../../../assets/images/gps.png')}></Image></TouchableOpacity>
                            <Text style={styles.gpsTitle(theme)}>View Map</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.infoContainer}>
                                <View style={styles.propertyInfo(theme)}>
                                    <Text style={styles.pageTitle(theme)}>#ABC 12</Text>
                                    <Text style={styles.pageTitle(theme)}>1BHK Apartment at Golf Links</Text>
                                    <View style={styles.ownerInfo}>
                                        <Text style={styles.textLabel(theme)}>Rented to</Text>
                                        <TouchableOpacity onPress={()=>this.goToTenantProfile()}><Text style={styles.textValue(theme)}>Red Rows Property</Text></TouchableOpacity>
                                        <Text style={styles.textLabel(theme)}>(+91 - 9684686438)</Text>
                                    </View>
                                    <View style={styles.locationWrapp}>
                                        <Image resizeMode={'contain'} style={{width:20,height:20,marginRight:5,marginLeft:-5}} source={require('../../../assets/images/gps_dark.png')}></Image>
                                        <Text style={styles.textLabel(theme)}>
                                            Kuravankonam, Trivandrum, Kerala
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View style={{paddingTop:10,}}>
                                        <View style={styles.payamountPeriod}>
                                            <Text style={styles.pageTitle(theme)}>INR 25,0000</Text>
                                            <Text style={styles.textLabel(theme)}> Per month</Text>
                                        </View>
                                        <Text style={styles.payTimeBld(theme)}>Next Rent due on 01 March 2020</Text>
                                    </View>
                                    <TouchableOpacity style={styles.eraseBtn(theme)}>
                                       <Image resizeMode={'contain'} style={styles.eraseIcon} source={require('../../../assets/images/erase.png')}></Image>
                                       <Text style={styles.eraseTitle(theme)}>DELETE PROPERTY</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.paymentInfo(theme)}>
                                    <View style={styles.bankacInfoXl}>
                                        <Text style={styles.banktitle(theme)}>Bank Details</Text>
                                        <Text style={styles.textLabelXl(theme)}>ICICI Bank (XXXX-12342345)</Text>
                                        <Text style={styles.textLabelXl(theme)}>Althara Branch, Trivandrum</Text>
                                    </View>
                                    <View style={styles.bankacInfo}>
                                        <Text style={styles.banktitle(theme)}>Previous Dues</Text>
                                        <Text style={styles.textLabelXl(theme)}>None</Text>
                                        <Text style={styles.banktitle(theme)}>(This Year)</Text>
                                    </View>
                                </View>

                                <View style={{height:30,width:'100%'}}></View>
                                <Timeline
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
                                />
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

export default ViewPropertyTenant;
