import React from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { ModalSelect } from '../common';
import { priceSignByCode, currencyExchangeRateByCode } from '../../helper/price';
import { changeStore } from '../../actions';
import { Text } from 'react-native';
import {MAGENTO_GET_STOREVIEWS} from '../../actions/types';

const StorePicker = ({appstores}) => {
  const {storeViews,defaultStore} = appstores;
  const data = storeViews.filter((item) => item.website_id !=0).map(value => ({
    label: value.name,
    key: value.code,
  }));

  const onChange = (atrribute, itemValue) => {
    AsyncStorage.setItem('current_store_code', itemValue);
  };

  return (
    <ModalSelect
      disabled={data.length === 0}
      label={defaultStore}
      attribute="StoreCode"
      data={data}
      onChange={onChange}
      style={styles.currencyContainer}
    />
  );
};

const styles = {
  currencyContainer: {
    width: 60,
    marginEnd: 10,
  },
};

StorePicker.propTypes = {
  appstores: PropTypes.arrayOf(PropTypes.string),
};

StorePicker.defaultProps = {
  appstores: [],
};

const mapStatetoProps = ({ magento }) => {
  const {appstores} = magento;
  return { appstores};
};

export default connect(mapStatetoProps, { changeStore })(StorePicker);
