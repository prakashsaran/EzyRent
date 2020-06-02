import React, { Component } from "react";
import { StyleSheet, View, TextInput,Image,TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
import { theme } from "../theme";

function RightIconTextbox(props) {
    const {onChangeText,placeholder,textValue,source,keyboardType} = props
    const onClickIcon = ()=>{
      if(props.onPressIcon) props.onPressIcon();
    }
  return (
    <View style={[styles.container, props.style]}>
      <TextInput keyboardType={keyboardType} onChangeText={(textValue)=>{onChangeText(textValue)}} placeholder={placeholder} value={textValue} style={styles.inputStyle}></TextInput>
      {source && <TouchableOpacity onPress={()=>onClickIcon()}>
         <Image source={source} style={styles.iconStyle}/>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 14,
    paddingRight: 16,
    paddingBottom: 8,
    color:theme.colors.primaryTitleColor,
    fontFamily:theme.typography.secondryFont,
    fontSize:16,
    fontWeight:theme.typography.fontWeightRegular,
},
  iconStyle: {
    height:30,
    width:30,
  }
});

RightIconTextbox.propTypes = {
    placeholder:PropTypes.string,
    textValue:PropTypes.string,
    onChangeText:PropTypes.func.isRequired,
    style:PropTypes.style,
    source: PropTypes.any.isRequired,
    keyboardType:PropTypes.string,
    onPressIcon:PropTypes.func,
  };
  
  RightIconTextbox.defaultProps = {
    placeholder:'',
    textValue:'',
    style: {},
    keyboardType:'default',
  };
  export { RightIconTextbox };
