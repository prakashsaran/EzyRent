import { StyleSheet } from "react-native";
import { theme } from "../../theme";
import { Dimensions } from 'react-native';
import { isIphoneX } from '../../components';
import { normalize } from "../../components";

function getTabDimension() {
  const devicesWidth = Dimensions.get('window').width;
  const halfWidth = devicesWidth/2;
  if (halfWidth < 170) {
    return 170;
  }
  return halfWidth;
}

export default StyleSheet.create({
    container: theme => ({
      flex: 1,
      width:'100%',
      backgroundColor:theme.colors.primBackgroundColor,
    }),
    headWrapp:{
      flexDirection:'column',
      paddingHorizontal:10,
      paddingTop:20,
    },
    headWrappSingle:{
      flexDirection:'column',
      padding:10,
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
      marginTop: 5,
    },
    headerIcon:{
      width:20,
      height:20,
    },
    searchClear:{
      width:20,
      height:20,
    },
    iconButton: {
      marginLeft: 5,
    },
    iconButton2: {
      marginLeft: 16,
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
      minWidth:'100%',
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
    },
    tabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(22),
      paddingHorizontal:0,
    }), 
    inActivetabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(15),
      textAlign:'center',
      width:'100%',
      paddingHorizontal:10,
      color:theme.colors.seconderyHeadingColor,
    }),
    Activetabtitle:theme =>({
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(15),
      textAlign:'center',
      width:'100%',
      paddingHorizontal:10,
      color:theme.colors.secondry,
    }),
    tabsrows:{
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-between',
      minWidth:'100%',
    },
    inActivetabitem: theme=>({
      width:getTabDimension(),
      fontSize:normalize(15),
      textAlign:'center',
      paddingBottom:4,
    }),
    Activetabitem: theme=>({
      width:getTabDimension(),
      textAlign:'center',
      paddingBottom:4,
      borderBottomWidth:2,
      borderColor:theme.colors.secondry,
    }),
    properties:theme =>({
      backgroundColor:'#f6f6f6',
      width:'100%',
      paddingVertical:10,
    }),
    loopitem:{
      width:'96%',
      marginVertical:6,
      borderRadius:9,
      elevation: 3,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: "#111",
      shadowOpacity: 0.5,
      //shadowRadius: 2,
      marginHorizontal:'2%',
    },
    loopitembg:{
      width:'100%',
      //height:190,
      minHeight:200,
      borderRadius:9,
    },
    loopitembgIn:{
      width:'100%',
      minHeight:200,
      borderRadius:7,
    },
    loopitembgcltg:{
      width:'100%',
      minHeight:200,
      borderRadius:9
    },
    loopitembgcltgIn:{
      width:'100%',
      minHeight:200,
      borderRadius:7
    },
    itemName:theme =>({
      fontFamily:theme.typography.fontFamilyMontserratMedium,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(16),
      lineHeight:normalize(19),
      width:'51%',
      alignSelf:'center',
      color:theme.colors.propertyHeading,
      paddingLeft:20,
    }),
    itemNameWrap: theme =>({
      marginTop:theme.spacing.large,
    }),
    propertygnInfo:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:10,
      paddingRight:10,
    },
    propInforowleft:{
      width:'38%',
      flexDirection:'column',
    },
    propInforowright:{
      width:'62%',
      flexDirection:'column',
      paddingLeft:10,
    },
    propInfoAttrb:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingVertical:5,
     // flexWrap:'wrap',
    },
    propItemattrLocation: theme=>({
      color:theme.colors.primaryTitleColor,
      paddingHorizontal:5,
      flexWrap:'wrap',
      width:'88%',
      fontSize:normalize(13),
      lineHeight:normalize(19),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    propItemattrvalue: theme=>({
      color:theme.colors.primary,
      paddingLeft:5,
      paddingRight:10,
      flexWrap:'wrap',
      width:'88%',
      fontSize:normalize(13),
      lineHeight:normalize(19),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    awaitingforapproval: theme=>({
      color:"#bd9743",
      paddingHorizontal:5,
      flexWrap:'wrap',
      width:'88%',
      fontSize:normalize(13),
      lineHeight:normalize(19),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    propItemattrvalueError: theme=>({
      color:theme.colors.errorColor,
      paddingLeft:5,
      paddingRight:10,
      flexWrap:'wrap',
      width:'88%',
      lineHeight:normalize(19),
      fontSize:normalize(13),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    markwrap:{
      alignItems:'flex-end',
      alignSelf:'flex-end',
      marginRight:20,
    },
    waitingWrap:{
      alignItems:'flex-end',
      alignSelf:'flex-end',
      marginRight:20,
      width:'100%',
    },
    marktext:theme =>({
      color:theme.colors.secondry,
      fontFamily:theme.typography.fontFamilyOxygenBold,
      fontWeight:theme.typography.fontWeightSemiBold,
      fontSize:normalize(14),
      alignItems:'center',
      flexDirection:'row',
    }),
    right_arrow:{
      width:10,
      height:10,
      //marginBottom:5,
      marginLeft:10,
    },
    nextscreen:theme=>({
      position:'absolute',
      top:theme.spacing.large,
      right:20,
      height:20
    }),
    tabaction:{
      width:'100%',
    },
    arrow_right:{
      width:20,
      height:12,
    },
    map_icon:{
      width:30,
      height:30,
    },
    due_label:{
      width:80,
      height:29,
      position:'absolute',
      bottom:'27%',
      right:-5
    },
    PopupbtnWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:20,
      paddingHorizontal:20,
      marginBottom:isIphoneX()?20:0,
    },
    PopupContainer:{
      //flexDirection:'column',
      backgroundColor:'#fff',
      //padding:10,
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      width:'100%',
    },
    congrats_img: theme=>({
      width:70,
      height:70,
      margin:'auto',
      marginTop:-35,
      alignSelf:'center',
    }),
    congrats_content: theme=>({
      textAlign:'center',
      flexDirection:'row',
      justifyContent:'center',
      width:'100%',
      flexWrap:'wrap',
      paddingHorizontal:20,
    }),
    light_color:{
      color:'#6e6e6e',
      fontFamily:'Oxygen',
      textAlign:'center',
      lineHeight:20,
      alignSelf:'center',
    },
    blue_color:{
      color:'#315add',
      fontFamily:'Oxygen-Bold',
      textAlign:'center',
      lineHeight:20,
    },
    congrats_head:{
      color:'#44b21b',
      fontSize:normalize(15),
      alignSelf:'center',
      fontFamily:'Montserrat-SemiBold',
      marginTop:5,
      marginBottom:10,
    },
    blue_color:{

    },
    bankacInfo:{
      flexDirection:'row',
      width:'100%',
      paddingHorizontal:20,
    },
    dash_bar_img: theme=>({
      width:'100%',
      height:15,
      marginVertical:10,
    }),
    total_warp:{
      width:'100%',
      paddingVertical:13,
      textAlign:'center',
      backgroundColor:'#eff3ff',
    },
    total_amount:{
      textAlign:'center',
      fontSize:normalize(18),
    },
    total_amount_price:{
      color:'#315add',
      fontSize:normalize(20),
      fontFamily:'Oxygen-Bold',
      textAlign:'center',
      //lineHeight:20,
      marginTop:7,
    },
    total_amount_light:{
      color:'#333',
      fontFamily:'Oxygen',
      lineHeight:normalize(20),
      fontSize:normalize(14),
      textAlign:'center',
    },
    banktitle:theme=>({
      color:'#6e6e6e',
      fontSize:normalize(14),
      fontFamily:theme.typography.secondaryFont,
      fontWeight: theme.typography.fontWeightRegular,
      marginHorizontal:5,
      width:'100%',
    }),
    payTime: theme =>({
      color:"#333333",
      fontSize:normalize(18),
      fontFamily:theme.typography.fontFamilyOxygen,
    }),
    timePeriodExtra: theme =>({
      color:'#6e6e6e',
      fontSize:normalize(12),
      fontFamily:theme.typography.secondaryFont,
      fontWeight: theme.typography.fontWeightRegular,
    }),
    textLabelXl: theme =>({
      color:theme.colors.propertyHeading,
      fontSize:normalize(14),
      fontFamily:theme.typography.secondaryFont,
      //fontWeight: theme.typography.fontWeightSemiBold,
      marginHorizontal:5,
    }),
    reject:{
      color:'#d72424',
      fontSize:normalize(16),
    },
    accept:{
      color:'#44b21b',
      fontSize:normalize(16),
    },
    visiblemodal:{
      //borderRadius:20,
      justifyContent:'flex-end',
      marginBottom:0,
      flexDirection:'column',
    },
    title:{
      fontSize:normalize(15),
    },
    textWrapper:{
      //width:260,
    },
    paymType:{
      textAlign:'center',
      paddingBottom:5,
    },
    timeline:{
      height:380,width:'100%',paddingHorizontal:20,marginVertical:10
    },
  });
