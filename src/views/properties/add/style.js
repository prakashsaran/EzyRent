import { StyleSheet,Dimensions } from "react-native";
import { theme } from "../../../theme";
import {isIphoneX,normalize} from "../../../components";
function isLessMarshmallow(){
  const dvcHeight = Dimensions.get('window').height;
  if(dvcHeight < 750){
    return true;
  }
  return false;
}
export default StyleSheet.create({
    container: theme => ({
      flex: 1,
      backgroundColor:theme.colors.secondry,
    }),
    headerContainer:theme=>({
      //minHeight:normalize(120),
      position:'relative',
      zIndex:1,
    }),

    headerContext:{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignContent:'center',
      alignItems:'flex-start',
      padding:theme.spacing.large,
      //height:theme.dimens.headerWithBannerHeight/2,
      //marginVertical:10,
      //marginHorizontal:20,
    },
    headerBanner:theme=>({
      //backgroundColor:theme.colors.primBackgroundColor,
      padding:0,
      width:'100%',
      //height:theme.dimens.headerWithBannerHeight/2,
      //marginTop:theme.dimens.headerWithBannerHeight/4,
    }),
    headerBannerImage : theme =>({
      height:theme.dimens.headerWithBannerHeight-normalize(50),
      borderRadius:5,
      width:'100%',
      position:'relative',
      alignSelf:'center',
      //top:isIphoneX() ? -(theme.dimens.headerWithBannerHeight/3)+25:-(theme.dimens.headerWithBannerHeight/3)+35,\
      marginBottom:10,
      zIndex:1,
    }),
   pageTitle: theme =>({
      color:theme.colors.primaryScreenTitle,
      fontSize:normalize(18),
      fontFamily:theme.typography.primaryFont,
      fontWeight: theme.typography.fontWeightRegular,
      marginLeft:15,
    }),
    backscreen:{
      width:30,
      height:17,
      marginTop:1,
    },
    formcontainer:{
      minHeight:theme.dimens.containerHeightWithBannerHeader-70,
      //height:theme.dimens.containerHeightWithBannerHeader-70,
      backgroundColor:theme.colors.primBackgroundColor,
      position:'relative',
      zIndex:0,
    },
    formColumnWrapp:{
      padding:20,
      width:'100%',
      alignItems:'center',
      flexDirection:'column',
      paddingTop:0,
      //marginTop:-70,
    },
    formcolumn:{
      flexDirection: "column",
      width:'100%',
      backgroundColor:theme.colors.primBtnTextColor,
      alignItems:'center',
      paddingVertical:30,
      paddingHorizontal:20,
      shadowOffset: {
        height: 1,
        width: 0
      },
      borderWidth:0,
      shadowColor: "#000",
      //backgroundColor: "#fff",
      marginHorizontal:"1%",
      shadowOpacity: 0.35,
      shadowRadius: 5,
      borderRadius: 5,
      elevation: 5,
      marginBottom:10,
    },
    fieldWrapp:{
      width:'100%',
      marginTop:15,
      borderWidth:1,
      borderColor:'transparent',
    },
    fieldWrappTwoColum:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:'100%',
      marginTop:20,
    },
    columntitle:theme=>({
      color:theme.colors.descriptionColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:normalize(14),
      fontWeight:theme.typography.fontWeightRegular,
      width:'100%',
      textAlign:'left',
    }),
    tooltipDsc:theme=>({
      color:theme.colors.descriptionColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:normalize(12),
      fontWeight:theme.typography.fontWeightRegular,
      width:'100%',
      textAlign:'left',
    }),
    fieltext:theme=>({
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:normalize(16),
      paddingTop:3,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    twocolumn:{
      flexDirection:'row',
      justifyContent:'space-between',
    },
    fielcountrylabel: theme =>({
      flexDirection:'row',
      justifyContent:'space-between',
      width:'30%',
      alignItems:'center',
      borderBottomWidth:0.7,
      borderColor:theme.colors.secondry,
    }),
    fieldWrappAccount:theme=>({
      borderBottomWidth:1,
      borderBottomColor:theme.colors.lightBorder,
      alignItems:'flex-start',
      paddingVertical:0,
      paddingHorizontal:0,
    }),  
    fielcountrylabelSec: theme =>({
      flexDirection:'row',
      justifyContent:'space-between',
      width:'30%',
      alignItems:'center',
      borderBottomWidth:0.7,
      borderColor:theme.colors.lightBorder,
    }),
    contactbook:theme=>({
      width:'67%',
      borderColor:theme.colors.secondry,
      borderBottomWidth:0.7,
    }),
    contactbookSec:theme=>({
      width:'67%',
      borderColor:theme.colors.lightBorder,
      borderBottomWidth:0.7,
    }),
    textInputStyle:theme=>({
      width:'100%',
      borderColor:theme.colors.secondry,
      borderBottomWidth:0.7,
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:normalize(16),
      fontWeight:theme.typography.fontWeightRegular,
      paddingVertical:5,
      paddingHorizontal:0,
      //backgroundColor:'red',
    }),
    textInputStyle2:theme=>({
      width:'88%',
      borderColor:theme.colors.secondry,
      borderBottomWidth:0.7,
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:normalize(16),
      fontWeight:theme.typography.fontWeightRegular,
      paddingVertical:5,
      paddingHorizontal:0,
      //height:normalize(30),
      //lineHeight:normalize(20),
      //backgroundColor:'red',
    }),
    currencySymbl:theme=>({
      //position:'absolute',
      //left:0,
      //bottom:isLessMarshmallow?normalize(9):normalize(9),
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:normalize(16),
      //lineHeight:normalize(20),
      fontWeight:theme.typography.fontWeightRegular,
      paddingVertical:5,
      paddingHorizontal:0,
      //paddingTop:normalize(9),
      //height:normalize(30),
      //backgroundColor:'red',
      //paddingBottom:normalize(1),
    }),
    textInputStyleSec:theme=>({
      width:'100%',
      borderColor:theme.colors.lightBorder,
      borderBottomWidth:0.7,
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:normalize(16),
      fontWeight:theme.typography.fontWeightRegular,
      paddingVertical:5,
      paddingHorizontal:0,
    }),
    textInputStyleSec2:theme=>({
      width:'88%',
      borderColor:theme.colors.lightBorder,
      borderBottomWidth:0.7,
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:normalize(16),
      fontWeight:theme.typography.fontWeightRegular,
      paddingVertical:5,
      paddingHorizontal:0,
      //height:normalize(30),
    }),
    dropdownPicker:theme=>({
	      borderWidth:0,
	      borderColor:theme.colors.descriptionColor,
	      borderBottomWidth:0.7,
	   }),
    downarrowicon:{
      width:13,
      height:13,
      marginLeft:5,
      marginTop:10,
    },
    spacing:{
      width:'100%',
      height:90,
      paddingBottom:20,
    },
    dropPicker:theme=>({
      fontSize:normalize(18),
      colors:theme.colors.primaryTitleColor,
    }),
    pikerwrap:{
      width:'49%',
      borderWidth:1,
      borderColor:'transparent',
    },
    responseValue:theme =>({
      width:'100%',
      //borderColor:theme.colors.secondry,
      //borderBottomWidth:0.7,
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondaryFont,
      fontSize:normalize(16),
      fontWeight:theme.typography.fontWeightRegular,
      //marginVertical:theme.spacing.medium,
      marginBottom:5,
    }),
    addBtncontainer:theme=>({
      position: 'absolute',
      left: 0,
      right: 0,
      width:'100%',
      backgroundColor:theme.colors.secondry,
      alignItems:'center',
      justifyContent:'center',
      paddingVertical:10,
      paddingBottom:7,
      bottom:0,
    }),
    addBtncaption:theme =>({
      color:theme.colors.primBtnTextColor,
      fontFamily:theme.typography.primaryFont,
      fontSize:normalize(20),
      fontWeight:theme.typography.fontWeightSemiBold,
    }),
    borderProvider: theme=>({
      width:'100%',
      height:0.5,
      borderBottomWidth:0.5,
      backgroundColor:'transparent',
      borderColor:theme.colors.secondry,
      marginTop:-5
    }),
    borderProviderSec: theme=>({
      width:'100%',
      height:0.5,
      borderBottomWidth:0.5,
      backgroundColor:'transparent',
      borderColor:theme.colors.lightBorder,
      marginTop:-5
    }),
    address_icon:{
      width:20,
    },
    edit_icon:{
      width:40,
      height:40,
      position:'absolute',
      right:65,
      top:0,
      padding:10,
      //backgroundColor:'red',
      zIndex:99,
    },
    delete_icon:{
      right:20,
    },
    listproperties:{
	      width:'100%',
	    },
	    addProperty: theme=>({
	      color:theme.colors.primary,
	      fontSize:normalize(18),
	      marginVertical:5,
	    }),
	    chooseProperty: theme=>({
	      color:theme.colors.secondry,
	      marginVertical:5,
	      fontSize:normalize(18),
	    }),
	    popupTitle:theme=>({

	    }),
	    popupBtms:{
	      width:'100%',
	      flexDirection:'row',
	      flexWrap:'wrap',
	      justifyContent:'space-between',
	      paddingVertical:10,
        paddingTop:20,
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
      pop_wrap:{
        //backgroundColor:'#fff',
      },
      cancel:{
        color:'#6c6c6c',
      },
      textInputStyle_focus:{
        color:'red',
      },
      currencyLabel:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        alignContent:'center'
      },
      pickerSelected: theme=>({
        width:'100%',
        borderBottomWidth:0.5,
        backgroundColor:'transparent',
        borderColor:theme.colors.secondry,
        paddingVertical:5,
        fontSize:normalize(16),
      }),
      pickerUnSelected: theme=>({
        width:'100%',
        borderBottomWidth:0.5,
        backgroundColor:'transparent',
        borderColor:theme.colors.lightBorder,
        paddingVertical:5,
        fontSize:normalize(16),
      }),
      SubresponseValue:{
        //paddingLeft:10,
      },
      responseValueWrap:{
        flexDirection:'row',
        alignItems:'flex-start',
      },
      responseValue1:{
        paddingVertical:5,
        fontSize:normalize(16),
        width:'auto',
        paddingRight:7,
        //fontFamily:'Oxygen-Bold',
      },
      responseValue2:{
        paddingVertical:5,
        fontSize:normalize(13),
        //maxWidth:'60%',
      },
      font_16:{
        fontSize:normalize(16),
      },
      font_15:{
        fontSize:normalize(14),
      },
      popOver:{
        height:130,
        position:'absolute',
        top:-60,
        left:0,
        backgroundColor:'#1061de',
        width:'100%',
        zIndex:0,
      },
});
