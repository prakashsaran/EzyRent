import React, { useContext } from 'react';
import { View, ViewPropTypes,Linking,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from './Text';
import { ThemeContext } from '../../theme';
import { Icon } from 'react-native-elements';
import { getProductCustomAttribute } from '../../helper/product';
import { magentoOptions } from '../../config/magento';
const Share = ({
  product,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={()=>onPressButton(product)} style={styles.containerStyle(theme)}>
		<Icon name="email" type="zocial" size={20} color={theme.colors.grayDarkColor} /> 
		<Text style={styles.title(theme)} >EMAIL</Text>      
    </TouchableOpacity>
  );
};

function onPressButton(product) {
  if (Object.keys(product).length > 1) {
    const shareitemname = getProductCustomAttribute(product, 'url_key');
    Linking.openURL(`mailto:?subject=${product.name}&body=${magentoOptions.url+shareitemname.value}.html`);
  }
}
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
Share.propTypes = {
  product: PropTypes.object,
};

Share.defaultProps = {
  product: [],
};

export { Share };
