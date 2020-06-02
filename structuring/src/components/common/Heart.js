import React, { useContext,useEffect } from 'react';
import { TextInput, View, ViewPropTypes,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from './Text';
import { ThemeContext } from '../../theme';
import { Icon } from 'react-native-elements';
import {
  NAVIGATION_LOGIN_PATH,
} from '../../navigation/routes';

const Heart = ({
  product_id,
  customer,
  navigation,
  wishlist,
  addProductToWishlist:_addProductToWishlist,
  ...props
}) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    // ComponentDidMount
    console.log(wishlist)
  }, []);

  const addToWishlist = () =>{
    if (!customer) {
      navigation.navigate(NAVIGATION_LOGIN_PATH);
    }else{
      const postwish = {
        customerId:customer.id,
        productId:product_id,
      }
      _addProductToWishlist(postwish);
    }
  }
  return (
    <TouchableOpacity onPress={()=>addToWishlist()} style={styles.containerStyle(theme)}>
      <Icon name="hearto" type="antdesign" size={20} color={theme.colors.grayDarkColor} /> 
  		<Text style={styles.title(theme)} >ADD TO WISH LIST</Text>      
    </TouchableOpacity>
  );
};

const styles = {
  containerStyle: theme => ({
    height: theme.dimens.defaultInputBoxHeight,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  title: theme => ({
    color:theme.colors.grayDarkColor,
    paddingLeft:10,
  }),
};

Heart.propTypes = {
  navigation: PropTypes.object.isRequired,
  product_id: PropTypes.number,
  customer: PropTypes.object,
  wishlist: PropTypes.object,
  addProductToWishlist: PropTypes.func,
};

Heart.defaultProps = {
  product_id: null,
  customer: null,
  wishlist: null,
};

export { Heart };
