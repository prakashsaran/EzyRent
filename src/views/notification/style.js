import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { normalize } from "../../components";
 
export default StyleSheet.create({
    container: theme => ({
      flex: 1,
      backgroundColor:theme.colors.primBackgroundColor,
    }),
    headWrapp:{
      flexDirection:'column',
      paddingHorizontal:10,
      paddingVertical:10,
      height:60,
      justifyContent:'space-between',
      alignContent:'center',
    },
    headcontainer: {
      backgroundColor: "#ffffff",
      flexDirection: "row",
      padding: 4,
      justifyContent:'space-between',
      alignContent:'center',
      alignItems:'center',
    },
    rightIconsWrapper: {
      alignItems: "center",
    },
    headerIcon:{
      width:20,
      height:20,
    },
    iconButton: {
      marginLeft: 5,
    },
    iconButton2: {
      marginLeft: 30,
    },
    searchWrap: {
      width:'100%',
      alignItems:'center',
      elevation: 3,
      shadowOffset: {
        height: 2,
        width: 0
      },
      shadowColor: "#111",
      shadowOpacity: 0.2,
      shadowRadius: 1.2,
      marginTop:10,
    },
    inputStyleStack:theme=> ({
      flexDirection:'row',
      width: '100%',
      height: 48,
      borderWidth:0.5,
      borderColor:theme.colors.secondry,
      padding:5,
    }),
    searchinputStyle:{
      width:'100%',
    },
    searchRightIcon:{
      position:'absolute',
      right:10,
      top:10,
    },
    tabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(22),
      paddingHorizontal:10,
    }),
    inActivetabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(22),
      paddingHorizontal:10,
      color:theme.colors.seconderyHeadingColor,
      textAlign:'center'
    }),
    Activetabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(22),
      paddingHorizontal:10,
      color:theme.colors.secondry,
      textAlign:'center'
    }),
    properties:theme =>({
      backgroundColor:theme.colors.thirdBackgrounColor,
      width:'100%',
      padding:10,
    }),
    loopitem:{
      width:'98%',
      marginVertical:4,
      borderRadius:9,
      elevation: 6,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowColor: "#111",
      shadowOpacity: 0.5,
      //shadowRadius: 2,
      //marginVertical:'1%',
      marginHorizontal:'1%',
      minHeight:150,
      paddingLeft:20,
      backgroundColor:'#fff',
    },
    loopitemAct:{
      width:'98%',
      paddingVertical:4,
      borderRadius:9,
      elevation: 6,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowColor: "#111",
      shadowOpacity: 0.5,
      //shadowRadius: 2,
      marginHorizontal:'1%',
    },
    loopitembg:{
      width:'100%',
      minHeight:180,
      borderRadius:9,
    },
    loopitembg2:{
      borderRadius:22,
    },
    loopitembgcltg:{
      width:'100%',
      minHeight:180,
      borderRadius:0
    },
    itemName:theme =>({
      fontFamily:theme.typography.fontFamilyMontserratMedium,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(16),
      //width:'50%',
      //alignSelf:'center',
      color:theme.colors.primaryTitleColor,
      marginTop:theme.spacing.large,
      //paddingLeft:20,
    }),
    itemNameAct:theme =>({
      fontFamily:theme.typography.fontFamilyMontserratMedium,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(16),
      width:'50%',
      alignSelf:'center',
      color:theme.colors.propertyHeading,
      marginTop:theme.spacing.large,
      paddingLeft:20,
      //alignSelf:'flex-end',
      //paddingRight:30,
    }),
    propertygnInfo:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:10,
    },
    propInforowleft:{
      width:'38%',
      flexDirection:'row',
    },
    propInforowright:{
      width:'60%',
 
    },
    propInfoAttrb:{
      flexDirection:'row',
      justifyContent:'space-between',
      //alignItems:'center',
      paddingVertical:5,
     // flexWrap:'wrap',
    },
    propItemattrLocation: theme=>({
      color:theme.colors.primaryTitleColor,
      paddingHorizontal:5,
      flexWrap:'wrap',
      width:'92%',
      fontSize:normalize(16),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    statusTextValue: theme=>({
      color:theme.colors.primary,
      paddingHorizontal:1,
      fontSize:normalize(16),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    statusTextWarnValue: theme=>({
      color:theme.colors.errorColor,
      paddingHorizontal:1,
      fontSize:normalize(14),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    propItemattrvalue: theme=>({
      color:theme.colors.propertyHeading,
      paddingHorizontal:0,
      flexWrap:'wrap',
      width:'100%',
      fontSize:normalize(13),
      lineHeight:normalize(19),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    propItemattrvalueError: theme=>({
      color:theme.colors.propertyHeading,
      paddingHorizontal:5,
      flexWrap:'wrap',
      width:'88%',
      fontSize:normalize(13),
      lineHeight:normalize(19),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    markwrap:{alignItems:'flex-end',width:'50%',alignSelf:'flex-end',marginRight:20,},
    marktext:theme =>({
      color:theme.colors.secondry,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightSemiBold,
      fontSize:normalize(14),
    }),
    nextscreen:theme=>({
      position:'absolute',
      top:theme.spacing.large,
      right:20,
    }),
    accountstats:theme=>({
      width:'98%',
      alignSelf:'center',
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: "#000",
      shadowOpacity: 0.35,
      shadowRadius: 5,
      borderRadius: 10,
      backgroundColor:theme.colors.primBtnTextColor,
      paddingHorizontal:10,
      paddingVertical:10,
    }),
    tickIcon:{
      width:20,
      height:20,
      position:'absolute',
      top:15,
      right:10
    },
    dateFormat:theme=>({
      width:'100%',
      position:'absolute',
      bottom:0,
      textAlign:'right',
      padding:10,
      fontSize:normalize(12),
      color:theme.colors.textValueColor,
      fontFamily:theme.typography.fontFamilyOxygenLight,
    }),
    due_label:{
      width:78,
      height:22,
      position:'absolute',
      bottom:'26%',
      right:-5
    },
  });
