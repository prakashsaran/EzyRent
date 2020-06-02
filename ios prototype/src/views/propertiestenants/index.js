import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput,Dimensions,Alert } from "react-native";
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
  componentWillMount(){
    const {customer,status}=this.props
    const properties = SampleData.getPropeties() || [];
    this.setState({payingRent:properties,collectingRent:properties})

    console.log("customer =>",customer)
    if(status){
      if(customer.hasOwnProperty("type")){
        if(customer.type){
          this.setState({AccountType:customer.type});
        } else{
          this.setState({AccountType:'new'});
        }
      } else{
        this.setState({AccountType:"new"});
      }
    } else{
      this.setState({AccountType:"new"});
    }

  }
  componentDidMount(){
    const {AccountType} = this.state
    //console.log("AccountType =>",AccountType)
    if(AccountType=="tenant"){
      this.setState({activeTab:1})
    } else if(AccountType=="landlord"){
      this.setState({activeTab:2})
      return "Properties I am Collecting Rent";
    } else if(AccountType=="lessee"){
      this.setState({activeTab:1})
      return "Properties/Tenants";
    } else{
      this.setState({activeTab:1})
      return "Properties I am Paying Rent";
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
  ProPertyDetailTenant(){
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH);
  }
  ProPertyDetailLandlord(){
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH);
  }
  /* *
  * name getDateFormat
  * @params String
  * @return String
  */
  getDateFormat(str){
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const unixTimeZero = Date.parse(str);
    const date = new Date(unixTimeZero);
    const dt = date.getDate();
    const fmt = monthNames[date.getMonth()]
    const fly = date.getFullYear();
    const fdt = dt < 10 ? '0' + dt : '' + dt;
     return fdt+ ' '+fmt +' '+fly;
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
    console.log("AccountType =>",AccountType)
    if(AccountType=="tenant"){
      return "Properties I am Paying Rent";
    } else if(AccountType=="landlord"){
      return "Properties I am Collecting Rent";
    } else if(AccountType=="lessee"){
      return "Properties/Tenants";
    } else{
      return "Properties I am Paying Rent";
    }
  }
  renderHeader(){
    const {visibleSearch,searchQuery,AccountType} = this.state
    return(
      <View style={AccountType=="lessee"?styles.headWrapp:styles.headWrappSingle}>
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
              <TextInput onChangeText={(searchQuery)=>this.setState({searchQuery})} placeholder="Search" value={searchQuery} style={styles.searchinputStyle}></TextInput>
            </View>
        </View>}
      </View>
    )
  }

  renderTabBar(){
    const {activeTab,AccountType} = this.state
    if(AccountType!="lessee"){
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
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  >
                {this.renderProperties()}
                {this.renderModelView()}
              </ScrollView>
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
    return(
      <View style={styles.properties(theme)}>
        {this.renderPayingItems()}
      </View>
    )
  }

  renderPayingItems(){
    const {payingRent} = this.state

    return payingRent.map((item,inx)=>{
      return (
        <View key={inx} style={styles.loopitem}>
          <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'cover'} source={this.fasterImageRender(item)}>
            <ImageBackground imageStyle={styles.loopitembgIn} style={styles.loopitembgIn} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
               <Text style={styles.itemName(theme)}>{item.name}</Text>
               <TouchableOpacity onPress={()=>this.ProPertyDetailTenant()} style={styles.nextscreen(theme)}><Image style={styles.arrow_right} source={require('../../assets/images/arrow_right.png')}></Image></TouchableOpacity>
               <View style={styles.propertygnInfo}>
                  <View style={styles.propInforowleft}>
                    {item.process=="due"?
                      <Image style={styles.due_label} source={require("../../assets/images/due_label.png")}></Image>
                    :null}
                  </View>
                  <View style={styles.propInforowright}>
                    <View style={styles.propInfoAttrb}>
                      <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../assets/images/map_ellipse.png')}></Image>
                      <Text style={styles.propItemattrLocation(theme)}>{item.location}</Text>
                    </View>
                    <View style={styles.propInfoAttrb}>
                      <Image style={{width:30,height:30}} resizeMode={'contain'} source={require('../../assets/images/calendar_ellipse.png')}></Image>
                      {item.process=="waiting"?
                      <Text style={styles.propItemattrvalue(theme)}>Awaiting your Approval</Text>
                      :
                      <Text style={item.process=="due"?styles.propItemattrvalueError(theme):styles.propItemattrvalue(theme)}>INR {this.getMoneyFormat(item.amount,0)} due on {this.getDateFormat(item.paying_date)}</Text>
                      }
                    </View>
                    {item.process=="due"&&
                      <View style={styles.markwrap}>
                        <TouchableOpacity onPress={()=>this.PayRent()}>
                          <Text style={styles.marktext(theme)}>PAY NOW <Image style={styles.right_arrow} source={require('../../assets/images/arrow_next.png')}></Image></Text>
                        </TouchableOpacity>
                      </View>}
                      {item.process=="waiting"&&
                      <View style={styles.waitingWrap}>
                        <TouchableOpacity onPress={()=>this.setState({visiblemodal:true})}>
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
    })
  }
  renderCollectingItems(){
    const {payingRent} = this.state
    return payingRent.map((item,inx)=>{
      return (
        <View key={inx} style={styles.loopitem}>
          <ImageBackground imageStyle={styles.loopitembgcltg} style={styles.loopitembgcltg} resizeMode={'cover'} source={this.fasterImageRender(item)}>
            <ImageBackground imageStyle={styles.loopitembgcltgIn} style={styles.loopitembgcltgIn} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
               <Text style={styles.itemName(theme)}>{item.name}</Text>
               <TouchableOpacity onPress={()=>this.ProPertyDetailLandlord()} style={styles.nextscreen(theme)}><Image style={styles.arrow_right} source={require('../../assets/images/arrow_right.png')}></Image></TouchableOpacity>
               <View style={styles.propertygnInfo}>
                  <View style={styles.propInforowleft}>
                    {item.process=="due"?
                      <Image style={styles.due_label} source={require("../../assets/images/due_label.png")}></Image>
                    :null}
                  </View>
                  <View style={styles.propInforowright}>
                    <View style={styles.propInfoAttrb}>
                      <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../assets/images/map_ellipse.png')}></Image>
                      <Text style={styles.propItemattrLocation(theme)}>{item.location}</Text>
                    </View>
                    <View style={styles.propInfoAttrb}>
                      <Image style={{width:30,height:30}} resizeMode={'contain'} source={require('../../assets/images/calendar_ellipse.png')}></Image>
                      {item.process=="waiting"&&<Text style={styles.awaitingforapproval(theme)}>Awaiting approval from Tenant</Text>}
                      {item.process=="reject"&&<Text style={styles.propItemattrvalueError(theme)}>Contract Rejected by Tenant</Text>}
                      {(item.process!="waiting" && item.process!="reject") &&
                        <Text style={item.process=="due"?styles.propItemattrvalueError(theme):styles.propItemattrvalue(theme)}>INR {this.getMoneyFormat(item.amount,0)} due on {this.getDateFormat(item.paying_date)}</Text>
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
    })
  }
  fasterImageRender(item){
    //console.log("loop itm in side fasterImageRender",item.image)
    if(!item.image || item.image==null || item.image==''){
      return require('../../assets/images/sample/sample_image_1.png');
    }
    return {uri:item.image};
  }
  renderCollectingPropertiest(){
    return(
      <View style={styles.properties(theme)}>
        {this.renderCollectingItems()}
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

  rejectConfirm(){
    Alert.alert(
      "",
      "Are you sure to reject?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.setState({visiblemodal:false}) }
      ],
      { cancelable: false }
    );
  }

renderModelView()
    {
      return(
        <Modal isVisible={this.state.visiblemodal} style={styles.visiblemodal}>
            <View style={styles.PopupContainer}>
            <Image style={styles.congrats_img(theme)} resizeMode={'stretch'} source={require('../../assets/images/congrats.png')}/>
              <Text style={styles.congrats_head}>Congrats!</Text>
              <ScrollView style={{height:theme.dimens.popupHeight}}>
                <View style={styles.congrats_content(theme)}>
                  <Text style={styles.light_color}>You have been added as Tenant of </Text>
                  <TouchableOpacity onPress={()=>this.goToPropertyDetail()}><Text style={{color:'#315add',fontFamily:'Oxygen-Bold',}}> House No. 7A</Text></TouchableOpacity>
                  <Text style={styles.light_color}> in Building SFS Merrie Pink, Kuravankonam by Landlord  </Text>
                  <TouchableOpacity onPress={()=>this.goToPropertyOwnerDetail()}><Text style={{color:'#315add',fontFamily:'Oxygen-Bold',}}>Red Rows Properties</Text></TouchableOpacity>
                  <Text style={[styles.light_color,{fontWeight:'bold'}]}> (+91-976242342)</Text>
                </View>
                <View style={styles.congrats_content(theme)}>
                  <Text style={styles.light_color}>Please confirm the Total Amount Payable monthly</Text>
                </View>
               <Image style={styles.dash_bar_img(theme)} resizeMode={'stretch'} source={require('../../assets/images/dash-bar-line.png')}/>
                <View style={styles.bankacInfo}>
                    <Text style={styles.banktitle(theme)}>Added Date</Text>
                </View>
                <View style={styles.bankacInfo}>
                    <Text style={styles.textLabelXl(theme)}>15 March 2020</Text><Text style={styles.textLabelXl(theme)}>|    05:30PM</Text>
                </View>
                <View style={{height:280,width:'100%',paddingHorizontal:20,marginVertical:10}}>
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
                            {time: '05:34', title: 'Rent Amount (Includes Rent, Maintenace etc)', description:this.descriptionLoopItem('INR 30,000',"Per Month"), icon: require('../../assets/images/step-round.png')},
                            {time: '07:17', title: 'Service Charges', description: this.descriptionLoopItem('INR 450',"15% of the Rent Amount and Maintenance Charge"), icon: require('../../assets/images/step-round.png')},
                            {time: '07:17', title: 'Service Charge', description: 'INR 28', icon: require('../../assets/images/step-round.png')},
                        ]}
                    />
                  </View>
                <View style={styles.total_warp}>
                  <Text style={styles.total_amount}>TOTAL AMOUNT PAYABLE</Text>
                  <Text style={styles.total_amount_light}>Per Month</Text>
                  <Text style={styles.total_amount_price}>INR 35,553</Text>
                  <Text style={styles.total_amount_light}>(Rent Amount + Bank Charge + Service Charge)</Text>
                </View>
              </ScrollView>
              <View style={styles.PopupbtnWrapper}>
                  <TouchableOpacity onPress={()=>this.rejectConfirm()}>
                    <Text style={styles.reject}>REJECT</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.setState({visiblemodal:false})}>
                    <Text style={styles.accept}>ACCEPT</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </Modal>
      )
  }

}
PropertiesTenants.navigationOptions = ({ navigation }) => ({
  headerStyle: {height:0},
  title: 'Properties/Tenants',
})

const mapStateToProps = ({ account }) => {
  const { error, success, loading,status,customer } = account;

  return { error, success, loading, status, customer };
};

PropertiesTenants.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

PropertiesTenants.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, {})(PropertiesTenants);
