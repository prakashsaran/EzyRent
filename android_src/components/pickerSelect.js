import React, { PureComponent } from "react";
import { StyleSheet, View,Text,TouchableOpacity,Image,FlatList } from "react-native";
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

class PickerSelect extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            isModalVisible:false,
            selectedItem:null,
        }
        this.onChooseItem = this.onChooseItem.bind(this);
    }
    onclickLabel(){
        this.setState({isModalVisible:true})
    }

    setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
    }
        
    onChooseItem(item){
        const { onChooseItem } = this.props;
        onChooseItem(item);
        this.setState({isModalVisible:false})
        this.setState({selectedItem:item.label})
    }
    getLabelFormat(defaultValue){
        const {items} = this.props;
        const currentSelection =  items.find(function(item){
            if(item.value ==defaultValue){
                return item;
            }
            return null;
            });
        if(currentSelection){
            return currentSelection.label;
        }
        return null;
    }
    render(){
        const {style,pickerStyle,selectedLabelStyle,placeholder,placeholderStyle,isdisabled,defaultValue} = this.props;
        return(
        <View style={[styles.container,]}>
            {this.renderModalView()}
            <TouchableOpacity disabled={isdisabled} ref={component => this._root = component} {...this.props} onPress={()=>this.onclickLabel()} style={[styles.pickercontainer,pickerStyle]}>
            <View style={{width:'95%'}}>{defaultValue?<Text style={[styles.selectedLabel,selectedLabelStyle]} numberOfLines={1}>{this.getLabelFormat(defaultValue)}</Text>:<Text style={[styles.placeholder,placeholderStyle]} numberOfLines={1}>{placeholder}</Text>}</View>
            <View style={{position:'absolute',right:0}}><Image style={{width:13,height:13}} source={require('../assets/images/arrowdown_picker.png')}/></View>
            </TouchableOpacity>
        </View>
        )
    }
    renderItem(item,index){
        const {itemStyle,itemLabelStyle} = this.props;
        if(item.value=="add_new"){
            return(
                <TouchableOpacity style={[styles.renderItem,itemStyle]} key={index} onPress={()=>this.onChooseItem(item)}>
                    <Text style={[styles.itemlabelnew,itemLabelStyle]} numberOfLines={1}>{item.label}</Text>
                </TouchableOpacity>
            )
        }
        return(
            <TouchableOpacity style={[styles.renderItem,itemStyle]} key={index} onPress={()=>this.onChooseItem(item)}>
                <Text style={[styles.itemlabel,itemLabelStyle]} numberOfLines={1}>{item.label}</Text>
            </TouchableOpacity>
        )
    }
    renderModalView(){
        const {items,placeholder,pickerPopupStyle} = this.props;
        return(
          <Modal
           testID={'modal'}
           isVisible={this.state.isModalVisible} 
           onBackdropPress={() => this.setState({isModalVisible:false})}
           backdropOpacity={0.8}
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            style={{alignItems:'center'}}
           >
             <View style={[styles.popupContainer,pickerPopupStyle]}>
                 <Text style={styles.modelTitle}>{placeholder}</Text>
                 <FlatList
                    data={items}
                    renderItem={({ item,index }) => this.renderItem(item,index)}
                    keyExtractor={item => item.value}
                />
             </View>
          </Modal>
        )
    }
}
PickerSelect.propTypes = {
    onChooseItem:PropTypes.func.isRequired,
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
  };
  
  PickerSelect.defaultProps = {
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
    padding:30,
    paddingHorizontal:30,
  },
  modelTitle:{
      fontFamily:'Oxygen-Bold',
      fontSize:18,
  },
  renderItem:{
      marginVertical:6,
  },
  itemlabel:{
      fontFamily:'Montserrat-Regular',
      fontSize:16,
  },
  itemlabelnew:{
      fontFamily:'Montserrat-Regular',
      fontSize:16,
      color:'#3059DD',
  },
  selectedLabel:{
      fontSize:16,
  },
  placeholder:{
      color:"#999",
      fontSize:16,
  }
});

export {PickerSelect};
