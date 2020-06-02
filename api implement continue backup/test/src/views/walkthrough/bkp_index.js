import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'
import WalkThroughLandloard from './landloard';
import WalkThroughTenants from './tenant';
import Swiper from 'react-native-swiper'

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

export default class walkthrough extends Component {
    constructor(props){
        super();
        this.state={
            currentIdx:0,
        }
    }
    changeViewIndx(){
       this.setState({currentIdx:1});
       this.swipable.scrollBy(1)
    }
  render() {
      const {currentIdx} = this.state
    return (
      <Swiper style={styles.wrapper} ref={ref => { this.swipable = ref;}} index={currentIdx} loop={false} showsPagination={false} showsButtons={false}>
        <WalkThroughLandloard onClickBtn={()=>this.changeViewIndx()}/>
        <WalkThroughTenants/>
      </Swiper>
    )
  }
}
