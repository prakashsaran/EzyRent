import { Platform } from 'react-native';
import colors from './colors';
import spacing from './spacing';
import dimens from './dimens';

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

const font_10 = 10;
const font_11 = 11;
const font_12 = 12;
const font_13 = 13;
const font_14 = 14;
const font_15 = 15;
const font_16 = 16;
const font_17 = 17;
const font_18 = 18;
const font_19 = 19;
const font_20 = 20;
const font_21 = 21;
const font_22 = 22;
const font_23 = 23;
const font_24 = 24;
const font_25 = 25;

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
     alignSelf: "center"
   },
   signstep:{
     width: '100%',
     color: colors.descriptionColor,
     borderWidth: 0,
     fontSize: font_14,
     fontFamily: fontFamilyMontserratLight,
     lineHeight: 15,
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
      marginTop:spacing.extraLarge*2,
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
      marginTop:spacing.extraLarge*2,
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
     fontSize: font_20,
     textAlign: "left",
     fontFamily:fontFamilyMontserratMedium,
     paddingLeft:10,
   },
   pageTitleSecondary: {
     color: colors.secondry,
     fontSize: font_20,
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
     fontSize:13,
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
   title: {
     backgroundColor: "transparent",
     color: colors.secondry,
     fontFamily:fontFamilyMontserratMedium,
     fontWeight:fontWeightSemiBold,
     fontSize: 18,
   },
  titleText: {
    fontFamily:fontFamilyMontserrat,
    color: titleTextColor,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: fontWeightRegular,
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
