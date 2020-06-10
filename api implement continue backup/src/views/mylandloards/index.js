import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
} from '../../navigation/routes';
import {getMyLandlord,getCountryCodeFormat} from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {EzyRent} from '../../ezyrent';

class MyLandloads extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    StatusBar.setBarStyle("dark-content");
  }
  goToMyTenants(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  UNSAFE_componentWillMount(){
    const {getMyLandlord,customer} = this.props
    getMyLandlord(customer);
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
                      <Text style={theme.typography.pageTitleSecondary}> My Landlords</Text>
                  </TouchableOpacity>
                  
                </View>
                  <ScrollView
                  showsVerticalScrollIndicator={false}
                  >
                    <View style={[theme.typography.rectView2,styles.rectviewcustom]}>
                      <Text style={{textAlign:'center'}}>No items found</Text>
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
                <Text style={theme.typography.pageTitleSecondary}> My Landlords</Text>
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
      console.log("==========ooooooo========",JSON.stringify(item))
      return(
              <View style={styles.shadow} key={inx}>
                  <View style={styles.MoreLinkswrap}>
                  <Image style={styles.User_image}
                   source={{uri:`${EzyRent.getMediaUrl()}${item.profile_pic}`}}
                   ></Image>
                  <TouchableOpacity style={styles.UserWrap}>
                    <View style={styles.heading_wrap}> 
                      <Text style={styles.MoreLinksItem(theme)}>{item.full_name}</Text>
                      <Text style={styles.MoreLinksItemSub(theme)}>({getCountryCodeFormat(item.mobile_country_code)} {item.mobile})</Text>
                    </View>
                    {/* <View style={styles.contentWrap}>
                    <Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image>
                    <Text style={styles.MoreLinksItemLocation(theme)}>No.13, Metro Falt, Sheikh Mohammed Rd. Dubai, UAE</Text>
                    </View>*/}
                  </TouchableOpacity>
                </View>
            </View>
      )
    });
  }

}


const mapStateToProps = ({ account,mylandlord }) => {
  const { customer } = account;
  const {items,loading} = mylandlord;
  return { loading, customer,items };
};

MyLandloads.propTypes = {
  loading: PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
  items:PropTypes.oneOfType(PropTypes.object,null),
  getMyLandlord: PropTypes.func.isRequired,
};

MyLandloads.defaultProps = {
  loading: false,
  customer:{},
  items:[],
};

export default connect(mapStateToProps, {getMyLandlord})(MyLandloads);
