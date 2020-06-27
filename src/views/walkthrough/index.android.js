import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import WalkThroughLandloard from './landloard';
import WalkThroughTenants from './tenant';
import Swiper from 'react-native-swiper';
import SplashScreen from 'react-native-splash-screen'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {isAuth} from '../../actions';


const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

class walkthrough extends Component {
    constructor(props){
        super();
        this.state={
            currentIdx:0,
        }
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
    changeViewIndx(){
       this.setState({currentIdx:1});
       this.swipable.scrollBy(1)
    }
  render() {
      const {currentIdx} = this.state
    return (
      <Swiper style={styles.wrapper} animated={true} loadMinimalLoader={<ActivityIndicator />} ref={ref => { this.swipable = ref;}} index={currentIdx} loop={false} showsPagination={false} showsButtons={false}>
        <WalkThroughLandloard onClickBtn={()=>this.changeViewIndx()}/>
        <WalkThroughTenants/>
      </Swiper>
    )
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
};

walkthrough.defaultProps = {
  customer: null,
  access_token: null,
};


export default connect(mapStateToProps, { isAuth })(walkthrough);
