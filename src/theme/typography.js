import { Platform,Dimensions } from 'react-native';
import colors from './colors';
import spacing from './spacing';
import dimens from './dimens';
import {normalize} from '../components/normalize';
function isLessMarshmallow(){
  const dvcHeight = Dimensions.get('window').height;
  if(dvcHeight < 750){
    return true;
  }
  return false;
}
const fontFamilyMontserrat = 'Montserrat-Regular';
const fontFamilyMontserratSemi = 'Montserrat-SemiBold';
const fontFamilyMontserratLight = 'Montserrat-Light';
const fontFamilyMontserratMedium = 'Montserrat-Medium';
const fontFamilyMontserratBold = 'Montserrat-Bold';
const fontFamilyOxygen = 'Oxygen-Regular';
const fontFamilyOxygenLight = 'Oxygen-Light';
const fontFamilyOxygenBold = 'Oxygen-Bold';
const fontWeightRegular = '400';
const fontWeightLight = '300';
const fontWeightSemiBold = '600';
const fontWeightMedium = '500';
const fontWeightBold = '800';

const font_10 = normalize(10);
const font_11 = normalize(11);
const font_12 = normalize(12);
const font_13 = normalize(13);
const font_14 = normalize(14);
const font_15 = normalize(15);
const font_16 = normalize(16);
const font_17 = normalize(17);
const font_18 = normalize(18);
const font_19 = normalize(19);
const font_20 = normalize(20);
const font_21 = normalize(21);
const font_22 = normalize(21);
const font_23 = normalize(23);
const font_24 = normalize(24);
const font_25 = normalize(25);

const titleTextColor = colors.primaryDark;

export default {
  /**
   * Title is reserved for the title of a screen(Toolbar)
   * and the titles of Modal dialogs.
   */
   stepTitle:{
     color: "#121212",
     fontSize: font_24,
     fontFamily:fontFamilyOxygenBold,
     fontWeight:fontWeightBold,
     letterSpacing: 0,
     textAlign: "center",
     marginTop: 50,
     alignSelf: "center",
     paddingBottom:10,
   },
   signstep:{
     width: '100%',
     color: colors.descriptionColor,
     borderWidth: 0,
     fontSize: font_14,
     fontFamily: fontFamilyMontserratLight,
     lineHeight: normalize(15),
     letterSpacing: 0,
     marginVertical:spacing.small,
     textAlign: "center",
   },
   stepmessage:{
     width: 309,
     color: colors.descriptionColor,
     borderWidth: 0,
     fontSize: font_14,
     fontFamily: fontFamilyMontserratMedium,
     letterSpacing: 0,
     textAlign: "center",
     alignSelf: "center"
   },
   mobelTitle: {
     width: '80%',
     alignSelf: "center",
     color:colors.secondry,
     fontSize:font_12,
     marginTop:spacing.extraLarge*2,
     fontFamily:fontFamilyMontserrat,
   },
   mobelTitle2: {
     width: '80%',
     alignSelf: "center",
     color:colors.secondry,
     fontSize:font_12,
     marginTop:isLessMarshmallow()?15:spacing.extraLarge*2,
     fontFamily:fontFamilyMontserrat,
   },
   in_active_mobelTitle: {
     width: '80%',
     alignSelf: "center",
     color:colors.primaryFont,
     fontSize:font_12,
     marginTop:spacing.extraLarge*2,
     fontFamily:fontFamilyMontserrat,
   },
   btnProceedDisabled:{
      backgroundColor: colors.disableBtnColor,
      width:'80%',
      opacity:0.7,
      alignItems: "center",
      alignSelf:'center',
      justifyContent: "center",
      paddingRight: 16,
      paddingLeft: 16,
      elevation: 2,
      minWidth: 88,
      borderRadius: 5,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 5,
      marginTop:isLessMarshmallow()?22:spacing.extraLarge*2,
      //lineHeight:20,
      height:45,
    },
    btnProceed: {
      backgroundColor:colors.secondry,
      width:'80%',
      alignItems: "center",
      alignSelf:'center',
      justifyContent: "center",
      paddingRight: 16,
      paddingLeft: 16,
      elevation: 2,
      minWidth: 88,
      borderRadius: 5,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 5,
      marginTop:isLessMarshmallow()?22:spacing.extraLarge*2,
      height:45,
    },
    caption: {
      color: colors.primBtnTextColor,
      fontSize: font_19,
      fontFamily: fontFamilyOxygen,
    },
   copyright:{
     width: '100%',
     minWidth:'100%',
     textAlign:'center',
     marginTop: spacing.extraLarge*3,
     marginBottom: spacing.extraLarge*4,
     fontFamily:fontFamilyMontserratLight,
     fontSize:font_13,
   },
   myDashBoard: {
     color: colors.primaryScreenTitle,
     fontSize: font_19,
     textAlign: "left",
     fontFamily:fontFamilyMontserratMedium,
     paddingLeft:10,
   },
   pageTitleSecondary: {
     color: colors.secondry,
     fontSize: font_19,
     textAlign: "left",
     fontFamily:fontFamilyMontserratMedium,
     paddingLeft:10,
   },
   rectView: {
     backgroundColor:colors.primBackgroundColor,
     flexDirection:'column',
     width:'95%',
     alignSelf:'center',
     marginTop:spacing.large,
     borderRadius: 15,
     paddingTop:30,
     marginTop:-80,
     paddingHorizontal:40,
     shadowOffset: {
       height: 1,
       width: 0
     },
     shadowColor: "#000",
     shadowOpacity: 0.35,
     shadowRadius: 5,
     backgroundColor:"#ffff",
     paddingVertical:30,
     marginBottom:20,
     elevation:10,
   },
   rectView2:{
     backgroundColor:'#fff',
      flexDirection:'column',
      width:'100%',
      marginTop:spacing.large,
      minHeight:dimens.defaultScreenMinHeight,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingTop:30,
      paddingHorizontal:10,
   },
   tooltip:{
     color:colors.secondry,
     fontFamily:fontFamilyOxygen,
     fontSize:font_13,
     width:'100%',
     textAlign:'left',
   },
   Dots:{
     backgroundColor:'#ccc',
     height:10,
     width:10,
     borderRadius:5,
   },
   activeDots:{
     backgroundColor:'#41b216',
     height:10,
     width:20,
     marginHorizontal:5,
     borderRadius:5,
   },
   backbtmcontainer:{
     flexDirection:'row',
     justifyContent:'flex-start',
     alignItems:'center'
  },
   title: {
     backgroundColor: "transparent",
     color: colors.secondry,
     fontFamily:fontFamilyMontserratMedium,
     fontWeight:fontWeightSemiBold,
     fontSize: font_18,
   },
  titleText: {
    fontFamily:fontFamilyMontserrat,
    color: titleTextColor,
    fontSize: font_18,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
  },
  spinnerStyle:{
    backgroundColor:'rgba(0,0,0,0.3)',
    position:'absolute',
    alignSelf:'center',
    top:"60%",
    padding:20,
    borderRadius:5,
  },
  primaryFont:fontFamilyMontserrat,
  secondaryFont:fontFamilyOxygen,
  fontWeightSemiBold:fontWeightSemiBold,
  fontWeightBold:fontWeightBold,
  fontFamilyMontserratLight:fontFamilyMontserratLight,
  fontFamilyMontserratBold:fontFamilyMontserratBold,
  fontFamilyMontserratSemi:fontFamilyMontserratSemi,
  fontFamilyOxygenBold:fontFamilyOxygenBold,
  fontFamilyOxygenLight,
  fontWeightRegular,
  fontWeightLight,
  fontWeightMedium,
  fontFamilyMontserratMedium,
  font_10,
  font_11,
  font_12,
  font_13,
  font_14,
  font_15,
  font_16,
  font_17,
  font_18,
  font_19,
  font_20,
  font_21,
  font_22,
  font_23,
  font_24,
  font_25,
};
