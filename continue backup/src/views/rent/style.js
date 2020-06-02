import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export default StyleSheet.create({
    container: theme => ({
      flex: 1,
      backgroundColor:theme.colors.primBackgroundColor,
    }),
    headWrapp:{
      flexDirection:'column',
      paddingHorizontal:10,
      paddingTop:20,
    },
    headcontainer: {
      backgroundColor: "#ffffff",
      flexDirection: "row",
      alignItems: "center",
      padding: 4,
      justifyContent:'space-between',
      alignContent:'center',
      alignItems:'center',
    },
    rightIconsWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 5,
      marginTop: 5
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
      borderBottomWidth:0.5,
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
    tabWrapp:{
      width:'100%',
    },
    tabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:22,
      paddingHorizontal:10,
    }),
    inActivetabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:18,
      paddingHorizontal:10,
      color:theme.colors.seconderyHeadingColor,
      textAlign:'center'
    }),
    Activetabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:18,
      paddingHorizontal:10,
      color:theme.colors.secondry,
      textAlign:'center'
    }),
    tabsrows:theme=>({
      width:theme.dimens.WINDOW_WIDTH,
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-between',
    }),
    inActivetabitem: theme=>({
      paddingBottom:4,
      width:'50%',
    }),
    Activetabitem: theme=>({
      paddingBottom:4,
      borderBottomWidth:2,
      borderColor:theme.colors.secondry,
      width:'50%',
    }),
    properties:theme =>({
      backgroundColor:theme.colors.thirdBackgrounColor,
      width:'100%',
      padding:10,
    }),
    loopitem:{
      width:'100%',
      marginVertical:4,
      borderRadius:9,
      elevation: 6,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowColor: "red",
      shadowOpacity: 0.5,
      //shadowRadius: 2,
    },
    loopitembg:{
      width:'100%',
      height:160,
      borderRadius:10
    },
    loopitembgcltg:{
      width:'100%',
      height:160,
      borderRadius:10
    },
    itemName:theme =>({
      fontFamily:theme.typography.fontFamilyMontserratMedium,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:16,
      width:'50%',
      alignSelf:'center',
      color:theme.colors.propertyHeading,
      marginTop:theme.spacing.large,
      paddingLeft:20,
    }),
    propertygnInfo:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:10,
    },
    map_icon:{
      width:13,
      height:13,
    },
    propInforowleft:{
      width:'38%',
      flexDirection:'column',
    },
    propInforowright:{
      width:'62%',
      flexDirection:'column',
    },
    propInfoAttrb:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingVertical:5,
      //flexWrap:'wrap',
    },
    propItemattrLocation: theme=>({
      color:'#6e6e6e',
      paddingRight:5,
      paddingLeft:2,
      flexWrap:'wrap',
      width:'92%',
      fontSize:13,
      lineHeight:19,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    statusTextValue: theme=>({
      color:theme.colors.primary,
      paddingHorizontal:1,
      fontSize:16,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    statusTextWarnValue: theme=>({
      color:theme.colors.errorColor,
      paddingHorizontal:1,
      fontSize:16,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    propItemattrvalue: theme=>({
      color:theme.colors.propertyHeading,
      paddingHorizontal:5,
      flexWrap:'wrap',
      width:'88%',
      fontSize:13,
      lineHeight:19,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    propItemattrvalueError: theme=>({
      color:theme.colors.propertyHeading,
      paddingHorizontal:5,
      flexWrap:'wrap',
      width:'100%',
      fontSize:13,
      lineHeight:19,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    markwrap:{alignItems:'flex-end',width:'50%',alignSelf:'flex-end',marginRight:20,},
    marktext:theme =>({
      color:theme.colors.secondry,
      fontFamily:theme.typography.fontFamilyOxygenBold,
      fontWeight:theme.typography.fontWeightSemiBold,
      fontSize:14,
      float:'right',
    }),
    nextscreen:theme=>({
      position:'absolute',
      top:theme.spacing.large,
      right:20,
    }),
    due_label:{
      width:78,
      height:22,
      position:'absolute',
      bottom:'26%',
      right:-5
    },
  });
