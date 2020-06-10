import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Ellipse } from "react-native-svg";

function InActiveEllipse(props) {
  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 20.00 20.00" style={styles.ellipse2}>
        <Ellipse
          strokeWidth={3}
          fill="rgba(255,255,255,1)"
          stroke="rgba(67,177,29,1)"
          cx={10}
          cy={10}
          rx={9}
          ry={9}
        ></Ellipse>
      </Svg>
    </View>
  );
}

function ActiveEllipse(props) {
  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 20.00 20.00" style={styles.ellipse2}>
        <Ellipse
          strokeWidth={3}
          fill="rgba(67,177,29,1)"
          stroke="rgba(67,177,29,1)"
          cx={10}
          cy={10}
          rx={9}
          ry={9}
        ></Ellipse>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20
  },
  ellipse2: {
    width: 20,
    height: 20
  }
});

export {ActiveEllipse,InActiveEllipse};
