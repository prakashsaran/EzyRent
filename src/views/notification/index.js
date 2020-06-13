import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_RENT_TRANSACTION_DETAIL_VIEW_PATH,
  NAVIGATION_DETAIL_PROPERTIES_DETAIL_VIEW_PATH,
} from '../../navigation/routes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EzyRent } from '../../ezyrent';
import { getNotifications } from '../../actions';
 
class NotificationList extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      notifications:[],
      DeviceWidth:Dimensions.get('window').width,
      DeviceHeight: Dimensions.get('window').height,
    }
    StatusBar.setBarStyle('dark-content');
    this.onLayout = this.onLayout.bind(this);
  }

  /** ======================================================== */
  /** ============= START COMMON UI FUNCTION ================= */
  /** ======================================================== */

  onLayout(e) {
    this.setState({
      DeviceWidth: Dimensions.get('window').width,
      DeviceHeight: Dimensions.get('window').height,
    });
  }
  UNSAFE_componentWillMount(){
    const {getNotifications}=this.props
    getNotifications();

  }

  fasterImageRender(item){
    if(Object.keys(item.module_data).length && item.module_data[0].property_image){
      return {uri:`${EzyRent.getMediaUrl()}${item.module_data[0].property_image}`}; 
      } 
      return require('../../assets/images/sample/sample_image_1.png');
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
  goToTargetViewPath(item){
    console.log("item",JSON.stringify(item));
    
  }
  /** ======================================================== */
  /** =============== END COMMON UI FUNCTION ================= */
  /** ======================================================== */


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
    const {items}=this.props; 
      return (
          <SafeAreaView onLayout={this.onLayout} style={styles.container(theme)}>
            {this.renderHeader()}
            {this.renderNotifications()}
          </SafeAreaView>
      );
  }

  renderPlaceHolder(){
    const {DeviceHeight} = this.state
    return(
      <ImageBackground source={require("../../assets/images/rzyrent_empty_placeholder.jpg")} resizeMode={'cover'} imageStyle={{width:"100%",height:DeviceHeight-200}} style={{width:"100%",height:DeviceHeight,backgroundColor:theme.colors.placeHolderBackgroundColor}}/>
    );
  }
  renderNotifications(){
    const {items} = this.props      
    if(!items.length){
      return this.renderPlaceHolder();
    }
    return(
      <ScrollView showsVerticalScrollIndicator={false} style={{width:'100%',height:'100%',backgroundColor:theme.colors.thirdBackgrounColor}}>
      <View style={styles.properties(theme)}>
        {this.renderNotificationItems(items)}
      </View>
      </ScrollView>
    )
  }
  renderItemView(item,indx){
    switch(item.module_id){
      case "1":
        return this.renderPropertiesNotification(item,indx)
        break;
      case "2":
        return this.renderPropertiesNotification(item,indx)
        break;
      case "4":
        return this.renderProfileNotification(item,indx)
        break;
      default:
        return null;
    }
  }
  renderNotificationItems(items){
      return items.map((item,indx)=>{
        return this.renderItemView(item,indx)

    })
  }
  /** ======================================================== */
  /** ====== RENDER PROPERTIES NOTIFICATION ================= */
  /** ======================================================== */
  renderPropertiesNotification(item,indx){
    if(!Object.keys(item.module_data).length){
      return null;
    }
    
    return(
      <TouchableOpacity key={indx} onPress={()=>this.goToTargetViewPath(item)} style={styles.loopitemAct}>
            <ImageBackground imageStyle={styles.loopitembg} style={[styles.loopitembg,styles.loopitembg2]} resizeMode={'cover'} source={this.fasterImageRender(item)}>
              <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../assets/images/properties_item_bg_light.png')}>
              {item.notification_status=="R" && <Image style={styles.tickIcon} resizeMode={'contain'} source={require("../../assets/images/double_tick.png")}></Image>}
                 <Text style={styles.itemNameAct(theme)}>{item.module_data[0].house_number} {item.module_data[0].building_name}</Text>
                 <View style={styles.propertygnInfo}>
                    <View style={styles.propInforowleft}>
                    </View>

                    <View style={styles.propInforowright}>

                      <View style={styles.propInfoAttrb}> 
                         <Text style={styles.propItemattrvalueError(theme)}>{item.notification_message}</Text>  
                        </View>

                    </View>
                 </View>
                 <Text style={styles.dateFormat(theme)}> {this.getDateFormat(item.notification_date)}</Text>
              </ImageBackground>

            </ImageBackground>
        </TouchableOpacity>
      )
  }

  /** ======================================================== */
  /** ====== RENDER PROPERTIES NOTIFICATION ================= */
  /** ======================================================== */
  renderProfileNotification(item,indx){
    return null;
    return(
      <View key={indx}>
        <Text>{item.notification_message}</Text>
      </View>
    )
  }

}
NotificationList.navigationOptions = ({ navigation }) => ({
  headerStyle: {height:0},
  title: 'Rent',
})



const mapStateToProps = ({ account,notification}) => {
  const { customer } = account;
  const {items,loading} = notification;
  return { items,loading,customer };
};

NotificationList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  customer:PropTypes.oneOfType(PropTypes.object,null),
  getNotifications: PropTypes.func.isRequired,
  landlord_items: PropTypes.object,
};

NotificationList.defaultProps = {
  error: null,
  success: null,
  loading: false,
  customer:null,
  items:[],
};

export default connect(mapStateToProps, {getNotifications})(NotificationList);