import { StyleSheet,Dimensions } from "react-native";
import { isIphoneX,normalize } from '../../components';
function isLessMarshmallow(){
  const dvcHeight = Dimensions.get('window').height;
  if(dvcHeight < 750){
    return true;
  }
  return false;
}
export default StyleSheet.create({
    container: {
      flex: 1,
    },
    titleWrapper:{
      width:'90%',
      alignSelf:'center',
      marginVertical:20,
      flexDirection:'column',
    },
    quickLinks:theme=>({
      fontSize:normalize(16),
      fontFamily:theme.typography.fontFamilyMontserratSemi,
      fontWeight:theme.typography.fontWeightBold,
      color:theme.colors.primaryTitleColor,
    }),
    quickLinksLeft:theme=>({
      paddingLeft:10,
      fontSize:normalize(16),
      fontFamily:theme.typography.fontFamilyMontserratSemi,
      fontWeight:theme.typography.fontWeightBold,
      color:theme.colors.primaryTitleColor,
    }),
    userinteraction:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginVertical:20,
    },

    intcolums: theme =>({
      width:'48%',
      borderRadius: 10,
      backgroundColor:theme.colors.primBtnTextColor,
      alignItems:'center',
      paddingVertical:20,
      borderRadius: 2,
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
      borderRadius: 10,
      elevation: 5,
    }),
    intcolums3:theme=>({
      width:'31%',
    }),
    intIcons:{
      width:30,
      height:30,
    },
    intcolumsInner:{
      width:'100%',
      alignItems:'center',
    },
    intcTitle:theme=>({
      fontSize:normalize(13),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      marginTop:10,
      lineHeight:20,
      paddingHorizontal:0,
      textAlign:'center',
    }),
    accountstats:theme=>({
      width:'98%',
      borderRadius: 10,
      backgroundColor:theme.colors.primBtnTextColor,
      padding:20,
      marginTop:10,
      borderRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0
      },
      borderWidth:0,
      shadowColor: "#00",
      //backgroundColor: "#fff",
      marginHorizontal:"1%",
      shadowOpacity: 0.35,
      shadowRadius: 5,
      borderRadius: 10,
      elevation: 5,
    }),
    statsDesc: theme =>({
      color:theme.colors.underQuickStats,
      fontSize:normalize(14),
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      marginVertical:10,
      marginTop:0,
      paddingBottom:10,
    }),
    statsdata:theme=>({
      flexDirection:'row',
      justifyContent:'space-between',
    }),
    dataItem: theme =>({
      width:'32%',
      alignItems:'center',
    }),
    itemValue: theme =>({
      fontWeight:theme.typography.fontWeightSemiBold,
      fontFamily:theme.typography.fontFamilyOxygenLight,
      color:theme.colors.secondry,
      fontSize:theme.typography.font_22,
    }),
    itemInfo: theme =>({
      fontWeight:theme.typography.fontWeightRegular,
      fontFamily:theme.typography.secondaryFont,
      color:theme.colors.primaryTitleColor,
      fontSize:theme.typography.font_11,
      lineHeight:normalize(15),
      width:'100%',
      textAlign:'center',
      paddingHorizontal:2,
      marginVertical:5,
    }),
    databg: theme =>({
      width:'70%',
      alignSelf:'center',
      height:120,
      marginTop:70,
      marginBottom:80,
    }),
    PopupbtnWrapper:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingVertical:15,
      paddingHorizontal:20,
      marginBottom:isIphoneX()?30:0,
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
    alertMsg:{
      color:'#6e6e6e',
      fontFamily:'Oxygen',
      textAlign:'center',
      lineHeight:20,
      alignSelf:'center',
      paddingTop:10,
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
      marginVertical:7,
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
      lineHeight:20,
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
      fontSize:normalize(16),
      paddingTop:5,
      fontFamily:theme.typography.fontFamilyOxygen,
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
    quick_stats_heading:theme=>({
      color:theme.colors.propertyHeading,
      fontSize:normalize(18),
      fontFamily:theme.typography.fontFamilyMontserratSemi,
      fontWeight:theme.typography.fontWeightSemiBold,
    }),
    quick_stats_inner:{
      flexDirection:'row',
      width:'100%',
      alignItems:'center',
      justifyContent:'space-between',
    },
    paginat:{
      width:40,
      height:10,
    },
    new_user_text:{
      fontSize:normalize(16),
      textAlign:'center',
      color:'#333',
      fontFamily:'Oxygen',
      marginBottom:80,
      lineHeight:normalize(25),
      marginTop:30,
    },
    dashboard_img_wrap:{

    },
    dashboard_img:{
      width:isLessMarshmallow()?180:240,
      alignSelf:'center',
      height:isLessMarshmallow()?200:270,
    },
    rectView2:{
      height:'100%',
      borderTopLeftRadius:35,
      borderTopRightRadius:35,
    },
    timePeriodExtra: theme =>({
      color:theme.colors.descriptionColor,
      fontSize:normalize(12),
      fontFamily:theme.typography.secondaryFont,
      fontWeight: theme.typography.fontWeightRegular,
    }),
    paymType:{
      textAlign:'center',
      paddingBottom:5,
    },
    timeline:{
      height:380,width:'100%',paddingHorizontal:20,marginVertical:10
    },
  });
