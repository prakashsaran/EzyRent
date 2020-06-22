import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { isIphoneX} from '../../../components';
import { normalize } from "../../../components";
export default StyleSheet.create({
  container: theme => ({
    flex: 1,
  }),
  headerContainer:theme=>({
    height:theme.dimens.headerWithBannerHeight,
    width:'100%',
  }),

  headerContext:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'center',
    alignItems:'flex-start',
    padding:theme.spacing.large,
    //marginVertical:10,
    //marginHorizontal:20,
    marginTop:35,
  },
  backscreen:{
    width:30,
    height:17,
    marginTop:isIphoneX()?-10:0,
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
    color:theme.colors.underQuickStats,
    fontSize:normalize(12),
    fontFamily:theme.typography.fontFamilyOxygenBold,
    fontWeight: theme.typography.fontWeightBold,
  }),
  payTimebld: theme =>({
    color:theme.colors.underQuickStats,
    fontSize:normalize(12),
    fontFamily:theme.typography.fontFamilyOxygenBold,
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
    marginTop:5,
    fontFamily:theme.typography.secondaryFont,
  },
  textLabel:theme=>({
    color:theme.colors.labelColor,
    fontSize:normalize(13),
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeight,
  }),
  textLabel2:theme=>({
    color:'#6c6c6c',
    fontSize:normalize(11),
    paddingTop:4,
  }),
  propertyInfo:theme =>({
    width:'100%',
    marginTop:20,
    borderBottomWidth:0.7,
    borderColor:theme.colors.lightBorder,
    paddingBottom:theme.spacing.extraLarge,
  }),
  paymentInfo:theme =>({
    width:'100%',
    marginTop:20,
    borderBottomWidth:0.7,
    borderColor:theme.colors.lightBorder,
    paddingBottom:theme.spacing.extraLarge,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start'
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

  primaryBtn:theme=>({
    backgroundColor:theme.colors.primary,
    padding:10,
    borderRadius:25,
  }),
  primaryBtnText:theme=>({
    color:theme.colors.primBtnTextColor,
    fontSize:normalize(15),
    fontFamily:theme.typography.fontFamilyOxygenBold,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginHorizontal:5,
  }),
  reviewText:theme=>({
    color:theme.colors.primBtnTextColor,
    fontSize:normalize(12),
    fontFamily:theme.typography.fontFamilyOxygenBold,
    fontWeight: theme.typography.fontWeightSemiBold,
    marginHorizontal:5,
  }),
  banktitle:theme=>({
    color:'#6e6e6e',
    fontSize:normalize(14),
    fontFamily:theme.typography.secondaryFont,
    fontWeight: theme.typography.fontWeightRegular,
  }),
  bankacInfoXl:{
    width:'60%'
  },
  eraseBtn:theme=>({
    flexDirection:'column',
    alignItems:'center',
    paddingLeft:5,
    paddingTop:3,
  }),
  eraseTitle:theme=>({
    fontSize:normalize(13),
    color:theme.colors.errorColor,
    flexDirection:'column',
    padding:2,
  }),
  eraseIcon:{
    width:28,
    height:28,
  },
  bankacInfo:{
    width:'37%',
    textAlign:'left',
  },
  textLabelXl: theme =>({
    color:theme.colors.primaryTitleColor,
    fontSize:normalize(15),
    fontFamily:theme.typography.fontFamilyOxygenBold,    
  }),
  backscreen2:{
    marginTop:-15,
    height:40,
    width:40,
  },
  popupContainer: theme=>({
    width:'100%',
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 5,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.35,
    paddingVertical:20,
    paddingHorizontal:10,
  }),
popupBtms:{
    width:'100%',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-between',
    paddingTop:40,
  },
cancel:{
    color:'#6c6c6c',
  },
  columntitlePop1:theme=>({
    marginTop:0, 
  }),
  pincontainer: theme => ({
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%', 
    //paddingHorizontal:20,
    alignSelf:'center',
    position:'relative',
    //marginVertical:10,
  }),
  pininputBox: theme =>({
    height:40,
    width:'100%',
    alignSelf:'center',
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
  underlineStyleHighLighted: theme => ({
    borderColor: theme.colors.secondry,
    padding:0,
  }),
  fieldWrapp:{
    width:'100%',
    marginTop:20,
    borderWidth:1,
    borderColor:'transparent',
  },
  errorMessage: theme =>({
    color:theme.colors.errorColor,
    fontSize:normalize(12),
    fontFamily:theme.typography.fontFamilyMontserratLight, 
    alignSelf:'center',
    paddingTop:15,
  }),
  visibilityIconWrapp:{
    position:'absolute',
    right:0,
    top:0,
  },
  visibilityIcon:{
    width:20,
    height:18,
  },
  // popup design 
    popupContainer: theme=>({
      width:'100%',
      backgroundColor: "rgba(230, 230, 230,1)",
      borderRadius: 5,
      borderColor: "#e6e6e6",
      borderWidth: 1,
      shadowOffset: {
        height: 5,
        width: 5
      },
      shadowColor: "rgba(0,0,0,1)",
      shadowOpacity: 0.35,
      paddingVertical:30,
      paddingHorizontal:30,
    }),
    columntitlePop1:theme=>({
      marginTop:0,
      fontFamily:'Oxygen-Bold',
      fontSize:normalize(18),
    }),
    columntitlePopDesc:theme=>({
      marginTop:20,
      fontSize:normalize(16),
      fontFamily:'Montserrat-Regular',
    }),
    popupBtms:{
      width:'100%',
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'flex-end',
      paddingTop:30,
    },
    pop_wrap:{
      //backgroundColor:'#fff',
    },
    cancel:{
      color:'#315add',
      fontSize:normalize(15),
      fontFamily:'Montserrat-Regular',
    },
    ok:{
      marginLeft:25,
      fontSize:normalize(15),
      color:'#315add',
      fontFamily:'Montserrat-Regular',
    },

  });
