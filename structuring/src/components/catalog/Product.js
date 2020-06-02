import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, ScrollView, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  getProductMedia,
  addToCartLoading,
  addToCart,
  getConfigurableProductOptions,
  updateProductQtyInput,
  uiProductUpdate,
  uiProductCustomOptionUpdate,
  getCustomOptions,
  addProductToWishlist,
} from '../../actions';
import { Spinner, ModalSelect, Button, Text, Input, Price,SinglePrice,PercentageSaving,CampanyPolice,Heart,Share } from '../common';
import { getProductCustomAttribute } from '../../helper/product';
import ProductMedia from './ProductMedia';
import ProdectInfo from './ProdectInfo';
import { logError } from '../../helper/logger';
import { ThemeContext } from '../../theme';
import { translate } from '../../i18n';
import { finalPrice } from '../../helper/price';
import HTML from 'react-native-render-html'
class Product extends Component {
  static contextType = ThemeContext;

  static propTypes = {
    currencySymbol: PropTypes.string.isRequired,
    currencyRate: PropTypes.number.isRequired,
    uiProductCustomOptionUpdate: PropTypes.func,
    getConfigurableProductOptions: PropTypes.func,
    getCustomOptions: PropTypes.func,
    addProductToWishlist: PropTypes.func,
    getProductMedia: PropTypes.func,
    uiProductUpdateOptions: PropTypes.func,
    addToCartLoading: PropTypes.func,
    addToCart: PropTypes.func,
    updateProductQtyInput: PropTypes.func,
  };

  static defaultProps = {
    currencySymbol: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title.toUpperCase(),
    headerBackTitle: ' ',
  });

  state = {
    selectedProduct: null,
  };

  componentDidMount() {
    const { product, medias } = this.props;

    if (product.type_id === 'configurable') {
      this.props.getConfigurableProductOptions(product.sku);
    }

    this.props.getCustomOptions(product.sku);

    if (!medias || !medias[product.sku]) {
      this.props.getProductMedia({ sku: product.sku });
    }
  }

  onPressAddToCart = () => {
    const {
      cart, product, qty, selectedOptions, customer, selectedCustomOptions,
    } = this.props;
    const options = [];
    Object.keys(selectedOptions).forEach((key) => {
      options.push({
        optionId: key,
        optionValue: selectedOptions[key],
        extensionAttributes: {},
      });
    });

    const customOptions = [];
    selectedCustomOptions && Object.keys(selectedCustomOptions).forEach((key) => {
      customOptions.push({
        optionId: key,
        optionValue: selectedCustomOptions[key],
        extensionAttributes: {},
      });
    });

    let productOptions = {};
    if (options.length) {
      productOptions = {
        productOption: {
          extensionAttributes: {
            configurableItemOptions: options,
          },
        },
      };
    }

    if (productOptions.productOption && productOptions.productOption.extensionAttributes) {
      productOptions.productOption.extensionAttributes.customOptions = customOptions;
    } else {
      productOptions = {
        productOption: {
          extensionAttributes: {
            customOptions,
          },
        },
      };
    }

    this.props.addToCartLoading(true);
    this.props.addToCart({
      cartId: cart.cartId,
      item: {
        cartItem: {
          sku: product.sku,
          qty,
          quoteId: cart.cartId,
          ...productOptions,
        },
      },
      customer,
    });
  }

  // TODO: refactor action name
  optionSelect = (attributeId, optionValue) => {
    const { selectedOptions } = this.props;
    const updatedOptions = { ...selectedOptions, [attributeId]: optionValue };
    this.props.uiProductUpdateOptions(updatedOptions);

    this.updateSelectedProduct(updatedOptions);
  }

  customOptionSelect = (optionId, optionValue) => {
    const { selectedCustomOptions } = this.props;
    const updatedCustomOptions = { ...selectedCustomOptions, [optionId]: optionValue };
    this.props.uiProductCustomOptionUpdate(updatedCustomOptions);
  };

  renderDescription() {
    const theme = this.context;
    const { product } = this.props;
    const attribute = getProductCustomAttribute(product, 'short_description');
    return <HTML html={attribute.value} containerStyle={{padding:theme.spacing.large}} tagsStyles={styles.htmldescription(theme)}/>;
  }

  renderProductInfo(){
    const { product } = this.props;
    return <ProdectInfo product={product}/>
  }
  renderCustomOptions = () => {
    const theme = this.context;
    const { customOptions } = this.props;
    if (customOptions) {
      return customOptions.map((option) => {
        const data = option.values.map(value => ({
          label: value.title,
          key: value.option_type_id,
        }));

        return (
          <ModalSelect
            style={styles.modalStyle(theme)}
            disabled={data.length === 0}
            key={option.option_id}
            label={option.title}
            attribute={option.option_id}
            value={option.option_id}
            data={data}
            onChange={this.customOptionSelect}
          />
        );
      });
    }
  };

  renderOptions = () => {
    const theme = this.context;
    const {
      options, attributes, product, selectedOptions,
    } = this.props;
    if (Array.isArray(options) && product.children) {
      const prevOptions = [];
      let first = true;
      return options.map((option) => {
        if (!attributes[option.attribute_id]) {
          return <View key={option.id} />;
        }

        let data = option.values.map((value) => {
          let optionLabel = value.value_index;

          if (attributes && attributes[option.attribute_id]) {
            const findedValue = attributes[option.attribute_id].options.find(optionData => Number(optionData.value) === Number(value.value_index));
            if (findedValue) {
              optionLabel = findedValue.label;
            }
          }

          if (first) {
            return {
              label: optionLabel,
              key: value.value_index,
            };
          }

          const match = product.children.find((child) => {
            let found = 0;
            prevOptions.every((prevOption) => {
              const { attributeCode } = attributes[prevOption.attribute_id];
              const currentAttributeCode = attributes[option.attribute_id].attributeCode;
              const childOption = getProductCustomAttribute(child, attributeCode);
              const currentOption = getProductCustomAttribute(child, currentAttributeCode);
              const selectedValue = selectedOptions[prevOption.attribute_id];
              if (Number(childOption.value) === Number(selectedValue)
                && Number(currentOption.value) === Number(value.value_index)) {
                found++;
                return false;
              }
              return true;
            });
            return found === prevOptions.length;
          });

          if (match) {
            return {
              label: optionLabel,
              key: value.value_index,
            };
          }
          return false;
        });
        data = data.filter(object => object !== false);
        first = false;
        prevOptions.push(option);

        return (
          <ModalSelect
            style={styles.modalStyle(theme)}
            disabled={data.length === 0}
            key={option.id}
            label={option.label}
            attribute={option.attribute_id}
            value={option.id}
            data={data}
            onChange={this.optionSelect}
          />
        );
      });
    }
  }

  renderAddToCartButton() {
    const theme = this.context;
    const { cart } = this.props;
    if (cart.addToCartLoading) {
      return <Spinner />;
    }
    return (
      <Button style={styles.buttonStyle(theme)} onPress={this.onPressAddToCart}>
        {translate('product.addToCartButton')}
      </Button>
    );
  }

  updateSelectedProduct = (selectedOptions) => {
    const { product } = this.props;
    const selectedKeys = Object.keys(selectedOptions);

    if (!product.children || !selectedKeys.length) return;

    if (selectedKeys.length === this.props.options.length) {
      const searchOption = {};
      selectedKeys.forEach((attribute_id) => {
        const code = this.props.attributes[attribute_id].attributeCode;
        searchOption[code] = selectedOptions[attribute_id];
      });

      const selectedProduct = product.children.find((child) => {
        const found = _.every(searchOption, (value, code) => {
          const childOption = getProductCustomAttribute(child, code);
          return Number(childOption.value) === Number(value);
        });
        return found;
      });

      if (selectedProduct) {
        const { medias } = this.props;
        this.setState({ selectedProduct });
        if (!medias || !medias[selectedProduct.sku]) {
          this.props.getProductMedia({ sku: selectedProduct.sku });
        }
      }
    }
  }

  renderPrice = () => {
    const { selectedProduct } = this.state;
    const theme = this.context;
    if (selectedProduct) {
      return (
        <SinglePrice
          style={styles.priceContainer(theme)}
          basePrice={selectedProduct.price}
          currencySymbol={this.props.currencySymbol}
          currencyRate={this.props.currencyRate}
        />
      );
    }
    return (
      <SinglePrice
        style={styles.priceContainer(theme)}
        basePrice={this.props.product.price}
        discountPrice={finalPrice(this.props.product.custom_attributes, this.props.product.price)}
        currencySymbol={this.props.currencySymbol}
        currencyRate={this.props.currencyRate}
      />
    );
  }
  // render status of product
  renderProductStatus = ()=>{
    const theme = this.context;
    const { product } = this.props;
    const { selectedProduct } = this.state;
    if (selectedProduct) {
      return selectedProduct.status?<Text style={styles.instock(theme)}>In stock</Text>:<Text style={styles.outofstock(theme)}>Out of stock</Text>
    }
    return product.status?<Text style={styles.instock(theme)}>In stock</Text>:<Text style={styles.outofstock(theme)}>Out of stock</Text>
  }
  // render sku of product
  renderProductSku = ()=>{
    const theme = this.context;
    const { product } = this.props;
    const { selectedProduct } = this.state;
    if (selectedProduct) {
      return <View style={styles.skuwrapper(theme)}><Text style={styles.skuLabel(theme)}>SKU#</Text><Text style={styles.skuValue(theme)}>{selectedProduct.sku}</Text></View>
    }
    return <View style={styles.skuwrapper(theme)}><Text style={styles.skuLabel(theme)}>SKU#</Text><Text style={styles.skuValue(theme)}>{product.sku}</Text></View>
  }
  renderProductMedia = () => {
    const { medias, product } = this.props;
    const { selectedProduct } = this.state;
    if (!medias) {
      return (
        <ProductMedia media={null} />
      );
    }
    if (selectedProduct && medias[selectedProduct.sku]) {
      return (
        <ProductMedia media={medias[selectedProduct.sku]} />
      );
    }
    return (
      <ProductMedia media={medias[product.sku]} />
    );
  }
  // get save of discount product
  renderDiscount = () => {
    const theme = this.context;
    const basePrice = this.props.product.price;
    const discountPrice = finalPrice(this.props.product.custom_attributes, this.props.product.price);
    return (
      <View style={{flexDirection:'row',borderBottomWidth:0.7,paddingBottom:5,borderColor:theme.colors.borderColorLight}}>
        <PercentageSaving
            style={styles.percentgsving(theme)}
            itemStyle={{fontSize:18,paddingHorizontal:10}}
            basePrice={basePrice}
            discountPrice={discountPrice}
            currencyRate={this.props.currencyRate}
            currencySymbol={this.props.currencySymbol}
          />
          {discountPrice  && discountPrice < basePrice ?
          <Text style={{fontSize:18,alignItems:'center',marginTop:5,marginLeft:theme.spacing.large,justifyContent:'center'}}>Incl all taxes</Text>
          :null}
      </View>

    );
  }
  // Set Product Share and Wish List button
  renderCustomeractWithProduct = () =>{
    const {product,customer,navigation,addProductToWishlist,wishlist} = this.props
    return <View style={styles.actButton} ><Heart product_id={product.id} customer={customer} navigation={navigation} addProductToWishlist={addProductToWishlist} wishlist={wishlist}/><Share product={product}/></View>
  }
  // render company policy
  renderPolicy = () =>{
    return <CampanyPolice/>;
  }
  incProductQty = () =>{
    const {qty} = this.props;
    let crtQty = qty+1;
    this.props.updateProductQtyInput(crtQty)
  }
  decProductQty = () =>{
    const {qty} = this.props;
    let crtQty = qty-1;
    this.props.updateProductQtyInput(crtQty)
  }
  // product qty Box
  renderQtyBox = (theme) =>{
    return (
        <View style={styles.qtyboxwrapp(theme)}>
          <Text bold style={[styles.textStyle(theme),{marginRight:20}]}>{translate('common.quantity')}</Text>
          <Button disabled={this.props.qty <=1?true:false} onPress={this.decProductQty} style={styles.incDecBtn(theme)}><Text style={{color:theme.colors.primaryDark}}>-</Text></Button>
          <Input
            containerStyle={styles.inputContainer(theme)}
            inputStyle={{ textAlign: 'center' }}
            autoCorrect={false}
            keyboardType="numeric"
            value={`${this.props.qty}`}
            onChangeText={qty => this.props.updateProductQtyInput(qty)}
          />
          <Button disabled={this.props.qty >=50?true:false} onPress={this.incProductQty} style={styles.incDecBtn(theme)}><Text style={{color:theme.colors.primaryDark}}>+</Text></Button>
        </View>
      )
  }
  render() {
    const theme = this.context;
    return (
      <ScrollView
        style={styles.container(theme)}
      >
        {this.renderProductMedia()}
        {this.renderProductStatus()}
        <Text type="heading" style={styles.textStyle(theme)}>{this.props.product.name}</Text>
        {this.renderProductSku()}
        {this.renderPrice()}

        {this.renderDiscount()}

        {this.renderQtyBox(theme)}
        
        
        {this.renderOptions()}
        {this.renderCustomOptions()}
        {this.renderAddToCartButton()}
        <Text style={styles.errorStyle(theme)}>{this.props.cart.errorMessage}</Text>
        {this.renderPolicy()}
        {this.renderCustomeractWithProduct()}
        {this.renderDescription()}
        {this.renderProductInfo()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  }),
  htmldescription: theme=>({
    ul:{
      margin:0,
      padding:0,
    },
    li:{
      margin:0,
    },
    p: {
      padding:0,
    },
  }),
  textStyle: theme => ({
    paddingLeft: theme.spacing.large,
    textAlign: 'left',
    color:theme.colors.primaryDark
  }),
  percentgsving: theme => ({
    paddingLeft: theme.spacing.large,
    marginTop:theme.spacing.tiny,
  }),
  qtyboxwrapp: theme=>({
    flexDirection:'row',
    alignItems:'center',
    marginTop:theme.spacing.small,
  }),
  incDecBtn: theme=>({
    backgroundColor:theme.colors.silverColor,
    borderColor:theme.colors.silverDarkColor,
    width:40,
    marginHorizontal:theme.spacing.tiny,
  }),
  instock: theme=>({
    color:theme.colors.secondary,
    paddingLeft: theme.spacing.large,
    textAlign: 'center',
    alignSelf:'flex-start',
  }),
  outofstock: theme=>({
    color:theme.colors.thirdLightColor,
    paddingLeft: theme.spacing.large,
    textAlign: 'center',
    alignSelf:'flex-start',
  }),
  skuwrapper: theme =>({
    flex: 1, 
    flexDirection: 'row',
    paddingLeft: theme.spacing.large,
    marginTop:theme.spacing.tiny
  }),
  skuLabel: theme=>({
    color:theme.colors.primaryDark,
    textAlign: 'center',
    alignSelf:'flex-start',
  }),
  skuValue: theme=>({
    color:theme.colors.thirdLightColor,
    textAlign: 'center',
    alignSelf:'flex-start',
    paddingLeft: theme.spacing.small,
  }),
  inputContainer: theme => ({
    width: 40,
    alignSelf: 'center',
  }),
  modalStyle: theme => ({
    alignSelf: 'center',
    width: theme.dimens.WINDOW_WIDTH * 0.9,
    marginBottom: theme.spacing.large,
  }),
  buttonStyle: theme => ({
    alignSelf: 'center',
    marginTop: 10,
    width: theme.dimens.WINDOW_WIDTH * 0.9,
  }),
  descriptionStyle: theme => ({
    padding: theme.spacing.large,
    lineHeight: 25,
  }),
  errorStyle: theme => ({
    textAlign: 'center',
    padding: theme.spacing.small,
    color: theme.colors.error,
  }),
  priceContainer:theme=> ({
      paddingLeft: theme.spacing.large,
      alignSelf: 'flex-start',
      marginTop:theme.spacing.small,
    }),
  actButton:{
    flexDirection:'row',
    width:260,
    alignSelf:'center',
    justifyContent:'space-between',
  },
});

const mapStateToProps = (state) => {
  const { product, options, medias, customOptions } = state.product.current;
  const { attributes, selectedOptions, selectedCustomOptions,wishlist } = state.product;
  const {
    currency: {
      displayCurrencySymbol: currencySymbol,
      displayCurrencyExchangeRate: currencyRate,
    },
  } = state.magento;
  const { cart, account } = state;
  return {
    cart,
    medias,
    product,
    wishlist,
    options,
    attributes,
    currencyRate,
    customOptions,
    currencySymbol,
    selectedOptions,
    selectedCustomOptions,
    customer: account.customer,
    qty: state.product.qtyInput,
  };
};

export default connect(mapStateToProps, {
  getProductMedia,
  addToCartLoading,
  addToCart,
  getConfigurableProductOptions,
  updateProductQtyInput,
  getCustomOptions,
  addProductToWishlist,
  uiProductCustomOptionUpdate,
  uiProductUpdateOptions: uiProductUpdate,
})(Product);
