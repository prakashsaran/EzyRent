import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import {isIphoneX} from "../../../components"
export default StyleSheet.create({
    container: theme => ({
      flex: 1,
      backgroundColor:theme.colors.secondry,
    }),
    headerContainer:theme=>({
      height:theme.dimens.headerWithBannerHeight,
    }),

    headerContext:{
      flexDirection:'row',
      justifyContent:'flex-start',
      alignContent:'center',
      alignItems:'flex-start',
      padding:theme.spacing.large,
      height:theme.dimens.headerWithBannerHeight/2,
      //marginVertical:10,
      //marginHorizontal:20,
    },
    headerBanner:theme=>({
      backgroundColor:theme.colors.primBackgroundColor,
      padding:theme.spacing.large,
      width:'100%',
      height:theme.dimens.headerWithBannerHeight/2,
      //marginTop:theme.dimens.headerWithBannerHeight/4,
      position:'relative',
    }),
    headerBannerImage : theme =>({
      height:theme.dimens.headerWithBannerHeight-70,
      borderRadius:9,
      width:'100%',
      position:'absolute',
      alignSelf:'center',
      top:isIphoneX() ? -(theme.dimens.headerWithBannerHeight/3)+25:-(theme.dimens.headerWithBannerHeight/3)+35,
    }),
   pageTitle: theme =>({
      color:theme.colors.primaryScreenTitle,
      fontSize:18,
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
      height:theme.dimens.containerHeightWithBannerHeader-70,
      backgroundColor:theme.colors.primBackgroundColor,
    },
    formColumnWrapp:{
      padding:20,
      width:'100%',
      alignItems:'center',
      flexDirection:'column',
    },
    formcolumn:{
      flexDirection: "column",
      width:'100%',
      alignItems: "center",
      justifyContent: "center",
      paddingRight: 16,
      paddingLeft: 16,
      elevation: 15,
      minWidth: 88,
      borderRadius: 2,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 0,
      backgroundColor:"#ffff",
      paddingTop:15,
      paddingBottom:25,
      paddingHorizontal:'2%',
      marginBottom:20,
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
      fontSize:14,
      fontWeight:theme.typography.fontWeightRegular,
      width:'100%',
      textAlign:'left',
    }),
    tooltipDsc:theme=>({
      color:theme.colors.descriptionColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:12,
      fontWeight:theme.typography.fontWeightRegular,
      width:'100%',
      textAlign:'left',
    }),
    fieltext:theme=>({
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:16,
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
      fontSize:16,
      fontWeight:theme.typography.fontWeightRegular,
      marginTop:theme.spacing.small,
    }),
    textInputStyleSec:theme=>({
      width:'100%',
      borderColor:theme.colors.lightBorder,
      borderBottomWidth:0.7,
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:16,
      fontWeight:theme.typography.fontWeightRegular,
      marginTop:theme.spacing.small,
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
      marginTop:5,
    },
    spacing:{
      width:'100%',
      height:70,
      paddingBottom:20,
    },
    dropPicker:theme=>({
      fontSize:18,
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
      fontFamily:theme.typography.secondryFont,
      fontSize:16,
      fontWeight:theme.typography.fontWeightRegular,
      //marginVertical:theme.spacing.medium,
      marginBottom:5,
    }),
    addBtncontainer:theme=>({
      position: 'absolute',
      left: 0,
      right: 0,
      bottom:10,
      width:'100%',
      backgroundColor:theme.colors.secondry,
      alignItems:'center',
      justifyContent:'center',
      padding:10,
    }),
    addBtncaption:theme =>({
      color:theme.colors.primBtnTextColor,
      fontFamily:theme.typography.primaryFont,
      fontSize:20,
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
      width:25,
      height:25,
      position:'absolute',
      right:60,
      top:-20,
    },
    delete_icon:{
      right:25,
    },
    listproperties:{
	      width:'100%',
	    },
	    addProperty: theme=>({
	      color:theme.colors.primary,
	      fontSize:18,
	      marginVertical:5,
	    }),
	    chooseProperty: theme=>({
	      color:theme.colors.secondry,
	      marginVertical:5,
	      fontSize:18,
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
});
