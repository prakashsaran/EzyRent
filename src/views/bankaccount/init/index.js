import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground,TouchableWithoutFeedback,FlatList,ActivityIndicator,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../../navigation/NavigationService';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH,
  NAVIGATION_MORE_EDIT_BANK_ACCOUNT_VIEW_PATH,
  NAVIGATION_MORE_INIT_VIEW_PATH,
} from '../../../navigation/routes';
import { FloatingAction } from "react-native-floating-action";

import { getBanks,deleteBank } from '../../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MyBankaccount extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      activeAction:null,
      DeviceWidth:Dimensions.get('window').width,
      DeviceHeight: Dimensions.get('window').height,
    }
    this.onLayout = this.onLayout.bind(this);
    StatusBar.setBarStyle("dark-content");
  }
  onLayout(e) {
    this.setState({
      DeviceWidth: Dimensions.get('window').width,
      DeviceHeight: Dimensions.get('window').height,
    });
  }

  UNSAFE_componentWillMount(){
    const { getBanks } = this.props
    getBanks("",0,10);
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
    NavigationService.navigate(NAVIGATION_MORE_EDIT_BANK_ACCOUNT_VIEW_PATH,{account});
  }
  deleteBankAccount(account){
    const {deleteBank} = this.props;
    deleteBank(account)
    this.setState({activeAction:null})
  }
  addNewBankAccount(){
    NavigationService.navigate(NAVIGATION_MORE_ADD_NEW_BANK_ACCOUNT_VIEW_PATH);
  }

  renderItems(){
    const {activeAction} = this.state
    const {bankData} = this.props
    return bankData.map((item,inx)=>{
      
      return(
            <View key={inx} style={[styles.shadow,{zIndex:200-inx}]}>
                <View style={styles.MoreLinkswrap}>
                  <View style={{flexDirection:'row',justifyContent:'flex-start',width:'87%',overflow:'hidden'}}>
                    <Image style={styles.User_image} source={require('../../../assets/images/bank-account-icon.png')}></Image>
                    <TouchableOpacity style={styles.UserWrap}>
                      <View style={styles.heading_wrap}>
                        <Text style={styles.MoreLinksItem(theme)}>{item.name}</Text>
                      </View>
                      <Text style={styles.AccountNo(theme)}>{item.account_no}</Text>
                      <View style={styles.contentWrap}>
                        <Image style={styles.gps_dark_icon} source={require('../../../assets/images/gps_dark.png')}></Image>
                        <Text style={styles.MoreLinksItemSub(theme)}>{(item.additional_details && item.additional_details!="undefined")?item.additional_details:"N/A"}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                    <TouchableOpacity style={{width:30,height:30,justifyContent:'flex-end',alignItems:'flex-end',}} onPress={()=>this.showAction(item.id)}>
                       <Image style={activeAction==item.id?styles.active_three_dots_light:styles.three_dots_light} source={require('../../../assets/images/three-dot-light.png')}></Image>
                    </TouchableOpacity>
                    {activeAction==item.id && <View style={styles.hideShow}>
                      <TouchableOpacity onPress={()=>this.editBankAccount(item)} style={styles.editDelete}>
                        <Text style={styles.edit}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.deleteBankAccount(item.id)} style={styles.editDelete}>
                        <Text style={styles.edit}>Delete</Text>
                      </TouchableOpacity>
                    </View>}
                </View>
              </View>
        )
    })
    
  }
  renderPlaceHolder(){
    const {DeviceHeight} = this.state
    return(
        <View style={{width:"100%",minHeight:DeviceHeight-140,backgroundColor:'#f8f8f8',alignItems:'center',flexDirection:'row',justifyContent:'center',}}>
          <View style={{alignSelf:'center',flexDirection:'column',}}>
            <Image resizeMode={'contain'} source={require("../../../assets/images/no-data.png")}> 
            </Image>
            <Text style={{alignSelf:'center',width:'100%',textAlign:'center',color:'#bfbfbf',marginTop:5,}}>
              No data available
            </Text>
          </View>
        </View>
      );
  }

  render(){
    const theme = this.context;
    const {bankData,loading} = this.props;
    if(loading){
      return (<View style={{alignSelf:'center',justifyContent:'center',width:'100%',height:'100%'}}><ActivityIndicator color={'#315ADD'} size={'large'} /></View>)
    }
    if(!Object.keys(bankData).length){
      return(
        <ImageBackground style={{width:'100%',height:'100%',backgroundColor:'#fff'}}>
          <SafeAreaView  onLayout={this.onLayout} style={styles.container}>
          <View style={styles.titleWrapper}>
            <TouchableOpacity onPress={()=>NavigationService.navigate(NAVIGATION_MORE_INIT_VIEW_PATH)} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
              <Image style={styles.back_button} source={require('../../../assets/images/back-blue.png')}></Image>
              <Text style={theme.typography.pageTitleSecondary}>My Bank Accounts</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={()=>this.addNewBankAccount()}><Image style={styles.plus} source={require('../../../assets/images/plus.png')}></Image></TouchableOpacity>*/}
          </View>
           {this.renderPlaceHolder()}
           <FloatingAction floatingIcon={<Text style={{fontSize:26,color:'#fff'}}>+</Text>} onPressMain={()=>this.addNewBankAccount()} showBackground={false} color={theme.colors.primary} position={'right'}/>
           </SafeAreaView>
        </ImageBackground>
      )
    }
      return ( 
        <ImageBackground style={{width:'100%',height:'100%',backgroundColor:'#fff'}}>
          <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
            <TouchableOpacity onPress={()=>NavigationService.navigate(NAVIGATION_MORE_INIT_VIEW_PATH)} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
              <Image style={styles.back_button} source={require('../../../assets/images/back-blue.png')}></Image>
              <Text style={theme.typography.pageTitleSecondary}>My Bank Accounts</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={()=>this.addNewBankAccount()}><Image style={styles.plus} source={require('../../../assets/images/plus.png')}></Image></TouchableOpacity>*/}
          </View>
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <TouchableWithoutFeedback onPress={() => this.showAction(null)}>
                <View style={[theme.typography.rectView2,styles.rectviewcustom]}>
                  {this.renderItems()}
                </View>
                </TouchableWithoutFeedback>
              </ScrollView>
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
  deleteBank: PropTypes.func,
};

MyBankaccount.defaultProps = {
  error: null,
  success: null,
  loading: false,
  refreshing:false,
  bankData:[],
};

export default connect(mapStateToProps, {getBanks,deleteBank})(MyBankaccount);