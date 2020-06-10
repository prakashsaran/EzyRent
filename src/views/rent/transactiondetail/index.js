import React, { Component } from "react";
import {StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground, TextInput,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, theme } from '../../../theme';
import styles from './style';
import NavigationService from '../../../navigation/NavigationService';
class TransactionDetails extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
    }
    StatusBar.setBarStyle('light-content');
  }
  renderHeader(){
    const {navigation} = this.props
    const item = navigation.getParam('item');
    return(
      <View style={styles.headerContainer(theme)}>
        <View style={styles.headerContext}>
          <TouchableOpacity onPress={()=>NavigationService.goBack()} style={styles.backscreen}>
            <Image style={styles.backscreen_img} resizeMode={'contain'} source={require('../../../assets/images/back-white.png')}></Image>
            <Text style={styles.pageTitle(theme)}>Transaction Details</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}} style={styles.backscreen}>
            <Image style={styles.printscreen} resizeMode={'center'} source={require('../../../assets/images/download.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.headerBanner(theme)}>
          <View style={styles.headerBannerImage(theme)}>
            <ImageBackground imageStyle={styles.loopitembg} style={[styles.loopitembg,styles.shadowView]} resizeMode={'cover'} source={this.fasterImageRender(item)}>
              <ImageBackground imageStyle={styles.loopitembg} style={styles.loopitembg} resizeMode={'stretch'} source={require('../../../assets/images/properties_item_bg.png')}>
                  <View style={styles.builingnameWrapp}>
                     <Text style={styles.itemName(theme)}>House No. 74 </Text>
                     <Text style={styles.itemName(theme)}>SFS Merrie Pink</Text>
                  </View>
                 <View style={styles.propertygnInfo}>
                    <View style={styles.locationWrapp}>
                        <Text style={styles.propItemattrLocation(theme)}>APPARTMENT</Text>
                        <Text style={styles.propItemattrLocation(theme)}>{item.location}</Text>
                    </View>
                 </View>
              </ImageBackground>

            </ImageBackground>
          </View>
        </View>
      </View>
    )
  }
  /* comman using function current page */
  fasterImageRender(item){
    if(!item.image || item.image==null || item.image==''){
      return require('../../../assets/images/sample/sample_image_1.png');
    }
    return {uri:item.image};
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

  /* comman using function current page */
  render(){
    const theme = this.context;
    const {mobileNumber,tenantName,houseNumber,buildingName,collectingAmount} = this.state
      return (
        <SafeAreaView style={styles.container(theme)}>
              <View>
                {this.renderHeader()}
                <View style={styles.formcontainer}>
                  <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.formColumnWrapp}>
                      <View style={styles.transactionInf}>
                         <Text style={styles.columntitle(theme)}>TRANSACTION DETAILS</Text>

                         <View style={styles.fieldWrapp}>
                             <Text style={[theme.typography.tooltip,{color:theme.colors.descriptionColor}]}>Transaction Number</Text>
                             <Text style={styles.responseValue(theme)}>094387483647</Text>
                          </View>


                         <View style={styles.fieldWrapp}>
                             <Text style={[theme.typography.tooltip,{color:theme.colors.descriptionColor}]}>Amount Paid</Text>
                             <Text style={styles.responseValue(theme)}>INR 30,000</Text>
                          </View>

                         <View style={styles.fieldWrapp}>
                             <Text style={[theme.typography.tooltip,{color:theme.colors.descriptionColor}]}>Date of Payment</Text>
                             <Text style={styles.responseValue(theme)}>15 March 2020 <Text style={[theme.typography.tooltip,{color:theme.colors.descriptionColor}]}>|</Text> 05:34PM</Text>
                          </View>

                         <View style={styles.fieldWrapp}>
                             <Text style={[theme.typography.tooltip,{color:theme.colors.descriptionColor}]}>Rent Period</Text>
                             <Text style={styles.responseValue(theme)}>20 March 2020 to 19 April 2020</Text>
                          </View>

                         <View style={styles.fieldWrapp}>
                             <Text style={[theme.typography.tooltip,{color:theme.colors.descriptionColor}]}>Transaction Status</Text>
                             <Text style={styles.responseValue(theme)}>Success</Text>
                          </View>

                         <View style={styles.fieldWrapp}>
                             <Text style={[theme.typography.tooltip,{color:theme.colors.descriptionColor}]}>Mode of Transaction</Text>
                             <Text style={styles.responseValue(theme)}>Online Payment</Text>
                          </View>

                         <View style={styles.fieldWrapp}>
                             <Text style={[theme.typography.tooltip,{color:theme.colors.descriptionColor}]}>Bank Details</Text>
                             <Text style={styles.responseValue(theme)}>ICICI (XXXXX7867), Althara Branch, Trivandrum Kerala, India.</Text>
                          </View>

                      </View>

                    <View style={styles.spacing}></View>
                    </View>
                  </ScrollView>
                </View>
              </View>
        </SafeAreaView>
      );
  }
}
TransactionDetails.navigationOptions = ({ navigation }) => ({
  header: null,
})

export default TransactionDetails;
