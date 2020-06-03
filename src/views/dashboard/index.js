import React, { Component } from "react";
import { StyleSheet,StatusBar,ScrollView,TouchableOpacity, View,Image, Text, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationService from '../../navigation/NavigationService';
import { ThemeContext, theme } from '../../theme';
import {Spinner} from '../../components';
import styles from './style';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH,
  NAVIGATION_MORE_MY_PROFILE_VIEW_PATH
} from '../../navigation/routes';
// IMPORT DESHBOARD TYPES
import LandlordDashboard from './landlord';
import LesseeDashboard from './lessee';
import TenantDashboard from './tenant';
import NewDashboard from './new';

class myDashBoard extends React.Component {
  static contextType = ThemeContext;
  constructor(props){
    super();
    this.state={
      dashboardType:null,
    }
    StatusBar.setBarStyle("light-content");
    StatusBar.setHidden(false)
  }
  componentDidMount(){
    const {customer,status}=this.props
    console.log("customer =>",customer)
    if(status){
      if(customer.hasOwnProperty("user_type")){
        if(customer.user_type){
          this.setState({dashboardType:customer.user_type});
        } else{
          this.setState({dashboardType:'U'});
        }
      } else{
        this.setState({dashboardType:"U"});
      }
    } else{
      this.setState({dashboardType:"U"});
    }
  }
  addPropertyTenant(){
    NavigationService.navigate(NAVIGATION_ADD_PROPERTIES_TENANTS_VIEW_PATH);
  }
  gotToProfile(){
    NavigationService.navigate(NAVIGATION_MORE_MY_PROFILE_VIEW_PATH);
  }
  render(){
    const theme = this.context;
    const {dashboardType} =this.state
    switch(dashboardType){
      case "L":
        return <LandlordDashboard/>;
        break;
      case "B":
        return <LesseeDashboard/>;
        break;
      case "T":
        return <TenantDashboard/>;
        break;
      case "U":
        return <NewDashboard/>;
        break;
      default:
        return <Spinner/>
    }
  }
}

const mapStateToProps = ({ account }) => {
  const { error, success, loading,status,customer } = account;

  return { error, success, loading, status, customer };
};

myDashBoard.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType(PropTypes.string, null),
  success: PropTypes.oneOfType(PropTypes.string, null),
  status:PropTypes.bool,
  customer:PropTypes.oneOfType(PropTypes.object,null),
};

myDashBoard.defaultProps = {
  error: null,
  success: null,
  loading: false,
  status:false,
  customer:null,
};

export default connect(mapStateToProps, { })(myDashBoard);
