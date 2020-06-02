import React, { useContext } from 'react';
import { View,Text, ViewPropTypes, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../theme';
import { Icon } from 'react-native-elements';
const Shipping = ({
  size,
  style,
}) => {
  const theme = useContext(ThemeContext);
  const fontsize = (size=='large')?20:12;
  return (
    <View style={[styles.container]}>
      <Icon iconStyle={styles.iconStyle(theme)} name="local-shipping" type="materialicon" size={fontsize+6} color={theme.colors.thirdLightColor} />
      <Text style={[styles.labelprim(theme),{fontSize:fontsize}]}>Delivery</Text>
      <Text style={[styles.labelsecond(theme),{fontSize:fontsize}]}>: Next day</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
  },
  labelprim:theme=>({
  	color:theme.colors.thirdLightColor,
  	marginEnd: theme.spacing.tiny,
  }),
  iconStyle:theme=>({
  	marginEnd: theme.spacing.tiny,
  }),
  labelsecond:theme=>({
  	color:theme.colors.secondary,
  	marginEnd: theme.spacing.tiny,
  }),
};

Shipping.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  style: ViewPropTypes.style,
};

Shipping.defaultProps = {
  size: 'large',
  style: {},
};

export { Shipping };
