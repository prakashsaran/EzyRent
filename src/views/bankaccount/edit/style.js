import { StyleSheet } from "react-native";
import { theme } from "../../../theme";

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    titleWrapper:{
      width:'90%',
      alignSelf:'center',
      marginVertical:20,
      flexDirection:'row',
      alignItems:'center',
    },
    rectWrapp:{
      backgroundColor:theme.colors.lightBackgrountColor,
      marginTop:80,
      minHeight:theme.dimens.defaultScreenMinHeight,
    },
    backscreen:{
      width:30,
      height:17,
      tintColor:'#fff',
    },
    columntitle:theme=>({
      color:theme.colors.descriptionColor,
      fontFamily:theme.typography.fontFamilyOxygenBold,
      fontSize:14,
      //fontWeight:theme.typography.fontWeightBold,
      width:'100%',
      textAlign:'left',
    }),
    fieldWrapp:theme=>({
      width:'100%',
      marginTop:15,
      borderWidth:1,
      borderColor:'transparent',
    }),
    fieldWrappAccount:theme=>({
      borderBottomWidth:1,
      borderBottomColor:theme.colors.lightBorder,
    }),
    textInputStyle:theme=>({
      width:'100%',
      borderColor:theme.colors.secondry,
      borderBottomWidth:1,
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:16,
      fontWeight:theme.typography.fontWeightRegular,
      marginTop:0,
      padding:5,
    }),
    textInputStyleSec:theme=>({
      width:'100%',
      borderColor:theme.colors.lightBorder,
      borderBottomWidth:1,
      color:theme.colors.primaryTitleColor,
      fontFamily:theme.typography.secondryFont,
      fontSize:16,
      fontWeight:theme.typography.fontWeightRegular,
      marginTop:theme.spacing.small,
      paddingVertical:5,
      paddingHorizontal:0,
    }),
    addBtncontainer:theme=>({
      position: 'absolute',
      flex: 1,
      left: 0,
      right: 0,
      bottom: 0,
      width:'100%',
      backgroundColor:theme.colors.secondry,
      alignItems:'center',
      justifyContent:'center',
      height:50,
    }),
    addBtncaption:theme =>({
      //borderBottomWidth:1,
      color:theme.colors.primBtnTextColor,
      fontFamily:theme.typography.primaryFont,
      fontSize:22,
      fontWeight:theme.typography.fontWeightSemiBold,
      textDecoration:'none',
    }),
    spacing:{
      width:'100%',
      height:20,
      paddingBottom:20,
    },

  });
