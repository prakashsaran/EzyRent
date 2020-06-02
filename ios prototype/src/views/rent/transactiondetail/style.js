import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import {isIphoneX,normalize} from "../../../components"
export default StyleSheet.create({
    container: theme => ({
      flex: 1,
      backgroundColor:theme.colors.secondry,
    }),
    headerContainer:theme=>({
      flexDirection:'column',
    }),

    headerContext:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'center',
      alignItems:'flex-start',
      padding:theme.spacing.large,
      height:120,
      backgroundColor:theme.colors.secondry,
      //marginVertical:10,
      //marginHorizontal:20,
    },
    headerBanner:theme=>({
      backgroundColor:'#fff',
      padding:theme.spacing.large,
      width:'100%',
    }),
    headerBannerImage : theme =>({
      marginTop:-80,
    }),
   pageTitle: theme =>({
      color:theme.colors.primaryScreenTitle,
      fontSize:20,
      fontFamily:theme.typography.primaryFont,
      fontWeight: theme.typography.fontWeightRegular,
      marginLeft:15,
    }),
    backscreen:{
      height:30,
      flexDirection:'row',
    },
    backscreen_img:{
      height:30,
      width:25,
    },
    printscreen:{
      width:20,
      height:20,
    },
    formcontainer:{
      minHeight:theme.dimens.containerHeightWithBannerHeader,
      height:theme.dimens.containerHeightWithBannerHeader,
      backgroundColor:theme.colors.primBackgroundColor,
      paddingBottom:0,
      marginTop:-10,
    },
    formColumnWrapp:{
      padding:20,
      paddingTop:10,
      width:'100%',
      alignItems:'center',
      flexDirection:'column',
    },
    fieldWrapp:{
      width:'100%',
      marginTop:10,
      borderWidth:1,
      borderColor:'transparent',
    },
    responseValue:theme =>({
      width:'100%',
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:16,
      lineHeight:20,
      fontWeight:theme.typography.fontWeightRegular,
      marginVertical:theme.spacing.medium,
      marginTop:2,
    }),

    itemName:theme =>({
      fontFamily:theme.typography.fontFamilyMontserratSemi,
      fontSize:16,
      width:'75%',
      //alignSelf:'center',
      color:theme.colors.secondry,
      marginTop:theme.spacing.large,
      paddingLeft:20,
      alignSelf:'flex-end',
    }),
    propItemattrLocation: theme=>({
      color:theme.colors.descriptionColor,
      paddingHorizontal:5,
      fontSize:14,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      paddingVertical:2,
    }),
    statusTextValue: theme=>({
      color:theme.colors.primary,
      paddingHorizontal:1,
      fontSize:16,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    shadowView:{
      backgroundColor: "rgba(230, 230, 230,1)",
      borderRadius: 9,
      borderColor: "#e6e6e6",
      borderWidth: 1,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowColor: "rgba(0,0,0,1)",
      shadowOpacity: 0.35,
      elevation:7,
    },
    loopitembg:{
      width:'100%',
      borderRadius:9,
    },
    propertygnInfo:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'flex-end',
      paddingVertical:10,
    },
    propInfoAttrb:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingVertical:5,
     // flexWrap:'wrap',
    },
    locationWrapp:{
      width:'65%',
      alignSelf:'flex-end',
    },
    transactionInf:{
      flexDirection: "column",
      width:'100%',
      alignItems: "center",
      justifyContent: "center",
      paddingRight: 16,
      paddingLeft: 16,
      elevation: 10,
      minWidth: 88,
      borderRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 5,
      backgroundColor:"#ffff",
      paddingVertical:20,
      marginBottom:20,
    },
    columntitle:theme=>({
      color:theme.colors.descriptionColor,
      fontFamily:theme.typography.fontFamilyMontserratSemi,
      fontSize:16,
      width:'100%',
      textAlign:'left',
    }),
    spacing:{
      height:100,
      width:'100%',
    }

});
