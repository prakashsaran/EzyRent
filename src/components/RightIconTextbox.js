import React, { PureComponent } from "react";
import { StyleSheet, View, TextInput,Image,TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
import { theme } from "../theme";

class RightIconTextbox extends PureComponent {
    constructor(props) {
      super(props);
    }
    onClickIcon = ()=>{
      if(this.props.onPressIcon) this.props.onPressIcon();
    }
    onfocusMobile = ()=>{
      if(this.props.onFocus) this.props.onFocus();
    }
    onBlurMobile = ()=>{
      if(this.props.onBlur) this.props.onBlur();
    }
    setNativeProps = (nativeProps) => {
      this._root.setNativeProps(nativeProps);
    }
    render(){
        const {onChangeText,placeholder,textValue,source,keyboardType,style,InputStyle} = this.props;
        return (
        <View style={[styles.container, style]}  ref={component => this._root = component}>
          <TextInput onFocus={()=>this.onfocusMobile()} onBlur={()=>this.onBlurMobile()} keyboardType={keyboardType} onChangeText={(textValue)=>{onChangeText(textValue)}} placeholder={placeholder} value={textValue} style={[styles.inputStyle,InputStyle]}></TextInput>
          {source && <TouchableOpacity onPress={()=>this.onClickIcon()}>
            <Image source={source} style={styles.iconStyle}/>
          </TouchableOpacity>}
        </View>
      );
    }
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
    onFocus:PropTypes.func,
    onBlur:PropTypes.func,
    style:PropTypes.shape({}),
    source: PropTypes.any.isRequired,
    keyboardType:PropTypes.string,
    onPressIcon:PropTypes.func,
    InputStyle: PropTypes.shape({}),
  };
  
  RightIconTextbox.defaultProps = {
    placeholder:'',
    textValue:'',
    style: {},
    keyboardType:'default',
    InputStyle:{},
  };
  export { RightIconTextbox };
