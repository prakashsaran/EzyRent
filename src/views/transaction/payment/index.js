import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
} from '../../../navigation/routes';
import {getMoneyFormat} from '../../../actions';
class PaymentConfirmation extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      property:{},
      goBack:null,
    }
    StatusBar.setBarStyle("light-content");
  }
  componentWillMount(){
    const { navigation} = this.props
    const property = navigation.getParam('property');
    const goBack = navigation.getParam('goBack');
    this.setState({property,goBack});
  }
  addPropertyTenant(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  goToPrevious(){
    const {goBack} = this.state
    if(goBack){
      NavigationService.goBack();
      NavigationService.navigate(goBack);
    } else{
      NavigationService.goBack();
    }
  }
  render(){
    const theme = this.context;
    const {property} = this.state
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
                <View style={styles.titleWrapper}>
                  <TouchableOpacity onPress={()=>this.goToPrevious()} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
                    <Image style={styles.back_button} source={require('../../../assets/images/back-blue.png')}></Image>
                    <Text style={theme.typography.myDashBoard}>Payment</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.rectWrapp}>
                    <View style={[theme.typography.rectView,styles.rectView2]}>

                          <View style={styles.cardDetails}>
                            <Text style={styles.statusText}>Total Amount</Text>
                            <Text style={styles.totalAmount}>INR {getMoneyFormat(property.rent_amount)}</Text>
                          </View>
                          <View style={{marginTop:100}}>
                            <TouchableOpacity style={theme.typography.btnProceed}>
                              <Text style={theme.typography.caption}>Proceed to Payment</Text>
                            </TouchableOpacity>
                          </View>
                    </View>
                </View>
          </SafeAreaView>
        </ImageBackground>
      );
  }
}
export default PaymentConfirmation;
