import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput,Dimensions,Alert,FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";
import NavigationService from '../../../navigation/NavigationService';
import Timeline from 'react-native-timeline-flatlist';
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH,
  NAVIGATION_MORE_TRANSACTION_SUCCESS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,
} from '../../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { EzyRent } from '../../../ezyrent';
class PropertiesLandlord extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      visibleSearch:false,
      collectingRent:[],
      activeTab:1,
      searchQuery:null,
      AccountType:null,
      visiblemodal:false,
    }
    StatusBar.setBarStyle('dark-content');
  }

  /* ================================================================*/
  /* ===================== START COMMON FUNCTION======================*/
  /* ================================================================*/
  


  getMoneyFormat(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };
  ProPertyDetailTenant(property){
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH,{property});
  }
  ProPertyDetailLandlord(property){
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH,{property});
  }
  /* *
  * name getDateFormat
  * @params String
  * @return String
  */
  getDateFormat(item){
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    switch(item.rent_period_id){
      case "1":
        return dayNames[item.rent_day_date];
        break;
      case "2":
        return item.rent_day_date;
        break;
      case "3":
        return item.rent_day_date;
        break;
      case "4":
        return item.rent_day_date;
        break;
      default:
        return null;
    }
  }
  PayRent(){
    NavigationService.navigate(NAVIGATION_MORE_TRANSACTION_SUCCESS_VIEW_PATH)
  }
  goToPropertyDetail(){
    this.setState({visiblemodal:false});
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH)
  }
  goToPropertyOwnerDetail(){
    this.setState({visiblemodal:false});
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH)
  }
  renderTitile(){
    const {AccountType} = this.state
    if(AccountType=="T"){
      return "Properties I am Paying Rent";
    } else if(AccountType=="L"){
      return "Properties I am Collecting Rent";
    } else if(AccountType=="B"){
      return "Properties/Tenants";
    } else{
      return "Properties I am Paying Rent";
    }
  }

  reviewProperty(item){
    const {getPropertyById} = this.props
    getPropertyById(item.id);
    this.setState({visiblemodal:true})
  }

  AcceptProperty(item){
    const {tenantSubmissionOnProperty} = this.props
    tenantSubmissionOnProperty(item.id,"A");
    this.setState({visiblemodal:false})
  }

  RejectProperty(item){
    const {tenantSubmissionOnProperty} = this.props
    tenantSubmissionOnProperty(item.id,"R");
    this.setState({visiblemodal:false})
  }

  getPopupDateFormat(datestring){
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const dateFull = new Date(datestring);
    return dateFull.getDate()+" "+ monthNames[dateFull.getMonth()]+" "+dateFull.getFullYear();
  }

  getPopupTimeFormat(datestring){
    const dateFull = new Date(datestring);
    return dateFull.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
  }


  /* ================================================================*/
  /* ===================== END COMMON FUNCTION======================*/
  /* ================================================================*/


  /* ================================================================*/
  /* ===================== START UI VIEW  ===========================*/
  /* ================================================================*/

  renderHeader(){
    const {visibleSearch,searchQuery,AccountType} = this.state
    return(
      <View style={AccountType=="B"?styles.headWrapp:styles.headWrappSingle}>
        <View style={styles.headcontainer}>
          <View style={styles.textWrapper}>
            <Text numberOfLines={1} style={[theme.typography.title]}>
            {this.renderTitile()}
            </Text>
          </View>
          <View style={styles.rightIconsWrapper}>
            <TouchableOpacity style={styles.iconButton} onPress={()=>this.setState({visibleSearch:!visibleSearch})}>
              <Image style={styles.headerIcon} resizeMode={'contain'} source={require('../../../assets/images/search.png')}/>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.iconButton2}>
            <Image style={styles.headerIcon} resizeMode={'contain'} source={require('../../assets/images/filter.png')}/>
            </TouchableOpacity> */}
          </View>
        </View>
        {visibleSearch && <View style={styles.searchWrap}>
            <View style={styles.inputStyleStack(theme)}>
              <TextInput onChangeText={(searchQuery)=>this.setState({searchQuery})} placeholder="Search" value={searchQuery} style={styles.searchinputStyle}></TextInput>
            </View>
        </View>}
      </View>
    )
  }

  renderTabBar(){
    const {activeTab,AccountType} = this.state
    if(AccountType!="B"){
      return null;
    }
    return(
      <View style={styles.tabWrapp}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.tabsrows}>
              <View style={activeTab==1?styles.Activetabitem(theme):styles.inActivetabitem(theme)}>
                <TouchableOpacity onPress={()=>this.setState({activeTab:1})} style={styles.tabaction}>
                  <Text style={activeTab==1?styles.Activetabtitle(theme):styles.inActivetabtitle(theme)}>I am Paying Rent</Text>
                </TouchableOpacity>
              </View>
              <View style={activeTab==2?styles.Activetabitem(theme):styles.inActivetabitem(theme)}>
                <TouchableOpacity onPress={()=>this.setState({activeTab:2})} style={styles.tabaction}>
                  <Text style={activeTab==2?styles.Activetabtitle(theme):styles.inActivetabtitle(theme)}>I am Collecting Rent</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
      </View>
    )
  }
  render(){
    const theme = this.context;
    const {activeTab} = this.state
      return (
          <SafeAreaView style={styles.container(theme)}>
            {this.renderHeader()}
                {this.renderCollectingPropertiest()}
              <FloatingAction floatingIcon={<Text style={{fontSize:26,color:'#fff'}}>+</Text>} onPressMain={()=>this.addPropertyTenant()} showBackground={false} visible={activeTab==2?true:false} color={theme.colors.primary} position={'right'}/>

          </SafeAreaView>
      );
  }
  
  renderCollectingItems(item,inx){
      return (
        <View key={inx} style={styles.loopitem}>
          <ImageBackground imageStyle={styles.loopitembgcltg} style={styles.loopitembgcltg} resizeMode={'cover'} source={this.fasterImageRender(item)}>
            <ImageBackground imageStyle={styles.loopitembgcltgIn} style={styles.loopitembgcltgIn} resizeMode={'stretch'} source={require('../../../assets/images/properties_item_bg.png')}>
              <Text style={styles.itemName(theme)}>{item.house_number} {'\n'}{item.building_name}</Text>
               <TouchableOpacity onPress={()=>this.ProPertyDetailLandlord(item)} style={styles.nextscreen(theme)}><Image style={styles.arrow_right} source={require('../../../assets/images/arrow_right.png')}></Image></TouchableOpacity>
               <View style={styles.propertygnInfo}>
                  <View style={styles.propInforowleft}>
                    {item.process=="due"?
                      <Image style={styles.due_label} source={require("../../../assets/images/due_label.png")}></Image>
                    :null}
                  </View>
                  <View style={styles.propInforowright}>
                    <View style={styles.propInfoAttrb}>
                      <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../../assets/images/map_ellipse.png')}></Image>
                      <Text style={styles.propItemattrLocation(theme)}>{item.location}</Text>
                    </View>
                    <View style={styles.propInfoAttrb}>
                      <Image style={{width:30,height:30}} resizeMode={'contain'} source={require('../../../assets/images/calendar_ellipse.png')}></Image>
                      {item.property_status =="A"&&<Text style={styles.awaitingforapproval(theme)}>{item.awaiting_text}</Text>}
                      {item.process=="reject"&&<Text style={styles.propItemattrvalueError(theme)}>Contract Rejected by Tenant</Text>}
                      {item.property_status =="O" &&
                        <Text style={item.process=="due"?styles.propItemattrvalueError(theme):styles.propItemattrvalue(theme)}>INR {this.getMoneyFormat(item.rent_amount,0)} {item.due_text} {this.getDateFormat(item)}</Text>
                      }
                    </View>
                    {item.process=="due"?
                      <View style={styles.markwrap}>
                        <TouchableOpacity>
                          <Text style={styles.marktext(theme)}>MARK AS PAID</Text>
                        </TouchableOpacity>
                      </View>
                    :null}
                    {item.process=="reject"&&
                      <View style={styles.markwrap}>
                        <TouchableOpacity onPress={()=>this.addPropertyTenant()}>
                          <Text style={styles.marktext(theme)}>MODIFY <Image style={styles.right_arrow} source={require('../../../assets/images/arrow_next.png')}></Image></Text>
                        </TouchableOpacity>
                      </View>}
                  </View>
               </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      )
  }
  fasterImageRender(item){
    if(!item.property_image || item.property_image==null || item.property_image==''){
      return require('../../../assets/images/sample/sample_image_1.png');
    }
    return {uri:`${EzyRent.getMediaUrl()}${item.property_image}`};
  }
  renderCollectingPropertiest(){
    const {propertiesLandlord} = this.props
    console.log("propertiesLandlord is",JSON.stringify(propertiesLandlord));
    
    if(propertiesLandlord.items.length >0 ){
     return (
      <View style={styles.properties(theme)}>
        <FlatList
          style={{minHeight:Dimensions.get('window').height,paddingHorizontal:1}}
          data={propertiesLandlord.items}
          renderItem={({ item,index }) => this.renderCollectingItems(item,index)}
          keyExtractor={item => item.id}
        />
      </View>
     )
    }
    return(
      <View style={styles.properties(theme)}>
        <Text style={{textAlign:'center'}}>Properties Not Available</Text>
      </View>
    )
  }




  /* ================================================================*/
  /* ===================== END UI VIEW  ===========================*/
  /* ================================================================*/

}

const mapStateToProps = ({ propertiesLandlord }) => {
  const { items,refreshing,error, success, loading } = propertiesLandlord;
  return { items,refreshing,error, success, loading, };
};

PropertiesLandlord.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  refreshing: PropTypes.bool,
  items: PropTypes.object,
};

PropertiesLandlord.defaultProps = {
  error: null,
  success: null,
  loading: false,
  refreshing:false,
  customer:null,
  items:[],
};

export default connect(mapStateToProps, {})(PropertiesLandlord);
