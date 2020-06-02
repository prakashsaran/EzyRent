import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
} from '../../../navigation/routes';

class TransactionSuccessful extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    StatusBar.setBarStyle("light-content");
  }
  addPropertyTenant(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  render(){
    const theme = this.context;
      return (
        <ImageBackground style={{width:'100%',height:'100%'}} resizeMode={'cover'} source={require('../../../assets/images/dashboard_bg.png')}>
          <SafeAreaView style={styles.container}>
                <View style={styles.titleWrapper}>
                  <Text style={theme.typography.myDashBoard}>Payment</Text>
                </View>

                <View style={styles.rectWrapp}>
                    <View style={[theme.typography.rectView,styles.rectView2]}>
                      <ScrollView showsVerticalScrollIndicator={false}>

                          <View style={styles.payHead}>
                            <View style={styles.iconWrap}>
                              <Image source={require('../../../assets/images/single_tick_light.png')} style={styles.Payicon}/>
                            </View>
                            <Text style={styles.congrats(theme)}>Congrats!</Text>
                            <Text style={styles.statusMessage}>Your payment successfull</Text>
                          </View>
                          <Image style={{width:'100%',height:30}} resizeMode={'stretch'} source={require('../../../assets/images/dashed_bg.png')}></Image>
                          <View style={styles.cardDetails}>
                            <Text style={styles.statusText}>Completed</Text>
                            <Text style={styles.totalAmount}>INR 30,000</Text>

                            <View style={styles.fieldItem}>
                              <Text style={styles.textLabel}>Date</Text>
                              <View style={styles.valueWrap}>
                              <Text style={styles.textValue}>15 March 2020</Text><Text style={styles.textValueSub}>|     05:30PM</Text>
                              </View>
                            </View>

                            <View style={styles.fieldItem}>
                              <Text style={styles.textLabel}>Transaction ID</Text>
                              <Text style={styles.textValue}>1568489XXX993839</Text>
                            </View>

                            <View style={styles.fieldItem}>
                              <Text style={styles.textLabel}>Payment Mode</Text>

                              <View style={styles.cardwrapp}>
                                  <Image style={{width:30,height:30,}} resizeMethod={'auto'} resizeMode={'contain'} source={require('../../../assets/images/credit_card.png')}></Image>
                                  <Text style={styles.cardName}>Paid with Credit/Debit</Text>
                                  <View style={styles.cardStatus}>
                                  <Image style={styles.cardStatusIcn} source={require('../../../assets/images/single_tick_light.png')}></Image>
                                  </View>
                              </View>

                            </View>
                            <View style={styles.secure}>
                              <Image style={styles.secureIcon} resizeMode={'contain'} source={require('../../../assets/images/secure_payment.png')}/>
                              <Text style={styles.secureText}>Secure Transaction</Text>
                            </View>
                          </View>
                          <View style={{width:'100%',height:70,}}></View>
                        </ScrollView>
                    </View>
                </View>
          </SafeAreaView>
        </ImageBackground>
      );
  }
}
export default TransactionSuccessful;
