import React, { useContext } from 'react';
import { View,Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from './Text';
import { ThemeContext } from '../../theme';

const formatPrice = (price, currencyRate) => parseFloat((price * currencyRate).toFixed(2));

/**
 * Component to display price of the product. If discount price is
 * available, then base price will be crossed off
 *
 * @param {Object} props                             - props of the component
 * @param {number} [props.basePrice = 0]             - default selling price of the product
 * @param {number} [props.discountPrice = 0]         - special or discount price for the product
 * @param {string} props.currencySymbol              - currency symbol to append before price
 * @param {string} props.currencyRate                - currency rate which must be multiply with the actual price.
 * @param {string} props.style                       - style related to price container
 *
 * @return React component
 */
const PercentageSaving = ({
  currencySymbol,
  currencyRate,
  basePrice,
  discountPrice,
  style,
  itemStyle,
}) => {
  const theme = useContext(ThemeContext);
  const isBold = () => discountPrice && discountPrice < basePrice;
  const getDescountPercentage =()=> (100-(discountPrice*100)/basePrice).toFixed(0);
  return (
      discountPrice  && discountPrice < basePrice ?
      	<View style={[styles.container,style]}>
        	<Text style={[styles.discountSave(theme),itemStyle]}>You Save: {getDescountPercentage()}%</Text>
      </View>
      :null
  );
};

const styles = {
  container: {
    flexDirection: 'row',
  },
  discountPriceText: theme => ({
    marginEnd: theme.spacing.tiny,
  }),
  discountSave: theme =>({
    backgroundColor:theme.colors.secondary,
    padding:2,
    color:theme.colors.primary,
    marginBottom:theme.spacing.tiny,
    fontSize:12,
    textAlign:'center',
  }),
};

PercentageSaving.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  basePrice: PropTypes.number,
  discountPrice: PropTypes.number,
  style: ViewPropTypes.style,
  itemStyle: ViewPropTypes.style,
};

PercentageSaving.defaultProps = {
  basePrice: 0,
  discountPrice: 0,
  style: {},
  itemStyle: {},
};

export { PercentageSaving };
