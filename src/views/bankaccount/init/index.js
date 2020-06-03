import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,TouchableWithoutFeedback,FlatList,ActivityIndicator } from "react-native";
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

import { getBanks } from '../../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MyBankaccount extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      activeAction:null,
    }
    StatusBar.setBarStyle("dark-content");
  }

  UNSAFE_componentWillMount(){
    const { getBanks } = this.props
    getBanks("",0,10);
    console.log("componentWillMount hello test")
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

  renderItem(item){
    const {activeAction} = this.state
    return(
      <TouchableWithoutFeedback onPress={() => this.showAction(null)}>
      <View style={[theme.typography.rectView2,styles.rectviewcustom]}>
      <View style={[styles.shadow,{zIndex:1}]}>
        <View style={styles.MoreLinkswrap}>
          <View style={{flexDirection:'row',justifyContent:'flex-start'}}>
            <Image style={styles.User_image} source={require('../../../assets/images/bank-account-icon.png')}></Image>
            <TouchableOpacity style={styles.UserWrap}>
              <View style={styles.heading_wrap}>
                <Text style={styles.MoreLinksItem(theme)}>{item.name}</Text>
              </View>
              <Text style={styles.AccountNo(theme)}>XXXX1546 XXX 1234</Text>
              <View style={styles.contentWrap}>
              <Image style={styles.gps_dark_icon} source={require('../../../assets/images/gps_dark.png')}></Image>
              <Text style={styles.MoreLinksItemSub(theme)}>Sharjah, Dubai, UAE</Text>
              </View>
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={{height:40,width:20,alignItems:'flex-end'}} onPress={()=>this.showAction(2)}>
                <Image style={activeAction==2?styles.active_three_dots_light:styles.three_dots_light} source={require('../../../assets/images/three-dot-light.png')}></Image>
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
    )
  }
  render(){
    const theme = this.context;
    const {bankData,loading} = this.props;
    if(loading){
      return (<View style={{alignSelf:'center',justifyContent:'center',width:'100%',height:'100%'}}><ActivityIndicator color={'#315ADD'} size={'large'} /></View>)
    }
      return (
        <ImageBackground style={{width:'100%',height:'100%',backgroundColor:'#fff'}}>
          <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
            <TouchableOpacity onPress={()=>NavigationService.goBack()} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
              <Image style={styles.back_button} source={require('../../../assets/images/back-blue.png')}></Image>
              <Text style={theme.typography.pageTitleSecondary}>My Bank Accounts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.addNewBankAccount()}><Image style={styles.plus} source={require('../../../assets/images/plus.png')}></Image></TouchableOpacity>
          </View>
              {!bankData.length > 0 && <Text style={{textAlign:'center'}}>Currently no bank account available</Text>}
                <FlatList
                  data={bankData}
                  renderItem={({ item,index }) => this.renderItem(item,index)}
                  keyExtractor={item => item.id}
                />
              <FloatingAction floatingIcon={<Text style={{fontSize:26,color:'#fff'}}>+</Text>} onPressMain={()=>this.addNewBankAccount()} showBackground={false} color={theme.colors.primary} position={'right'}/>
          </SafeAreaView>
        </ImageBackground>
      );
  }
}

const mapStateToProps = ({ bankAccount }) => {
  const { error, success,loading, refreshing,bankData } = bankAccount;

  return { error, success, loading, refreshing,bankData  };
};

MyBankaccount.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  refreshing:PropTypes.bool,
  bankData:PropTypes.oneOfType(PropTypes.object,null),
  getBanks: PropTypes.func,
};

MyBankaccount.defaultProps = {
  error: null,
  success: null,
  loading: false,
  refreshing:false,
  bankData:[],
};

export default connect(mapStateToProps, {getBanks})(MyBankaccount);