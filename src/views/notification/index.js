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
  NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,
} from '../../navigation/routes';


class RentList extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      notifications:[],
    }
    StatusBar.setBarStyle('dark-content');
  }
  componentDidMount(){
    const notifications = SampleData.getNotifications() || [];
    this.setState({notifications})
  }
  goToTargetScreen(item){
    console.log("now it",item)
    if(item.status=="paid"){
      this.goToTransactionDetail(item);
    } else {
      this.goToPropertyDetail(item);
    }
  }
  goToPropertyDetail(){
    NavigationService.navigate(NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH)
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
    const dyprd = date.getHours() >= 12 ? 'PM' : 'AM';
     return fdt+ ' '+fmt +' '+fly+', '+date.getHours()+':'+date.getMinutes()+ ' '+dyprd;
  }
  goToTransactionDetail(item){
    NavigationService.navigate(NAVIGATION_RENT_TRANSACTION_DETAIL_VIEW_PATH,{item});
  }
  renderHeader(){
    return(
      <View style={styles.headWrapp}>
        <View style={styles.headcontainer}>
          <View style={styles.textWrapper}>
            <Text numberOfLines={1} style={theme.typography.title}>
            Notifications
            </Text>
          </View>
          <TouchableOpacity style={styles.iconButton} onPress={()=>{}}>
            <Image style={styles.headerIcon} resizeMode={'contain'} source={require('../../assets/images/navigation.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render(){
    const theme = this.context;
      return (
          <SafeAreaView style={styles.container(theme)}>
            {this.renderHeader()}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  >
                {this.renderNotifications()}
              </ScrollView>

          </SafeAreaView>
      );
  }


  renderNotifications(){
    return(
      <View style={styles.properties(theme)}>
        {this.renderPayingItems()}
      </View>
    )
  }

  renderPayingItems(){
    const {notifications} = this.state

    return notifications.map((item,inx)=>{
      if(item.type=="paid"){
        return (
          <TouchableOpacity onPress={()=>this.goToTransactionDetail(item)} key={inx} style={styles.loopitemAct}>
            <ImageBackground imageStyle={styles.loopitembg} style={[styles.loopitembg,styles.loopitembg2]} resizeMode={'cover'} source={this.fasterImageRender(item)}>
              <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg_light.png')}>
                <Image style={styles.tickIcon} resizeMode={'contain'} source={require("../../assets/images/double_tick.png")}></Image>
                 <Text style={styles.itemNameAct(theme)}>{item.name}</Text>
                 <View style={styles.propertygnInfo}>
                    <View style={styles.propInforowleft}>
                      {item.status=="due" &&
                      <Image style={styles.due_label} source={require("../../assets/images/dues_label.png")}></Image>}
                    </View>

                    <View style={styles.propInforowright}>

                      <View style={styles.propInfoAttrb}>
                      {item.status=="due"?
                       <Text style={styles.propItemattrvalueError(theme)}>Rent of <Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>INR {this.getMoneyFormat(item.amount,0)}</Text> for this property is now due</Text>
                      :
                        <Text style={styles.propItemattrvalue(theme)}>You had paid rent of <Text style={{fontWeight:'bold', color:theme.colors.primaryTitleColor}}>INR {this.getMoneyFormat(item.amount,0)}</Text> for this property</Text>
                      }
                      </View>

                    </View>
                 </View>
                 <Text style={styles.dateFormat(theme)}> {this.getDateFormat(item.paying_date)}</Text>
              </ImageBackground>

            </ImageBackground>
          </TouchableOpacity>
        )

      }
        return (
          <TouchableOpacity onPress={()=>this.goToTargetScreen(item)} key={inx} style={styles.loopitem}>
            <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'cover'} source={this.fasterImageRender(item)}>
              <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg.png')}>
                 <Text style={styles.itemName(theme)}>{item.name}</Text>
                 <View style={styles.propertygnInfo}>

                    <View style={styles.propInforowleft}>
                      {item.status=="due" &&
                      <Image style={styles.due_label} source={require("../../assets/images/dues_label.png")}></Image>}
                    </View>


                    <View style={styles.propInforowright}>

                      <View style={styles.propInfoAttrb}>
                      {item.status=="due"?
                       <Text style={styles.propItemattrvalueError(theme)}>Rent of <Text style={{fontWeight:'bold', color:theme.colors.errorColor}}>INR {this.getMoneyFormat(item.amount,0)}</Text> for this property is now due</Text>
                      :
                        <Text style={styles.propItemattrvalue(theme)}>You have received rent of <Text style={{fontWeight:'bold', color:theme.colors.primary}}>INR {this.getMoneyFormat(item.amount,0)}</Text> for this property</Text>
                      }
                      </View>

                    </View>
                 </View>
                 <Text style={styles.dateFormat(theme)}> {this.getDateFormat(item.paying_date)}</Text>
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

}
RentList.navigationOptions = ({ navigation }) => ({
  headerStyle: {height:0},
  title: 'Rent',
})

export default RentList;
