import React, { Component,useContext,useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import SvgUri from 'react-native-svg-uri';
import {ActiveEllipse,InActiveEllipse} from '../../../components';
import styles from './style';
import { ThemeContext } from '../../../theme';
import NavigationService from '../../../navigation/NavigationService';
import {NAVIGATION_WALKTHROUGH_TENANT_PATH,NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH} from '../../../navigation/routes';
function WalkThroughLandloard(props) {
  useEffect(() => {
    // ComponentDidMount
    StatusBar.setHidden(true)

  }, []);

const theme = useContext(ThemeContext);
  return (
  	<SafeAreaView style={styles.container(theme)}>
      <ScrollView>
  	    <TouchableOpacity style={styles.skipwalkthrough} onPress={()=>{NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH)}}>
          <Text style={styles.skipText(theme)}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.itemcontainer}>
        <Image
          source={require('../../../assets/images/walkthrough_landloard.png')}
          resizeMode="contain"
          style={styles.landloardimage}
        />
        <Text style={styles.landlordProperties(theme)}>
            As Landlord Add &amp; Manage Properties/Tenants
        </Text>
         <Text style={styles.pageInfo(theme)}>
            Landlord can manage tenants using the ezyrent app eco-system. Add
            tenant dettails like tenant mobile number, house number, building
            name, total amount to be collected from tenant, and so on.
          </Text>
          <View style={styles.walkIndicator}>
            <ActiveEllipse/>
            <InActiveEllipse/>
          </View>
          <TouchableOpacity style={styles.btncontainer(theme)} onPress={()=>{NavigationService.navigate(NAVIGATION_WALKTHROUGH_TENANT_PATH)}}>
            <Text style={theme.typography.caption}>NEXT</Text>
          </TouchableOpacity>
          <View style={{height:20,width:'100%'}}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default WalkThroughLandloard;
