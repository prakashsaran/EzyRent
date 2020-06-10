import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput,Dimensions,Alert,FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingAction } from "react-native-floating-action";
import NavigationService from '../../navigation/NavigationService';
import SampleData from '../../config/sample-data';
import Timeline from 'react-native-timeline-flatlist';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH,
  NAVIGATION_MORE_TRANSACTION_SUCCESS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,
} from '../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { EzyRent } from '../../ezyrent';
import {  getPropertiesForLandlord, getPropertiesForTenant,getPropertyById,getCountryCodeFormat,tenantSubmissionOnProperty } from '../../actions';
class PropertiesTenants extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      visibleSearch:false,
      payingRent:[],
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

  UNSAFE_componentWillReceiveProps(nextProps){
    const {customer,getPropertiesForLandlord} = this.props;
    const {searchQuery} = this.state
    if(nextProps.customer!==customer){
      const updatedUser = nextProps.customer;
        if(updatedUser.hasOwnProperty("user_type")){
          if(updatedUser.user_type){
            this.setState({AccountType:updatedUser.user_type});
          } else{
            this.setState({AccountType:'U'});
          }
          this.reRenderActiveTab(updatedUser.user_type);
        } else{
          this.setState({AccountType:"U"});
        }
        getPropertiesForLandlord(searchQuery,0,10);
    }
  }

  UNSAFE_componentWillMount(){
    const {customer,status}=this.props
    this.loadUserDataAccordingAccountType(customer)
    const properties = SampleData.getPropeties() || [];
    this.setState({payingRent:properties,collectingRent:properties})
    if(status){
      if(customer.hasOwnProperty("user_type")){
        if(customer.user_type){
          this.setState({AccountType:customer.user_type});
        } else{
          this.setState({AccountType:'U'});
        }
      } else{
        this.setState({AccountType:"U"});
      }
    } else{
      this.setState({AccountType:"U"});
    }

  }
  
  /**
   * @name loadUserDataAccordingAccountType
   * @description this function load data according user type
   * @param {JSON} customer
   */
  loadUserDataAccordingAccountType(customer){
    const {getPropertiesForLandlord,getPropertiesForTenant}=this.props
    const {searchQuery} = this.state;
    switch(customer.user_type){
      case "B":
        getPropertiesForLandlord(searchQuery,0,10);
        getPropertiesForTenant(searchQuery,0,10);
        break;
      case "L":
        getPropertiesForLandlord(searchQuery,0,10);
        break;
      case "T":
        getPropertiesForTenant(searchQuery,0,10);
        break;
      default:
        console.log("current user is new user")
        break;
    }

  }

  componentDidMount(){
    const {AccountType} = this.state
    if(AccountType=="U"){
      this.setState({activeTab:1})
    } else if(AccountType=="L"){
      this.setState({activeTab:2})
    } else if(AccountType=="B"){
      this.setState({activeTab:1})
    } else{
      this.setState({activeTab:1})
    }
  }
  reRenderActiveTab(AccountType){
    if(AccountType=="U"){
      this.setState({activeTab:1})
    } else if(AccountType=="L"){
      this.setState({activeTab:2})
    } else if(AccountType=="B"){
      this.setState({activeTab:1})
    } else{
      this.setState({activeTab:1})
    }
  }

  addPropertyTenant(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }

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
  goToPropertyDetail(property){
    this.setState({visiblemodal:false});
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,{property})
  }
goToPropertyOwnerDetail(landlord_id){
    this.setState({visiblemodal:false});
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_OWNER_VIEW_PATH,{landlord_id})
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
    const mpam = (dateFull.getHours() >= 12) ? "PM" : "AM";
    return dateFull.getUTCHours()+":"+dateFull.getMinutes()+ ""+mpam;
  }

  onSearchProperties(searchQuery){
    const {getPropertiesForLandlord,getPropertiesForTenant}=this.props
    const {activeTab} = this.state
    if(activeTab==1){
      getPropertiesForTenant(searchQuery,0,10);
    } else {
      getPropertiesForLandlord(searchQuery,0,10);
    }
    
   // this.setState({searchQuery})
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
              <Image style={styles.headerIcon} resizeMode={'contain'} source={require('../../assets/images/search.png')}/>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.iconButton2}>
            <Image style={styles.headerIcon} resizeMode={'contain'} source={require('../../assets/images/filter.png')}/>
            </TouchableOpacity> */}
          </View>
        </View>
        {visibleSearch && <View style={styles.searchWrap}>
            <View style={styles.inputStyleStack(theme)}>
              <TextInput onChangeText={(searchQuery)=>this.onSearchProperties(searchQuery)} placeholder="Search" value={searchQuery} style={styles.searchinputStyle}></TextInput>
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
                {this.renderTabBar()}
                {this.renderProperties()}
                {this.renderModelView()}
              <FloatingAction floatingIcon={<Text style={{fontSize:26,color:'#fff'}}>+</Text>} onPressMain={()=>this.addPropertyTenant()} showBackground={false} visible={activeTab==2?true:false} color={theme.colors.primary} position={'right'}/>

          </SafeAreaView>
      );
  }

  renderProperties(){
    const {activeTab} = this.state
    switch(activeTab){
      case 1:
        return this.renderPayingPropertiest();
      case 2:
        return this.renderCollectingPropertiest();
      default:
        return this.renderPayingPropertiest();
    }
  }

  renderPayingPropertiest(){
    const {propertiesTenant} = this.props
    if(propertiesTenant.items.length >0 ){
     return (
      <View style={styles.properties(theme)}>
        <FlatList
          style={{minHeight:Dimensions.get('window').height,paddingHorizontal:1}}
          data={propertiesTenant.items}
          renderItem={({ item,index }) => this.renderPayingItems(item,index)}
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

  renderPayingItems(item,indx){
      return (
        <View key={indx} style={styles.loopitem}>
          <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'cover'} source={this.fasterImageRender(item)}>
            <ImageBackground imageStyle={styles.loopitembgIn} style={styles.loopitembgIn} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
            <Text style={styles.itemName(theme)}>{item.house_number} {'\n'} {item.building_name}</Text>
               <TouchableOpacity onPress={()=>this.ProPertyDetailTenant(item)} style={styles.nextscreen(theme)}><Image style={styles.arrow_right} source={require('../../assets/images/arrow_right.png')}></Image></TouchableOpacity>
               <View style={styles.propertygnInfo}>
                  <View style={styles.propInforowleft}>
                    {item.process=="due"?
                      <Image style={styles.due_label} source={require("../../assets/images/due_label.png")}></Image>
                    :null}
                  </View>
                  <View style={styles.propInforowright}>
                    <View style={styles.propInfoAttrb}>
                      <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../assets/images/user_ellipse.png')}></Image>
                      <Text style={styles.propItemattrLocation(theme)}>Not Available</Text>
                    </View>
                    <View style={styles.propInfoAttrb}>
                      <Image style={{width:30,height:30}} resizeMode={'contain'} source={require('../../assets/images/calendar_ellipse.png')}></Image>
                      {item.property_status=="A"?
                      <Text style={styles.propItemattrvalue(theme)}>Awaiting your Approval</Text>
                      :
                      <Text style={item.rent_status=="D"?styles.propItemattrvalueError(theme):styles.propItemattrvalue(theme)}>INR {this.getMoneyFormat(item.rent_amount,0)} {item.due_text} {this.getDateFormat(item)}</Text>
                      }
                    </View>
                    {item.property_status=="O"&&
                      <View style={styles.markwrap}>
                        <TouchableOpacity onPress={()=>this.PayRent()}>
                          <Text style={styles.marktext(theme)}>PAY NOW <Image style={styles.right_arrow} source={require('../../assets/images/arrow_next.png')}></Image></Text>
                        </TouchableOpacity>
                      </View>}
                      {item.property_status=="A"&&
                      <View style={styles.waitingWrap}>
                        <TouchableOpacity onPress={()=>this.reviewProperty(item)}>
                          <Text style={styles.marktext(theme)}>REVIEW TOTAL AMOUNT <Image style={styles.right_arrow} source={require('../../assets/images/arrow_next.png')}></Image></Text>
                        </TouchableOpacity>
                      </View>
                      }
                  </View>
               </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      )
  }
  renderCollectingItems(item,inx){
      return (
        <View key={inx} style={styles.loopitem}>
          <ImageBackground imageStyle={styles.loopitembgcltg} style={styles.loopitembgcltg} resizeMode={'cover'} source={this.fasterImageRender(item)}>
            <ImageBackground imageStyle={styles.loopitembgcltgIn} style={styles.loopitembgcltgIn} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
              <Text style={styles.itemName(theme)}>{item.house_number} {'\n'}{item.building_name}</Text>
               <TouchableOpacity onPress={()=>this.ProPertyDetailLandlord(item)} style={styles.nextscreen(theme)}><Image style={styles.arrow_right} source={require('../../assets/images/arrow_right.png')}></Image></TouchableOpacity>
               <View style={styles.propertygnInfo}>
                  <View style={styles.propInforowleft}>
                    {item.process=="due"?
                      <Image style={styles.due_label} source={require("../../assets/images/due_label.png")}></Image>
                    :null}
                  </View>
                  <View style={styles.propInforowright}>
                    <View style={styles.propInfoAttrb}>
                      <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../assets/images/user_ellipse.png')}></Image>
                      <Text style={styles.propItemattrLocation(theme)}>Not Available</Text>
                    </View>
                    <View style={styles.propInfoAttrb}>
                      <Image style={{width:30,height:30}} resizeMode={'contain'} source={require('../../assets/images/calendar_ellipse.png')}></Image>
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
                          <Text style={styles.marktext(theme)}>MODIFY <Image style={styles.right_arrow} source={require('../../assets/images/arrow_next.png')}></Image></Text>
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
      return require('../../assets/images/sample/sample_image_1.png');
    }
    return {uri:`${EzyRent.getMediaUrl()}${item.property_image}`};
  }
  renderCollectingPropertiest(){
    const {propertiesLandlord} = this.props
    
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

  descriptionLoopItem(amount,period){
   return(
    <View>
      <Text style={styles.payTime(theme)}>{amount}</Text>
      <Text style={styles.timePeriodExtra(theme)}>{period}</Text>
    </View>
   )
  }

  descriptionBankCharge(bankCharges){
   return(
    <View>
      <Text style={styles.payTime(theme)}>{bankCharges.net_banking.amount}</Text>
      <Text style={styles.timePeriodExtra(theme)}>INR {bankCharges.net_banking.rate} on using Net Banking/UPI</Text>
      <Text style={styles.payTime(theme)}>{bankCharges.debit_card.amount}</Text>
      <Text style={styles.timePeriodExtra(theme)}>{bankCharges.debit_card.rate}% on using Debit Card (1.25% of A includes 18% GST)</Text>
      <Text style={styles.payTime(theme)}>{bankCharges.credit_card.amount}</Text>
      <Text style={styles.timePeriodExtra(theme)}>{bankCharges.credit_card.rate}% on using Credit Card (1.95% of A, includes 18% GST)</Text>
    </View>
   )
  }

  rejectConfirm(property_currentItem){
    Alert.alert(
      "",
      "Are you sure to reject?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.RejectProperty(property_currentItem) }
      ],
      { cancelable: false }
    );
  }

renderModelView()
    {
      const {property_currentItem,property_loading} = this.props
      if(!property_loading && !Object.keys(property_currentItem).length){
        return null;
      }
      
      return(
        <Modal isVisible={this.state.visiblemodal} style={styles.visiblemodal}>

            {property_loading ?
            <View style={[styles.PopupContainer,{minHeight:theme.dimens.popupHeight}]}>
              <ActivityIndicator style={{marginTop:40}} size={'large'} color={'red'}/>
              </View>
              :
              <View style={styles.PopupContainer}>
                <Image style={styles.congrats_img(theme)} resizeMode={'stretch'} source={require('../../assets/images/congrats.png')}/>
                  <Text style={styles.congrats_head}>Congrats!</Text>
                  <ScrollView style={{height:theme.dimens.popupHeight}}>
                    <View style={styles.congrats_content(theme)}>
                      <Text style={styles.light_color}>You have been added as Tenant of </Text>
                      <TouchableOpacity onPress={()=>this.goToPropertyDetail(property_currentItem)}><Text style={{color:'#315add',fontFamily:'Oxygen-Bold',}}> {property_currentItem.house_number}</Text></TouchableOpacity>
                      <Text style={styles.light_color}> in Building {property_currentItem.building_name} by Landlord  </Text>
                      <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail(property_currentItem.landlord_id)}><Text style={{color:'#315add',fontFamily:'Oxygen-Bold',}}>{property_currentItem.landlord_details[0].landlord_name}</Text></TouchableOpacity>
                      <Text style={[styles.light_color,{fontWeight:'bold'}]}> ({getCountryCodeFormat(property_currentItem.landlord_details[0].landlord_ccd)}-{property_currentItem.landlord_details[0].landlord_mobile})</Text>
                    </View>
                    <View style={styles.congrats_content(theme)}>
                      <Text style={styles.light_color}>Please confirm the Total Amount Payable monthly</Text>
                    </View>
                  <Image style={styles.dash_bar_img(theme)} resizeMode={'stretch'} source={require('../../assets/images/dash-bar-line.png')}/>
                    <View style={styles.bankacInfo}>
                        <Text style={styles.banktitle(theme)}>Added Date</Text>
                    </View>
                    <View style={styles.bankacInfo}>
                        <Text style={styles.textLabelXl(theme)}>{this.getPopupDateFormat(property_currentItem.added_date)}</Text><Text style={styles.textLabelXl(theme)}>|    {this.getPopupTimeFormat(property_currentItem.added_date)}</Text>
                    </View>
                    <View style={styles.timeline}>
                        <Timeline
                            showTime={false}
                            circleSize={20}
                            circleColor={theme.colors.secondry}
                            innerCircle={'icon'}
                            lineColor={theme.colors.secondry}
                            separatorStyle={{backgroundColor:'transparent',height:1,}}
                            separator={true}
                            style={{width:'100%',marginLeft:-10,}}
                            titleStyle={[styles.banktitle(theme),{marginTop:-14,marginLeft:0}]}
                            descriptionStyle={[styles.payTime(theme),{marginTop:0}]}
                            data={[
                                {time: '05:34', title: 'Rent Amount (Includes Rent, Maintenace etc)', description:this.descriptionLoopItem(property_currentItem.rent_split_up.rent_amount,"Per Month"), icon: require('../../assets/images/step-round.png')},
                                {time: '07:17', title: 'Bank charges', description: this.descriptionBankCharge(property_currentItem.rent_split_up.bank_charges), icon: require('../../assets/images/step-round.png')},
                                {time: '07:17', title: 'Service Charges', description: property_currentItem.rent_split_up.service_charge, icon: require('../../assets/images/step-round.png')},
                            ]}
                        />
                      </View>
                    <View style={styles.total_warp}>
                      <Text style={styles.total_amount}>TOTAL AMOUNT PAYABLE</Text>
                      <Text style={styles.total_amount_light}>Per Month</Text>
                      <Text style={styles.total_amount_price}>{property_currentItem.rent_split_up.total_amount.net_banking.amount}</Text>
                      <Text style={styles.paymType}>on using Net Banking/UPI </Text>
                      <Text style={styles.total_amount_price}>{property_currentItem.rent_split_up.total_amount.debit_card.amount}</Text>
                      <Text style={styles.paymType}>on using Debit Card </Text>
                      <Text style={styles.total_amount_price}>{property_currentItem.rent_split_up.total_amount.credit_card.amount}</Text>
                      <Text style={styles.paymType}>on using Credit Card </Text>
                      <Text style={styles.total_amount_light}>(Rent Amount + Bank charge + Service Charge)</Text>
                    </View>
                  </ScrollView>
                  <View style={styles.PopupbtnWrapper}>
                      <TouchableOpacity onPress={()=>this.rejectConfirm(property_currentItem)}>
                        <Text style={styles.reject}>REJECT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.AcceptProperty(property_currentItem)}>
                        <Text style={styles.accept}>ACCEPT</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              }
        </Modal>
      )
  }
  /* ================================================================*/
  /* ===================== END UI VIEW  ===========================*/
  /* ================================================================*/

}
PropertiesTenants.navigationOptions = ({ navigation }) => ({
  headerStyle: {height:0},
  title: 'Properties/Tenants',
})

const mapStateToProps = ({ account,propertiesLandlord,propertiesTenant,properties }) => {
  const { error, success, loading,status,customer } = account;
  const {property_currentItem,property_loading} = properties
  return { error, success, loading, status, customer,propertiesLandlord,propertiesTenant,property_currentItem,property_loading };
};

PropertiesTenants.propTypes = {
  getPropertiesForLandlord: PropTypes.func.isRequired,
  getPropertiesForTenant: PropTypes.func.isRequired,
  getPropertyById: PropTypes.func.isRequired,
  tenantSubmissionOnProperty: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
  propertiesLandlord: PropTypes.object,
  propertiesTenant: PropTypes.object,
  property_currentItem: PropTypes.object,
  property_loading: PropTypes.bool,
};

PropertiesTenants.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
  propertiesLandlord:{items: [],refreshing: false,error: "",success: "",loading: false,},
  propertiesTenant:{items: [],refreshing: false,error: "",success: "",loading: false,},
  property_currentItem: {},
  property_loading: false,

};

export default connect(mapStateToProps, {getPropertiesForLandlord,getPropertiesForTenant,getPropertyById,tenantSubmissionOnProperty})(PropertiesTenants);
