import React, { PureComponent } from "react";
import { StyleSheet, View,Text,TouchableOpacity,Image,FlatList } from "react-native";
import PropTypes from 'prop-types';

class ProgressiveImage extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            defaultImage:true,
        }
    }

    render(){
        const {defaultImage} = this.state;
        const {defaultImage} = this.props;
        return(
        <View style={[styles.container,style]}>
            <TouchableOpacity disabled={isdisabled} ref={component => this._root = component} {...this.props} onPress={()=>this.showDatePicker()} style={[styles.pickercontainer,pickerStyle]}>
                {defaultValue?<Text style={[styles.selectedLabel,selectedLabelStyle]} numberOfLines={1}>{this.getLabelFormat(defaultValue)}</Text>:<Text style={[styles.placeholder,placeholderStyle]} numberOfLines={1}>{placeholder}</Text>}
                <View style={{position:'absolute',right:0}}><Image style={{width:13,height:13}} source={require('../assets/images/arrowdown_picker.png')}/></View>
            </TouchableOpacity>
        </View>
        )
    }
}
DateMonthPicker.propTypes = {
    placeholder:PropTypes.string,
    items:PropTypes.array,
    pickerStyle:PropTypes.shape({}),
    pickerPopupStyle:PropTypes.shape({}),
    itemStyle:PropTypes.shape({}),
    itemLabelStyle:PropTypes.shape({}),
    selectedLabelStyle:PropTypes.shape({}),
    placeholderStyle:PropTypes.shape({}),
    defaultValue: PropTypes.any,
    isdisabled: PropTypes.bool,
    onCancelItem: PropTypes.func,
    onSeleteItem: PropTypes.func,
    onConfirmItem: PropTypes.func,
  };
  
  DateMonthPicker.defaultProps = {
    placeholder:'select a item',
    items:[],
    pickerStyle:{},
    pickerPopupStyle:{},
    itemStyle:{},
    itemLabelStyle:{},
    selectedLabelStyle:{},
    placeholderStyle:{},
    defaultValue: undefined,
    isdisabled:false,
};

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
  pickercontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  popupContainer:{
    width:300,
    maxHeight:300,
    backgroundColor:'#fff',
    borderRadius:5,
    padding:10,
  },
  modelTitle:{
      fontFamily:'Montserrat-Bold',
      fontSize:16,
      marginVertical:10,
  },
  renderItem:{
      marginVertical:6,
  },
  itemlabel:{
      fontFamily:'Montserrat-Regular',
      fontSize:16,
  },
  selectedLabel:{
      fontSize:16,
  },
  placeholder:{
      color:"#999",
      fontSize:16,
  }
});

export {ProgressiveImage};
