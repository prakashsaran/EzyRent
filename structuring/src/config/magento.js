/**
 * Magento Settings for the app,
 * Follow instructions: https://github.com/troublediehard/magento-react-native/wiki/Setup
 *
 * url                     : Base url of the magento website
 * home_cms_block_id       : Block id which conatin json data,
 *                           which will be shown in Home screen
 * access_token            : Token to access magento API, without it
 *                           app won't work
 */

 /*
  * Consumer Key: fllvjll2tabm95gumsvype2z99lqkdsh
  * Consumer Secret: 49qelw606qvgvcece4t2jeyujs933znz
  * Access Token: vgkjqqzihmp919l8xlinnpkf3ofnd28i
  * Access Token Secret: x4zdd47szapzvyxopr3zv08ypsc2rlon
 */
export const magentoOptions = {
  url: 'https://ehomewellness.com/',
  home_cms_block_id: '21',
  authentication: {
    integration: {
      access_token: 'vgkjqqzihmp919l8xlinnpkf3ofnd28i',
    },
  },
};

/**
 * Magento 2 REST API doesn't return currency symbol,
 * so manually specify all currency symbol(that your store support)
 * along side their currency code.
 */
export const currencySymbols = Object.freeze({
  USD: '$',
  EUR: '€',
  AUD: 'A$',
  GBP: '£',
  CAD: 'CA$',
  CNY: 'CN¥',
  JPY: '¥',
  SEK: 'SEK',
  CHF: 'CHF',
  INR: '₹',
  KWD: 'د.ك',
});
