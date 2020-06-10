import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import styles from './style';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
} from '../../navigation/routes';

class MyTenants extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    StatusBar.setBarStyle("dark-content");
  }
  goToMyTenants(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }

  render(){
    const theme = this.context;
      return (
          <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
            <TouchableOpacity onPress={()=>NavigationService.goBack()} style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',}}>
                <Image style={styles.back_button} source={require('../../assets/images/back-blue.png')}></Image>
                <Text style={theme.typography.pageTitleSecondary}> My Tenants</Text>
            </TouchableOpacity>
            
          </View>
              <ScrollView
              showsVerticalScrollIndicator={false}
              >
                <View style={[theme.typography.rectView2,styles.rectviewcustom]}>
                  <View style={styles.shadow}>
                    <View style={styles.MoreLinkswrap}>
                    <Image style={styles.User_image} source={require('../../assets/images/sample/james.png')}></Image>
                    <TouchableOpacity style={styles.UserWrap}>
                      <View style={styles.heading_wrap}>
                        <Text style={styles.MoreLinksItem(theme)}>James Craig</Text>
                        <Text style={styles.MoreLinksItemSub(theme)}>(+97 862482242)</Text>
                      </View>
                      <View style={styles.contentWrap}>
                      <Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image>
                      <Text style={styles.MoreLinksItemLocation(theme)}>No.13, Metro Falt, Sheikh Mohammed Rd. Dubai, UAE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>
                  <View style={styles.shadow}>
                    <View style={styles.MoreLinkswrap}>
                    <Image style={styles.User_image} source={require('../../assets/images/sample/james.png')}></Image>
                    <TouchableOpacity style={styles.UserWrap}>
                      <View style={styles.heading_wrap}>
                        <Text style={styles.MoreLinksItem(theme)}>James Craig</Text>
                        <Text style={styles.MoreLinksItemSub(theme)}>(+97 862482242)</Text>
                      </View>
                      <View style={styles.contentWrap}>
                      <Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image>
                      <Text style={styles.MoreLinksItemLocation(theme)}>No.13, Metro Falt, Sheikh Mohammed Rd. Dubai, UAE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>
                  <View style={styles.shadow}>
                    <View style={styles.MoreLinkswrap}>
                    <Image style={styles.User_image} source={require('../../assets/images/sample/james.png')}></Image>
                    <TouchableOpacity style={styles.UserWrap}>
                      <View style={styles.heading_wrap}>
                        <Text style={styles.MoreLinksItem(theme)}>James Craig</Text>
                        <Text style={styles.MoreLinksItemSub(theme)}>(+97 862482242)</Text>
                      </View>
                      <View style={styles.contentWrap}>
                      <Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image>
                      <Text style={styles.MoreLinksItemLocation(theme)}>No.13, Metro Falt, Sheikh Mohammed Rd. Dubai, UAE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>
                  <View style={styles.shadow}>
                    <View style={styles.MoreLinkswrap}>
                    <Image style={styles.User_image} source={require('../../assets/images/sample/james.png')}></Image>
                    <TouchableOpacity style={styles.UserWrap}>
                      <View style={styles.heading_wrap}>
                        <Text style={styles.MoreLinksItem(theme)}>James Craig</Text>
                        <Text style={styles.MoreLinksItemSub(theme)}>(+97 862482242)</Text>
                      </View>
                      <View style={styles.contentWrap}>
                      <Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image>
                      <Text style={styles.MoreLinksItemLocation(theme)}>No.13, Metro Falt, Sheikh Mohammed Rd. Dubai, UAE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>
                  <View style={styles.shadow}>
                    <View style={styles.MoreLinkswrap}>
                    <Image style={styles.User_image} source={require('../../assets/images/sample/james.png')}></Image>
                    <TouchableOpacity style={styles.UserWrap}>
                      <View style={styles.heading_wrap}>
                        <Text style={styles.MoreLinksItem(theme)}>James Craig</Text>
                        <Text style={styles.MoreLinksItemSub(theme)}>(+97 862482242)</Text>
                      </View>
                      <View style={styles.contentWrap}>
                      <Image style={styles.gps_dark_icon} source={require('../../assets/images/gps_dark.png')}></Image>
                      <Text style={styles.MoreLinksItemLocation(theme)}>No.13, Metro Falt, Sheikh Mohammed Rd. Dubai, UAE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>
                </View>
              </ScrollView>
          </SafeAreaView>
      );
  }
}
export default MyTenants;
