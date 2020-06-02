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
const SinglePrice = ({
  currencySymbol,
  currencyRate,
  basePrice,
  discountPrice,
  style,
}) => {
  const theme = useContext(ThemeContext);
  const isBold = () => discountPrice && discountPrice < basePrice;
  const renderDiscountPrice = () => (discountPrice === basePrice ? null : <Text type="label" bold={isBold()} style={styles.discountPriceText(theme)}>HW Price: <Text style={{color:theme.colors.thirdLightColor}}>{`${currencySymbol}${formatPrice(discountPrice, currencyRate)}`}</Text></Text>);
  return (
      <View style={[styles.container,style]}>
        {discountPrice && discountPrice < basePrice ? renderDiscountPrice() : null}
        {discountPrice && discountPrice < basePrice ?<Text>M.R.P. </Text> : null}<Text type="label" bold={!isBold()} style={styles.basePriceText(basePrice, discountPrice,theme)}>{`${currencySymbol}${formatPrice(basePrice, currencyRate)}`}</Text>
      </View>
  );
};

const styles = {
  container: {
  	flex:1,
    flexDirection: 'row',
  },
  discountPriceText: theme => ({
    marginEnd: theme.spacing.tiny,
  }),
  basePriceText: (basePrice, discountPrice,theme) => ({
    textDecorationLine: discountPrice && discountPrice < basePrice ? 'line-through' : 'none',
    color:discountPrice && discountPrice < basePrice ?theme.colors.disabledTextColor:theme.colors.thirdLightColor,
  }),
};

SinglePrice.propTypes = {
  currencySymbol: PropTypes.string.isRequired,
  currencyRate: PropTypes.number.isRequired,
  basePrice: PropTypes.number,
  discountPrice: PropTypes.number,
  style: ViewPropTypes.style,
};

SinglePrice.defaultProps = {
  basePrice: 0,
  discountPrice: 0,
  style: {},
};

export { SinglePrice };
