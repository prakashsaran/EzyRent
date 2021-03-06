import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import SampleData from '../../config/sample-data';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_RENT_TRANSACTION_DETAIL_VIEW_PATH,
  NAVIGATION_MORE_TRANSACTION_SUCCESS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH,
} from '../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EzyRent } from '../../ezyrent';
import {  getRentsForLandlord,getRentsForTenant } from '../../actions';
import { Spinner} from '../../components';

class RentList extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      visibleSearch:false,
      activeTab:1,
      searchQuery:null,
      AccountType:null,
      DeviceWidth:Dimensions.get('window').width,
      DeviceHeight: Dimensions.get('window').height,
    }
    StatusBar.setBarStyle('dark-content');
    this.onLayout = this.onLayout.bind(this);
  }
  onLayout(e) {
    this.setState({
      DeviceWidth: Dimensions.get('window').width,
      DeviceHeight: Dimensions.get('window').height,
    });
  }
  
  UNSAFE_componentWillReceiveProps(nextProps){
    const {customer} = this.props;
      if(nextProps.customer !==customer){
        const updatedUser = nextProps.customer;
        if(updatedUser.hasOwnProperty("user_type")){
            if(updatedUser.user_type){
              this.setState({AccountType:updatedUser.user_type});
            } else{
              this.setState({AccountType:'U'});
            }
          } else{
            this.setState({AccountType:"U"});
          }
      }
    }

  componentDidUpdate(prevProps, prevState, snapshot){
    const {getRentsForTenant,getRentsForLandlord,customer} = this.props
    const {searchQuery,activeTab,visibleSearch} = this.state
    if(prevState.visibleSearch !=visibleSearch){
      if(!visibleSearch && activeTab==1 && searchQuery){
        getRentsForTenant(customer,"",0,20);
        this.setState({searchQuery:null})
      }
      if(!visibleSearch && activeTab==2 && searchQuery){
        getRentsForLandlord(customer,"",0,20);
        this.setState({searchQuery:null})
      }
    }
  }

  UNSAFE_componentWillMount(){
    const {customer,status}=this.props
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
    this.loadUserDataAccordingAccountType(customer);

  }

    /**
   * @name loadUserDataAccordingAccountType
   * @description this function load data according user type
   * @param {JSON} customer 
   */
  loadUserDataAccordingAccountType(customer){
    const {getRentsForLandlord,getRentsForTenant}=this.props
    const {searchQuery} = this.state;
    switch(customer.user_type){
      case "B":
        getRentsForLandlord(customer,searchQuery,0,20);
        getRentsForTenant(customer,searchQuery,0,20);
        break;
      case "L":
        getRentsForLandlord(customer,searchQuery,0,20);
        break;
      case "T":
        getRentsForTenant(customer,searchQuery,0,20);
        break;
      default:
        console.log("current user is new user")
        break;
    }

  }

  onSearchProperties(searchQuery){
    const {getRentsForTenant,getRentsForLandlord,customer}=this.props
    const {activeTab} = this.state
    if(activeTab==1){
      getRentsForTenant(customer,searchQuery,0,20);
    } else {
      getRentsForLandlord(customer,searchQuery,0,20);
    }
    
    this.setState({searchQuery})
  }

  onTabViewChange(activeTab){
    const {getRentsForTenant,getRentsForLandlord,customer}=this.props
    const {searchQuery} = this.state
    this.setState({activeTab})
    if(searchQuery){
      this.setState({searchQuery:""})
      if(activeTab==1){
        getRentsForLandlord(customer,"",0,20);
      } else {
        getRentsForTenant(customer,"",0,20);
      }
    }
  }

  componentDidMount(){
    const {AccountType} = this.state
    if(AccountType=="T"){
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
  ProPertyDetailPage(){
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH);
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
  goToTransactionDetail(item){
    //NavigationService.navigate(NAVIGATION_RENT_TRANSACTION_DETAIL_VIEW_PATH,{item});
  }
  PayRent(){
    //NavigationService.navigate(NAVIGATION_MORE_TRANSACTION_SUCCESS_VIEW_PATH)
  }
  ProPertyDetailLandlord(property){
    //NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH);
  }

  renderTitile(){
    const {AccountType} = this.state
    if(AccountType=="T"){
      return "Rent I am Paying ";
    } else if(AccountType=="L"){
      return "Rent I am Collecting";
    } else if(AccountType=="B"){
      return "Rent";
    } else{
      return "Rent I am Paying";
    }
  }

  renderHeader(){
    const {visibleSearch,AccountType} = this.state
    return(
      <View style={AccountType=="B"?styles.headWrapp:styles.headWrappSingle}>
        <View style={styles.headcontainer}>
          <View style={styles.textWrapper}>
            <Text numberOfLines={1} style={theme.typography.title}>
            {this.renderTitile()}
            </Text>
          </View>
          <View style={styles.textWrapperFiller}></View>
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
              <TextInput placeholder="Search" value={this.state.searchQuery} onChangeText={(searchQuery)=>this.onSearchProperties(searchQuery)} style={styles.searchinputStyle}></TextInput>
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
          <ScrollView onendRi horizontal>
            <View style={styles.tabsrows(theme)}>
              <View style={activeTab==1?styles.Activetabitem(theme):styles.inActivetabitem(theme)}>
                <TouchableOpacity onPress={()=>this.onTabViewChange(1)} style={styles.tabaction}>
                  <Text style={activeTab==1?styles.Activetabtitle(theme):styles.inActivetabtitle(theme)}>I am Paying</Text>
                </TouchableOpacity>
              </View>
              <View style={activeTab==2?styles.Activetabitem(theme):styles.inActivetabitem(theme)}>
                <TouchableOpacity onPress={()=>this.onTabViewChange(2)} style={styles.tabaction}>
                  <Text style={activeTab==2?styles.Activetabtitle(theme):styles.inActivetabtitle(theme)}>I am Collecting</Text>
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
    const {tenant_loading,landlord_loading} = this.props
      return (
          <SafeAreaView onLayout={this.onLayout} style={styles.container(theme)}>
            {this.renderHeader()}
                {this.renderTabBar()}
                {this.renderProperties()}
                {tenant_loading && <Spinner style={theme.typography.spinnerStyle}/>}
                {landlord_loading && <Spinner style={theme.typography.spinnerStyle}/>}
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

  renderPlaceHolder(){
    const {DeviceHeight} = this.state
    return(
      <View style={{width:"100%",minHeight:DeviceHeight-180,backgroundColor:'#f8f8f8',alignItems:'center',flexDirection:'row',justifyContent:'center',}}>
        <View style={{alignSelf:'center',flexDirection:'column',}}>
          <Image resizeMode={'contain'} source={require("../../assets/images/no-data.png")}> 
          </Image>
          <Text style={{alignSelf:'center',width:'100%',textAlign:'center',color:'#bfbfbf',marginTop:5,}}>
            No data available
          </Text>
        </View>
      </View>
    );
  }

  renderPayingPropertiest(){
    const {tenant_items} = this.props
    if(!tenant_items.length){
      return this.renderPlaceHolder();
    }
    return(
      <View style={{width:'100%',height:'100%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.properties(theme)}>
            {this.renderPayingItems(tenant_items)}
          </View>
        </ScrollView>
      </View>
    )
  }

  renderPayingItems(tenant_items){
    return tenant_items.map((item,inx)=>{
      if(item.status_text=="DUE"){
        return (
          <View key={inx} style={styles.loopitem}>
            <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={this.fasterImageRender(item)}>
              <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
                  <View style={styles.itemNameWrap(theme)}>
                    <Text style={styles.itemName(theme)} numberOfLines={2}>{item.house_number}</Text>
                    <Text style={styles.itemName(theme)} numberOfLines={1}>at {item.building_name}</Text>
                  </View>
                 <View style={styles.propertygnInfo}>
                    <View style={styles.propInforowleft}>
                      {item.status_text=="DUE"?
                      <Image style={styles.due_label} source={require("../../assets/images/dues_label.png")}></Image>
                      :
                      <Image style={styles.due_label} source={require("../../assets/images/paid_label.png")}></Image>
                      }
                    </View>
                    <View style={styles.propInforowright}>
                      <View style={styles.propInfoAttrb}>
                        <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../assets/images/gps_dark.png')}></Image>
                        <Text style={styles.propItemattrLocation(theme)}>{item.location}</Text>
                      </View>
                      <View style={styles.propInfoAttrb}>
                      {item.status_text=="DUE"?
                       <TouchableOpacity onPress={()=>this.PayRent()} style={{flexWrap:'wrap',width:'100%'}}><Text style={styles.propItemattrvalueError(theme)}><Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>{item.total_amount}</Text> due from {item.date} <Text style={styles.marktext(theme)}>PAY NOW </Text><Image style={{width:11,height:11,marginLeft:6}} resizeMode={'contain'} source={require('../../assets/images/arrow_next.png')}></Image></Text></TouchableOpacity>
                      :
                        <Text style={styles.propItemattrvalue(theme)}>Paid <Text style={{fontWeight:'bold', color:theme.colors.primary}}>{item.total_amount}</Text> on {item.date}</Text>
                      }
                      </View>
                    </View>
                 </View>
              </ImageBackground>
            </ImageBackground>
          </View>
        )
      }
      return (
        <TouchableOpacity onPress={()=>this.goToTransactionDetail(item)} key={inx} style={styles.loopitem}>
          <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'cover'} source={this.fasterImageRender(item)}>
            <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
               <View style={styles.itemNameWrap(theme)}>
                <Text style={styles.itemName(theme)} numberOfLines={2}>{item.house_number}</Text>
                <Text style={styles.itemName(theme)} numberOfLines={1}>at {item.building_name}</Text>
              </View>
               <View style={styles.propertygnInfo}>
                  <View style={styles.propInforowleft}>
                    {item.status_text=="DUE"?
                    <Image style={styles.due_label} source={require("../../assets/images/due_label.png")}></Image>
                    :
                    <Image style={styles.due_label} source={require("../../assets/images/paid_label.png")}></Image>
                    }
                  </View>
                  <View style={styles.propInforowright}>
                    <View style={styles.propInfoAttrb}>
                      <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../assets/images/gps_dark.png')}></Image>
                      <Text style={styles.propItemattrLocation(theme)}>{item.location}</Text>
                    </View>

                    <View style={styles.propInfoAttrb}>
                    {item.status_text=="DUE"?
                     <TouchableOpacity style={{flexWrap:'wrap',width:'100%'}}><Text style={styles.propItemattrvalueError(theme)}><Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>{item.total_amount}</Text> due on {item.date} <Text style={styles.marktext(theme)}>PAY&nbsp;NOW </Text><Image style={{width:13,height:13,marginLeft:6}} resizeMode={'contain'} source={require('../../assets/images/arrow_next.png')}></Image></Text></TouchableOpacity>
                    :
                      <Text style={styles.propItemattrvalue(theme)}>Paid <Text style={{fontWeight:'bold', color:theme.colors.primary}}>{item.total_amount}</Text> on {item.date}</Text>
                    }
                    </View>

                  </View>

               </View>
            </ImageBackground>

          </ImageBackground>
        </TouchableOpacity>
      )
    })
  }

  renderCollectingItems(landlord_items){
    return landlord_items.map((item,inx)=>{            
      if(item.status_text=="DUE"){
        return (
          <TouchableOpacity onPress={()=>this.ProPertyDetailLandlord(item)} key={inx} style={styles.loopitem}>
            <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={this.fasterImageRender(item)}>
              <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
               <View style={styles.itemNameWrap(theme)}>
                <Text style={styles.itemName(theme)} numberOfLines={2}>{item.house_number}</Text>
                <Text style={styles.itemName(theme)} numberOfLines={1}>at {item.building_name}</Text>
              </View>
                <View style={styles.propertygnInfo}>
                    <View style={styles.propInforowleft}>
                      {item.status_text=="DUE"?
                      <Image style={[styles.due_label]} source={require("../../assets/images/dues_label.png")}></Image>
                      :
                      <Image style={[styles.due_label]} source={require("../../assets/images/paid_label.png")}></Image>
                      }
                    </View>


                    <View style={styles.propInforowright}>

                      <View style={styles.propInfoAttrb}>
                        <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../assets/images/gps_dark.png')}></Image>
                        <Text style={styles.propItemattrLocation(theme)}>{item.location}</Text>
                      </View>

                      <View style={styles.propInfoAttrb}>
                      {item.status_text=="DUE"?
                      <Text style={styles.propItemattrvalueError(theme)}><Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>{item.total_amount}</Text> due from {item.date} </Text>
                      :
                    <Text style={styles.propItemattrvalue(theme)}>Received <Text style={{fontWeight:'bold', color:theme.colors.primary}}>{item.total_amount}</Text> on {item.date}</Text>
                      }
                      </View>

                    </View>

                </View>
              </ImageBackground>

            </ImageBackground>
          </TouchableOpacity>
        )
      }
      return (
        <TouchableOpacity onPress={()=>this.goToTransactionDetail(item)} key={inx} style={styles.loopitem}>
          <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={this.fasterImageRender(item)}>
            <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
              <View style={styles.itemNameWrap(theme)}>
                <Text style={styles.itemName(theme)} numberOfLines={2}>{item.house_number}</Text>
                <Text style={styles.itemName(theme)} numberOfLines={1}>at {item.building_name}</Text>
              </View>
              <View style={styles.propertygnInfo}>

                  <View style={styles.propInforowleft}>
                    {item.status_text=="DUE"?
                    <Image style={styles.due_label} source={require("../../assets/images/dues_label.png")}></Image>
                    :
                    <Image style={styles.due_label} source={require("../../assets/images/paid_label.png")}></Image>
                    }
                  </View>


                  <View style={styles.propInforowright}>

                    <View style={styles.propInfoAttrb}>
                      <Image style={styles.map_icon} resizeMode={'contain'} source={require('../../assets/images/gps_dark.png')}></Image>
                      <Text style={styles.propItemattrLocation(theme)}>{item.location}</Text>
                    </View>

                    <View style={styles.propInfoAttrb}>
                    {item.status_text=="DUE"?
                    <Text style={styles.propItemattrvalueError(theme)}><Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>{item.total_amount}</Text> due from {item.date} </Text>
                    :
                      <Text style={styles.propItemattrvalue(theme)}>Received <Text style={{fontWeight:'bold', color:theme.colors.primary}}>{item.total_amount}</Text> on {item.date}</Text>
                    }
                    </View>

                  </View>

              </View>
            </ImageBackground>

          </ImageBackground>
        </TouchableOpacity>
      )

    })
  }
  fasterImageRender(item){
    if(!item.property_image || item.property_image==null || item.property_image==''){
      return require('../../assets/images/building_placehoder.jpg');
      } 
      return {uri:`${EzyRent.getMediaUrl()}${item.property_image}`}; 
  }
  renderCollectingPropertiest(){
    const {landlord_items} = this.props
    if(!landlord_items.length){
      return this.renderPlaceHolder();
    }
    return(
      <View style={{width:'100%',height:'100%'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.properties(theme)}>
            {this.renderCollectingItems(landlord_items)}
          </View>
        </ScrollView>
      </View>
    )
  }

}
RentList.navigationOptions = ({ navigation }) => ({
  headerStyle: {height:0},
  title: '',
})


const mapStateToProps = ({ account,rentLandlord ,rentTenant}) => {
  const { error, success, loading,status,customer } = account;

  const {landlord_items,landlord_loading} = rentLandlord
  const {tenant_items,tenant_loading} = rentTenant
  return { error, success, loading, status, customer,landlord_items,landlord_loading,tenant_items,tenant_loading };
};

RentList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
  getRentsForLandlord: PropTypes.func.isRequired,
  getRentsForTenant: PropTypes.func.isRequired,
  landlord_items: PropTypes.object,
  tenant_items: PropTypes.object,
};

RentList.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
  landlord_items:[],
  tenant_items:[],
};

export default connect(mapStateToProps, {getRentsForLandlord,getRentsForTenant})(RentList);
