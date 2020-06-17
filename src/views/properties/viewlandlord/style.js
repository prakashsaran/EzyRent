import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { isIphoneX } from '../../../components';
import { normalize } from "../../../components";
export default StyleSheet.create({
  container: theme => ({
    flex: 1,
  }),
  headerContainer:theme=>({
    height:theme.dimens.headerWithBannerHeight,
    width:'100%',
    paddingTop:20,
  }),
  pininputBox: theme =>({
      height:40,
      width:'100%',
      alignSelf:'center',
    }),
    underlineStyleHighLighted: theme => ({
      borderColor: theme.colors.secondry,
      padding:0,
    }),
    errorunderlineStyleHighLighted: theme => ({
      borderColor: theme.colors.errorColor,
      padding:0,
    }),
    underlineStyleBase: theme => ({
      width: theme.dimens.defaultPinCodeWidth-10,
      height: 45,
      padding:0,
      borderWidth: 0,
      borderBottomWidth: 1,
      color:theme.colors.descriptionColor,
      borderColor:theme.colors.descriptionColor,
      fontSize:normalize(22),
      fontFamily:theme.typography.primaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    errorunderlineStyleBase: theme => ({
      width: theme.dimens.defaultPinCodeWidth-10,
      height: 45,
      padding:0,
      borderWidth: 0,
      borderBottomWidth: 1,
      color:theme.colors.descriptionColor,
      borderColor:theme.colors.errorColor,
      fontSize:normalize(22),
      fontFamily:theme.typography.primaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    pincontainer: theme => ({
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width:'90%',
      paddingHorizontal:20,
      alignSelf:'center',
      position:'relative',
      marginVertical:10,
    }),
    visibilityIconWrapp:{
      position:'absolute',
      right:10,
      top:10,
    },
    visibilityIcon:{
      width:20,
      height:18,
    },
  headerContext:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    paddingHorizontal:theme.spacing.large,
    //marginVertical:10,
    //marginHorizontal:20,
  },
  backscreen:{
    width:30,
    height:17,
    marginTop:isIphoneX()?-10:0,
  },
  backscreen2:{
    marginTop:-15,
    height:40,
    width:40,
  },
  gpsWrapp:{
    flexDirection:'column',
    alignItems:'center',
    marginTop:-20,
  },
  gpsTitle:theme=>({
    color:theme.colors.primary,
    fontSize:normalize(16),
    fontFamily:theme.typography.secondaryFont,
    fontWeight:theme.typography.fontWeightRegular,

  }),
  confirmBoxTitle:theme=>({
    color:theme.colors.descriptionColor,
    fontSize:normalize(18),
    textAlign:'center',
    paddingTop:10,
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightRegular,

  }),
  detailContainer:{
    flexDirection:'column',
    width:'100%',
    backgroundColor:theme.colors.primBackgroundColor,
    minHeight:theme.dimens.containerHeightWithBannerHeader,
    height:theme.dimens.containerHeightWithBannerHeader,
    borderTopRightRadius:50,
    borderTopLeftRadius:50,
    paddingTop:20,
  },
  gpscontainer: theme=>({
    backgroundColor:theme.colors.primary,
    height:50,
    width:50,
    alignSelf:'center',
    alignItems:'center',
    alignContent:'center',
    borderRadius:50,
    padding:10,
  }),
  gpsIcon:{
    width:30,
    height:30,
    alignItems:'center',
  },
  infoContainer:{
    width:'100%',
    alignSelf:'center',
    paddingHorizontal:20,
    flexDirection:'column',
    marginTop:-20,
  },
  pageTitle: theme =>({
    color:theme.colors.secondry,
    fontSize:normalize(19),
    fontFamily:theme.typography.fontFamilyMontserratSemi,
  }),
  pagePropertyTitle: theme =>({
    color:theme.colors.secondry,
    fontSize:normalize(19),
    fontFamily:theme.typography.fontFamilyMontserratSemi,
    flexWrap:'wrap',
    width:'100%',
  }),
  payTime: theme =>({
    color:theme.colors.propertyHeading,
    fontSize:normalize(12),
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightBold,
  }),
  payTimeBld: theme =>({
    color:theme.colors.propertyHeading,
    fontSize:normalize(12),
    fontFamily:theme.typography.fontFamilyOxygenBold,
  }),
  ownerInfo:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    flexWrap:'wrap',
  },
  locationWrapp:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:10,
  },
  textLabel:theme=>({
    color:theme.colors.labelColor,
    fontSize:normalize(13),
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightRegular,
  }),
  propertyInfo:theme =>({
    width:'100%',
    marginTop:20,
    borderBottomWidth:0.7,
    borderColor:theme.colors.textValueColor,
    paddingBottom:theme.spacing.extraLarge,
    flexWrap:'wrap',
  }),
  paymentInfo:theme =>({
    width:'100%',
    marginTop:20,
    borderBottomWidth:0.7,
    borderColor:theme.colors.textValueColor,
    paddingBottom:theme.spacing.extraLarge,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
  }),
  payamountPeriod:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  textValue:theme=>({
    color:theme.colors.primaryTitleColor,
    fontSize:normalize(16),
    fontFamily:theme.typography.fontFamilyOxygenBold,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginHorizontal:5,
  }),

  eraseBtn:theme=>({
    flexDirection:'column',
    alignItems:'center',
    paddingLeft:5,
    paddingTop:3,
  }),
  eraseTitle:theme=>({
    fontSize:normalize(13),
    color:theme.colors.errorColor,
  }),
  eraseIcon:{
    width:28,
    height:28,
  },
  primaryBtnText:theme=>({
    color:theme.colors.primBtnTextColor,
    fontSize:normalize(18),
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginHorizontal:5,
  }),
  banktitle:theme=>({
    color:theme.colors.descriptionColor,
    fontSize:normalize(13),
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightRegular,
    marginHorizontal:5,
    marginLeft:0,
    lineHeight:23,
  }),
  bankacInfoXl:{
    width:'60%'
  },
  bankacInfo:{
    width:'37%',
  },
  textLabelXl: theme =>({
    color:theme.colors.primaryTitleColor,
    fontSize:normalize(15),
    fontFamily:theme.typography.fontFamilyOxygenBold,    
  }),
  errorMessage: theme =>({
    color:theme.colors.errorColor,
    fontSize:normalize(12),
    fontFamily:theme.typography.fontFamilyMontserratLight, 
    alignSelf:'center',   
  }),

  });
