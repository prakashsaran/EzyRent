import React, { useContext } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
  Image,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Text } from './Text';
import { ThemeContext } from '../../theme';

const CampanyPolice = () => {
  const theme = useContext(ThemeContext);

  const renderItemfirst = () => {
  	return (<View style={styles.item(theme)}>
	  		  	<Image style={{width:50,height:50}} source={require('../../assets/images/icon-pay.png')}/>
	  		  	<Text style={styles.title(theme)}>Pay on Delivery</Text>
  	  		</View>
  	  		)
  }
  const renderItemsecond = () => {
  	return (<View style={styles.item(theme)}>
	  		  	<Image style={{width:50,height:50}} source={require('../../assets/images/icon-return.png')}/>
	  		  	<Text style={styles.title(theme)}>10 Days Returnable</Text>
  	  		</View>
  	  		)
  }
  const renderItemthird = () => {
  	return (<View style={styles.item(theme)}>
	  		  	<Image style={{width:50,height:50}} source={require('../../assets/images/delivery.png')}/>
	  		  	<Text style={styles.title(theme)}>Next Day Guarateed delivery</Text>
  	  		</View>
  	  		)
  }
  return (
  	<View style={styles.policeWrapp(theme)}>
  	{renderItemfirst()}
  	{renderItemsecond()}
  	{renderItemthird()}
    </View>
  );
};

const styles = StyleSheet.create({
	policeWrapp:theme=>({
		flexDirection:'row',
		justifyContent:'space-around',
		flex:1,
	}),
	item:theme=>({
		flexDirection:'column',
		alignItems:'center',
		width:'32%',
		borderWidth:0.7,
		borderColor:theme.colors.silverDarkColor,
		paddingBottom:theme.spacing.tiny,
		paddingTop:theme.spacing.tiny,
	}),
	title:theme=>({
		width:100,
		textAlign:'center',
		color:theme.colors.thirdLightColor,
		fontSize:14,
	}),
});


export { CampanyPolice };
