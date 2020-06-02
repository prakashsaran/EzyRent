import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH,
  NAVIGATION_MORE_EDIT_BANK_ACCOUNT_VIEW_PATH,
} from '../../../navigation/routes';
import { FloatingAction } from "react-native-floating-action";

class MyBankaccount extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      activeAction:null,
    }
    StatusBar.setBarStyle("dark-content");
  }
  goToMyBankaccount(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  showAction(number){
    const {activeAction} = this.state
    if(activeAction==number){
      this.setState({activeAction:null})
    } else{
      this.setState({activeAction:number})
    }
  }
  editBankAccount(account){
    this.setState({activeAction:null})
    NavigationService.navigate(NAVIGATION_MORE_EDIT_BANK_ACCOUNT_VIEW_PATH);
  }
  deleteBankAccount(account){
    console.log(account)
    this.setState({activeAction:null})
  }
  addNewBankAccount(){
    NavigationService.navigate(NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH);
  }
  render(){
    const theme = this.context;
    const {activeAction} = this.state
      return (
        <ImageBackground style={{width:'100%',height:'100%',backgroundColor:'#fff'}}>
          <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
            <TouchableOpacity onPress={()=>NavigationService.goBack()} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
              <Image style={styles.back_button} source={require('../../../assets/images/back-blue.png')}></Image>
              <Text style={theme.typography.pageTitleSecondary}>My Bank Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.addNewBankAccount()}><Image style={styles.plus} source={require('../../../assets/images/plus.png')}></Image></TouchableOpacity>
          </View>
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
              <TouchableWithoutFeedback onPress={() => this.showAction(null)}>
                <View style={[theme.typography.rectView2,styles.rectviewcustom]}>
                  <View style={[styles.shadow,{zIndex:2}]}>
                    <View style={styles.MoreLinkswrap}>
                      <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                        <Image style={styles.User_image} source={require('../../../assets/images/bank-account-icon.png')}></Image>
                        <TouchableOpacity style={styles.UserWrap}>
                          <View style={styles.heading_wrap}>
                            <Text style={styles.MoreLinksItem(theme)}>Dubai Finance Bank</Text>
                          </View>
                          <Text style={styles.AccountNo(theme)}>XXXX1546 XXX 1234</Text>
                          <View style={styles.contentWrap}>
                          <Image style={styles.gps_dark_icon} source={require('../../../assets/images/gps_dark.png')}></Image>
                          <Text style={styles.MoreLinksItemSub(theme)}>Sharjah, Dubai, UAE</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                        <TouchableOpacity onPress={()=>this.showAction(1)}>
                           <Image style={styles.three_dots_light} source={require('../../../assets/images/three-dot-light.png')}></Image>
                        </TouchableOpacity>
                        {activeAction==1 && <View style={styles.hideShow}>
                          <TouchableOpacity onPress={()=>this.editBankAccount(1)} style={{paddingVertical:5,paddingHorizontal:10}}>
                            <Text style={styles.edit}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>this.deleteBankAccount(1)} style={{paddingVertical:5,paddingHorizontal:10}}>
                            <Text style={styles.edit}>Delete</Text>
                          </TouchableOpacity>
                        </View>}
                    </View>
                  </View>

                  <View style={[styles.shadow,{zIndex:1}]}>
                    <View style={styles.MoreLinkswrap}>
                      <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
                        <Image style={styles.User_image} source={require('../../../assets/images/bank-account-icon.png')}></Image>
                        <TouchableOpacity style={styles.UserWrap}>
                          <View style={styles.heading_wrap}>
                            <Text style={styles.MoreLinksItem(theme)}>Dubai Finance Bank</Text>
                          </View>
                          <Text style={styles.AccountNo(theme)}>XXXX1546 XXX 1234</Text>
                          <View style={styles.contentWrap}>
                          <Image style={styles.gps_dark_icon} source={require('../../../assets/images/gps_dark.png')}></Image>
                          <Text style={styles.MoreLinksItemSub(theme)}>Sharjah, Dubai, UAE</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                        <TouchableOpacity style={{height:40,width:20,alignItems:'flex-end'}} onPress={()=>this.showAction(2)}>
                           <Image style={styles.three_dots_light} source={require('../../../assets/images/three-dot-light.png')}></Image>
                        </TouchableOpacity>
                        {activeAction==2 && <View style={styles.hideShow}>
                          <TouchableOpacity onPress={()=>this.editBankAccount(2)} style={{paddingVertical:5,paddingHorizontal:10}}>
                            <Text style={styles.edit}>Edit</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>this.deleteBankAccount(2)} style={{paddingVertical:5,paddingHorizontal:10}}>
                            <Text style={styles.edit}>Delete</Text>
                          </TouchableOpacity>
                        </View>}
                    </View>
                  </View>

                </View>
                </TouchableWithoutFeedback>
              </ScrollView>
              <FloatingAction floatingIcon={<Text style={{fontSize:26,color:'#fff'}}>+</Text>} animated={false} onPressMain={()=>this.addNewBankAccount()} showBackground={false} color={theme.colors.primary} position={'right'}/>
          </SafeAreaView>
        </ImageBackground>
      );
  }
}
export default MyBankaccount;
