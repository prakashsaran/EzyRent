import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { normalize } from "../../../components";

export default StyleSheet.create({
    container: {
      flex: 1,
    },
    rectviewcustom:{
      paddingTop:0,
    },
    titleWrapper:{
      width:'90%',
      alignSelf:'center',
      marginVertical:20,
      flexDirection:'row',
      justifyContent:'space-between',
      paddingTop:normalize(10),
    },
    back_button:{
      width:30,
      height:17,
    },
    plus:{
      width:23,
      height:23,
      marginTop:-2,
    },
    textHeading: theme =>({
      color:theme.colors.secondry,
      fontSize:normalize(18),
      textTransform:'uppercase',
      fontWeight:'bold',
      paddingBottom:6,
    }),
    textSub: theme =>({
      color:theme.colors.secondry,
      fontSize:normalize(14),
      color:theme.colors.descriptionColor,
    }),
    gps_dark_icon:{
      width:14,
      height:14,
      marginTop:5,
    },
    ImageLeftWrap:{
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      overflow:'hidden',
    },
    morelinksmall:{
      fontSize:normalize(14),
    },
    shadow:{
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 3,
    borderRadius:10,
    marginVertical:5,
  },
    MoreLinkswrap:{
      width:'100%',
      //height:130,
      flexDirection:'row',
      padding:20,
      flexWrap:'wrap',
      //overflow:'hidden',
      borderRadius: 10,
      alignItems:'center',
      position:'relative',
      justifyContent:'space-between'
       // zIndex:0,
    },
    More_icon:{
      width:3,
      height:30,
      marginTop:5,
    },
    MoreLinks:{
      paddingLeft:10,
    },
    MoreLinksItem: theme =>({
      color:'#000',
      fontSize:normalize(16),
      fontFamily:theme.typography.fontFamilyMontserratMedium,
      fontWeight:theme.typography.fontWeightSemiBold,
    }),
    MoreLinksItemSub: theme =>({
      color:theme.colors.descriptionColor,
      fontSize:normalize(14),
      paddingLeft:4,
      paddingTop:2,
      fontFamily:theme.typography.fontFamilyOxygen,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    AccountNo: theme =>({
      color:'#333',
      fontSize:normalize(16),
      paddingLeft:1,
      paddingTop:10,
      fontFamily:theme.typography.fontFamilyOxygen,
      fontWeight:theme.typography.fontWeightRegular,
    }),
    UserWrap:{
      paddingLeft:10,
    },
    contentWrap:{
      flexDirection:'row',
      alignItems:'center',
      alignContent:'center',
      paddingBottom:5,
    },
    User_image:{
      width:45,
      height:45,
      marginTop:5,
    },
    heading_wrap:{
      flexDirection:'row',
    },
    UserWrap:{
      paddingLeft:10,
    },
    three_dots_light:{
      width:6,
      height:23,
    },
    active_three_dots_light:{
      width:6,
      height:23,
      opacity:0.3,
    },
    hideShow:{
      //display:'none',
      position:'absolute',
      right:25,
      bottom:'-40%',
      backgroundColor: "#fff",
      borderRadius: 5,
      borderColor: "#e6e6e6",
      borderWidth: 1,
      shadowOffset: {
        height: 5,
        width: 5
      },
      shadowColor: "rgba(0,0,0,1)",
      shadowOpacity: 0.35,
      width:150,
      padding:10,
      elevation:5,
  },
    edit:{
      color:theme.colors.propertyHeading,
      fontFamily:theme.typography.secondaryFont,
      fontWeight:theme.typography.fontWeightRegular,
      fontSize:normalize(18),
      marginVertical:0,
    },
    delete:{

    },
  });
