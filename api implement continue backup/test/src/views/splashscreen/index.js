import React, { Component,useContext,useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import {isAuth} from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeContext } from '../../theme';

/* componentDidMount(){
  const {isAuth,customer,access_token} = this.props;
  isAuth(customer,access_token);
} */

function Splash(props) {
  const theme = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/splash_logo.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      <View style={styles.imageFiller}></View>
      <View style={styles.loremIpsumColumn}>
        <Text style={styles.loremIpsum}>
          Copyright © EzyRent 2020. All Rights Reserved.
        </Text>
        <Image
          source={require("../../assets/images/ezyrent-footer-icon.png")}
          resizeMode="contain"
          style={styles.image2}
        ></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 135,
    alignSelf: "center"
  },
  imageFiller: {
    flex: 1
  },
  loremIpsum: {
    color: "#121212",
    textAlign: "center",
    marginBottom: 66
  },
  image2: {
    height: 92
  },
  loremIpsumColumn: {}
});


const mapStateToProps = ({ account }) => {
  const { customer,access_token } = account;

  return { customer,access_token };
};

Splash.propTypes = {
  isAuth: PropTypes.func.isRequired,
  customer: PropTypes.array,
  access_token: PropTypes.string,
};

Splash.defaultProps = {
  customer: null,
  access_token: null,
};


export default connect(mapStateToProps, { isAuth })(Splash);
