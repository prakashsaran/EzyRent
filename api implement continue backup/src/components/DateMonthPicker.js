import React, { PureComponent } from "react";
import { StyleSheet, View,Text,TouchableOpacity,Image,FlatList } from "react-native";
import PropTypes from 'prop-types';
import Picker from 'react-native-picker';
const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];

class DateMonthPicker extends PureComponent {
    constructor(props) {
        super(props);
        this.state={}
        this.onSeleteItem = this.onSeleteItem.bind(this);
        this.onCancelItem = this.onCancelItem.bind(this);
        this.onConfirmItem = this.onConfirmItem.bind(this);
    }

     getIndexOfMonth(object, value) {
        const indexOfObj = Object.keys(object).find(key => object[key] === value);
        
        const indxOfMonth = parseInt(indexOfObj)+1;
        if(indxOfMonth < 10){
            return "0"+indxOfMonth;
        }
        return indxOfMonth;

      }
      
    onCancelItem(data){
        const { onCancelItem } = this.props;
        if(onCancelItem){
            onCancelItem(data);
        }
    }
    onSeleteItem(data){
        const { onSeleteItem } = this.props;
        if(onSeleteItem){
            const SelectedDay = (data[0]<10)?"0"+data[0]:data[0];
            const SelectedMonth = this.getIndexOfMonth(monthList,data[1]);
            const returnValue = SelectedDay+"-"+SelectedMonth;
            onSeleteItem(returnValue);
        }
        
    }
    onConfirmItem(data){
        const { onConfirmItem } = this.props;
        if(onConfirmItem){
            onConfirmItem(data);
        }
    }

  showDatePicker(){
    let daylist = [];
    for(var i=1;i<32;i++){
        daylist.push(i);
    }
    Picker.init({
        pickerData: [
            daylist,
            monthList
        ],
        //selectedValue: [59],
        pickerConfirmBtnText: 'confirm',
        pickerCancelBtnText: 'cancel',
        pickerTitleText: 'Choose Date Month',
        onPickerConfirm: data => {
            this.onConfirmItem(data);
        },
        onPickerCancel: data => {
            this.onCancelItem(data);
        },
        onPickerSelect: data => {
            this.onSeleteItem(data);
        }
    });
    Picker.show();
  }

    setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
    }
    
    getLabelFormat(selectLable){
        const arrayFormat  = selectLable.split("-");
        if(Object.keys(arrayFormat).length > 1){
            const indxOfMonth = parseInt(arrayFormat[1])-1;
            return arrayFormat[0]+" "+monthList[indxOfMonth];
        }
        return selectLable;
    }
       
    render(){
        const {style,selectedLabelStyle,placeholder,placeholderStyle,isdisabled,pickerStyle,defaultValue} = this.props;
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

export {DateMonthPicker};
