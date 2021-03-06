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
    UNSAFE_componentWillReceiveProps(nextProps){
        const {items} = this.props;
        if(nextProps.defaultValue!==this.props.defaultValue){
            this.setState({selectedItem:nextProps.defaultValue})
            if(nextProps.defaultValue){
                const selected = items[nextProps.defaultValue];
                if(selected){
                    this.setState({selectedItem:selected.label})
                }
            }
        }

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
       
    render(){
        const {style,pickerStyle,selectedLabelStyle,placeholder,placeholderStyle} = this.props;
        const {selectedItem} = this.state
        return(
        <View style={[styles.container,]}>
            {this.renderModalView()}
            <TouchableOpacity ref={component => this._root = component} {...this.props} onPress={()=>this.onclickLabel()} style={[styles.pickercontainer,pickerStyle]}>
            <View style={{width:'95%'}}>{selectedItem?<Text style={[styles.selectedLabel,selectedLabelStyle]} numberOfLines={1}>{selectedItem}</Text>:<Text style={[styles.placeholder,placeholderStyle]} numberOfLines={1}>{placeholder}</Text>}</View>
            <View style={{position:'absolute',right:0}}><Image style={{width:13,height:13}} source={require('../assets/images/arrowdown_picker.png')}/></View>
            </TouchableOpacity>
        </View>
        )
    }
    renderItem(item,index){
        const {itemStyle,itemLabelStyle} = this.props;
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

export {PickerSelect};
