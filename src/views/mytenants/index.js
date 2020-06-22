import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_TENANT_PROFILE_VIEW_PATH,
  NAVIGATION_MORE_MY_TENANTS_VIEW_PATH,
} from '../../navigation/routes';
import {getMyTenant,getCountryCodeFormat} from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {EzyRent} from '../../ezyrent';
import { cos } from "react-native-reanimated";

class MyTenants extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    StatusBar.setBarStyle("dark-content");
  }
  goToMyTenants(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  UNSAFE_componentWillMount(){
    const {getMyTenant,customer} = this.props
    getMyTenant(customer);
  }
  renderFirstImage(item){
    if(item.profile_pic && item.profile_pic !=""){
      return {uri:`${EzyRent.getMediaUrl()}${item.profile_pic}`}      
    }
    return require("../../assets/images/default.jpg")

  }

  render(){
    const theme = this.context;
    const {items} = this.props;
      if(!items.length){
        return(
              <SafeAreaView style={styles.container}>
                <View style={styles.titleWrapper}>
                  <TouchableOpacity onPress={()=>NavigationService.goBack()} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
                      <Image style={styles.back_button} source={require('../../assets/images/back-blue.png')}></Image>
                      <Text style={theme.typography.pageTitleSecondary}> My Tenants</Text>
                  </TouchableOpacity>
                  
                </View>
                  <ScrollView
                  showsVerticalScrollIndicator={false}
                  >
                    <View style={[theme.typography.rectView2,styles.rectviewcustom]}>
                      <View style={{width:"100%",minHeight:'100%',backgroundColor:'#f8f8f8',alignItems:'center',flexDirection:'row',justifyContent:'center',}}>
                        <View style={{alignSelf:'center',flexDirection:'column',}}>
                          <Image resizeMode={'contain'} source={require("../../assets/images/no-data.png")}> 
                          </Image>
                          <Text style={{alignSelf:'center',width:'100%',textAlign:'center',color:'#bfbfbf',marginTop:5,}}>
                            No data available
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ScrollView>
              </SafeAreaView>
        )
      }
      return (
          <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
            <TouchableOpacity onPress={()=>NavigationService.goBack()} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
                <Image style={styles.back_button} source={require('../../assets/images/back-blue.png')}></Image>
                <Text style={theme.typography.pageTitleSecondary}>My Tenants</Text>
            </TouchableOpacity>
            
          </View>
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <View style={[theme.typography.rectView2,styles.rectviewcustom]}>
                    {this.renderItems()}
                </View>
              </ScrollView>
          </SafeAreaView>
      );
  }

  renderItems(){
    const {items} = this.props
    return items.map((item,inx)=>{
      return(
              <TouchableOpacity onPress={()=>NavigationService.navigate(NAVIGATION_MORE_TENANT_PROFILE_VIEW_PATH,{tenant_id:item.tenant_id,goBack:NAVIGATION_MORE_MY_TENANTS_VIEW_PATH})} style={styles.shadow} key={inx}>
                  <View style={styles.MoreLinkswrap}>
                  <Image style={styles.User_image}
                   //source={{uri:`${EzyRent.getMediaUrl()}${item.profile_pic}`}}
                   source={this.renderFirstImage(item)}
                   ></Image>
                  <View style={styles.UserWrap}>
                    <View style={styles.heading_wrap}>
                      <Text style={styles.MoreLinksItem(theme)}>{item.full_name}</Text>
                      <Text style={styles.MoreLinksItemSub(theme)}>({getCountryCodeFormat(item.mobile_country_code)} {item.mobile})</Text>
                    </View>
                    {/* <View style={styles.contentWrap}>
                    <Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image>
                    <Text style={styles.MoreLinksItemLocation(theme)}>No.13, Metro Falt, Sheikh Mohammed Rd. Dubai, UAE</Text>
                    </View>*/}
                  </View>
                </View>
            </TouchableOpacity>
      )
    });
  }


}


const mapStateToProps = ({ account,mytenant }) => {
  const { customer } = account;
  const {items,loading} = mytenant;
  return { loading, customer,items };
};

MyTenants.propTypes = {
  loading: PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
  items:PropTypes.oneOfType(PropTypes.object,null),
  getMyTenant: PropTypes.func.isRequired,
};

MyTenants.defaultProps = {
  loading: false,
  customer:{},
  items:[],
};

export default connect(mapStateToProps, {getMyTenant})(MyTenants);
