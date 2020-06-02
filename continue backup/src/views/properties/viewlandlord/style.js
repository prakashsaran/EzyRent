import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
export default StyleSheet.create({
  container: theme => ({
    flex: 1,
  }),
  headerContainer:theme=>({
    height:theme.dimens.headerWithBannerHeight,
    width:'100%',
    paddingTop:35,
  }),

  headerContext:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'center',
    padding:theme.spacing.large,
    //marginVertical:10,
    //marginHorizontal:20,
  },
  backscreen:{
    width:30,
    height:17,
    marginTop:-10,
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
    fontSize:16,
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
  },
  pageTitle: theme =>({
    color:theme.colors.secondry,
    fontSize:19,
    fontFamily:theme.typography.primaryFont,
    fontWeight: theme.typography.fontWeightRegular,
  }),
  payTime: theme =>({
    color:theme.colors.propertyHeading,
    fontSize:12,
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightBold,
  }),
  ownerInfo:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  locationWrapp:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:10,
  },
  textLabel:theme=>({
    color:theme.colors.textValueColor,
    fontSize:13,
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightRegular,
  }),
  propertyInfo:theme =>({
    width:'100%',
    marginTop:20,
    borderBottomWidth:0.7,
    borderColor:theme.colors.textValueColor,
    paddingBottom:theme.spacing.extraLarge,
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
    fontSize:13,
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginHorizontal:5,
  }),

  eraseBtn:theme=>({
    flexDirection:'column',
    alignItems:'center',
    paddingLeft:5,
    paddingTop:10,
  }),
  eraseTitle:theme=>({
    fontSize:13,
    color:theme.colors.errorColor,
    paddingTop:3,
  }),
  eraseIcon:{
    width:28,
    height:28,
  },
  primaryBtnText:theme=>({
    color:theme.colors.primBtnTextColor,
    fontSize:18,
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginHorizontal:5,
  }),
  banktitle:theme=>({
    color:theme.colors.descriptionColor,
    fontSize:13,
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
    width:'40%',
    marginTop:0,
  },
  textLabelXl: theme =>({
    color:theme.colors.primaryTitleColor,
    fontSize:15,
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightSemiBold,
    lineHeight:23,
  }),

  });
