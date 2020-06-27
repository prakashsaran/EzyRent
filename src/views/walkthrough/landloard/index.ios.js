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
import PropTypes from 'prop-types';
import Svg, { Ellipse } from "react-native-svg";
import SvgUri from 'react-native-svg-uri';
import {ActiveEllipse,InActiveEllipse} from '../../../components';
import styles from './style.ios';
import { ThemeContext } from '../../../theme';
import NavigationService from '../../../navigation/NavigationService';
import {NAVIGATION_WALKTHROUGH_TENANT_PATH,NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH} from '../../../navigation/routes';
import {appInitStart} from '../../../actions';
import { connect } from 'react-redux';

function WalkThroughLandloard(props) {
  useEffect(() => {
    // ComponentDidMount
    StatusBar.setHidden(true)

  }, []);

const theme = useContext(ThemeContext);
const {onClickBtn} = props
const appStart = () =>{
  props.appInitStart();
  NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH)
}
  return (
    <SafeAreaView style={styles.container(theme)}>
        <TouchableOpacity style={styles.skipwalkthrough} onPress={()=>{appStart()}}>
          <Text style={styles.skipText(theme)}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.itemcontainer(theme)}>
          <Image
            source={require('../../../assets/images/walkthrough_landloard.png')}
            resizeMode="contain"
            style={styles.landloardimage}
          />
          <Text style={styles.landlordProperties(theme)}>
              As Landlord Add &amp; Manage Properties/Tenants
          </Text>
           <Text style={styles.pageInfo(theme)}>
              Landlords can manage tenants using the EzyRent app eco-system. Add
              tenant details like tenant mobile number, house number, building
              name, total amount to be collected from tenant, and so on.
            </Text>
        </View>
    </SafeAreaView>
  );
}
WalkThroughLandloard.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
  appInitStart: PropTypes.func.isRequired,
  extra: PropTypes.string
};


const mapStateToProps = () => {
  return {};
};


WalkThroughLandloard.defaultProps = {
  extra:null,
};

export default connect(mapStateToProps, { appInitStart })(WalkThroughLandloard);

