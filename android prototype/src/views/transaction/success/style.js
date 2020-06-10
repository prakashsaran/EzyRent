import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import {normalize} from '../../../components'

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
    rectWrapp:{
      backgroundColor:theme.colors.lightBackgrountColor,
      marginTop:80,
      width:'100%',
      padding:0,
    },
    quickLinks:theme=>({
      fontSize:16,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightSemiBold,
      color:theme.colors.primaryTitleColor,
    }),
    payHead: {
      flexDirection:'column',
    },
    congrats: theme =>({
      width: '100%',
      color: "rgba(68,178,27,1)",
      fontSize: 22,
      fontFamily: theme.typography.primaryFont,
      //fontFamily: "montserrat",
      fontWeight:'600',
      textAlign: "center",
      marginTop: 16,
      alignSelf: "center"
    }),
    statusMessage: {
      width: '100%',
      color: "rgba(110,110,110,1)",
      fontSize: 18,
      fontFamily: "Oxygen",
      fontWeight:'normal',
      textAlign: "center",
      marginTop: 5,
      fontFamily:'Oxygen',
    },
    iconWrap:{
      backgroundColor:'rgba(68,178,27,1)',
      width:100,
      height:100,
      borderRadius:50,
      padding:20,
      alignSelf:'center',
      alignItems:'center',
      flexDirection:'row',
    },
    Payicon: {
      width:55,
      height:40,
    },
    statusText:{
      color: "rgba(110,110,110,1)",
      fontSize: 18,
      fontFamily: "Oxygen",
      fontWeight:'normal',
      textAlign: "center"
    },
    totalAmount:{
      color: "rgba(50,90,220,1)",
      fontSize: 23,
      fontFamily: "Oxygen",
      fontWeight:'normal',
      textAlign: "center"
    },
    textLabel:{
      color: "rgba(110,110,110,1)",
      fontSize: 16,
      fontFamily: "Oxygen",
      fontWeight:'normal',
      lineHeight:23,
    },
    textValue:{
      color: "rgba(51,51,51,1)",
      fontSize: 15,
      fontFamily: "Oxygen",
      marginTop: 0,
      fontFamily:'Oxygen',
      lineHeight:22,
      fontWeight:'normal',
    },
    fieldItem:{
      marginTop:20,
      paddingLeft:20,
      width:'100%',
    },
    cardStatus:{
      backgroundColor:'rgba(68,178,27,1)',
      width:30,
      height:30,
      borderRadius:75,
      padding:5,
      alignSelf:'center',
      alignItems:'center',
    },
    cardStatusIcn:{
      width:15,
      height:15,
    },
    cardName:{
      color: "rgba(51,51,51,1)",
      fontSize: 17,
      fontFamily: "Oxygen",
      fontWeight:'normal',
    },
    cardwrapp:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'center',
      alignItems:'center',
      paddingVertical:15,
      paddingHorizontal:10,
      marginTop:10,
      shadowRadius:5,
      borderRadius:5,
      backgroundColor: "#fff",
      borderColor: "#e6e6e6",
      borderWidth: 1,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowColor: "rgba(0,0,0,1)",
      shadowOpacity: 0.35,
      width:'97%',
      elevation:5,
    },
    secure:{
      flexDirection:'row',
      justifyContent:'center',
      marginTop:30,
    },
    secureText:{
      color:"#44b21b",
      fontSize:18,
      fontFamily: "Oxygen",
      fontWeight:'normal',
      paddingLeft:10,
      paddingBottom:0,
    },
    secureIcon:{
      width:30,
      height:30,
    },
    valueWrap:{
      flexDirection:'row',
      //justifyContent:'space-between',
      alignItems:'center',
    },
    textValueSub:{
      paddingLeft:20,
      paddingTop:0,
      color: "#333",
      fontSize: 15,
      fontFamily: "Oxygen",
      fontWeight:'normal',
      lineHeight:22,
    },
    myDashBoard:theme=>({
      width:'100%',
    }),
    rectView2:{
      //width:'95%',
      marginBottom:0,
      paddingHorizontal:0,
      elevation:5,
    },
  });
