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
import {appInitStart} from '../../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function WalkThroughTenants(props) {
const theme = useContext(ThemeContext);
const startApp = () =>{
  props.appInitStart();
  NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH);
}
  return (
    <SafeAreaView style={styles.container(theme)}>
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
        </View>
    </SafeAreaView>
  );
}

const mapStateToProps = ({ account }) => {
  const { customer,access_token } = account;

  return { customer,access_token };
};

WalkThroughTenants.propTypes = {
  appInitStart: PropTypes.func.isRequired,
};

WalkThroughTenants.defaultProps = {
};


export default connect(mapStateToProps, { appInitStart })(WalkThroughTenants);
