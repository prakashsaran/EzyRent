import React, { Component,useContext } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import SvgUri from 'react-native-svg-uri';
import {ActiveEllipse,InActiveEllipse} from '../../../components';
import styles from './style';
import { ThemeContext } from '../../../theme';
import NavigationService from '../../../navigation/NavigationService';
import {NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH} from '../../../navigation/routes';

function WalkThroughTenants(props) {
const theme = useContext(ThemeContext);
  return (
    <SafeAreaView style={styles.container(theme)}>
      <ScrollView>
        <View style={styles.itemcontainer(theme)}>
        <Image
          source={require('../../../assets/images/walkthrough_tenant.png')}
          resizeMode="contain"
          style={styles.landloardimage}
        />
        <Text style={styles.landlordProperties(theme)}>
            As Tenants Pay Rent
        </Text>
         <Text style={styles.pageInfo(theme)}>
            Tenants can pay rent using the EzyRent app eco-system.
          </Text>
          <View style={styles.walkIndicator(theme)}>
          <Image style={{width:15,height:15}} source={require("../../../assets/images/indicator_inactive.png")}></Image>
          <Image style={{width:15,height:15}} source={require("../../../assets/images/round.png")}></Image>
          </View>
        </View>
      </ScrollView>
          <TouchableOpacity style={styles.btncontainer(theme)} onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH)}}>
            <Text style={theme.typography.caption}>LET`S START</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}

export default WalkThroughTenants;
