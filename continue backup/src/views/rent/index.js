import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput } from "react-native";
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


class RentList extends React.Component {
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
    NavigationService.navigate(NAVIGATION_RENT_TRANSACTION_DETAIL_VIEW_PATH,{item});
  }
  PayRent(){
    NavigationService.navigate(NAVIGATION_MORE_TRANSACTION_SUCCESS_VIEW_PATH)
  }
  ProPertyDetailLandlord(){
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_LANDLORD_VIEW_PATH);
  }

  renderTitile(){
    const {AccountType} = this.state
    console.log("AccountType =>",AccountType)
    if(AccountType=="tenant"){
      return "Rent I am Paying ";
    } else if(AccountType=="landlord"){
      return "Rent I am Collecting";
    } else if(AccountType=="lessee"){
      return "Rent";
    } else{
      return "Rent I am Paying";
    }
  }

  renderHeader(){
    const {visibleSearch} = this.state
    return(
      <View style={styles.headWrapp}>
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
            <TouchableOpacity style={styles.iconButton2}>
            <Image style={styles.headerIcon} resizeMode={'contain'} source={require('../../assets/images/filter.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        {visibleSearch && <View style={styles.searchWrap}>
            <View style={styles.inputStyleStack(theme)}>
              <TextInput placeholder="Search" style={styles.searchinputStyle}></TextInput>
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
          <ScrollView horizontal>
            <View style={styles.tabsrows(theme)}>
              <View style={activeTab==1?styles.Activetabitem(theme):styles.inActivetabitem(theme)}>
                <TouchableOpacity onPress={()=>this.setState({activeTab:1})} style={styles.tabaction}>
                  <Text style={activeTab==1?styles.Activetabtitle(theme):styles.inActivetabtitle(theme)}>I am Paying</Text>
                </TouchableOpacity>
              </View>
              <View style={activeTab==2?styles.Activetabitem(theme):styles.inActivetabitem(theme)}>
                <TouchableOpacity onPress={()=>this.setState({activeTab:2})} style={styles.tabaction}>
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
      return (
          <SafeAreaView style={styles.container(theme)}>
            {this.renderHeader()}
                {this.renderTabBar()}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  >
                {this.renderProperties()}
              </ScrollView>

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
      if(item.process=="due"){
        return (
          <View key={inx} style={styles.loopitem}>
            <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={this.fasterImageRender(item)}>
              <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
                 <Text style={styles.itemName(theme)}>{item.name}</Text>
                 <View style={styles.propertygnInfo}>
                    <View style={styles.propInforowleft}>
                      {item.process=="due"?
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
                      {item.process=="due"?
                       <TouchableOpacity onPress={()=>this.PayRent()} style={{flexWrap:'wrap',width:'100%'}}><Text style={styles.propItemattrvalueError(theme)}><Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>INR {this.getMoneyFormat(item.amount,0)}</Text> due on {this.getDateFormat(item.paying_date)} <Text style={styles.marktext(theme)}>PAY NOW </Text><Image style={{width:13,height:13,marginLeft:6}} resizeMode={'contain'} source={require('../../assets/images/arrow_next.png')}></Image></Text></TouchableOpacity>
                      :
                        <Text style={styles.propItemattrvalue(theme)}>Paid <Text style={{fontWeight:'bold', color:theme.colors.primary}}>INR {this.getMoneyFormat(item.amount,0)}</Text> on {this.getDateFormat(item.paying_date)}</Text>
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
               <Text style={styles.itemName(theme)}>{item.name}</Text>
               <View style={styles.propertygnInfo}>
                  <View style={styles.propInforowleft}>
                    {item.process=="due"?
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
                    {item.process=="due"?
                     <TouchableOpacity style={{flexWrap:'wrap',width:'100%'}}><Text style={styles.propItemattrvalueError(theme)}><Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>INR {this.getMoneyFormat(item.amount,0)}</Text> due on {this.getDateFormat(item.paying_date)} <Text style={styles.marktext(theme)}>PAY NOW </Text><Image style={{width:13,height:13,marginLeft:6}} resizeMode={'contain'} source={require('../../assets/images/arrow_next.png')}></Image></Text></TouchableOpacity>
                    :
                      <Text style={styles.propItemattrvalue(theme)}>Paid <Text style={{fontWeight:'bold', color:theme.colors.primary}}>INR {this.getMoneyFormat(item.amount,0)}</Text> on {this.getDateFormat(item.paying_date)}</Text>
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

  renderCollectingItems(){
    const {payingRent} = this.state

    return payingRent.map((item,inx)=>{
      if(item.process=="due"){
        return (
          <TouchableOpacity onPress={()=>this.ProPertyDetailLandlord()} key={inx} style={styles.loopitem}>
            <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={this.fasterImageRender(item)}>
              <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
                <Text style={styles.itemName(theme)}>{item.name}</Text>
                <View style={styles.propertygnInfo}>

                    <View style={styles.propInforowleft}>
                      {item.process=="due"?
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
                      {item.process=="due"?
                      <Text style={styles.propItemattrvalueError(theme)}><Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>INR {this.getMoneyFormat(item.amount,0)}</Text> due from {this.getDateFormat(item.paying_date)} </Text>
                      :
                        <Text style={styles.propItemattrvalue(theme)}>Received <Text style={{fontWeight:'bold', color:theme.colors.primary}}>INR {this.getMoneyFormat(item.amount,0)}</Text> on {this.getDateFormat(item.paying_date)}</Text>
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
              <Text style={styles.itemName(theme)}>{item.name}</Text>
              <View style={styles.propertygnInfo}>

                  <View style={styles.propInforowleft}>
                    {item.process=="due"?
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
                    {item.process=="due"?
                    <Text style={styles.propItemattrvalueError(theme)}><Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>INR {this.getMoneyFormat(item.amount,0)}</Text> due from {this.getDateFormat(item.paying_date)} </Text>
                    :
                      <Text style={styles.propItemattrvalue(theme)}>Received <Text style={{fontWeight:'bold', color:theme.colors.primary}}>INR {this.getMoneyFormat(item.amount,0)}</Text> on {this.getDateFormat(item.paying_date)}</Text>
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

}
RentList.navigationOptions = ({ navigation }) => ({
  headerStyle: {height:0},
  title: '',
})


const mapStateToProps = ({ account }) => {
  const { error, success, loading,status,customer } = account;

  return { error, success, loading, status, customer };
};

RentList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

RentList.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, {})(RentList);
