import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default {
  /**
   * App level constants
   */
  WINDOW_WIDTH: screenWidth,
  WINDOW_HEIGHT: screenHeight,
  defaultPinCodeWidth: (screenWidth * 0.2)-10,
  defaultScreenMinHeight: screenHeight * 0.8,
  headerWithBannerHeight:screenHeight * 0.3,
  containerHeightWithBannerHeader:screenHeight * 0.7,
  popupHeight:screenHeight * 0.6,
};
