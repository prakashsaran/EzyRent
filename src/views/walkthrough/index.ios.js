import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import WalkThroughLandloard from './landloard';
import WalkThroughTenants from './tenant';
import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {isAuth} from '../../actions';
import AppIntroSlider from 'react-native-app-intro-slider';
import {NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH} from '../../navigation/routes';
import {appInitStart} from '../../actions';
import NavigationService from '../../navigation/NavigationService';


class walkthrough extends Component {
    constructor(props){
        super();
    }
    startApp(){
      const {appInitStart} = this.props
      appInitStart();
      NavigationService.navigate(NAVIGATION_SIGN_UP_MOBILE_NUMBER_PATH);
    }

    UNSAFE_componentWillMount(){
      const {isAuth,customer,access_token,navigation} = this.props;
      isAuth(customer,access_token,navigation);
    }
    componentDidMount() {
      const {isAuth,customer,access_token,navigation} = this.props;
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    }
    
  _renderItem({item}){
    if (item.id==1) {
      return (
        <WalkThroughLandloard/>
      );
    } else{
       return (
        <WalkThroughTenants/>
        );
    }
  }
  render() {
    const slides = [{id:1},{id:2}];
    return (
      <AppIntroSlider
       dotStyle={{borderColor:'#44B21A',width:20,height:20,borderRadius:10,borderWidth:2,}} 
       activeDotStyle={{backgroundColor:'#44B21A',width:20,height:20,borderRadius:10,borderWidth:2,borderColor:'#44B21A',}} 
       doneLabel={"LET`S START"} 
       bottomButton={true} 
       renderItem={this._renderItem} 
       data={slides} onDone={()=>this.startApp()}/>
    );
  }
}

const mapStateToProps = ({ account }) => {
  const { customer,access_token } = account;

  return { customer,access_token };
};

walkthrough.propTypes = {
  isAuth: PropTypes.func.isRequired,
  customer: PropTypes.array,
  access_token: PropTypes.string,
  appInitStart: PropTypes.func.isRequired,
};

walkthrough.defaultProps = {
  customer: null,
  access_token: null,
};


export default connect(mapStateToProps, {appInitStart,isAuth })(walkthrough);
