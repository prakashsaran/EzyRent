import React, { useContext } from 'react';
import { View, ViewPropTypes, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext } from '../theme';

const Spinner = ({
  size,
  style,
  color
}) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.spinnerStyle, style]}>
      <ActivityIndicator
        size={size}
        color={color?color:theme.colors.secondry}
      />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  style: ViewPropTypes.style,
  color: ViewPropTypes.color,
};

Spinner.defaultProps = {
  size: 'large',
  style: {},
  color:null,
};

export { Spinner };
