import React, { PureComponent } from "react";
import { StyleSheet, View,Text,TouchableOpacity,Image,FlatList } from "react-native";
import PropTypes from 'prop-types';
import { Picker, DatePicker } from 'react-native-wheel-pick';
import Modal from 'react-native-modal';

const monthList = ['January','February','March','April','May','June','July','August','September','October','November','December'];

class DateMonthPicker extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            modelVisible:false
        };
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
        setTimeout(() => {
            const chooseMonth = new Date(data).getMonth();
            const chooseDay = new Date(data).getDate();
            const currentMonth = parseInt(chooseMonth)+1;
            const { onSeleteItem } = this.props;
            if(onSeleteItem){
                const SelectedDay = (chooseDay<10)?"0"+chooseDay:chooseDay;
                const SelectedMonth = (currentMonth<10)?"0"+currentMonth:currentMonth;
                const returnValue = SelectedMonth+"-"+SelectedDay;
                onSeleteItem(returnValue);
            }
        }, 200);
        
    }
    onConfirmItem(data){
        const { onConfirmItem } = this.props;
        if(onConfirmItem){
            onConfirmItem(data);
        }
    }

  showDatePicker(){
    this.setState({modelVisible:true})
  }

    setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
    }
    
    getLabelFormat(selectLable){
        const arrayFormat  = selectLable.split("-");
        if(Object.keys(arrayFormat).length > 1){
            const indxOfMonth = parseInt(arrayFormat[0])-1;
            return arrayFormat[1]+" "+monthList[indxOfMonth];
        }
        return selectLable;
    }
    renderModeView(){
        const {defaultValue} = this.props
        const defaultDate =  defaultValue?"2020-"+defaultValue:new Date();
        return(
            <Modal animationInTiming={600} animationOutTiming={600} onBackdropPress={()=>this.setState({modelVisible:false})} isVisible={this.state.modelVisible}>
                <View style={{flex:1,justifyContent:'center'}}>
                <DatePicker
                    style={{ backgroundColor: 'white', height: 215,borderBottomWidth:1,borderColor:'red'}} 
                    // android not support width
                    onDateChange={date => {this.onSeleteItem(date)}}
                    mode="date"
                    date={new Date(defaultDate)}
                    itemSpace={30}
                    textSize={16}
                    />
                    <View style={{backgroundColor:'white',alignItems:'center',paddingVertical:10}}>
                        <TouchableOpacity onPress={()=>this.setState({modelVisible:false})}>
                            <Text style={{fontSize:18}}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
           
            </Modal>
        )
        
    }
    render(){
        const {style,selectedLabelStyle,placeholder,placeholderStyle,isdisabled,pickerStyle,defaultValue} = this.props;
        return(
            <View style={[styles.container,style]}>
                {this.renderModeView()}
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
